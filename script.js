const inputTask = document.querySelector('#task-input');
const inputPriority = document.querySelector('#priority');
const form = document.querySelector('#task-form');
const errorMessage = document.querySelector('#error-message');
const taskList = document.querySelector('#task-list-body');
const confirmationModal = document.querySelector('#confirmationModal');
const confirmDeleteBtn = document.querySelector('#confirm-delete');
const modal = new bootstrap.Modal(confirmationModal);

let tasks = [];
let taskIdToDelete = null;

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('d-none');
  setTimeout(() => errorMessage.classList.add('d-none'), 4000);
}

function getPriorityClass(priority) {
  return (
    {
      Baixa: 'badge border-success-subtle bg-success-subtle text-success-emphasis',
      Média: 'badge border-warning-subtle bg-warning-subtle text-warning-emphasis',
      Alta: 'badge border-danger-subtle bg-danger-subtle text-danger-emphasis',
    }[priority] || ''
  );
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    tasks = JSON.parse(stored);
  }
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';

  for(let task of tasks) {
    const priorityClass = getPriorityClass(task.priority);
    const tr = document.createElement('tr');

    if (task.completed) tr.classList.add('table-secondary');

    tr.innerHTML = `
      <td class="${task.completed ? 'text-muted text-decoration-line-through' : ''}">
        ${task.task}
      </td>

      <td>
        <span class="py-2 px-3 rounded-3 border ${priorityClass}">${task.priority}</span>
      </td>

      <td>
        <button 
          class="btn rounded-3 ${task.completed ? 'btn-secondary' : 'btn-success'} btn-complete" 
          title="${task.completed ? 'Desmarcar' : 'Concluir'}" data-id="${task.id}">
          <i class="bi bi-check-lg"></i>
        </button>

        <button class="btn bg-danger-subtle text-danger rounded-3 btn-delete" title="Excluir" data-id="${task.id}">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;

    taskList.appendChild(tr);
  };
  updateEmptyMessage();
}

function addTask(event) {
  event.preventDefault();

  const taskValue = inputTask.value.trim();
  const priorityValue = inputPriority.value;

  if (!taskValue || !priorityValue) {
    showError('Por favor, preencha a tarefa e a prioridade.');
    return;
  }

  tasks.push({
    id: Date.now(),
    task: taskValue,
    priority: priorityValue,
    completed: false
  });

  saveTasks();
  renderTasks();

  inputTask.value = '';
  inputPriority.value = '';
}

function toggleTask(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function updateEmptyMessage() {
  const taskTable = document.querySelector('#task-list');
  const noTasksMessage = document.querySelector('#no-tasks-message');

  const hasTasks = taskList.querySelectorAll('tr').length > 0;

  if (hasTasks) {
    taskTable.classList.remove('d-none');
    noTasksMessage.classList.add('d-none');
  } else {
    taskTable.classList.add('d-none');
    noTasksMessage.classList.remove('d-none');
  }
}

function init() {
  form.addEventListener('submit', addTask);

  taskList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const id = Number(btn.getAttribute('data-id'));

    if (btn.classList.contains('btn-complete')) {
      toggleTask(id);
    }

    if (btn.classList.contains('btn-delete')) {
      taskIdToDelete = id;
      modal.show();
    }  
  });

  confirmDeleteBtn.addEventListener('click', () => {
    if (taskIdToDelete !== null) {
      deleteTask(taskIdToDelete);
      taskIdToDelete = null;
      modal.hide();
    }
  });

  loadTasks();
}

init();