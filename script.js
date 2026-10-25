
const newTaskBtn = document.getElementById("NewTaskBtn");
const container = document.querySelector(".container");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const tasksContainer = document.getElementById("tasksContainer");

let tasks = [];
let editingId = null;

const change = document.getElementById("addTaskButton");

// Hide the form container by default on page load
container.style.display = "none";

// Toggle form visibility when "New Task" is clicked
newTaskBtn.addEventListener("click", () => {
    if (container.style.display === "none") {
        // Reset everything for a new task
        editingId = null;
        taskForm.reset();
        change.innerHTML = "Add Task";

        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
});

// Add or edit a task
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskTitle = taskInput.value.trim();

    if (taskTitle === "") {
        alert("Task name cannot be empty!");
        return;
    }

    if (editingId !== null) {
        // Editing an existing task
        const taskToUpdate = tasks.find(
            (task) => task.id === editingId
        );

        if (taskToUpdate) {
            taskToUpdate.title = taskTitle;
            taskToUpdate.priority = priorityInput.value;
            taskToUpdate.dueDate = dueDateInput.value || "";
        }

        editingId = null;
        change.innerHTML = "Add Task";

    } else {
        // Creating a new task
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            priority: priorityInput.value,
            dueDate: dueDateInput.value || "",
            completed: false
        };

        tasks.push(newTask);
    }
      saveTasks();
    // Reapply all active filters
    applyAllFilters();

    console.log("Updated Tasks Array:", tasks);

    taskForm.reset();
    priorityInput.value = "Medium";
    container.style.display = "none";
});

// Delete task
function deleteTask(event) {
    if (event.target.classList.contains("deletebtn")) {
        const taskId = Number(event.target.dataset.id);

        tasks = tasks.filter((task) => task.id !== taskId);

        // Close and reset the form if the edited task is deleted
        if (editingId === taskId) {
            editingId = null;
            taskForm.reset();
            change.innerHTML = "Add Task";
            container.style.display = "none";
        }
        saveTasks();
        applyAllFilters();
    }
}

tasksContainer.addEventListener("click", deleteTask);

// Complete or undo a task
function completeTask(event) {
    if (event.target.classList.contains("completebtn")) {
        const taskId = Number(event.target.dataset.id);

        const foundTask = tasks.find(
            (task) => task.id === taskId
        );

        if (foundTask) {
            foundTask.completed = !foundTask.completed;
            saveTasks();
        }
           
        // Reapply status and other filters
        applyAllFilters();
    }
}

tasksContainer.addEventListener("click", completeTask);

// Master function to handle all task filtering
let Currtentpriority = "All";
let query = "";
let currentStatus = "All";

const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const searchInput = document.querySelector(".searchBar");

// Search bar
if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        query = event.target.value.toLowerCase().trim();
        applyAllFilters();
    });
}

// Priority filter
if (priorityFilter) {
    priorityFilter.addEventListener("change", () => {
        Currtentpriority = priorityFilter.value;
        applyAllFilters();
    });
}

// Status filter
if (statusFilter) {
    statusFilter.addEventListener("change", () => {
        currentStatus = statusFilter.value;
        applyAllFilters();
    });
}

// Apply search, priority, and status filters together
function applyAllFilters() {
    const filteredTasks = tasks.filter((task) => {
        const matchesQuery = task.title
            .toLowerCase()
            .includes(query);

        const matchesPriority =
            Currtentpriority === "All" ||
            task.priority === Currtentpriority;

        let matchesStatus = true;

        if (currentStatus === "Active") {
            matchesStatus = !task.completed;
        } else if (currentStatus === "Completed") {
            matchesStatus = task.completed;
        }

        return (
            matchesQuery &&
            matchesPriority &&
            matchesStatus
        );
    });

    renderTasks(filteredTasks);
}

// Edit task
function editTask(event) {
    if (event.target.classList.contains("editbtn")) {
        const taskId = Number(event.target.dataset.id);

        const EditTask = tasks.find(
            (task) => task.id === taskId
        );

        if (EditTask) {
            taskInput.value = EditTask.title;
            priorityInput.value = EditTask.priority;
            dueDateInput.value = EditTask.dueDate || "";

            change.innerHTML = "Save";
            container.style.display = "block";
            editingId = EditTask.id;
        }
    }
}

tasksContainer.addEventListener("click", editTask);
// Saveing tasks in localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks !== null) {
        try {
            const parsedTasks = JSON.parse(savedTasks);

            if (Array.isArray(parsedTasks)) {
                tasks = parsedTasks;
            }
        } catch (error) {
            console.error("Error loading saved tasks:", error);
        }
    }
}
// Render tasks
function renderTasks(tasksToRender = tasks) {
    tasksContainer.innerHTML = "";

    if (tasksToRender.length === 0) {
        const message = document.createElement("p");

        message.textContent = tasks.length === 0
            ? "No tasks yet. Add a new task!"
            : "No tasks match your filters.";

        tasksContainer.appendChild(message);
        return;
    }

    tasksToRender.forEach((task) => {
        const card = document.createElement("div");
        card.classList.add("taskcard");

        const title = document.createElement("h3");
        title.classList.add("newTasktitle");

        if (task.completed) {
            const deletedTitle = document.createElement("del");
            deletedTitle.textContent = task.title;
            title.appendChild(deletedTitle);
        } else {
            title.textContent = task.title;
        }

        const priority = document.createElement("p");
        priority.classList.add("newtaskpriority");
        priority.textContent = `Priority: ${task.priority}`;

        const dueDate = document.createElement("p");
        dueDate.classList.add("newtaskdueDate");
        dueDate.textContent = task.dueDate
            ? `Due Date: ${task.dueDate}`
            : "Due Date: Not set";

        const actions = document.createElement("div");
        actions.classList.add("taskactions");

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("completebtn");
        completeBtn.dataset.id = task.id;
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.type = "button";

        const editBtn = document.createElement("button");
        editBtn.classList.add("editbtn");
        editBtn.dataset.id = task.id;
        editBtn.textContent = "Edit";
        editBtn.type = "button";

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deletebtn");
        deleteBtn.dataset.id = task.id;
        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";

        actions.append(completeBtn, editBtn, deleteBtn);
        card.append(title, priority, dueDate, actions);

        tasksContainer.appendChild(card);
    });
}

// Initial render
// applyAllFilters();
loadTasks();
applyAllFilters();
// Popup Function
