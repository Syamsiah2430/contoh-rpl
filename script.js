document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const name = document.getElementById('taskName').value;
    const subject = document.getElementById('taskSubject').value;
    const deadline = document.getElementById('taskDeadline').value;

    if (!name || !subject || !deadline) {
        alert('Mohon isi semua bidang!');
        return;
    }

    const task = {
        id: Date.now(),
        name,
        subject,
        deadline,
        completed: false
    };

    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    
    document.getElementById('taskName').value = '';
    document.getElementById('taskSubject').value = '';
    document.getElementById('taskDeadline').value = '';
    
    renderTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks();
    
    // Sort by deadline
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        div.innerHTML = `
            <div class="task-details">
                <h3>${task.name} ${task.completed ? '(Selesai)' : ''}</h3>
                <p>Mata Kuliah: ${task.subject}</p>
                <p>Deadline: ${task.deadline}</p>
            </div>
            <div class="actions">
                <button class="btn-complete" onclick="toggleComplete(${task.id})" title="Tandai Selesai">✔</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})" title="Hapus">✖</button>
            </div>
        `;
        taskList.appendChild(div);
    });
}

function toggleComplete(id) {
    let tasks = getTasks();
    tasks = tasks.map(t => {
        if(t.id === id) t.completed = !t.completed;
        return t;
    });
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(id) {
    if(confirm('Hapus tugas ini?')) {
        let tasks = getTasks();
        tasks = tasks.filter(t => t.id !== id);
        saveTasks(tasks);
        renderTasks();
    }
}
