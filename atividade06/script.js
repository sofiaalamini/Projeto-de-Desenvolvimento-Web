const form = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");
const formMessage = document.querySelector("#form-message");
const searchInput = document.querySelector("#search-input");

const updateTaskCount = () => {
    const total = taskList.querySelectorAll(".task-item").length;
    taskCount.textContent = `${total} ${total === 1 ? "tarefa" : "tarefas"}`;
    emptyState.hidden = total !== 0;
};

const createTask = (text) => {
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("span");

    item.className = "task-item";
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `Remover tarefa: ${text}`);

    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", `Marcar como concluída: ${text}`);
    label.className = "task-text";
    label.textContent = text;

    item.append(checkbox, label);
    taskList.append(item);
};

const filterTasks = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    taskList.querySelectorAll(".task-item").forEach((item) => {
        const matches = item.querySelector(".task-text").textContent.toLowerCase().includes(searchTerm);
        item.hidden = !matches;
    });
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = taskInput.value.trim();

    if (!text) {
        formMessage.hidden = false;
        formMessage.textContent = "Digite uma tarefa antes de adicionar.";
        taskInput.focus();
        return;
    }

    formMessage.hidden = true;
    createTask(text);
    taskInput.value = "";
    taskInput.focus();
    updateTaskCount();
});

searchInput.addEventListener("input", filterTasks);

taskList.addEventListener("click", (event) => {
    if (event.target.matches("input[type='checkbox']")) {
        event.target.closest(".task-item").classList.toggle("is-complete", event.target.checked);
        return;
    }

    const item = event.target.closest(".task-item");
    if (item) {
        item.remove();
        updateTaskCount();
    }
});

taskList.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches(".task-item")) {
        event.preventDefault();
        event.target.remove();
        updateTaskCount();
    }
});

updateTaskCount();
