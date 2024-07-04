/**
 * 
 * This function checks the window width in the board view and dynamically adjusts the layout based on the width.
 * It generates HTML elements accordingly, checks the task status for layout adjustment, 
 * renders all tasks with a minimum loading time, and then shows or hides specific HTML elements based on the window width.
 * 
 */
async function checkWidthInBoard() {
    let contentDiv = document.querySelector('.contentBoard');
    if (contentDiv) {
        if (window.innerWidth >= 1300) {
            generateBoardWidthPlus1300HTML();
        } else {
            generateBoardWidthMinus1300HTML();
        }
        checkTaskStatusWhetherBig();
        await renderAllTasks();
        await checkMinLoadingTime();
        showWidthHTML();
        hideLoadingElementJoin();
    }
}


/**
 * 
 * This function delays the width check in the board view and hides the loading element.
 * 
 */
function delayedWidthCheckAndHide() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        checkWidthInBoard();
        hideLoadingElementJoin();
    }, mininamLoadingElementJoinTime);
}


/**
 * 
 * This function checks the current task status, and if it is 'big', it switches the task status to 'small'. 
 * 
 */
function checkTaskStatusWhetherBig() {
    if (currentTaskStatus == 'big') {
        currentTaskStatus = 'small';
    }
}


/**
 * 
 * Checks and ensures a minimum loading time before proceeding
 * 
 */
async function checkMinLoadingTime() {
    let currentTime = new Date().getTime();
    if (currentTime - lastAnimationTimestamp < mininamLoadingElementJoinTime) {
        await new Promise(resolve => setTimeout(resolve, mininamLoadingElementJoinTime - (currentTime - lastAnimationTimestamp)));
    }
}


/** 
 * 
 * This code attaches an event listener to the resize event on the window.
 * 
 */
window.addEventListener('resize', loadingProcess);
