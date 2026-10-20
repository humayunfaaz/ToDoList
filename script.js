
const newTaskBtn = document.getElementById("NewTaskBtn");
const container = document.querySelector(".container");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const tasksContainer = document.getElementById("tasksContainer");
// 2. Hide the form container by default on page load
container.style.display = "none";

// 3. Toggle form visibility when "New Task" is clicked
newTaskBtn.addEventListener("click", () => {
    if (container.style.display === "none") {
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
});


let tasks = [];
taskForm.addEventListener("submit", (event) => {
    // Prevent the page from refreshing[cite: 1]
    event.preventDefault();
    const taskTitle = taskInput.value.trim();
    if (taskTitle === "") {
        alert("Task name cannot be empty!");
        return;
    }

    
    const newTask = {
        id: Date.now(),
        title: taskTitle,
        priority: priorityInput.value,
        dueDate: dueDateInput.value || "null",
        completed: false
    };
    // Add the object to your tasks array[cite: 1]
    tasks.push(newTask);
     renderTasks();
    console.log("Updated Tasks Array:", tasks);
    taskInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "Medium";

     
   container.style.display = "none";
});
function deleteTask(event) {
     if (event.target.classList.contains("delete-btn")) {
        const taskId = Number(event.target.dataset.id);
       tasks = tasks.filter((task)=> task.id !==taskId);
              renderTasks();
     }

}
tasksContainer.addEventListener("click", deleteTask);
function renderTasks() {
    tasksContainer.innerHTML = "";
    tasks.forEach(( task) => {
        const card = document.createElement("div");
        card.classList.add("task-card");
        card.innerHTML = `
            <h3 class="newTask-title">${task.title}</h3>
            <p class="newtask-priority">Priority: ${task.priority}</p>
            <p class="newtask-dueDate">Due Date: ${task.dueDate}</p>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        `;
        tasksContainer.appendChild(card);   
        
    });
}
// renderTasks();