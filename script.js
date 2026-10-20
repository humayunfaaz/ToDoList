// const newTaskbtn =document.getElementById("NewTaskBtn");
// const container = document.querySelector(".container");
// //  container.style.display = "none";
// container.style.display = "none";

// const tasks = [];
// newTaskbtn.addEventListener("click", function(){
//     // container.style.display = "block";
//     const Newtasks = {
//         id: Date.now(),
//         task: taskInput.value,
//         priority: priorityInput.value,  
//         dueDate: dueDateInput.value,
//         completed: false 
//     };
//     tasks.push(Newtasks);           

//     });



// const taskInput=document.getElementById("taskInput");
// const taskList=document.getElementById("taskList");
// const priorityInput=document.getElementById("priorityInput");
// const dueDateInput=document.getElementById("dueDateInput");
// 1. Select all your elements at the very top
const newTaskBtn = document.getElementById("NewTaskBtn");
const container = document.querySelector(".container");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");

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

// 4. Initialize your tasks array[cite: 1]
const tasks = [];

// 5. Handle form submission (Stage 1 requirements)[cite: 1]
taskForm.addEventListener("submit", (event) => {
    // Prevent the page from refreshing[cite: 1]
    event.preventDefault();

    // Get the value and trim whitespace[cite: 1]
    const taskTitle = taskInput.value.trim();

    // Validate that the task name is not empty[cite: 1]
    if (taskTitle === "") {
        alert("Task name cannot be empty!");
        return;
    }

    // Create the task object[cite: 1]
    const newTask = {
        id: Date.now(),
        title: taskTitle,
        priority: priorityInput.value,
        dueDate: dueDateInput.value || "None",
        completed: false
    };

    // Add the object to your tasks array[cite: 1]
    tasks.push(newTask);
    
    // Check your console to see the array grow!
    console.log("Updated Tasks Array:", tasks);

    // Reset the form fields after adding
    taskInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "Medium";
});