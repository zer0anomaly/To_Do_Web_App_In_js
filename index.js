class Task {
  constructor(text) {
    this.text = text;
    this.completed = false;
    this.id = Date.now();
  }
}

class TaskManager {
  constructor(taskListElement, taskCountElement, completedCountElement) {
    this.tasks = [];
    this.taskListElement = taskListElement;
    this.taskCountElement = taskCountElement;
    this.completedCountElement = completedCountElement;
    this.filter = 'all'; // all, active, completed
  }

  addTask(taskText) {
    if (!taskText.trim()) return;
    const newTask = new Task(taskText);
    this.tasks.push(newTask);
    this.renderTasks();
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.renderTasks();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.renderTasks();
  }

  clearCompleted() {
    this.tasks = this.tasks.filter(t => !t.completed);
    this.renderTasks();
  }

  setFilter(filter) {
    this.filter = filter;
    this.renderTasks();
  }

  getFilteredTasks() {
    if (this.filter === 'active') {
      return this.tasks.filter(t => !t.completed);
    } else if (this.filter === 'completed') {
      return this.tasks.filter(t => t.completed);
    }
    return this.tasks;
  }

  renderTasks() {
    this.taskListElement.innerHTML = '';

    const filteredTasks = this.getFilteredTasks();

    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button class="toggle-btn">✅</button>
          <button class="delete-btn">❌</button>
        </div>
      `;

      li.querySelector('.toggle-btn').addEventListener('click', () => this.toggleTask(task.id));
      li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTask(task.id));

      this.taskListElement.appendChild(li);
    });

    this.updateCounts();
  }

  updateCounts() {
    const activeCount = this.tasks.filter(t => !t.completed).length;
    const completedCount = this.tasks.filter(t => t.completed).length;
    this.taskCountElement.textContent = `${activeCount} Task${activeCount !== 1 ? 's' : ''} Left`;
    this.completedCountElement.textContent = `${completedCount} Task${completedCount !== 1 ? 's' : ''} Completed`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const newTaskInput = document.getElementById('new-task');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  const taskCount = document.getElementById('task-count');
  const completedCount = document.getElementById('completedtask-count');
  const activeBtn = document.getElementById('activebutton');
  const finishedBtn = document.getElementById('finishedbutton');
  const clearBtn = document.getElementById('clear-completed');

  const taskManager = new TaskManager(taskList, taskCount, completedCount);

  addTaskButton.addEventListener('click', () => {
    taskManager.addTask(newTaskInput.value);
    newTaskInput.value = '';
  });

  newTaskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      taskManager.addTask(newTaskInput.value);
      newTaskInput.value = '';
    }
  });

  activeBtn.addEventListener('click', () => {
    taskManager.setFilter('active');
    activeBtn.classList.add('active');
    finishedBtn.classList.remove('active');
  });

  finishedBtn.addEventListener('click', () => {
    taskManager.setFilter('completed');
    finishedBtn.classList.add('active');
    activeBtn.classList.remove('active');
  });

  clearBtn.addEventListener('click', () => taskManager.clearCompleted());
});
