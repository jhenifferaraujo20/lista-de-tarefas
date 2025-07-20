const inputTask = document.querySelector("#task-input");
const inputPriority = document.querySelector("#priority");
const form = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list-body");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  for(let task of tasks) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        ${task.task}
      </td>

      <td>
        <span>${task.priority}</span>
      </td>

      <td>
        <button class="btn btn-success rounded-3" title="Completar">
          <i class="bi bi-check-lg"></i>
        </button>

        <button class="btn bg-danger-subtle text-danger rounded-3" title="Excluir">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;

    taskList.appendChild(tr);
  };
}

function addTask(event) {
  event.preventDefault();

  const taskValue = inputTask.value.trim();
  const priorityValue = inputPriority.value;

  tasks.push({
    id: Date.now(),
    task: taskValue,
    priority: priorityValue,
    completed: false
  });

  renderTasks();

  inputTask.value = "";
  inputPriority.value = "";
}

form.addEventListener('submit', addTask);