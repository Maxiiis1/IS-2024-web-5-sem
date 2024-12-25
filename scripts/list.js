document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const saveButton = document.getElementById('saveTasks');
    const loadButton = document.getElementById('loadTasks');

    // Функция для добавления задачи в список
    function addTask(taskText, completed = false) {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Добавляем кнопку удаления
        const deleteButton = document.createElement('button');
        const completeButton = document.createElement('button');
        deleteButton.textContent = 'Удалить задачу';
        completeButton.textContent = 'Зачеркнуть задачу';
        deleteButton.addEventListener('click', function () {
            li.remove();
        });

        // Отмечаем задачу как выполненную
        completeButton.addEventListener('click', function () {
            li.classList.toggle('completed');
        });

        if (completed) {
            li.classList.add('completed');
        }

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    saveButton.addEventListener('click', function () {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.firstChild.textContent.trim(),
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert('Задачи сохранены!');
    });

    loadButton.addEventListener('click', function () {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            taskList.innerHTML = ''; // Очищаем список перед загрузкой
            tasks.forEach(task => addTask(task.text, task.completed));
            alert('Задачи загружены!');
        } else {
            alert('Сохраненных задач нет.');
        }
    });
});
