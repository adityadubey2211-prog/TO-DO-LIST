const todoInput = document.querySelector('.form-control');
const button = document.querySelector('#addTaskBtn');
const hero = document.querySelector('.hero');

const searchTask = document.createElement('input');
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
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
});

button.addEventListener('click', () => {
    const todoText = todoInput.value;
    if(todoText.trim() == ''){
        alert('Please enter a task');
        console.log('Please enter a task');
    }
    
    else{
        const newTask = document.createElement('div');
        newTask.classList.add('task-card');
    
        const prioritySelect = document.querySelector('#prioritySelect');
        const priorityValue = prioritySelect.value;
        if(priorityValue === 'high'){
    
            const priorityText = document.createElement('p');
            priorityText.innerText = "🔴 HIGH PRIORITY";
            newTask.appendChild(priorityText);
        }
        else if(priorityValue === 'medium'){
            const priorityText = document.createElement('p');
            priorityText.innerText = "🟡 MEDIUM PRIORITY";
            newTask.appendChild(priorityText);
        }
        else if(priorityValue === 'low'){
            const priorityText = document.createElement('p');
            priorityText.innerText = "🟢 LOW PRIORITY";
            newTask.appendChild(priorityText);
        }
        if (priorityValue === '') {
            alert('Please select a priority');
            return;
        }


        const taskWcheck = document.createElement('div');
        taskWcheck.classList.add('task-with-checkbox');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        taskWcheck.appendChild(checkbox);
        const taskP = document.createElement('p');
        taskP.innerText = todoText;
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
        searchTask.style.display = "block";
        todoInput.value = '';
        const work = deleteBtn.addEventListener('click', (event) => {
            if(event.target.tagName === 'BUTTON' && event.target.innerText === 'Delete'){
                const taskToDelete = newTask;
                taskToDelete.remove();
            }
            const allTasks = document.querySelectorAll('.task-card');
             const allTasksArray = Array.from(allTasks);
             console.log(allTasksArray.length);
             if(allTasks.length === 0){
                 searchTask.style.display = "none";
             }
        });
        const complete = checkbox.addEventListener('change', (event) => {
            if(event.target.checked){
                taskP.style.textDecoration = 'line-through';
                taskP.style.fontWeight = '100';
            }
            else{
                taskP.style.textDecoration = 'none';
            }
        });
    }
});