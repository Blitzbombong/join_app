// assigned to

/**
 * The renderAssignedToCurrentUser function updates user display on an HTML page.
 *  It retrieves HTML elements for username, initial value, and a container.
 *  If a current user (currentUser) exists, it updates the username with the label "(You),"
 *  displays the initial value, and sets the background color accordingly.
 *  If no user is present, it hides the container.
 * 
 */
function renderAssignedToCurrentUser() {
    let currentUserCtn = document.getElementById('current-user');
    let currentUserName = document.getElementById('current-user-name');
    let currentUserInitial = document.getElementById('current-user-initial');
    if (currentUser) {
        currentUserName.innerHTML = currentUser[0]['user'] + ' (You)';
        currentUserInitial.innerHTML = currentUser[0]['initial'];
        currentUserInitial.style.backgroundColor = currentUser[0]['BgColor'];
    } else {
        currentUserCtn.classList.add('d-none');
    }
}


/**
 * The renderAssignedToContactList function creates a sorted contact list on an HTML page.
 * It retrieves an HTML element with the ID 'assigned-to-contact-list,' 
 * sorts the contacts by name, and then renders each contact using the returnAssignedToContactList function,
 * appending the generated HTML code to the element.
 * 
 */
function renderAssignedToContactList() {
    let assignedToContactList = document.getElementById('assigned-to-contact-list');
    assignedToContactList.innerHTML = '';
    contacts.sort((a, b) => { return compareStrings(a.name, b.name) });
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        assignedToContactList.innerHTML += returnAssignedToContactList(i, contact);
    }
}


/**
 * The searchContactToAssign function searches through a contact list based on the entered search term.
 * It retrieves the search term element and the contact list container, removes the 'd-none' class, and clears the displayed list.
 * Then, it iterates through the contact list, adds matching contacts to the displayed list, and applies specific styles.
 * If the search query is empty, all contacts are displayed again, and previously selected contacts receive special styles.
 * 
 */
function searchContacts(searchedContact) {
    let filteredContacts = [];

    for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        if (contact['name'].toLowerCase().startsWith(searchedContact) && searchedContact !== '') {
            filteredContacts.push(contact);
        }
    }

    return filteredContacts;
}


/**
 * 
 * Renders search results for assigned contacts in the contact list
 * 
 * @param {*} searchedContact 
 */
function renderSearchResults(searchedContact) {
    let assignedToContactList = document.getElementById('assigned-to-contact-list');
    assignedToContactList.innerHTML = '';

    let filteredContacts = searchContacts(searchedContact);

    filteredContacts.forEach((contact, index) => {
        assignedToContactList.innerHTML += returnAssignedToContactList(index, contact);
        styleAlreadySelectedContact(index, searchedContact);
    });
}


/**
 * 
 * Initiates the contact search for assignment, renders results, and styles selected contacts
 * 
 */
function searchContactToAssign() {
    let searchedContact = document.getElementById('assignTo-input').value.toLowerCase();
    contactContainer.classList.remove('d-none');

    renderSearchResults(searchedContact);

    if (searchedContact === '') {
        renderAssignedToContactList();
        selectedContacts.forEach((selectedContact) => {
            contacts.forEach((contact, index) => {
                if (selectedContact['name'] === contact['name']) {
                    styleSelectedContact(index);
                }
            });
        });
    }
}

/**
 *The styleAlreadySelectedContact function checks if an already selected contact starts with the entered
 *search term and applies specific styles to the contact identified by the index in the contact list.
 * 
 * @param {*} index 
 * @param {*} searchedContact 
 */
function styleAlreadySelectedContact(index, searchedContact) {
    selectedContacts.forEach((selectedContact) => {
        if (selectedContact['name'].toLowerCase().startsWith(searchedContact)) {
            styleSelectedContact(index);
        }
    })
}


/**
 * The assignTo function selects or deselects a contact. It finds the contact in the list of selected contacts based on the email address.
 * Depending on whether the contact is already selected or not, it is either added to or removed from the list.
 * The visual representation is updated to reflect the selection.
 * 
 * 
 * @param {*} i 
 * @param {*} name 
 * @param {*} email 
 * @param {*} phone 
 * @param {*} initial 
 * @param {*} BgColor 
 */
function assignTo(i, name, email, phone, initial, BgColor) {
    const index = selectedContacts.findIndex(c => c.email === email);
    styleSelectedContact(i);
    if (index > -1) {
        selectedContacts.splice(index, 1);
        renderSelectedContactBadges(selectedContacts);
    } else {
        selectedContacts.push({ name, email, phone, initial, BgColor });
        renderSelectedContactBadges(selectedContacts);
    }
}


/**
 * 
 * Handles the assignment to the current user, updates selected contacts, and renders badges
 * 
 * @param {*} currentUser 
 */
function assignedToCurrentUser(currentUser){
    let name = currentUser[0]['user'] + ' (You)';
    let initial = currentUser[0]['initial'];
    let BgColor = currentUser[0]['BgColor'];
    let email = currentUser[0]['email'];
    const index = selectedContacts.findIndex(c => c.email === email);
    styleSelectedCurrentUser();
    if (index > -1) {
        selectedContacts.splice(index, 1);
        renderSelectedContactBadges(selectedContacts);
    } else {
        selectedContacts.push({ name, email, initial, BgColor });
        renderSelectedContactBadges(selectedContacts);
    }
}


/**
 * 
 * The renderSelectedContactBadges function updates the display of selected contacts by clearing
 * the content of the HTML element with the ID 'selected-contact-ctn' and then adding badges for each selected 
 * contact based on the information in the list of selected contacts.
 * 
 * @param {*} selectedContacts 
 */
function renderSelectedContactBadges(selectedContacts) {
    let selectedContactCtn = document.getElementById('selected-contact-ctn');
    selectedContactCtn.innerHTML = '';
    for (let i = 0; i < selectedContacts.length; i++) {
        const selectedContact = selectedContacts[i];
        selectedContactCtn.innerHTML += returnSelectedContactBadges(selectedContact);
    }
}


/**
 * 
 * The renderSelectedContactBadgesForEditOption function updates the display of selected contacts for the editing option
 *  by clearing the content of the HTML element with the ID 'selected-contact-ctn' and then adding badges
 *  for each assigned contact based on the information in the list of assigned contacts.
 * 
 * @param {*} assignedContacts 
 */
function renderSelectedContactBadgesForEditOption(assignedContacts) {
    let selectedContactCtn = document.getElementById('selected-contact-ctn');
    selectedContactCtn.innerHTML = '';
    for (let i = 0; i < assignedContacts.length; i++) {
        const assignedContact = assignedContacts[i];
        selectedContactCtn.innerHTML += returnSelectedContactBadges(assignedContact);
    }
}


/**
 * 
 * Toggles styling for a selected contact by updating visibility and applying CSS classes
 * 
 * @param {*} i 
 */
function styleSelectedContact(i) {
    document.getElementById(`check-contact${i}-img`).classList.toggle('d-none');
    document.getElementById(`checked-contact${i}-img`).classList.toggle('d-none');
    document.getElementById(`contact${i}`).classList.toggle('contact_selected');
}


/**
 * 
 * Toggles styling for the selected current user by updating visibility and applying CSS classes
 * 
 */
function styleSelectedCurrentUser() {
    document.getElementById(`check-contact-img`).classList.toggle('d-none');
    document.getElementById(`checked-contact-img`).classList.toggle('d-none');
    document.getElementById('current-user').classList.toggle('contact_selected');
}


/**
 * 
 * Toggles rotation for the assign button icon by updating the 'rotate' class
 * 
 */
function rotateIcon() {
    const icon = document.querySelector('.assign-button img');
    icon.classList.toggle('rotate');
}


/**
 * 
 * The toggleContacts function toggles the visibility of the contact list on an HTML page. 
 * It uses the CSS class 'd-none' to show or hide the contact container and adds or removes a class ('rotate') to rotate an arrow icon, 
 * indicating the state of the contact list.
 * 
 * @param {*} event 
 */
function toggleContacts(event) {
    const contactContainer = document.getElementById('contactContainer');
    const arrowIcon = document.getElementById('arrowIcon');
    contactContainer.classList.toggle('d-none');
    stop(event);
    if (!contactContainer.classList.contains('d-none')) {
        arrowIcon.classList.add('rotate');
    } else {
        arrowIcon.classList.remove('rotate');
    }
}