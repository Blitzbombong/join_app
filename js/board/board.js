let status;
let highestTaskId = 0;
let tasks = [];
let currentTaskStatus = 'small'
let resizeTimer;
let lastAnimationTimestamp = 0;
let mininamLoadingElementJoinTime = 1000;
let textSlideAnimationTimer;
let currentDraggedTaskId;
let isDragging = false;
let scrollIntervalInDragAndDrop = null;
let longPressTimer;
let isScrolling = false;
let currentTouchedTaskLineId = null;


/**
 * 
 * Renders the board by generating HTML, updating content, and performing various UI actions
 * 
 */
function renderBoard() {
    generateBoardHTML();                // Generate HTML structure for the board
    changeBoardContent();               // Update board content
    loadingProcess();                   // Perform loading process (assumed to be defined elsewhere)
    boardBgrColor();                    // Apply board background color                
    removeBgrColorWithoutBoard();       // Remove background color from elements without the board
    addJoinLogoClickable();             // Make the join logo clickable
    resetArraysForNewTasks();           // Reset arrays for new tasks
    hideLegalContent();                 // Hide legal content
}


/**
 * 
 * Initiates the loading process for the board, including animations and element visibility
 * 
 * @returns 
 */
function loadingProcess() {
    if (!document.querySelector('#content').classList.contains('contentBoard')) {
        return;
    }
    restartLoadingElementJoinAnimation();
    hideWidthHTML();
    showLoadingElementJoin();
    delayedWidthCheckAndHide();
}


/**
 * 
 * Renders all tasks by loading data, assigning task elements to statuses, and updating UI elements
 * 
 */
async function renderAllTasks() {
    await loadTasks();
    await assignTaskElementsToStatus('to_do');
    await assignTaskElementsToStatus('in_progress');
    await assignTaskElementsToStatus('feedback');
    await assignTaskElementsToStatus('done');
    checkProfileBadgeCount();
    updateAllProgressBars();
}


/**
 * 
 * Updates all progress bars by iterating through tasks and updating subtasks count
 * 
 */
function updateAllProgressBars() {
    tasks.forEach(task => {
        updateSubtasksCount(task.id);
    });
}


/**
 * 
 * This function changes the styling of the content to match the board 
 * layout by removing existing content-related classes and adding the class 'contentBoard'.
 * 
 */
function changeBoardContent() {
    document.getElementById('content').classList.remove('content_section');
    document.getElementById('content').classList.remove('content');
    document.getElementById('content').classList.add('contentBoard');
}


/**
 * 
 * This function applies background color styling to the board elements by adding specific classes 
 * ('currentTemplate' and 'p-none') to the elements with the IDs 'board' and 'board_mobile'.
 * 
 */
function boardBgrColor() {
    document.getElementById('board').classList.add('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.add('currentTemplate', 'p-none');
}


/**
 * 
 * This function removes background color styling from elements that are not the board by removing specific classes
 * ('currentTemplate' and 'p-none') from the corresponding elements. 
 * 
 */
function removeBgrColorWithoutBoard() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.remove('currentTemplate', 'p-none');
}


/**
 * 
 * This function makes the join logo clickable by removing the 'p-none' class from the elements with the IDs 'join_logo' and 'join_logo_mobile'.
 * 
 */
function addJoinLogoClickable() {
    document.getElementById('join_logo').classList.remove('p-none');
    document.getElementById('join_logo_mobile').classList.remove('p-none');
}


/**
 * 
 * This function shows the loading spinner element by removing the 'd-none' class from the element with the ID 'loading_spinner'. 
 * 
 */
function showLoadingElementJoin() {
    document.getElementById('loading_spinner').classList.remove('d-none');
}


/**
 * 
 * This function hides the loading spinner element by adding the 'd-none' class to the element with the ID 'loading_spinner'. 
 * It first checks if the element exists to avoid errors.
 * 
 */
function hideLoadingElementJoin() {
    let loadingSpinner = document.getElementById('loading_spinner');
    if (loadingSpinner) {
        loadingSpinner.classList.add('d-none');
    }
}


/**
 * 
 * This function hides the width_HTML element by setting its display property to 'none'. 
 * It first checks if the element exists to avoid errors.
 * 
 */
function hideWidthHTML() {
    let widthHTML = document.getElementById('width_HTML');
    if (widthHTML) {
        widthHTML.style.display = 'none';
    }
}


/**
 * 
 * Shows the width_HTML element by setting its display property to 'block'
 * 
 */
function showWidthHTML() {
    let widthHTML = document.getElementById('width_HTML');
    if (widthHTML) {
        widthHTML.style.display = 'block';
    }
}


/**
 * 
 * This function opens a task by displaying its details in the task details container. 
 * It checks if a task is currently being dragged (isDragging), and if not, 
 * it finds the task with the specified ID, populates the task details container with HTML details, 
 * removes the 'd-none' class to display the container, and checks the length of the task name text for a slide animation. 
 * 
 * @param {number} id 
 * @returns 
 */
function openTask(id) {
    if (isDragging) {
        return;
    }
    let task = tasks.find(t => t.id === id);
    let contain = document.getElementById('taskDetailsContain');
    currentTaskStatus = 'big';
    contain.innerHTML = `
        ${renderTaskHTMLDetails(task)}
    `;
    contain.classList.remove('d-none');
    checkNameTextLengthToSlideAnimation();
}


/**
 * 
 * This function closes the task details by animating the slide-out and fade-out effects. 
 * It adds CSS classes to the task details popup and container to trigger the animations 
 * and then listens for the 'animationend' event to hide the task details container once the animations are complete.
 * 
 */
function closeTask() {
    let contain = document.getElementById('taskDetailsContain');
    let popup = document.getElementById('taskDetails');
    let background = document.getElementById('backgroundFromTaskPopup');
    currentTaskStatus = 'small';
    popup.classList.add('slideOutToRight');
    contain.classList.add('fadeOut');
    background.classList.add('fadeOutBackground');
    popup.addEventListener('animationend', function () {
        contain.classList.add('d-none');
    }, { once: true });
}


/**
 * 
 * This function searches for tasks based on the input value entered in the find_task input field. 
 * It iterates through each task, compares the lowercase version of the task title and description 
 * with the lowercase search value, and updates the visibility of the corresponding task section based on the search criteria.
 * 
 */
function searchTaskFromInput() {
    let value = document.getElementById('find_task').value.toLowerCase();

    tasks.forEach(task => {
        let taskSection = document.getElementById(`section${task.id}`);

        if (!taskSection) return;

        let title = task.title.toLowerCase();
        let description = task.description.toLowerCase();

        if (title.includes(value) || description.includes(value)) {
            taskSection.style.display = '';
        } else {
            taskSection.style.display = 'none';
        }
    });
}


/**
 * 
 * This function initiates the confirmation process for task deletion by creating 
 * a confirm popup with the specified taskId and taskTitle and also creating a confirm background. 
 * 
 * @param {number} taskId 
 * @param {string} taskTitle 
 */
function confirmTaskDeletion(taskId, taskTitle) {
    createConfirmPopup(taskId, taskTitle);
    createConfirmBackground();
}


/**
 * 
 * This function creates a confirmation popup for task deletion by generating HTML content using the provided taskId and taskTitle. 
 * It creates a new div element, sets its class name to 'confirmationPopup', populates it with HTML content, and appends it to the body of the document.
 * 
 * @param {number} taskId 
 * @param {string} taskTitle 
 */
function createConfirmPopup(taskId, taskTitle) {
    let confirmationMessage = `${returnConfirmationMessageHTML(taskTitle)}`;
    let confirmationPopup = document.createElement('div');
    confirmationPopup.className = 'confirmationPopup';
    confirmationPopup.innerHTML = `
        ${returnConfirmationPopupHTML(taskId, confirmationMessage)}
    `;
    document.body.appendChild(confirmationPopup);
}


/**
 * 
 * This function creates a modal background for the confirmation popup by creating a new div element, 
 * setting its class name to 'modalBackground', and appending it to the body of the document. 
 * 
 */
function createConfirmBackground() {
    let modalBackground = document.createElement('div');
    modalBackground.className = 'modalBackground';
    document.body.appendChild(modalBackground);
}


/**
 * 
 * Deletes a task with the specified taskId, updates storage, closes task details, confirmation popup, and re-renders all tasks
 * 
 * @param {number} taskId 
 */
async function deleteTask(taskId) {
    let index = tasks.findIndex(task => task.id == taskId);
    tasks.splice(index, 1);
    await setItem('tasks', JSON.stringify(tasks));
    closeTask();
    closeConfirmationPopup();
    renderAllTasks();
}


/**
 * 
 * Closes the confirmation popup and removes the modal background
 * 
 */
function closeConfirmationPopup() {
    let popup = document.querySelector('.confirmationPopup');
    let modalBackground = document.querySelector('.modalBackground');
    if (popup) {
        popup.remove();
    }
    if (modalBackground) {
        modalBackground.remove();
    }
}


/**
 * 
 * This function checks the profile badge count in each container and displays additional badges with a count if there are more than 5 badges in a container. 
 * It creates an additional badge element, removes excess badges from the container, 
 * and appends the additional badge with the count to indicate the number of excess badges.
 * 
 */
function checkProfileBadgeCount() {
    let profileBadgeContainers = document.querySelectorAll('.profileBadgeContain');

    profileBadgeContainers.forEach(container => {
        let profileBadges = container.getElementsByClassName('profileBadge');
        let numberOfBadges = profileBadges.length;

        if (numberOfBadges > 5) {
            let additionalBadge = document.createElement('div');
            additionalBadge.className = 'profileBadgeToMuch';
            additionalBadge.textContent = `+${numberOfBadges - 4}`;

            while (container.children.length > 4) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(additionalBadge);
        }
    });
}

/**
 * 
 * @param {Array} contacts 
 * @returns html
 * function render name of assigned person in the task
 */
function checkContactsInTask(contacts) {
    let html = '';
    let isLastOdd = contacts.length % 2 !== 0;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let isLast = i === contacts.length - 1;

        if (currentTaskStatus === 'small') {
            html += returnProfilBadgeInTask(contact);
        } else if (currentTaskStatus === 'big') {
            let assignedNameStyle = isLast && isLastOdd ? 'style="width: 100%;"' : '';
            html += returnProfileBadgesInOpenedTasks(contact, assignedNameStyle);
        }
    }
    return html;
}



/**
 * 
 * Generates HTML content for displaying contacts in a task based on the current task status
 * 
 * @param {Array} contacts 
 * @returns 
 */
function checkSubtasksInTask(subtasks, taskId) {
    let html = '';
    if (currentTaskStatus === 'small') {
        html += returnProgressBarInTasks(taskId, subtasks);
    } else if (currentTaskStatus === 'big') {
        for (let i = 0; i < subtasks.length; i++) {
            let subtask = subtasks[i];
            html += /*html*/`
                ${returnSubtasksDetailsHTML(i, subtask, taskId)}
            `;
        }
    }
    return html;
}


/**
 * 
 * This function updates the subtasks count and progress bar for a given task identified by the taskId. 
 * It finds the task in the tasks array, calculates the count of completed subtasks and the total number of subtasks, 
 * and then updates corresponding HTML elements (subtasks count text and progress bar) if they exist. 
 * 
 * @param {number} taskId 
 */
function updateSubtasksCount(taskId) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
        let completedCount = subtasksCompleted(task.subtasks);
        let totalSubtasks = task.subtasks.length;
        let subtaskTxtElement = document.getElementById(`subtaskTxt${taskId}`);
        let progressbarElement = document.getElementById(`progressbar${taskId}`);


        if (subtaskTxtElement) {
            subtaskTxtElement.textContent = `${completedCount}/${totalSubtasks}`;
        }

        if (progressbarElement) {
            styleProgressBar(progressbarElement, completedCount, totalSubtasks);
        }
    }
}


/**
 * 
 * This function styles the appearance of a progress bar based on the completed count and total number of subtasks. 
 * It calculates the percentage of completed subtasks, then applies styling to the progressbarElement by setting its width, 
 * height, background color, and border radius.
 * 
 * @param {HTMLElement} progressbarElement 
 * @param {number} completedCount 
 * @param {number} totalSubtasks 
 */
function styleProgressBar(progressbarElement, completedCount, totalSubtasks) {
    let progressPercentage = totalSubtasks > 0 ? (completedCount / totalSubtasks) * 100 : 0;
    progressbarElement.style.width = `${progressPercentage}%`;
    progressbarElement.style.height = '100%';
    progressbarElement.style.backgroundColor = '#4589FF';
    progressbarElement.style.borderRadius = '16px';
}


/**
 * 
 * This function counts the number of completed subtasks in the given array (subtasks). 
 * It iterates through each subtask, checks if its status is 'finished', and increments the completed count accordingly. 
 * The final count of completed subtasks is then returned by the function.
 * 
 * @param {Array} subtasks 
 * @returns 
 */
function subtasksCompleted(subtasks) {
    let completedCount = 0;
    for (let i = 0; i < subtasks.length; i++) {
        if (subtasks[i].subtaskStatus === 'finished') {
            completedCount++;
        }
    }
    return completedCount;
}


/**
 * 
 * Toggles the status of a subtask between 'finished' and 'unfinished' in the details view of a task
 * 
 * @param {number} subtaskId 
 * @param {number} taskId 
 */
async function selectSubtaskInDetails(subtaskId, taskId) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
        let subtask = task.subtasks[subtaskId];
        subtask.subtaskStatus = subtask.subtaskStatus === 'finished' ? 'unfinished' : 'finished';

        await setItem('tasks', JSON.stringify(tasks));

        updateSubtasksInDetails(task);
        updateSubtasksCount(taskId);
    }
}


/**
 * 
 * This function updates the display of subtasks in the details view of a task. 
 * It retrieves the container element for displaying subtasks, updates its inner HTML 
 * with the latest subtasks using the checkSubtasksInTask function, and then updates the subtasks count and progress bar 
 * for the task using the updateSubtasksCount function. 
 * 
 * @param {string} task 
 */
function updateSubtasksInDetails(task) {
    let subtasksContainer = document.getElementById(`allSubtasksContainDetails${task.id}`);
    if (subtasksContainer) {
        subtasksContainer.innerHTML = checkSubtasksInTask(task.subtasks, task.id);
        updateSubtasksCount(task.id);
    }
}


/**
 * 
 * This function updates the user interface (UI) for a specific subtask based on its status. 
 * It takes the subtaskId, taskId, and subtaskStatus as parameters, 
 * and it adjusts the visibility and styling of the checkbox and checked box elements accordingly. 
 * 
 * @param {number} subtaskId 
 * @param {number} taskId 
 * @param {string} subtaskStatus 
 */
function updateSubtaskUI(subtaskId, taskId, subtaskStatus) {
    let checkBox = document.getElementById(`checkBox${subtaskId}${taskId}`);
    let checkedBox = document.getElementById(`checkedBox${subtaskId}${taskId}`);
    let subtaskElement = document.getElementById(`subtask${subtaskId}${taskId}`);

    if (subtaskStatus === 'finished') {
        checkBox.classList.add('d-none');
        checkedBox.classList.remove('d-none');
        subtaskElement.classList.add('lineThrough');
    } else {
        checkBox.classList.remove('d-none');
        checkedBox.classList.add('d-none');
        subtaskElement.classList.remove('lineThrough');
    }
}


/**
 * 
 * This function renders the edit task form in the board site for a specific task identified by the id. 
 * 
 * @param {number} id 
 */
function renderEditTaskInBordSite(id) {
    let task = tasks.find(t => t.id === id);
    let contain = document.getElementById('taskDetails');
    contain.innerHTML = returnEditTaskHTML(task);
    renderAssignedToCurrentUser();
    renderAssignedToContactList();
    renderSubtaskForEditOption(task.subtasks, id);
    renderSelectedContactBadgesForEditOption(task.contacts);
}