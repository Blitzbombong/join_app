function generateAddTaskHTML() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = `
        <div onclick="closeOpenedMenu(event)" class="task-container">
                <div class="task-headline">
                    <h1 class="task-name">Add Task</h1>
                </div>
            <form onsubmit="checkCategoryValidity(event) && setNewTask(); return false" id="add-task-form" class="task_input_ctn">
                <div class="mobile-scroll">
                    <div class="task-input">
                        <div class="left-field">
                                <div class="titel-field">
                                    <h4>Title<span class="letter-color">*</span></h4>
                                    <input autocomplete="off" id="titel-input" required type="text" name="myInput" placeholder="Enter a title">
                                    <div  class="error_warning">
                                        <span id="title-warning-text">This field is required</span>
                                    </div>
                                </div>    
                            <div class="description-field">
                                <h4>Description</h4>
                                <div class="textarea-container">
                                    <div class="textarea-field">
                                        <textarea id="read-description" class="textarea attrebute" type="text" name="myTextarea"
                                            placeholder="Enter a Description" spellcheck></textarea>
                                    </div>
                                    <div>
                                        <img class="description-icon" src="../images/Recurso 1 1.svg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="contacts-field box2">
                                <h4>Assigned to</h4>
                                <div onclick="toggleContacts(event)" class="custom-dropdown">
                                    <input onkeyup="searchContactToAssign()" id="assignTo-input" class="assign-input" type="search" placeholder="Select contacts to assign">
                                    <div class="assign-button">
                                        <img onclick="rotateIcon()" src="../images/arrow_drop_downaa.svg" alt="Arrow Icon" id="arrowIcon">
                                    </div>
                                </div>
                                <div class="contact-container d-none" id="contactContainer">
                                    <div onclick="stop(event)" class="contact-box">
                                        <div onclick="assignedToCurrentUser(currentUser)" id="current-user" class="contacts-topfield">
                                            <div class="contacts-name">
                                                <div id="current-user-initial" class="contact_circle"></div>
                                                <span id="current-user-name" class="contact-name"></span>
                                            </div>
                                            <div>
                                                <div class="check-button">
                                                    <img id="check-contact-img" src="../images/Rectangle 5.svg" alt="">
                                                    <img id="checked-contact-img" class="d-none" src="../images/check-white.svg" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        <div id="assigned-to-contact-list"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="selected-contact-ctn" class="selected_contact_ctn"></div>
                        </div>
                        <div class="right-field">
                            <div>
                                <div class="date-field">
                                    <h4>Due Date<span class="letter-color">*</span></h4>
                                    <input id="calender-input" required class="calender_input" type="date" placeholder="dd/mm/yyyy" min="${getTodaysDateForCalender()}">
                                    <div class="error_warning">
                                        <span id="calender-warning-text">This field is required</span>
                                    </div>
                                </div>
                            </div>
                            <div class="prio-container box1">
                                <h4>Prio</h4>
                                <div class="button-selection">
                                    <div class="prio-button" id="buttonUrgent" onclick="changeButtonStyles('Urgent')">Urgent
                                        <img class="prio-image" id="iconUrgent" src="../images/capa 2.svg" alt=""></div>
                                    <div class="prio-button selected" id="buttonMedium" onclick="changeButtonStyles('Medium')">Medium
                                        <img class="prio-image selected_icon" id="iconMedium" src="../images/prio media.svg" alt=""></div>
                                    <div class="prio-button" id="buttonLow" onclick="changeButtonStyles('Low')">Low <img
                                        class="prio-image" id="iconLow" src="../images/prio baja.svg" alt=""></div>
                                </div>
                            </div>
                            <div class="category-fields">
                                <h4>Category<span class="letter-color">*</span></h4>
                                <div class="category_ctn">
                                    <div class="category-box">
                                        <div class="custom-list" onclick="toggleDropdown(event)">
                                            <div>
                                                <input disabled class="span-category" id="selectedCategory" type="text" name="myInput" placeholder="Select task category" required>
                                            </div>
                                            <div class="category-icon-field">
                                                <img class="drop-option" id="selectIcon" src="../images/arrow_drop_downaa.svg"
                                                    alt="Arrow">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="category_error_warning">
                                        <span id="category-warning-text" class="d-none">This field is required</span>
                                    </div>
                                    <div id="dropdownOptions" class="dropdown-options d-none"></div>
                                </div>  
                            </div>

                            <div class="subtask-container">
                                <h4>Subtasks</h4>
                                <div class="subtask-field">
                                    <div class="subtask-input-container">
                                        <input oninput="showSubtaskImagesByInput()" id="subtaskInput" class="subtask-input" type="text" name="myInput" placeholder="Add new subtask">
                                    </div>
                                    <div class="subtask-image-field-first" id="imageContainer">
                                        <img src="../images/Property 1=add.svg" alt="" onclick="toggleSubtaskImages()">
                                    </div>
                                    <div class="subtask-image-field-second d-none" id="newImages">
                                        <img id="closeImag" onclick="toggleSubtaskImages()" class="subtask-button-close" src="../images/Property 1=close.svg" alt="">
                                        <img id="checkImage" class="subtask-button-check" src="../images/Property 1=check.svg" alt="" onclick="addSubtask()">
                                    </div>
                                </div>
                                <div class="subtask-content" id="subtaskContent"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="task-below">
                    <div>
                        <div class="requered-field">
                            <span class="letter-color">*</span>
                            This field is required
                        </div>
                    </div>
                    <div class="clear-create-button">
                        <button onclick="clearBegonnenNewTask(event)" type="reset" class="clear-button">Clear<img src="../images/close.svg"></button>
                        <button id="add-task-form-button" type="submit" class="create-button">Create Task <img class="clear-create-img" src="../images/check.svg" alt=""></button>
                    </div>
                </div>
            </form>
        </div>
    `;
}


function returnSubtask(inputText, i, id) {
    return `
    <div class="task-list" id="taskList${i}">
        <div class="liest-field">
            <div class="tasks-content">
                <p class="finished-content" id="finishedContent${i}">${inputText}</p>
            </div>
            <div class="edit-delete-container">
                <div class="edit-box">
                    <img onclick="toggleSubtask(${i})" class="edit-image" id="editImage${i}" src="../images/Property 1=edit.svg" alt="">
                </div>
                <div class="delete-box" id="deleteBox">
                    <img onclick="deleteButton(${i}, '${inputText}', ${id})" class="delete-image" id="deleteImage${i}" src="../images/Property 1=delete.svg" alt="" >
                </div>
            </div>
        </div>
    </div>
    <div class="edit-list d-none" id="editTaskList${i}">
        <div class="liest-field">
            <div class="tasks-content">
                <input id="editInput${i}" class="subtask-input" value="${inputText}" type="text">
            </div>
            <div class="delete-check-container">
                <div class="delete-box">
                    <img onclick="deleteButton(${i}, '${inputText}', ${id})" class="delete-image" src="../images/Property 1=delete.svg" alt="">
                </div>
                <div class="edit-box">
                    <img onclick="checkEditedTaskList(${i}, '${inputText}', ${id})" id="checkImage" class="subtask-button-check" src="../images/Property 1=check.svg" alt="" onclick="addSubtask(); closeImages();">
                </div>
            </div>
        </div>
    </div>
    `
};


function returnAssignedToContactList(i, contact) {
    return `
    <div onclick="assignTo('${i}', '${contact['name']}', '${contact['email']}','${contact['phone']}', '${contact['initial']}', '${contact['BgColor']}')" id="contact${i}" class="contacts-followfield">
        <div class="contacts-name">
            <div style="background-color:${contact['BgColor']}" class="contact_circle">${contact['initial']}</div>
            <span class="contact-name">${contact['name']}</span>
        </div>
        <div>
            <div class="check-button">
                <img id="check-contact${i}-img" src="../images/Rectangle 5.svg" alt="">
                <img id="checked-contact${i}-img" class="d-none" src="../images/check-white.svg" alt="">
            </div>
        </div>
    </div>
    `;
}


function returnSelectedContactBadges(selectedContact) {
    return `
        <div class="contact_circle" style="background-color:${selectedContact['BgColor']}">${selectedContact['initial']}</div>
    `
}


function renderCategory(category, c) {
    return `
    <div class="category-list" id="category${c}" onclick="acceptCategory('${category}', event)">
        <span >${category}</span>
    </div>
    `;
}


function returnAddTaskPopUp(status) {
    return `
    <div onclick="closeOpenedMenu(event)" class="popup-addtask-container opening" id="popup">
    <div class="task-headline">
        <h1 class="task-name">Add Task</h1>
        <img onclick="closeAddTaskPopUp()" class="popup-add-task-close" src="../images/Property 1=close.svg" alt="">
    </div>
<form onsubmit="checkCategoryValidity(event) && setNewTask('${status}'); return false" class="task-input-container">
    <div class="mobile-scroll">
        <div class="task-input">
            <div class="left-field popup-field">
                    <div class="titel-field">
                        <h4>Title<span class="letter-color">*</span></h4>
                        <input autocomplete="off" id="titel-input" required type="text" name="myInput" placeholder="Enter a title">
                        <div  class="error_warning">
                            <span id="title-warning-text">This field is required</span>
                        </div>
                    </div>    
                <div class="description-field">
                    <h4>Description</h4>
                    <div class="textarea-container">
                        <div class="textarea-field">
                            <textarea id="read-description" class="textarea attrebute" type="text" name="myTextarea"
                                placeholder="Enter a Description" spellcheck></textarea>
                        </div>
                        <div>
                            <img class="description-icon" src="../images/Recurso 1 1.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="contacts-field box2">
                    <h4>Assigned to</h4>
                    <div onclick="toggleContacts(event)" class="custom-dropdown">
                        <input onkeyup="searchContactToAssign()" id="assignTo-input" class="assign-input" type="search" placeholder="Select contacts to assign">
                        <div class="assign-button">
                            <img onclick="rotateIcon()" src="../images/arrow_drop_downaa.svg" alt="Arrow Icon" id="arrowIcon">
                        </div>
                    </div>
                    <div class="contact-container d-none" id="contactContainer">
                        <div onclick="stop(event)" class="contact-box">
                            <div id="current-user" class="contacts-topfield">
                                <div class="contacts-name">
                                    <div id="current-user-initial" class="contact_circle"></div>
                                    <span id="current-user-name" class="contact-name"></span>
                                </div>
                                <div>
                                    <div class="check-button">
                                        <img src="../images/Rectangle 5.svg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div id="assigned-to-contact-list"></div>
                        </div>
                    </div>
                </div>
                <div id="selected-contact-ctn" class="selected_contact_ctn"></div>
            </div>
            <div class="right-field popup-field">
                <div>
                    <div class="date-field">
                        <h4>Due Date<span class="letter-color">*</span></h4>
                        <input id="calender-input" required class="calender_input" type="date" placeholder="dd/mm/yyyy" min="${getTodaysDateForCalender()}">
                        <div class="error_warning">
                            <span id="calender-warning-text">This field is required</span>
                        </div>
                    </div>
                </div>
                <div class="prio-container box1">
                    <h4>Prio</h4>
                    <div class="button-selection">
                        <div class="prio-button" id="buttonUrgent" onclick="changeButtonStyles('Urgent')">Urgent
                            <img class="prio-image" id="iconUrgent" src="../images/capa 2.svg" alt=""></div>
                        <div class="prio-button selected" id="buttonMedium" onclick="changeButtonStyles('Medium')">Medium
                            <img class="prio-image" id="iconMedium" src="../images/prio media.svg" alt=""></div>
                        <div class="prio-button" id="buttonLow" onclick="changeButtonStyles('Low')">Low <img
                            class="prio-image" id="iconLow" src="../images/prio baja.svg" alt=""></div>
                    </div>
                </div>
                <div class="category-fields">
                    <h4>Category<span class="letter-color">*</span></h4>
                    <div class="category_ctn">
                        <div onclick="toggleDropdown(event)" class="category-box">
                            <div class="custom-list">
                                <div>
                                    <input disabled required class="span-category" id="selectedCategory" type="text" name="myInput" placeholder="Select task category">
                                </div>
                                <div class="category-icon-field">
                                    <img class="drop-option" id="selectIcon" src="../images/arrow_drop_downaa.svg"
                                        alt="Arrow">
                                </div>
                            </div>
                        </div>
                        <div class="category_error_warning">
                            <span id="category-warning-text" class="d-none">This field is required</span>
                        </div>
                    
                        <div id="dropdownOptions" class="dropdown-options d-none"></div>
                    </div>
                </div>

                <div class="subtask-container">
                    <h4>Subtasks</h4>
                    <div class="subtask-field">
                        <div class="subtask-input-container">
                            <input oninput="showSubtaskImagesByInput()" id="subtaskInput" class="subtask-input" type="text" name="myInput" placeholder="Add new subtask">
                        </div>
                        <div class="subtask-image-field-first" id="imageContainer">
                            <img src="../images/Property 1=add.svg" alt="" onclick="toggleSubtaskImages()">
                        </div>
                        <div class="subtask-image-field-second d-none" id="newImages">
                            <img id="closeImag" onclick="toggleSubtaskImages()" class="subtask-button-close" src="../images/Property 1=close.svg" alt="">
                            <img id="checkImage" class="subtask-button-check" src="../images/Property 1=check.svg" alt="" onclick="addSubtask()">
                        </div>
                    </div>
                    <div class="subtask-content" id="subtaskContent"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="task-below popup-task-below">
        <div>
            <div class="requered-field">
                <span class="letter-color">*</span>
                This field is required
            </div>
        </div>
        <div class="clear-create-button">
            <button onclick="clearBegonnenNewTask(event)" type="reset" class="clear-button">Clear<img src="../images/close.svg"></button>
            <button id="add-task-form-button" type="submit" class="create-button">Create Task <img class="clear-create-img" src="../images/check.svg" alt=""></button>
        </div>
    </div>
</form>
</div>
<div id="added-task-to-board-popup-div" class="added_task_to_board_div d-none"></div>
    `;
}


function taskAddedToBoard() {
    return `
            <div id="task-added-to-board" class="task-added-to-board showaddedtoBoard">
                <span class="board-span">Task added to board</span>
                <img class="board-img" src="../images/board.svg" alt="">
            </div>
    `;
}