
const newTaskBtn = document.getElementById("NewTaskBtn");
const container = document.querySelector(".container");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const tasksContainer = document.getElementById("tasksContainer");

//  Hide the form container by default on page load
container.style.display = "none";


//  Toggle form visibility when "New Task" is clicked
newTaskBtn.addEventListener("click", () => {
    if (container.style.display === "none") {
        // RESET everything so it's fresh for a brand new task
        editingId = null;
        taskForm.reset(); 
        change.innerHTML = "Add Task";
        
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
});


let tasks = [];
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskTitle = taskInput.value.trim();
    if (taskTitle === "") {
        alert("Task name cannot be empty!");
        return;
    }

    // CHECK IF WE ARE EDITING OR CREATING
    if (editingId !== null) {
        // 1. EDITING: Find the existing task and update its values
        const taskToUpdate = tasks.find((task) => task.id === editingId);
        if (taskToUpdate) {
            change.innerHTML = "Save";
            taskToUpdate.title = taskTitle;
            taskToUpdate.priority = priorityInput.value;
            taskToUpdate.dueDate = dueDateInput.value || "null";
        }
        // Reset editing state and button text back to normal
        editingId = null;
        change.innerHTML = "Add Task";
        
    } else {
        // 2. CREATING: Make a brand new task object
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            priority: priorityInput.value,
            dueDate: dueDateInput.value || "null",
            completed: false
        };
        tasks.push(newTask);
    }

    // Refresh the screen and clean up the form
    renderTasks();
    console.log("Updated Tasks Array:", tasks);
    
    taskInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "Medium";
    container.style.display = "none";
});


// deleing function 
function deleteTask(event) {
     if (event.target.classList.contains("delete-btn")) {
        const taskId = Number(event.target.dataset.id);
       tasks = tasks.filter((task)=> task.id !==taskId);
              renderTasks();
     }

}
tasksContainer.addEventListener("click", deleteTask);

function completeTask(event) {
    if (event.target.classList.contains("complete-btn")) {
        taskId = Number(event.target.dataset.id);
              const foundTask = tasks.find((task)=> task.id === taskId);
         if (foundTask) {
            foundTask.completed = !foundTask.completed;
        }
        const newTasktitle = document.getElementsByClassName("newTask-title");
        renderTasks();
    }
}
tasksContainer.addEventListener("click", completeTask);

// edit button function
let editingId = null;
const  change = document.getElementById("addTaskButton");
function editTask(event) {
    if (event.target.classList.contains("edit-btn")) { 
       taskId = Number(event.target.dataset.id);
      const EditTask = tasks.find((task)=> task.id === taskId);
    
    if(EditTask){
    taskInput.value = EditTask.title;
    priorityInput.value = EditTask.priority;
    dueDateInput.value = EditTask.dueDate;
    
    change.innerHTML = "change" ;
    container.style.display = "block";
    editingId = EditTask.id
    }
    // change.innerHTML = "Add Task" ;
    
    }
}
tasksContainer.addEventListener("click", editTask);

// render the tasks
function renderTasks() {
    tasksContainer.innerHTML = "";
    tasks.forEach(( task) => {
        const card = document.createElement("div");
        card.classList.add("task-card");
        card.innerHTML = `
            <h3 class="newTask-title">${task.completed ? `<del>${task.title}</del>` : task.title}</h3>
            <p class="newtask-priority">Priority: ${task.priority}</p>
            <p class="newtask-dueDate">Due Date: ${task.dueDate}</p>
            <div class="task-actions">
                <button class="complete-btn" data-id="${task.id}">${task.completed ? "Undo" : "Complete"}</button>
                <button class="edit-btn" data-id="${task.id}">Edit</button>
                <button class="delete-btn" data-id="${task.id}">Delete</button>

            </div>
        `;
        tasksContainer.appendChild(card);   
        
    });
}
// Popup Function
