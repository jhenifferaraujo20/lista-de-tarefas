const inputTask = document.querySelector("#task-input");
const inputPriority = document.querySelector("#priority");
const form = document.querySelector("#task-form");
const errorMessage = document.querySelector("#error-message");
const taskList = document.querySelector("#task-list-body");

let tasks = [];

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("d-none");
  setTimeout(() => errorMessage.classList.add("d-none"), 4000);
}

function getPriorityClass(priority) {
  return (
    {
      Baixa: 'badge border-success-subtle bg-success-subtle text-success-emphasis',
      Média: 'badge border-warning-subtle bg-warning-subtle text-warning-emphasis',
      Alta: 'badge border-danger-subtle bg-danger-subtle text-danger-emphasis',
    }[priority] || ""
  );
}

function renderTasks() {
  taskList.innerHTML = "";

  for(let task of tasks) {
    const priorityClass = getPriorityClass(task.priority);
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        ${task.task}
      </td>

      <td>
        <span class="py-2 px-3 rounded-3 border ${priorityClass}">${task.priority}</span>
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

  if (!taskValue || !priorityValue) {
    showError("Por favor, preencha a tarefa e a prioridade.");
    return;
  }

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