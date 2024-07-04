/**
 * 
 * Allows dropping elements by preventing the default behavior of the dragover event
 * 
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * 
 * This function likely plays a role in the overall drag-and-drop mechanism, 
 * triggering actions when the dragging of a task starts. 
 * 
 * @param {number} id 
 */
function startDragging(id) {
    if (!isDragging) {
        isDragging = true;
        currentDraggedTaskId = id;
        hideOtherElements(id);
    }
}


/**
 * 
 * This function is likely associated with a drag-and-drop interaction in a task 
 * management system where tasks can be moved between different statuses. 
 * 
 * @param {string} status 
 */
async function dropTo(status) {
    if (currentDraggedTaskId !== null) {
        let taskById = tasks.find(task => task.id === currentDraggedTaskId);
        if (taskById) {
            taskById.status = status;
            await setItem('tasks', JSON.stringify(tasks));
            renderAllTasks();
            removeHighlight(status);
        }
        currentDraggedTaskId = null;
        showAllElements();
    }
}


/**
 * 
 * This function seems to be responsible for cleaning up various UI changes 
 * and state adjustments that were made during the dragging interaction.
 * 
 */
function endDragging() {
    if (isDragging) {
        setTimeout(() => {
            isDragging = false;
            removeHeightFromTaskLine();
            removeFlashingAnimationInTaskLine();
            if (currentTouchedTaskLineId) {
                removeHighlight(currentTouchedTaskLineId);
                currentTouchedTaskLineId = null;
            }
            stopScrollInterval();
            showAllElements();
        }, 100);
    }
}


document.addEventListener('dragend', stopScrollInterval);


/**    
 * 
 * This event listener seems to be controlling the behavior of the UI during a drag operation.
 * 
 */
document.addEventListener('dragover', function (event) {
    if (window.innerWidth < 1300 && window.innerWidth > 999) {
        scrollBehaviorOver1000(event);
        addHeightFromTaskLine();
        addFlashingAnimationInTaskLine();
    } else if (window.innerWidth < 1000) {
        scrollBehaviorBelow1000(event);
        addHeightFromTaskLine();
        addFlashingAnimationInTaskLine();
    }
    addHeightFromTaskLine();
    addFlashingAnimationInTaskLine();
});


/**
 * 
 * This code is checking if a dragging operation is in progress (isDragging is true) during a touchmove event. 
 * 
 */
document.addEventListener('touchmove', function (event) {
    if (isDragging) {
        let touch = event.touches[0];
        let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

        if (targetElement && targetElement.classList.contains('taskLine')) {
            let taskLineId = targetElement.id;
            highlight(taskLineId, event);
        }
    }
});


/**
 * 
 * This code is checking if a dragging operation is in progress (isDragging is true) during a touchend event. 
 * 
 */
document.addEventListener('touchend', function (event) {
    if (isDragging) {
        let touch = event.changedTouches[0];
        let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

        if (targetElement && targetElement.classList.contains('taskLine')) {
            let taskLineId = targetElement.id;
            dropTo(taskLineId);
            removeHighlight(taskLineId);
            endDragging();
        }
    }
});


/**
 * 
 * The scrollBehaviorBelow1000 function handles scrolling behavior when the window width is below 1000 pixels. 
 * It calculates the boundaries of a scrollbar element, and if the mouse is positioned outside these boundaries.
 * 
 * @param {*} ev 
 */
function scrollBehaviorBelow1000(ev) {
    let scrollbar = document.querySelector('.scrollbar');
    let bounds = scrollbar.getBoundingClientRect();
    let topBoundary = bounds.top + 40;
    let bottomBoundary = bounds.bottom - 400;
    let scrollSpeed = 5;

    if (ev.clientY < topBoundary || ev.clientY > bottomBoundary) {
        startScrollInterval(scrollbar, topBoundary, scrollSpeed, ev.clientY);
    } else {
        stopScrollInterval();
    }
}


/**
 * 
 * The scrollBehaviorOver1000 function handles scrolling behavior when the window width is over 1000 pixels. 
 * It calculates the boundaries of a scrollbar element, and if the mouse is positioned outside these boundaries, 
 * it initiates continuous scrolling in the specified direction.
 * 
 * @param {*} ev 
 */
function scrollBehaviorOver1000(ev) {
    let scrollbar = document.querySelector('.scrollbar');
    let bounds = scrollbar.getBoundingClientRect();
    let topBoundary = bounds.top + 60;
    let bottomBoundary = bounds.bottom - 150;
    let scrollSpeed = 5;

    if (ev.clientY < topBoundary || ev.clientY > bottomBoundary) {
        startScrollInterval(scrollbar, topBoundary, scrollSpeed, ev.clientY);
    } else {
        stopScrollInterval();
    }
}


/**
 * 
 * The scrollBehaviorTouch function handles scrolling behavior when a touch event occurs. 
 * It calculates the boundaries of a scrollbar element, and if the touch event position is outside these boundaries, 
 * it initiates continuous scrolling in the specified direction.
 * 
 * @param {variable} touch 
 */
function scrollBehaviorTouch(touch) {
    let scrollbar = document.querySelector('.scrollbar');
    let bounds = scrollbar.getBoundingClientRect();
    let topBoundary = bounds.top + 60;
    let bottomBoundary = bounds.bottom - 440;
    let scrollSpeed = 5;

    if (touch.clientY < topBoundary || touch.clientY > bottomBoundary) {
        startScrollInterval(scrollbar, topBoundary, scrollSpeed, touch.clientY);
    } else {
        stopScrollInterval();
    }
}


/**
 * 
 * The startScrollInterval function initiates a setInterval to continuously scroll the content 
 * inside a specified scrollbar element. The scrolling direction is determined based on the 
 * relative position of the mouse or touch event (mouseY) with respect to the top boundary of the scrollbar. 
 * 
 * @param {HTMLElement} scrollbar 
 * @param {number} topBoundary 
 * @param {number} scrollSpeed 
 * @param {number} mouseY 
 */
function startScrollInterval(scrollbar, topBoundary, scrollSpeed, mouseY) {
    if (scrollIntervalInDragAndDrop === null) {
        scrollIntervalInDragAndDrop = setInterval(() => {
            let scrollDirection;
            if (mouseY < topBoundary) {
                scrollDirection = -1;
            } else {
                scrollDirection = 1;
            }
            scrollbar.scrollBy(0, scrollSpeed * scrollDirection);
        }, 10);
    }
}


/**
 * 
 * The addHeightFromTaskLine function adds a CSS class (taskLineHeightAdjust) to each element with the class taskLine.
 * 
 */
function addHeightFromTaskLine() {
    let taskLines = document.querySelectorAll('.taskLine');
    taskLines.forEach(line => {
        line.classList.add('taskLineHeightAdjust');
    });
}


/**
 * 
 * The addFlashingAnimationInTaskLine function adds a CSS class (flashingAnimation) to each element with the class taskLine, 
 * except for the task line corresponding to the currently dragged task.
 * 
 */
function addFlashingAnimationInTaskLine() {
    let currentTaskLineId = tasks.find(task => task.id === currentDraggedTaskId)?.status;
    let taskLines = document.querySelectorAll('.taskLine');

    taskLines.forEach(line => {
        if (line.id !== currentTaskLineId) {
            line.classList.add('flashingAnimation');
        }
    });
}


/**
 * 
 * The removeFlashingAnimationInTaskLine function removes the CSS class (flashingAnimation) from all elements with the class taskLine. 
 * This action likely stops the flashing animation effect applied to task lines, which could be useful when the dragging operation is complete.
 * 
 */
function removeFlashingAnimationInTaskLine() {
    let taskLines = document.querySelectorAll('.taskLine');
    taskLines.forEach(line => {
        line.classList.remove('flashingAnimation');
    });
}


/**
 * 
 * The removeHeightFromTaskLine function removes the CSS class (taskLineHeightAdjust) from all elements with the class taskLine. 
 * This action likely reverses or adjusts the height modification applied to task lines, possibly as part of the drag-and-drop interaction.
 * 
 */
function removeHeightFromTaskLine() {
    let taskLines = document.querySelectorAll('.taskLine');
    taskLines.forEach(line => {
        line.classList.remove('taskLineHeightAdjust');
    });
}


/**
 * 
 * The stopScrollInterval function clears the interval set by startScrollInterval 
 * when it's necessary to stop the scrolling behavior during drag-and-drop interactions. 
 * 
 */
function stopScrollInterval() {
    if (scrollIntervalInDragAndDrop !== null) {
        clearInterval(scrollIntervalInDragAndDrop);
        scrollIntervalInDragAndDrop = null;
    }
}


/**
 * 
 * The hideOtherElements function iterates through all elements with the class .section (representing tasks) and sets their opacity to '0'
 * and pointer events to 'none' except for the task with the specified exceptTaskId.
 * 
 * @param {number} exceptTaskId 
 */
function hideOtherElements(exceptTaskId) {
    document.querySelectorAll('.section').forEach(task => {
        if (task.id !== `section${exceptTaskId}`) {
            task.style.opacity = '0';
            task.style.pointerEvents = 'none';
        }
    });
    hideEmptyElement();
}


/**
 * 
 * The hideEmptyElement function selects all elements with the class .emptyTaskLine and adds the class .d-none to them.
 * 
 */
function hideEmptyElement() {
    document.querySelectorAll('.emptyTaskLine').forEach(line => {
        line.classList.add('d-none');
    });
}


/**
 * 
 * The showEmptyElement function selects all elements with the class .emptyTaskLine and removes the class .d-none from them. 
 * This class is often used to display or make visible elements by setting their display property to a value other than 'none' through CSS
 * 
 */
function showEmptyElement() {
    document.querySelectorAll('.emptyTaskLine').forEach(line => {
        line.classList.remove('d-none');
    });
}


/**
 * 
 * The showAllElements function selects all elements with the class .section and sets their opacity to '1' and pointerEvents to 'auto'.
 * 
 */
function showAllElements() {
    document.querySelectorAll('.section').forEach(task => {
        task.style.opacity = '1';
        task.style.pointerEvents = 'auto';
    });
    showEmptyElement();
}


/**
 * 
 * The highlight function is part of the drag-and-drop functionality. 
 * It is responsible for highlighting a specific task line during the drag operation. 
 * Here's a breakdown of its main actions:
 * 
 * @param {number} taskLineId 
 * @param {*} event 
 * @returns 
 */
function highlight(taskLineId, event) {
    let taskById = tasks.find(task => task.id === currentDraggedTaskId);
    if (taskById && taskById.status === taskLineId) {
        return;
    }
    removeAllHighlights();
    let taskLine = document.getElementById(taskLineId);
    if (!taskLine) return;
    let draggableDiv = createAndAddDraggableDiv(taskLine);
    updateDraggableDivPosition(event, draggableDiv, taskLine);
}


/**
 * 
 * The removeAllHighlights function is responsible for removing all draggable div elements used for highlighting during the drag-and-drop process. 
 * 
 */
function removeAllHighlights() {
    document.querySelectorAll('.taskLine .draggableContain').forEach(div => {
        div.parentElement.removeChild(div);
    });
}


/**
 * 
 * The createAndAddDraggableDiv function is responsible for creating and adding a draggable div element to a specified task line. 
 * If a draggable div already exists for the task line, it returns the existing one; otherwise, it creates a new draggable div.
 * 
 * @param {string} taskLine 
 * @returns 
 */
function createAndAddDraggableDiv(taskLine) {
    let draggableDiv = taskLine.querySelector('.draggableContain');
    if (!draggableDiv) {
        draggableDiv = document.createElement('div');
        draggableDiv.classList.add('draggableContain');
        taskLine.prepend(draggableDiv);
    }
    return draggableDiv;
}


/**
 * 
 * The updateDraggableDivPosition function is responsible for updating the position of 
 * a draggable div based on the current event, such as a mouse or touch event.
 * 
 * @param {*} event 
 * @param {*} draggableDiv 
 * @param {*} taskLine 
 */
function updateDraggableDivPosition(event, draggableDiv, taskLine) {
    if (window.innerWidth < 1300) {
        positionDivHorizontally(event, draggableDiv, taskLine);
    } else {
        positionDivVertically(event, draggableDiv, taskLine);
    }
}


/**
 * 
 * The positionDivHorizontally function is responsible for updating the horizontal 
 * position of a draggable div based on the current event. Here's a breakdown of the function:
 * 
 * @param {*} event 
 * @param {*} draggableDiv 
 * @param {*} taskLine 
 */
function positionDivHorizontally(event, draggableDiv, taskLine) {
    let cursorX = event.clientX || event.touches[0].clientX;
    let taskLineRect = taskLine.getBoundingClientRect();
    let taskLineLeft = taskLineRect.left;
    let draggableDivWidth = draggableDiv.offsetWidth;

    let taskLineHeight = taskLineRect.height;
    let draggableDivHeight = draggableDiv.offsetHeight;
    let verticalCenter = (taskLineHeight - draggableDivHeight) / 2;

    draggableDiv.style.left = (cursorX - taskLineLeft - draggableDivWidth / 2) + 'px';
    draggableDiv.style.top = verticalCenter + 'px';
}


/**
 * 
 * This function calculates and sets the top position of a draggable div based on the vertical cursor position and the task line's position on the page.
 * 
 * @param {event} event 
 * @param {HTMLElement} draggableDiv 
 * @param {HTMLElement} taskLine 
 */
function positionDivVertically(event, draggableDiv, taskLine) {
    let cursorY = event.clientY || event.touches[0].clientY;
    let taskLineRect = taskLine.getBoundingClientRect();
    let taskLineTop = taskLineRect.top;
    let draggableDivHeight = draggableDiv.offsetHeight;

    draggableDiv.style.top = (cursorY - taskLineTop - draggableDivHeight / 2) + 'px';
}


/**
 * 
 * This function removes the highlight (draggable container div) from a specific task line element identified by its ID.
 * 
 * @param {string} taskLineId 
 */
function removeHighlight(taskLineId) {
    let taskLine = document.getElementById(taskLineId);
    if (taskLine) {
        let draggableDiv = taskLine.querySelector('.draggableContain');
        if (draggableDiv) {
            taskLine.removeChild(draggableDiv);
        }
    }
}


/**
 * 
 * This event listener is responsible for managing touchmove events during dragging. 
 * It handles task line highlighting, scroll behavior, and prevents the default 
 * touchmove behavior to ensure a smooth dragging experience.
 * 
 */
document.addEventListener('touchmove', function (event) {
    if (isDragging) {
        let touch = event.touches[0];
        handleTaskLineHighlightOnTouchMove(touch);
        scrollBehaviorTouch(touch);
        event.preventDefault();
    }
}, { passive: false });


/**
 * 
 * This function is responsible for managing the highlighting of task lines during touch move events. 
 * 
 * @param {touch} touch 
 */
function handleTaskLineHighlightOnTouchMove(touch) {
    let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement && targetElement.classList.contains('taskLine')) {
        let taskLineId = targetElement.id;
        if (currentTouchedTaskLineId !== taskLineId) {
            if (currentTouchedTaskLineId) {
                removeHighlight(currentTouchedTaskLineId);
            }
            highlight(taskLineId, touch);
            currentTouchedTaskLineId = taskLineId;
        }
    }
}


/**
 * 
 * This function handles the touch start event for a task, initiating a long press gesture.
 * 
 * @param {TouchEvent} event 
 * @param {number} taskId 
 */
function handleTouchStart(event, taskId) {
    isScrolling = false;
    longPressTimer = setTimeout(() => {
        if (!isScrolling) {
            startDragging(taskId);
            addHeightFromTaskLine();
            addFlashingAnimationInTaskLine();
        }
    }, 750);
    event.target.addEventListener('touchmove', detectScroll);
}


/**
 * 
 * This function is responsible for detecting scrolling during a touch move event.
 * 
 * @param {TouchEvent} event 
 */
function detectScroll(event) {
    clearTimeout(longPressTimer);
    isScrolling = true;
    event.target.removeEventListener('touchmove', detectScroll);
}


/**
 * 
 * This function handles the touch end event by clearing the long press timer, 
 * checking if dragging is in progress, handling the drop on touch end, 
 * clearing the current touched task line, ending the dragging process, and triggering the rendering of all tasks.
 * 
 * @param {TouchEvent} event 
 */
function handleTouchEnd(event) {
    clearTimeout(longPressTimer);
    if (isDragging) {
        let touch = event.changedTouches[0];
        handleDropOnTouchEnd(touch);
        clearCurrentTouchedTaskLine();
        endDragging();
        renderAllTasks();
    }
}


/**
 * 
 * This function clears the current touched task line by removing the highlight and setting the currentTouchedTaskLineId to null.
 * 
 */
function clearCurrentTouchedTaskLine() {
    if (currentTouchedTaskLineId) {
        removeHighlight(currentTouchedTaskLineId);
        currentTouchedTaskLineId = null;
    }
}


/**
 * 
 * This function handles the drop action when a touch event ends, 
 * determining the target task line based on the touch coordinates and triggering the dropTo function. 
 * 
 * @param {Touch} touch 
 */
function handleDropOnTouchEnd(touch) {
    let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement && targetElement.classList.contains('taskLine')) {
        let taskLineId = targetElement.id;
        dropTo(taskLineId);
    }
}


/**
 * 
 * This event listener is preventing the default behavior of a drag start event for images (<img> elements).
 * 
 */
document.addEventListener('dragstart', function (event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});