const todoInput = document.querySelector('.form-control');
const button = document.querySelector('#addTaskBtn');
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


        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        newTask.appendChild(deleteBtn);
        const hero = document.querySelector('.hero');
        hero.appendChild(newTask);
        todoInput.value = '';
        const work = deleteBtn.addEventListener('click', (event) => {
            if(event.target.tagName === 'BUTTON' && event.target.innerText === 'Delete'){
                const taskToDelete = newTask;
                taskToDelete.remove();
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
