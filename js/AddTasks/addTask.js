let selectedContacts = [];
let createdSubtaskList = [];
let iconRotated = false;
let categorys = ['Frontend', 'Backend', 'Web Security'];
let currentPrioriyToCreateTask = 'Medium';


/**
 * 
 * Renders the "Add Task" interface by invoking various functions
 * 
 */
function renderAddTask() {
    addContentCSS()                     // Add styles to the content
    addTaskBgrColor();                  // Set background color for task
    removeBgrColorWithoutAddTask();     // Remove background color from elements without task
    addJoinLogoClickable();             // Make the Join logo clickable
    generateAddTaskHTML();              // Generate HTML for the "Add Task" interface
    renderAssignedToCurrentUser();      // Render tasks assigned to the current user
    renderAssignedToContactList();      // Render tasks assigned to contacts in the list
    showCategory();                     // Display the category
    hideLegalContent();                 // Hide legal content
}


/**
 * 
 * Resets arrays used for tracking selected contacts and created subtasks when adding new tasks
 * 
 */
function resetArraysForNewTasks() {
    selectedContacts = [];          // Clear the array of selected contacts
    createdSubtaskList = [];        // Clear the array of created subtasks
}


/**
 * 
 * Retrieves the formatted current date for calendar operations
 * 
 * @returns 
 */
function getTodaysDateForCalender() {
    let currentDate = new Date();
    const day = currentDate.getDate();
    currentDate.setHours(23, 59, 59, 999);
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
}


/**
 * 
 * The changeButtonStyles function updates the style of a priority button on an HTML page. 
 * It first resets all buttons, then removes the selection from all buttons and adds it to the clicked button, 
 * including a special style class for the icon. The selected priority value is updated.
 * 
 * @param {string} priority 
 */
function changeButtonStyles(priority) {
    let button = document.getElementById(`button${priority}`);
    let icon = document.getElementById(`icon${priority}`);
    currentPrioriyToCreateTask = priority;

    if (button.classList.contains('selected')) {
        resetSelectedPrioButton();
    } else {
        resetSelectedPrioButton();
        button.classList.add('selected');
        icon.classList.add('selected_icon');
    }
}


/**
 * 
 * Resets the selected priority button and its associated icon
 * 
 */
function resetSelectedPrioButton() {
    let allPrioSelectedButton = document.querySelectorAll('.selected');
        allPrioSelectedButton.forEach((allPrioSelectedButton) => {
        allPrioSelectedButton.classList.remove('selected');
    });
    let allPrioSelectedIcon = document.querySelectorAll('.selected_icon');
        allPrioSelectedIcon.forEach((allPrioSelectedIcon) => {
        allPrioSelectedIcon.classList.remove('selected_icon');
    });
}


/**
 * 
 * Clears the value of the specified input field
 * 
 * @param {string} inputsField 
 */
function clearInputField(inputsField) {
    const inputField = document.getElementById(inputsField);
    if (inputField) {
        inputField.value = "";
    }
}


/**
 * 
 * Adds background color styling to the "Add Task" elements
 * 
 */
function addTaskBgrColor() {
    document.getElementById('add_task').classList.add('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.add('currentTemplate', 'p-none');
}


/**
 * 
 * Removes background color styling from elements other than "Add Task"
 * 
 */
function removeBgrColorWithoutAddTask() {
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.remove('currentTemplate', 'p-none');
}


/**
 * 
 *  Makes the "Join" logo clickable by removing the 'p-none' class
 * 
 */
function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
    document.getElementById('join_logo_mobile').classList.remove('p-none');
}


// Category........


/**
 * 
 * Displays categories by populating the dropdownOptions element with category items
 * 
 */
function showCategory() {
    let categoryList = document.getElementById('dropdownOptions');
    categoryList.innerHTML = '';

    for (let c = 0; c < categorys.length; c++) {
        const category = categorys[c];

        categoryList.innerHTML += renderCategory(category, c)
    }
}


/**
 * 
 * Accepts a selected category, updates the input field, and toggles dropdown visibility
 * 
 * @param {string} category 
 * @param {*} event 
 */
function acceptCategory(category, event) {
    let selectInput = document.getElementById('selectedCategory');
    selectInput.value = category;

    toggleDropdown(event);
    toggleNoCategoryError();
}


/**
 * 
 * Toggles the visibility of the dropdown menu and rotates the select icon accordingly
 * 
 * @param {*} event 
 */
function toggleDropdown(event) {
    const dropdownOptions = document.getElementById('dropdownOptions');
    const icon = document.getElementById('selectIcon');

    dropdownOptions.classList.toggle('d-none');
    stop(event);

    if (!dropdownOptions.classList.contains('d-none')) {
        icon.classList.add('rotate');
    } else {
        icon.classList.remove('rotate');
    }
}


/**
 * 
 * Clears input fields, resets arrays, and updates UI when starting a new task
 * 
 * @param {*} event 
 */
function clearBegonnenNewTask(event) {
    resetArraysForNewTasks();
    document.getElementById('titel-input').value = '';
    document.getElementById('calender-input').value = '';
    document.getElementById('read-description').value = '';
    document.getElementById('assignTo-input').value = '';
    document.getElementById('selected-contact-ctn').innerHTML = '';
    document.getElementById('selectedCategory').value = '';
    document.getElementById('subtaskInput').value = '';
    renderAssignedToContactList();
    renderSubtask();
    changeButtonStyles('Medium');
    closeOpenedMenu(event);
}

// AddTask in Board site


/**
 * 
 * The renderAddTaskPopUp function displays or hides a popup window for adding tasks on an HTML page based on the window width. 
 * For larger screens, it toggles the visibility of the popup window, 
 * fills it with the necessary content, including user and contact information, 
 * and shows categories. For smaller screens, it renders the task addition without using a popup.
 * 
 * @param {string} status 
 */
function renderAddTaskPopUp(status) {
    let popupCtn = document.getElementById('popup-ctn');

    if (window.matchMedia("(min-width: 1000px)").matches) {
        popupCtn.classList.toggle('d-none');
        popupCtn.innerHTML = returnAddTaskPopUp(status);
        renderAssignedToCurrentUser();
        renderAssignedToContactList();
        showCategory();
        showPopupAnimation();
    } else {
        renderAddTask();
    }
}


/**
 * 
 * Initiates a popup opening animation by adding the 'opening' class
 * 
 */
function showPopupAnimation(){
    let popup = document.getElementById('popup');
    popup.classList.add('opening');
}


/**
 * 
 *  Closes the "Add Task" popup by initiating a closing animation
 * 
 */
function closeAddTaskPopUp() {
    let popupCtn = document.getElementById('popup-ctn');
    
    if(!popupCtn.classList.contains('d-none')){
        let popup = document.getElementById('popup');
        popup.classList.remove('opening');
        popup.classList.add('closing');
    
        setTimeout(() => {
            popupCtn.classList.add('d-none');
            popupCtn.innerHTML = '';
        }, 350);
    }
}


/**
 * 
 * Closes any opened menus by stopping event propagation and closing specific menus
 * 
 * @param {*} event 
 */
function closeOpenedMenu(event) {
    stop(event);
    closeAssignContactMenu();
    closeCategoryMenu();
}


/**
 * 
 * Closes the assign contact menu by hiding its container and rotating the associated icon
 * 
 */
function closeAssignContactMenu(){
    let contactCtn = document.getElementById('contactContainer');
    if (contactCtn && !contactCtn.classList.contains('d-none')) {
        contactCtn.classList.add('d-none');
        rotateIcon();
    };
}


/**
 * 
 * Closes the category menu by hiding its container and resetting the associated arrow icon
 * 
 */
function closeCategoryMenu(){
    let CategorymenuArrow = document.getElementById('selectIcon');
    let categoryCtn = document.getElementById('dropdownOptions');
    if (categoryCtn && !categoryCtn.classList.contains('d-none')) {
        categoryCtn.classList.add('d-none');
    };
    if (CategorymenuArrow && CategorymenuArrow.classList.contains('rotate')) {
        CategorymenuArrow.classList.toggle('rotate');
    };
}


/**
 * 
 * Toggles the visibility of a popup container by adding or removing the 'd-none' class
 * 
 */
function togglePopup() {
    let popupContainer = document.getElementById('popup-ctn');
    popupContainer.classList.toggle('d-none');
}


/**
 * 
 * Shows a popup indicating that a task has been added to the board
 * 
 */
function showTaskAddedToBoardPopup() {
    let popupContainer = document.getElementById('popup-ctn');
    
    if (popupContainer.classList.contains('d-none')) {
        togglePopup();
        popupContainer.innerHTML = taskAddedToBoard();
        setTimeout(() => {
            togglePopup();
        }, 2000);
    } else {
        appendTaskToPopup();
        hideTaskAddedToBoardPopup();
    }
}


/**
 * 
 * Appends task information to the "Task Added to Board" popup
 * 
 */
function appendTaskToPopup() {
    let addTasksPopup = document.getElementById('added-task-to-board-popup-div');
    addTasksPopup.innerHTML += taskAddedToBoard();
}


/**
 * 
 * Hides the "Task Added to Board" popup by removing classes and triggering popup closure
 * 
 */
function hideTaskAddedToBoardPopup() {
    let addTasksPopup = document.getElementById('added-task-to-board-popup-div');
    let taskAddedToBoardPopup = document.getElementById('task-added-to-board');

    taskAddedToBoardPopup.classList.remove('showaddedtoBoard');
    addTasksPopup.classList.remove('d-none');
    setTimeout(() => {
        togglePopup();
    }, 2000);
}


/**
 * 
 * Initiates the display of the "Task Added to Board" popup
 * 
 */
function showAddedToBoard() {
    showTaskAddedToBoardPopup();
}