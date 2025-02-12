// W3schools is a online resource I used while creating this javascript to help with syntax and other elements.

// This runs when the webpage loads
document.addEventListener("DOMContentLoaded", function () {
    loadTasks(); // Show all saved tasks
});


// --------------- Tasks.html --------------- //
// Function to add a new task when the "Add Task" button is clicked
function addTask() {
    // Get the values from the input fields
    let taskInput = document.getElementById("taskInput").value.trim();
    let taskDate = document.getElementById("taskDate").value;
    let taskUrgency = document.getElementById("taskUrgency").value;

    // Don't add empty tasks
    if (taskInput === "" || taskDate === "") {
        return;
    }

    // Create a task object with all the information from the user
    let task = {
        name: taskInput,
        date: taskDate,
        urgency: taskUrgency
    };

    // Get existing tasks from storage (or create empty array if none exist)
    let savedTasks = localStorage.getItem("tasks");
    let tasks = [];
    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }

    // Add a new task to the array
    tasks.push(task);

    // Save the updated task list back to storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Add the new task to the table on the page
    addTaskToTable(task);

    // Clear the input fields after adding
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
}

// Function to add a single task to the table
function addTaskToTable(task) {
    // Get the table body where tasks are shown
    let taskList = document.getElementById("taskList");

    // Create a new row for the task
    let row = document.createElement("tr");

    // Add the task information to the row
    row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.date}</td>
        <td>${task.urgency}</td>
        <td>
            <button onclick="editTask('${task.name}')">Edit</button>
            <button onclick="deleteTask('${task.name}', this)">Delete</button>
        </td>
    `;

    // Add the row to the table
    taskList.appendChild(row);
}

// Function to load all tasks when the page opens
function loadTasks() {
    // Get the table body and clear it
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Get tasks from storage (or empty array if none exist)
    let savedTasks = localStorage.getItem("tasks");
    let tasks = [];
    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }

    // Add each task to the table
    tasks.forEach(function(task) {
        addTaskToTable(task);
    });
}

// Function to delete a task
function deleteTask(taskName, buttonElement) {
    // Get current tasks from storage
    let savedTasks = localStorage.getItem("tasks");
    let tasks = [];
    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }

    // Remove the task we want to delete
    let updatedTasks = [];
    for (let task of tasks) {
        if (task.name !== taskName) {
            updatedTasks.push(task);
        }
    }

    // Save the updated task list
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Remove the task from the table
    let row = buttonElement.parentElement.parentElement;
    row.remove();
}

// Function to prepare for editing a task
function editTask(taskName) {
    // Get current tasks from storage
    let savedTasks = localStorage.getItem("tasks");
    let tasks = [];
    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }

    // Find the task we want to edit
    let taskToEdit = null;
    for (let task of tasks) {
        if (task.name === taskName) {
            taskToEdit = task;
            break;
        }
    }

    // If we found the task, save it and go to edit page
    if (taskToEdit) {
        localStorage.setItem("editTask", JSON.stringify(taskToEdit));
        window.location.href = "edit.html";
    }
}

// --------------- Edit.html --------------- //
// This runs when the edit page loads
document.addEventListener("DOMContentLoaded", function () {
    // Check if we're on the edit page
    if (window.location.pathname.includes("edit.html")) {
        // Get the task we want to edit
        let savedTask = localStorage.getItem("editTask");
        if (savedTask !== null) {
            let taskData = JSON.parse(savedTask);
            
            // Fill in the edit form with the task's current values
            document.getElementById("editTaskInput").value = taskData.name;
            document.getElementById("editTaskDate").value = taskData.date;
            document.getElementById("editTaskUrgency").value = taskData.urgency;
        }
    }
});

// Function to save changes to a task
function updateTask() {
    // Get the new values from the edit form
    let newName = document.getElementById("editTaskInput").value;
    let newDate = document.getElementById("editTaskDate").value;
    let newUrgency = document.getElementById("editTaskUrgency").value;

    // Get all tasks and the task we're editing
    let savedTasks = localStorage.getItem("tasks");
    let tasks = [];
    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }
    
    let editingTask = JSON.parse(localStorage.getItem("editTask"));

    // Find and update the task
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].name === editingTask.name) {
            tasks[i] = {
                name: newName,
                date: newDate,
                urgency: newUrgency
            };
            break;
        }
    }

    // Save the updated task list
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // Clean up and go back to task list
    localStorage.removeItem("editTask");
    window.location.href = "tasks.html";
}

// Function to mark tasks as complete (to be implemented later)
function markAsComplete() {

}

// Function to delete a task from the edit page
function deleteTaskFromEdit() {
    // Get the task we're editing
    let savedTask = localStorage.getItem("editTask");
    if (!savedTask) {
        return;
    }
    
    let taskToDelete = JSON.parse(savedTask);

    // Get all tasks
    let savedTasks = localStorage.getItem("tasks");
    let tasks = [];
    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }

    // Remove the task we want to delete
    let updatedTasks = [];
    for (let task of tasks) {
        if (task.name !== taskToDelete.name) {
            updatedTasks.push(task);
        }
    }

    // Save the updated task list 
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    // Clean up and go back to task list
    localStorage.removeItem("editTask");
    window.location.href = "tasks.html";
}