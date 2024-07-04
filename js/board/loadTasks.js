/**
 * 
 * This function asynchronously loads tasks from local storage, updates the 'tasks' array, 
 * and sets the highestTaskId based on the loaded tasks.
 * 
 */
async function loadTasks() {
    try {
        let savedTasks = await getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            highestTaskId = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);
        } else {
            tasks = [];
        }
    } catch (error) {
        console.error("Fehler beim Laden der Tasks:", error);
    }
}


/**
 * 
 * This function asynchronously assigns task elements to a specified status container in the UI based on the 'status' parameter.
 * 
 * @param {String} status 
 */
async function assignTaskElementsToStatus(status) {
    let container = document.getElementById(status);
    let tasksByStatus = tasks.filter(task => task.status === status);
    container.innerHTML = '';
    tasksByStatus.forEach(task => {
        container.appendChild(renderTaskElement(task));
    });
    ifContainerEmpty(container);
}


/**
 * 
 * Checks if a specified container is empty, and if so, inserts an empty div using a predefined function
 * 
 * @param {*} container 
 */
function ifContainerEmpty(container) {
    if (container.innerHTML === '') {
        container.innerHTML = returnEmptyDivInTaskLine();
    }
}


/**
 * 
 * This function is responsible for rendering a task element, creating a section with appropriate event listeners and HTML content for a given task.
 * 
 * @param {String} task 
 * @returns 
 */
function renderTaskElement(task) {
    let section = document.createElement('section');
    section.className = 'section';
    section.id = `section${task.id}`;
    section.draggable = true;

    section.ondragstart = function (event) {
        startDragging(task.id, event);
    };

    section.ondragend = function () {
        endDragging();
    };

    section.onclick = function () {
        openTask(task.id);
    };

    section.addEventListener('touchmove', function (event) {
        clearTimeout(longPressTimer);
    }, { passive: false });

    section.addEventListener('touchstart', function (event) {
        handleTouchStart(event, task.id);
    }, { passive: false });

    section.addEventListener('touchend', function (event) {
        handleTouchEnd(event, task.id);
    }, { passive: false });

    section.innerHTML = renderTaskHTML(task);
    return section;
}


/**
 * 
 * This function formats task text by trimming or showing the full text length based on the current task status.
 * 
 * @param {string} text 
 * @returns 
 */
function formatTaskText(text) {
    let trimmedText = text.trim();
    if (currentTaskStatus === 'small' && trimmedText.length > 57) {
        return trimmText(trimmedText);
    } else {
        return showFullTextLength(trimmedText);
    }
}


/**
 * 
 * This function is useful for creating a visually concise representation of a 
 * longer text in certain contexts, such as displaying task titles in a limited space.
 * 
 * @param {string} trimmedText 
 * @returns 
 */
function trimmText(trimmedText) {
    return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1, 57) + '...';
}


/**
 * 
 * This function is useful when you want to display the complete, 
 * untruncated text in scenarios where length restrictions are not applied.
 * 
 * @param {string} trimmedText 
 * @returns 
 */
function showFullTextLength(trimmedText) {
    return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
}


/**
 * 
 * This function appears to be part of a larger system for rendering task 
 * priorities in different contexts, based on the current task status.
 * 
 * @param {Array} priority 
 * @returns 
 */
function checkPriority(priority) {
    if (currentTaskStatus === 'small') {
        return returnTaskPrioritySmallHTML(priority);
    } else if (currentTaskStatus === 'big') {
        return returnTaskPriorityBigHTML(priority);
    }
}


/**
 * 
 * This function appears to be part of a larger system for rendering task 
 * categories in different contexts, based on the current task status.
 * 
 * @param {string} category 
 * @returns 
 */
function checkTaskCategory(category) {
    let formattedCategory = category.replace(/_/g, ' ');
    if (currentTaskStatus === 'small') {
        return returnTaskCategorySmallHTML(category, formattedCategory);
    } else if (currentTaskStatus === 'big') {
        return returnTaskCategoryBigHTML(category, formattedCategory);
    }
}