export class AddTasks {
    constructor(input, taskList, pinnedTasks) {
        if (typeof input == 'string' && typeof taskList == 'string' && typeof pinnedTasks == 'string') {
            this.input = document.querySelector(input)
            this.taskList = document.querySelector(taskList)
            this.pinnedTasks = document.querySelector(pinnedTasks)
        } else {
            this.input = input
            this.taskList = taskList
            this.pinnedTasks = pinnedTasks;
        }

        this.addTask = this.addTask.bind(this);
        this.filterTasks = this.filterTasks.bind(this)

        this.input.addEventListener('keypress', (e) => this.addTask(e))
        this.input.addEventListener('keypress', this.filterTasks)
    }

    renderTask(taskName) {
        return `
            <div class="task">
                <span>${taskName}</span>
                <input type="checkbox">
            </div>
        `
    }

    addTask(e) {
        const error = document.querySelector('.error')
        const taskName = this.input.value.trim();
        if (e.key === "Enter") {
            if (taskName) {
                this.taskList.insertAdjacentHTML('beforeend', this.renderTask(taskName));
                this.input.value = '';
                this.addCheckboxListeners();
                return;
            }
            error.classList.remove('hidden')
        }
        if (taskName) {
            error.classList.add('hidden')
        }
    }

    addCheckboxListeners() {
        const checkboxes = this.taskList.querySelectorAll('.task input');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleCheckboxChange(e));
        });
    }

    handleCheckboxChange(e) {
        const task = e.target.closest('.task');
        if (e.target.checked) {
            this.pinnedTasks.appendChild(task);
        } else {
            this.taskList.appendChild(task);
        }
        this.toggleHidden()
    }

    toggleHidden() {
        const pinnedText = document.querySelector('.tasks-pinned')
        const pinnedTasks = this.pinnedTasks.querySelectorAll('.task')
        if (pinnedTasks.length > 0) {
            pinnedText.classList.add('hidden')
        } else {
            pinnedText.classList.remove('hidden')
        }
    }

    filterTasks() {
        const filterValue = this.input.value.trim().toLowerCase();
        const allTasks = document.querySelectorAll('.tasks-list .task');
        const filteredTasks = Array.from(allTasks).filter(task => {
            const taskName = task.querySelector('span').textContent.toLowerCase();
            return taskName.startsWith(filterValue);
        });
    
        this.taskList.innerHTML = '';
    
        if (filterValue === '') {
            allTasks.forEach(task => this.taskList.appendChild(task));
        } else {
            filteredTasks.forEach(task => this.taskList.appendChild(task));

            if (filteredTasks.length === 0) {
                this.taskList.innerHTML = '<p>No tasks found</p>';
            }
        }
    }
}