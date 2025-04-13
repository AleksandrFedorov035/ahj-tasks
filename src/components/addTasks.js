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
        this.input.addEventListener('keypress', (e) => this.addTask(e))
    }

    renderTask() {
        return `
            <div class="task">
                <span>${this.input.value}</span>
                <input type="checkbox">
            </div>
        `
    }

    addTask(e) {
        if (e.key === "Enter") {
            const taskName = this.input.value.trim();
            if (taskName) {
                this.taskList.insertAdjacentHTML('beforeend', this.renderTask(taskName));
                this.input.value = '';
                this.addCheckboxListeners();
            }
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
    }
}