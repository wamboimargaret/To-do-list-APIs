let userContainer = document.getElementById('container');
const getUsers = () => {
  return fetch('https://dummyjson.com/todos?limit=22')
    .then(response => response.json())
    .then(response => response.todos)
    .catch(error => error);
};

const displayUsers = async () => {
  const users = await getUsers();
  console.log(users.users);
  if (Array.isArray(users)) {
    users.forEach(item => {
      let div = document.createElement('div');
      let userName = document.createElement('input');
      let ids = document.createElement('span');
      let checkbox = document.createElement('input');
      let button = document.createElement('button');
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      button.innerHTML = 'delete'
      ids.appendChild(button);
      userName.value = item.todo;
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          userName.style.textDecoration = 'line-through';
        } else {
          userName.style.textDecoration = 'none';
        }
      });
      button.addEventListener('click', () => {
        deleteUser(item.id);
        div.remove();
      });

      div.appendChild(checkbox);
      div.appendChild(userName);
      div.appendChild(ids);
     
      userContainer.appendChild(div);
    });
  }
};
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/1`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.log(error);
  }
};
displayUsers();

const addForm = document.getElementById('add-task');
addForm.addEventListener('submit', event => {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const newTask = taskInput.value;
  taskInput.value = '';
  if (newTask) {
    const div = document.createElement('div');
    const userName = document.createElement('input');
    const ids = document.createElement('span');
    const checkbox = document.createElement('input');
    const button = document.createElement('button');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    button.innerHTML = 'delete';
     ids.appendChild(button);
    userName.value = newTask;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.style.textDecoration = 'line-through';
      } else {
        userName.style.textDecoration = 'none';
      }
    });

    button.addEventListener('click', () => {
      div.remove();
    });

    div.appendChild(checkbox);
    div.appendChild(userName);
    div.appendChild(ids);
   
    userContainer.prepend(div);
  }
})

