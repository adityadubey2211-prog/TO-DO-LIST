const todoInput = document.querySelector('.form-control');
const button = document.querySelector('#addTaskBtn');
const hero = document.querySelector('.hero');
const sortSelect = document.querySelector('#sortSelect');
const searchTask = document.createElement('input');
let taskid = 0;

function saveTask(){
    const allTasks = document.querySelectorAll(".task-card"); 
    const tasks = [];
    allTasks.forEach((card) => {
        tasks.push({
            id: card.dataset.id,
            text: card.querySelector(".task-with-checkbox p").innerText,
            priority: card.dataset.priority,
            completed: card.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTask(task);
    });
    if(tasks.length > 0){
        searchTask.style.display = 'block';
    }
    if (tasks.length > 0) {
       taskid = Math.max(...tasks.map(task => Number(task.id))) + 1;
    }
    updateProgress();
    console.log(tasks);
}

function createTask(task){
    const newTask = document.createElement('div');
        newTask.classList.add('task-card');
        newTask.dataset.id = task.id;
        const priorityValue = task.priority;
        newTask.dataset.priority = task.priority;   
        newTask.dataset.priority = priorityValue;
        if (priorityValue === 'high') {
        
            const priorityText = document.createElement('p');
            priorityText.innerText = "🔴 HIGH PRIORITY";
            newTask.appendChild(priorityText);
        
        }
        else if (priorityValue === 'medium') {
        
            const priorityText = document.createElement('p');
            priorityText.innerText = "🟡 MEDIUM PRIORITY";
            newTask.appendChild(priorityText);
        
        }
        else if (priorityValue === 'low') {
        
            const priorityText = document.createElement('p');
            priorityText.innerText = "🟢 LOW PRIORITY";
            newTask.appendChild(priorityText);
        
        }
        
        const taskWcheck = document.createElement('div');
        taskWcheck.classList.add('task-with-checkbox');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        const taskP = document.createElement('p');
        taskP.innerText = task.text;
        if(checkbox.checked){
            taskP.style.textDecoration = "line-through";
            taskP.style.fontWeight = "100";
        }
        taskWcheck.appendChild(checkbox);
        
        taskWcheck.appendChild(taskP);
        newTask.appendChild(taskWcheck);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        newTask.appendChild(editBtn);
        const edit = editBtn.addEventListener('click', (event) => {
            if(event.target.tagName === 'BUTTON' && event.target.innerText === 'Edit'){
                const newText = prompt('Edit your task:', taskP.innerText);
                if(newText !== null){
                    taskP.innerText = newText;
                }
            }
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        newTask.appendChild(deleteBtn);
        
        hero.appendChild(newTask);
        updateProgress();
        sortTasks();
        saveTask();
        searchTask.style.display = "block";
        todoInput.value = '';
        const work = deleteBtn.addEventListener('click', (event) => {
            if(event.target.tagName === 'BUTTON' && event.target.innerText === 'Delete'){
                const taskToDelete = newTask;
                taskToDelete.remove();
                updateProgress();
                saveTask();
            }
            sortTasks();
            const allTasks = document.querySelectorAll('.task-card');
            console.log(allTasks.length);
             if(allTasks.length === 0){
                 searchTask.style.display = "none";
             }
        });
        const complete = checkbox.addEventListener('change', (event) => {
            if(event.target.checked){
                taskP.style.textDecoration = 'line-through';
                taskP.style.fontWeight = '100';
                updateProgress();
                saveTask()
            }
            else{
                taskP.style.textDecoration = 'none';
                updateProgress();
                saveTask();
            }
        });
}
searchTask.style.display = 'none';
searchTask.classList.add('minisearch');
searchTask.type = 'text';
searchTask.placeholder = 'Search for a task';
hero.appendChild(searchTask);
const INPUT = searchTask.addEventListener('input', () => {
    const allTasks = document.querySelectorAll('.task-card');
    allTasks.forEach((task) => {
        const taskText = task.querySelector('.task-with-checkbox').innerText.toLowerCase();
        if(taskText.includes(searchTask.value.toLowerCase())){
            task.style.display = 'flex';
            saveTask()
        }
        else{
            task.style.display = 'none';
        }
    });
});
const priorityMap = {
    high : 3,
    medium : 2,
    low : 1,
}

const position = new Map();
function sortTasks() {
    const cardsArray = Array.from(document.querySelectorAll(".task-card"));
    cardsArray.forEach(card => {
        position.set(card, card.getBoundingClientRect());
    });

    if (sortSelect.value === "default") {
        cardsArray.sort((a, b) => {
            return Number(a.dataset.id) - Number(b.dataset.id);
        });
    }

    if (sortSelect.value === "priority") {
        cardsArray.sort((a, b) => {
            return priorityMap[b.dataset.priority] - priorityMap[a.dataset.priority];
        });
    }
    cardsArray.forEach(card => {
        hero.appendChild(card);
    });

    const newPosition = new Map();
    cardsArray.forEach(card => {
        newPosition.set(card, card.getBoundingClientRect());
    });

    cardsArray.forEach(card => {
       const first = position.get(card);
       const last = newPosition.get(card);
   
       const deltaX = first.left - last.left;
       const deltaY = first.top - last.top;
       
       card.style.transition = 'none';
       card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

         requestAnimationFrame(() => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'translate(0, 0)';
         });
    });
}
function updateProgress() {
    let totalTasks = document.querySelectorAll('.task-card').length;
    let completedTasks = document.querySelectorAll('.task-card input[type="checkbox"]:checked').length;
    let progressBar = document.querySelector('.progress-bar');
    let progressText = document.querySelector('#progressText');
    let progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressText.innerText = `${completedTasks} / ${totalTasks} Completed`;
}

sortSelect.addEventListener("change", sortTasks);
button.addEventListener('click', () => {
    const todoText = todoInput.value;
    if(todoText.trim() == ''){
        alert('Please enter a task');
        console.log('Please enter a task');
    }

    else{
        const priorityValue = document.querySelector("#prioritySelect").value;
        const task = {
          id: taskid++,
          text: todoText,
          priority: priorityValue,
          completed: false
        };

        createTask(task);
        
        updateProgress();
        sortTasks();
        saveTask();

        todoInput.value = "";
        searchTask.style.display = "block";
    }
});

const Allbtn = document.querySelector('#All');
Allbtn.addEventListener('click', (event) => {
   const allTask = document.querySelectorAll('.task-card');
   allTask.forEach((task) => {
    task.style.display = 'flex';
   });
});
const completebtn = document.querySelector('#Completed');
completebtn.addEventListener('click', (event) => {
    const allTask = document.querySelectorAll('.task-card');
    allTask.forEach((task) => {
        task.style.display = 'none';
    });
    const activeTasks = document.querySelectorAll('.task-card input[type="checkbox"]:checked');
    activeTasks.forEach((checkbox) => {
        checkbox.parentElement.parentElement.style.display = 'flex';
    });
});
const Activebtn = document.querySelector('#Active');
Activebtn.addEventListener('click', (event) => {
    const allTask = document.querySelectorAll('.task-card');
    allTask.forEach((task) => {
        task.style.display = 'none';
    });
    const activeTasks = document.querySelectorAll('.task-card input[type="checkbox"]:not(:checked)');
    activeTasks.forEach((checkbox) => {
        checkbox.parentElement.parentElement.style.display = 'flex';
    });
})
const themeBtn = document.querySelector('#themeBtn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

loadTask();