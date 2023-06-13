
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







let toDoLIst = document.getElementById('todo-list')
const getList = ()=>{
  return fetch ('https://dummyjson.com/todos/user/5')
  .then(response => response.json())
  .then(response => response)
  .catch(error => error.message)
}
 getList()

 const displayList = async()=>{
  const list = await getList();
  console.log(list.list)
  list.list.map(item =>{
    
    let div = document.createElement('li')
    div.className ='task';
    let id = document.createElement('p')
    let todo = document.createElement('p')
    let userid = document.createElement('p')
 //    let paragraph=document.createElement('paragraph')
    id=item.id;
    todo.innerHTML=`todo`
    userid.innerHTML=item.userId;
    div.appendChild(id);
    div.appendChild(todo);
    div.appendChild(userid);
    toDoLIst.appendChild(div)
  })
 }
 displayList()