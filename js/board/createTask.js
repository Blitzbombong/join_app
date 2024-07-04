/**
 * 
 * This function creates a new task with the given parameters, adds it to the tasks list, stores the updated tasks list in local storage, 
 * resets certain arrays, displays a visual confirmation, and eventually renders the board after a short delay. 
 * 
 * @param {string} status 
 */
async function setNewTask(status) {
    let id = ++highestTaskId;
    let title = document.getElementById('titel-input').value;
    let description = document.getElementById('read-description').value;
    let date = document.getElementById('calender-input').value;
    let priority = currentPrioriyToCreateTask;

    status == undefined ? status = 'to_do' : status = status;
    let contacts = [...selectedContacts];
    let subtasks = [...createdSubtaskList];
    let category = checkCategoryValidity(status);
    tasks.push({ id, title, description, date, priority, category, status, contacts, subtasks });
    await setItem('tasks', JSON.stringify(tasks));
    resetArraysForNewTasks();
    showAddedToBoard();
    setTimeout(() => {
        renderBoard();
    }, 2000);
}


/**
 * 
 * This function edits an existing task with the given parameters, updates the tasks list, 
 * stores the modified task in local storage, resets certain arrays, closes the task details, 
 * and eventually renders the updated board.
 * 
 * @param {number} id 
 * @param {string} title 
 * @param {string} description 
 * @param {number} date 
 * @param {string} priority 
 * @param {string} category 
 * @param {string} status 
 */
async function editTask(id, title, description, date, priority, category, status) {
    let index = tasks.findIndex(t => t.id === id);
    title = document.getElementById('titel-input').value;
    description = document.getElementById('read-description').value;
    date = document.getElementById('calender-input').value;
    priority = currentPrioriyToCreateTask;
    let contacts = checkAndAssignContacts(id);
    let subtasks = checkAndAssignSubtasks(id);
    tasks.splice(index, 1, { id, title, description, date, priority, category, status, contacts, subtasks });
    await setItem('tasks', JSON.stringify(tasks));
    resetArraysForNewTasks();
    closeTask();
    renderBoard();
}


/**
 * 
 * This function toggles the visibility of the category warning text based on the presence of a selected category. 
 * If the warning text is currently visible or the category input is empty, it toggles the visibility of the warning text.
 * 
 */
function toggleNoCategoryError(){
    let categoryWarningText = document.getElementById('category-warning-text');
    let categoryInput = document.getElementById('selectedCategory');
    if(!categoryWarningText.classList.contains('d-none') || categoryInput.value == ''){
        categoryWarningText.classList.toggle('d-none')
    }
}


/**
 * 
 * This function checks the validity of the selected category input, 
 * replaces spaces with underscores in the category value, and returns the sanitized category value if valid
 * 
 * @param {*} event 
 * @returns 
 */
function checkCategoryValidity(event) {
    let categoryInput = document.getElementById('selectedCategory');
    categoryInput.setCustomValidity('');
    categoryInput.disabled = false;
    if (!categoryInput.checkValidity()) {
        event.preventDefault();
        toggleNoCategoryError();
        categoryInput.disabled = true;
    } else {
        let category = document.getElementById('selectedCategory').value.replace(/\s/g, '_');
        return category;
    };
}


/**
 * 
 * This function checks if there are selected contacts; if there are, 
 * it returns a copy of the selected contacts. If no contacts are selected, 
 * it returns the existing contacts for the specified task ID.
 * 
 * @param {number} id 
 * @returns 
 */
function checkAndAssignContacts(id) {
    let index = tasks.findIndex(t => t.id === id);
    if (selectedContacts.length > 0) {
        let contacts = [...selectedContacts];
        return contacts;
    } else {
        let contacts = tasks[index]['contacts'];
        return contacts;
    }
}


/**
 * 
 * This function checks if there are created subtasks; if there are, it returns a copy of the created subtasks. 
 * If no subtasks are created, it returns the existing subtasks for the specified task ID.
 * 
 * @param {number} id 
 * @returns 
 */
function checkAndAssignSubtasks(id) {
    let index = tasks.findIndex(t => t.id === id);
    if (createdSubtaskList.length > 0) {
        let subtasks = [...createdSubtaskList];
        return subtasks;
    } else {
        let subtasks = tasks[index]['subtasks'];
        return subtasks;
    }
}

