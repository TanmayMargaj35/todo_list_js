const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtn.addEventListener("click",addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filters button.active").classList.remove("active");
        renderTasks(btn.dataset.filter);
    });
});

function addTask() {
    const taskText = taskInput.ariaValueMax.trim();
    if (taskText === "") {
        alert("Enter Task Before Submitting");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks(getActiveFilter());
    taskInput.value = "";
}

function toggleTask(id){
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed : !task.completed} : task
    );
    saveTasks();
    renderTasks(getActiveFilter());
}

function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    let filteredTasks = tasks;

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach (task => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("done");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.addEventListener("click", () => toggleTask(task.id));

        li.appendChild(span);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function getActiveFilter() {
    return document.querySelector(".filters button.active").dataset.filter;
}

// Initial render 
renderTasks();