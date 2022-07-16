const taskInput = document.querySelector(".task-input input");
let filters = document.querySelectorAll(".filters span");
let taskBox = document.querySelector(".task-box");
let clearAll = document.querySelector(".clear-btn");

let editId;
let isEditedTask = false;
  //getting localStorage todo list
  let todos = JSON.parse (localStorage.getItem("todo-list"));

// filters

 filters.forEach(btn => {
      btn.addEventListener("click", () => {
      document.querySelector("span.active").classList.remove("active");
      btn.classList.add("active");
      showTodo(btn.id);
      });
 });

function showTodo(filter) {
    let li = "";
 if(todos) {
    todos.forEach((todo, id) => {
         //if status is completed, set the iscompleted value to checked
           let isCompleted = todo.status == "completed" ? "checked" : "";
           if(filter == todo.status || filter == "all"){

                li += ` <li class="task">
                       <label for="${id}">
                          <input  onclick="updateStatus(this)"  type="checkbox" id="${id}" ${isCompleted}>
                          <p class="${isCompleted}">${todo.name}</p>
                       </label>
                       <div class="settings">
                           <i onclick="showMenu(this)" class="fas fa-ellipsis-h"></i>
                           <ul class="tasks-menu">
                                 <li><i onclick="editTask(${id}, '${todo.name}')"  class="fa-solid fa-pen"> edit</i></li>
                                 <li><i onclick="deleteTask(${id})" class="fa-solid fa-trash"> delete</i></li>
                           </ul> 
                      </div>
                  </li>`;
           }
    });
 }
 taskBox.innerHTML = li ||  `<span>you don't have any task here</span>`;
}
showTodo("all");

function showMenu(selectedTask){
   //getting task menu div
     let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
    // removing show class from the menu on the document click
     if(e.target.tagName != "I" || e.target != selectedTask){
    taskMenu.classList.remove("show");
        }
    });
}
//editing selected task 
function editTask(taskId, taskName){
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}
  //delete selected task from array /todos
function deleteTask(deleteId) {
     todos.splice(deleteId, 1);
     localStorage.setItem("todo-list", JSON.stringify(todos));
     showTodo("all");
}

   //removing all items  of array /todos
 clearAll.addEventListener("click",() =>{
      todos.splice(0, todos.length);
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo("all");
 })

   //getting pragraph that contains task name
function updateStatus(selectedTask){
    let  taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
       taskName.classList.add("checked");
       //updating the status of selected task to copmleted
       todos[selectedTask.id].status = "completed";
    }else{
        taskName.classList.remove("checked");
         //updating the status of selected task to pendimg
       todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// user input

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter"){
        if(!isEditedTask){ // if isEditedTask isn't true
            if(!todos){ // if todo list isn't exist pass an empty array to todos
                todos = [];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo); //adding new task to todos
        }else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
});