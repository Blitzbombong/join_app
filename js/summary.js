/**
 * 
 * Renders the "Summary" interface by invoking various functions
 */
async function renderSummary() {
    summaryBgrColor();                                                  // Set background color for Summary Menu in navigation bar
    removeBgrColorWithoutSummary();                                     // reset background color of other menu in navigation bar
    removeJoinLogoClickable();                                          // make Join logo not clickable
    addContentCSS();                                                    // Add correct CSS style
    await loadTasks();                                                  // load tasks from backend server
    generateSummaryHTML();                                              // return HTML of Summary Interface
    hideLegalContent();                                                 // hide legal content Container
    renderGreetsUserName();                                             // render name of current user or guest
    let hasBeenGreeted = localStorage.getItem('hasBeenGreeted');        // pull variable from local storage
    showMobileGreeting(hasBeenGreeted);                                 // show greet message for mobile version
    resetArraysForNewTasks();                                           // clear arrays
}


/**
 * render Date of the next task deadline
 * @returns {string} if no deadline available
 */
function renderNextDeadlineDate() {
    let allDeadlines = tasks.map(tasks => new Date(tasks.date));
    if(allDeadlines.length > 0){
        let futureDates =  allDeadlines.filter(date => date >= new Date());
        futureDates.sort((a, b) => a - b);
        let nextDeadline = futureDates[0]
        nextDeadline = formatDeadlinedate(nextDeadline);
        return nextDeadline;
    }else{
        return 'No Current Deadline';
    }  
}

/**
 * 
 * @param {number} nextDeadline 
 * @returns {string} date of next deadline
 */
function formatDeadlinedate(nextDeadline){
    const monthOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = nextDeadline.getDate();
    const month = monthOfYear[nextDeadline.getMonth()];
    const year = nextDeadline.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}

/**
 * 
 * @returns {string} greeting message
 */
function renderGreetingMessage() {
    let x = new Date();
    let hour = x.getHours();
    if (hour < 12) {
        return 'Good morning,'
    } else if (hour >= 12 && hour < 14) {
        return 'Good day,'
    } else if (hour >= 14 && hour < 19) {
        return 'Good afternoon,'
    } else {
        return 'Good evening,'
    }
}

/**
 * 
 * @returns {string} name of current user or guest
 */
function renderGreetsUserName() {
    if (currentUser) {
        return currentUser[0]['user'];
    } else {
        return 'Dear Guest';
    }
}

/**
 * mobile version: if current user has not already been greeted, creeting message is shown. if already done, greeting message will not be shown again
 * @param {variable} hasBeenGreeted // variable true or false if user has already been greeted or not
 */
function showMobileGreeting(hasBeenGreeted) {
    let mobileGreeting = document.getElementById('mobile-greeting-ctn');
    if (window.matchMedia('max-width: 1000px') && hasBeenGreeted && hasBeenGreeted === 'false') {
        mobileGreeting.innerHTML = returnMobileGreeting();
        mobileGreeting.classList.remove('d-none');
        mobileGreeting.classList.add('mobile_greeting_animation');
        setTimeout(() => {
            mobileGreeting.classList.add('d-none');
            localStorage.removeItem('hasBeenGreeted');
            hasBeenGreeted = true;
        }, 1600)
    }
}

/**
 * 
 * Adds background color styling to the "Summary" elements
 * 
 */
function summaryBgrColor() {
    document.getElementById('summary').classList.add('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.add('currentTemplate', 'p-none');
}


/**
 * 
 * Removes background color styling from elements other than "Summary"
 * 
 */
function removeBgrColorWithoutSummary() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts').classList.remove('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.remove('currentTemplate', 'p-none');
}

/**
 * Join Logo is not clickable when user is on summary interface
 */
function removeJoinLogoClickable() {
    document.getElementById('join_logo').classList.add('p-none');
    document.getElementById('join_logo_mobile').classList.add('p-none');
}


/**
 * check count of tasks who matched the parameter taskProgress and return it to be rendered in another HTML function 
 * @param {number} taskProgress 
 * @returns {array} return an array with all tasks who match the parameter
 */
function filterAndReturnTaskCount(taskProgress){
    let task = tasks.filter(task => task.status === taskProgress).length;
    return task;
}

/**
 * check count of tasks who matched the string 'Urgent' and return it to be rendered in another HTML function 
 * @returns {array} return an array with all tasks who match the parameter
 */
function filterAndReturnUrgentTasks() {
    let task = tasks.filter(task => task.priority === "Urgent").length;
    return task;
}