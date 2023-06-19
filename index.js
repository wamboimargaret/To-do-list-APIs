
const tasksContainer = document.querySelector('.tasks');


const form = document.querySelector('.add-task');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const input = this.querySelector('input[type="text"]');
    const taskName = input.value.trim();

    if (taskName !== '') {
        addTask(taskName);
        input.value = ''; 
    }
});

function addTask(taskName) {
   
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    
   
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
   
    const taskNameElement = document.createElement('span');
    taskNameElement.textContent = taskName;

  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    
    
    deleteButton.addEventListener('click', function() {
        taskElement.remove();
    });
    
    
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(deleteButton);
    
    
    tasksContainer.appendChild(taskElement);
}







const userContainer = document.getElementById('container');
const getUsers = () => {
  return fetch('https://dummyjson.com/todos?limit=22')
    .then(response => response.json())
    .then(response => response.todos)
    .catch(error => error);
};

const displayUsers = async () => {
  const users = await getUsers();
  console.log(users);
  if (Array.isArray(users)) {
    users.forEach(item => {
      let div = document.createElement('div');
      let userName = document.createElement('input');
      let ids = document.createElement('span');
      let checkbox = document.createElement('input');
      let icon = document.createElement('i');
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      icon.classList.add('fa', 'fa-trash');
      ids.appendChild(icon);
      userName.value = item.todo;
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          userName.style.textDecoration = 'line-through';
        } else {
          userName.style.textDecoration = 'none';
        }
      });
      icon.addEventListener('click', () => {
        deleteUser(item.id);
        div.remove();
      });
      div.appendChild(checkbox);
      div.appendChild(userName);
      div.appendChild(ids);
      div.setAttribute('key', item.id);
      div.setAttribute('class', 'people');
      userContainer.appendChild(div);
    });
  }
};
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`, {
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