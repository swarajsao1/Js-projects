const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-lists");

console.log(taskForm);
console.log(taskInput);
console.log(taskList);


/*
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value;
    
    if (taskText.trim() === "") {
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    taskList.appendChild(taskItem);
    taskInput.value = "";
});
*/

/*
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value;
    
    if (taskText.trim() === "") {
        return;
    }

    const taskItem = document.createElement("li");

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    
    deleteButton.addEventListener("click", function () {
        taskItem.remove();
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const taskLabel = document.createElement("span");
    taskLabel.textContent = taskText;

    checkbox.addEventListener("change", function () {
        taskLabel.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });

    taskList.append(taskItem);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteButton);
    
    taskInput.value = "";
});

*/

/*
const tasks = [{text: "Study JavaScript", completed: "false"},
                {text: "Read Books", completed: "true"},
                {text: "Exercise", completed: "true"}
];

console.log(tasks[1].text);
console.log(tasks[1].completed);
console.log(tasks.map(task => task.completed));

const savedTasks = JSON.stringify(tasks);

tasks.push({text:"Running", completed:"false"});
console.log(tasks);
console.log(tasks.length);
console.log(tasks.map(task => task.completed));

const restoredTasks = JSON.parse(savedTasks);

for (const task of tasks) {
    console.log(task.text);
} 
*/


const tasksCounter = document.getElementById("tasks-counter");
const tasksCompleted = document.getElementById("tasks-completed");
const tasksRemaining = document.getElementById("tasks-remaining");

let tasks = [];
let nextTaskId = 1;

function renderTasks () {

    taskList.innerHTML = "";
    tasksCounter.textContent = `Total tasks: ${tasks.length}`;
    tasksCompleted.textContent = `Completed tasks: ${tasks.filter(function (item) {return item.completed === true;}).length}`;
    tasksRemaining.textContent = `Remaining tasks: ${tasks.filter(task => !task.completed).length}`;
    
    
    for (const task of tasks) {
        const taskItem = document.createElement("li");
        const taskLabel = document.createElement("span");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.classList.add("delete-btn");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        
        taskLabel.textContent = task.text;

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter( function (item) {
                return item.id !== task.id;
            });
            saveTasks();
            renderTasks();
        });

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });


        if (task.completed) {
            taskLabel.style.textDecoration = "line-through";
        }
        

        taskList.appendChild(taskItem);
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(deleteButton);
    }
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value;

    if (taskText === "") {
        return;
    }

    tasks.push({
        id: nextTaskId++,
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();
    taskInput.value = "";
});

/*
const task = {
    id: 1,
    text: "Study JavaScript",
    completed: false
};

const savedTasks = JSON.stringify(task);
console.log(savedTasks);

const restoredTasks = JSON.parse(savedTasks);
console.log(restoredTasks); 
*/

function saveTasks() {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("Could not save tasks:", error);
    }
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks === null) {
        return;
    }

    try {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
            tasks = parsedTasks;
        }
    } catch (error) {
        console.error("Could not load saved tasks:", error);
        tasks = [];
    }
}

loadTasks();
if (tasks.length > 0) {
    nextTaskId = Math.max(...tasks.map(task => task.id)) + 1;
}
renderTasks();
