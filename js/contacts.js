let contacts = [];
let contactIsValid = false;

/**
 * 
 * Renders the "Contacts" interface by invoking various functions
 */
async function renderContactsPage() {
    contactsBgrColor();                     // Set background color for Contact Menu in navigation bar
    addContentCSS();                        // Add correct CSS style
    removeBgrColorWithoutContacts();        // reset background color of other menu in navigation bar
    addJoinLogoClickable();                 // make Join logo clickable (is basicaly not clickable )
    returnContactPage();                    // return HTML of Contact Interface
    renderContacts();                       // render Contacts in contact book
    hideLegalContent();                     // hide legal content Container
    resetArraysForNewTasks();               // clear arrays
}

/**
 * function to set and sort organizer for contact list
 * @returns {array} array of all contacts first character of name sorted alphabetically
 */

function setOrganizer() {
    let organizer = [];
    for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        let firstCharFromName = contact['name'].charAt(0).toUpperCase();
        organizer.push(firstCharFromName);
        organizer = organizer.filter((item, index) =>
            organizer.indexOf(item) === index);
    }
    organizer.sort((a, b) => { return compareStrings(a, b) });
    return organizer;
}

/**
 * 
 * render contacts and organizer alphabetically
 */
function renderContacts() {
    let organizer = setOrganizer();
    let contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    for (let i = 0; i < organizer.length; i++) {
        const organizerLetter = organizer[i];
        contactList.innerHTML += returnContactsOrganizer(i, organizerLetter);
        renderMatchedContact(i, organizerLetter);
    }
}

/**
 * render contact which begin with character of organiser
 * @param {number} i index of organizer
 * @param {string} organizerLetter character of organiser
 */

function renderMatchedContact(i, organizerLetter) {
    let contactList = document.getElementById('contact-list');
    let contactMatches = contacts.filter(e => e.name.charAt(0) === organizerLetter);
    contactMatches.sort((a, b) => { return compareStrings(a.name, b.name) });
    for (let j = 0; j < contactMatches.length; j++) {
        contactList.innerHTML += returnContacts(i, contactMatches[j]);
    }
}


/**
 * 
 * function to add new contact top contact book if form validation passed
 */
function addNewContact() {
    contactIsValid ?                    // check if form validation passed
        setNewContact() &               // set a new contact to backend server
        closeContactPopup() &           // close add contact formulare popup
        showContactCreatedPopup() &     // show success popup for created contact
        removeAnimationClass() &        // remove slide animation
        renderContacts() &              // render Contacts in contact book
        jumpToCreatedContact() : '';    // jump to just created contact
}

/**
 * 
 *  jump to just created contact
 */
function jumpToCreatedContact() {
    let lastCreatedContact = contacts[contacts.length - 1];
    let lastCreatedContactEmail = lastCreatedContact['email'];
    let justCreatedContactInformation = document.getElementById(lastCreatedContactEmail);
    justCreatedContactInformation.click();
}

/**
 * 
 * set new Contact in backend server
 */
async function setNewContact() {
    let inputedName = document.getElementById('new-contact-name').value;
    let name = formatName(inputedName);
    let email = document.getElementById('new-contact-email').value;
    let phone = document.getElementById('new-contact-phone').value;
    let initial = returnContactInitialLetter(name);
    let BgColor = setRandomColor();
    contacts.push({ name, email, phone, initial, BgColor });
    await setItem('contacts', JSON.stringify(contacts));
}

/**
 * 
 * @param {string} name name of contact to be created
 * @returns name of contact to be created with uppercased first character
 */

function formatName(name) {
    return name.replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * 
 * check if contact already exist for the form validation
 */
function checkExistingContact() {
    resetAddContactCustomValidity();
    let contactName = document.getElementById('new-contact-name');
    let contactEmail = document.getElementById('new-contact-email');
    let contactPhone = document.getElementById('new-contact-phone');
    let inputedName = document.getElementById('new-contact-name').value;
    let name = formatName(inputedName);
    name = contacts.find(u => u.name == name);
    let email = contacts.find(u => u.email == contactEmail.value);
    let phone = contacts.find(u => u.phone == contactPhone.value);
    returnCustomValidityMessage(name, email, phone, contactName, contactEmail, contactPhone);
}


/**
 * 
 * return custom validity message for the form validation
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 * @param {string} contactName 
 * @param {string} contactEmail 
 * @param {number} contactPhone 
 */
function returnCustomValidityMessage(name, email, phone, contactName, contactEmail, contactPhone) {
    if (name) {
        contactIsValid = false;
        contactName.setCustomValidity('This Person already exist in your contacts');
    } else if (email) {
        contactIsValid = false;
        contactEmail.setCustomValidity('This E-Mail adress has already been added to your contacts');
    } else if (phone) {
        contactIsValid = false;
        contactPhone.setCustomValidity('This Phone Number is already attributed to a contact');
    } else {
        contactIsValid = true;
    }
}

/**
 * 
 * clear the form validity message
 */
function resetAddContactCustomValidity() {
    document.getElementById('new-contact-name').setCustomValidity('');
    document.getElementById('new-contact-email').setCustomValidity('');
    document.getElementById('new-contact-phone').setCustomValidity('');
}

/**
 * function to edit contact informations
 * @param {string} name name of the contact
 * @param {string} email email of the contact
 * @param {string} phone phone number of the contact
 * @param {string} initial initial opf the contact
 * @param {string} BgColor color of contact badge
 */

async function editContact(name, email, phone, initial, BgColor) {
    let index = contacts.findIndex(e => e.email === email);
    name = document.getElementById(`edited-${name}`).value;
    email = document.getElementById(`edited-${email}`).value;
    phone = document.getElementById(`edited-${phone}`).value;
    initial = returnContactInitialLetter(name);
    contacts.splice(index, 1, { name, email, phone, initial, BgColor });
    await setItem('contacts', JSON.stringify(contacts));
    editSelectedContacts(name, email, phone, initial, BgColor);
    closeContactPopup();
    renderContacts();
    showContactInformation(name, email, phone, initial, BgColor);
}


/**
 * edit array of contacts and save in backend sever
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 * @param {string} initial 
 * @param {string} BgColor 
 */
async function editSelectedContacts(name, email, phone, initial, BgColor) {
    for (let i = 0; i < tasks.length; i++) {
        const taskContacts = tasks[i]['contacts'];
        let index = taskContacts.findIndex(e => e.email === email);
        taskContacts.splice(index, 1, { name, email, phone, initial, BgColor });
    }
    await setItem('tasks', JSON.stringify(tasks));
}

/**
 * 
 * show or hide, with animation, the popup to confirm contact deletion
 */
function toggleDeleteContactConfirmationPopup() {
    let selectedContactInfo = document.getElementById('contact-deletion-ctn');
    selectedContactInfo.classList.toggle('d-none');
    selectedContactInfo.classList.toggle('open_animation_contact_popup');
}

/**
 * 
 * close popup form contact deletion confirmation without animation
 */
function closeDeleteContactConfirmationPopup() {
    let selectedContactInfo = document.getElementById('contact-deletion-ctn');
    selectedContactInfo.classList.add('d-none');
}


/**
 * function to delete a contact from the list
 * @param {string} email email of the contact
 */
async function deleteContact(email) {
    let index = contacts.findIndex(e => e.email === email); // search index of selected contact
    contacts.splice(index, 1);
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    toggleDeleteContactConfirmationPopup();
    closeContactPopup();
    let contactInformations = document.getElementById('selected-contact-content');
    contactInformations.innerHTML = '';
}

/**
 * 
 * load the contact from backend server
 */
async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch {
        console.log('the contatcs were not loaded');
    }
}


/**
 * set a random color to be returned as background color for each contacts
 * @returns {string} color code
 */
function setRandomColor() {
    const letters = '0123456789ABCDEF';
    let BgColor = '#';
    for (let i = 0; i < 6; i++) {
        BgColor += letters[Math.floor(Math.random() * 16)];
    }
    return BgColor;
}

/**
 * function to render information of selected contact
 * @param {string} name name of the contact
 * @param {string} email email of the contact
 * @param {string} phone phone number of the contact
 * @param {string} initial initial opf the contact
 * @param {string} BgColor color of contact badge
 */

function showContactInformation(name, email, phone, initial, BgColor) {
    let width = window.innerWidth;
    if (width < 1000) {
        showSelectedContactInformations(name, email, phone, initial, BgColor);
        toggleCSSContactInformation()
        toggleAddcontactMobileMenu();
    } else {
        showSelectedContactInformations(name, email, phone, initial, BgColor);
        showSelectedContactAnimation();
    }
}

/**
 * render information of selected contact
 * @param {string} name 
 * @param {string} email 
 * @param {number} phone 
 * @param {string} initial 
 * @param {string} BgColor 
 */
function showSelectedContactInformations(name, email, phone, initial, BgColor) {
    let width = window.innerWidth;
    let contactInformations = document.getElementById('selected-contact-content');
    contactInformations.innerHTML = returnContactInformations(name, email, phone, initial, BgColor);
    width > 1000 ? setSelectedContactOnClick(email) : '';
}

/**
 * return all uppercase letter of name to be rendered as initial
 * @param {string} name 
 * @returns {string} all uppercase letters
 */
function returnContactInitialLetter(name) {
    return name.replace(/[^A-Z]+/g, '');
}

/**
 * 
 * show slide animation for selected contact
 */
function showSelectedContactAnimation() {
    document.getElementById('selected-contact-content').classList.add('slide_selected_contact');
    setTimeout(() =>
        document.getElementById('selected-contact-content').classList.remove('slide_selected_contact')
        , 400);
}

/**
 * set style (background color and no pointer) on the selected contact
 * @param {string} email 
 */
function setSelectedContactOnClick(email) {
    resetContactSelection();
    let contact = document.getElementById(email);
    contact.classList.add('contact_selected');
    contact.classList.add('p-none');
}

/**
 * 
 * reset style of all contacts in contact book but of the selected one
 */
function resetContactSelection() {
    let contactSelection = document.querySelectorAll('.contact_div');
    contactSelection.forEach((contactSelection) => {
        contactSelection.classList.remove('contact_selected');
        contactSelection.classList.remove('p-none');
    })
}

/**
 * 
 * hide informations of selected contact
 */
function closeSelectedContactInformation() {
    toggleAddcontactMobileMenu();
    toggleCSSContactInformation();
}

/**
 * 
 * add or remove style of contact information
 */
function toggleCSSContactInformation() {
    let contactList = document.getElementById('contact-list-section');
    contactList.classList.toggle('d-none');
    let contactInformations = document.getElementById('contactInformations');
    contactInformations.classList.toggle('selected_contact_infos');
    contactInformations.classList.toggle('mobile_selected_contact_infos');
}

/**
 * 
 * open formular for creating a new contact
 */
function openAddContact() {
    let width = window.innerWidth;
    let addContactCtn = document.getElementById('popup-ctn');
    addContactCtn.innerHTML = returnAddContactPopup();
    openContactPopup();
    if (width < 1000) {
        document.getElementById('contact-popup-left-button').classList.add('d-none');
    }
}

/**
 * 
 * change style of div to show and open formular popup
 */
function openContactPopup() {
    let width = window.innerWidth;
    let addContactCtn = document.getElementById('popup-ctn');
    let addContact = document.getElementById('popup');
    if (width <= 1000) {
        addContact.classList.add('open_mobile_animation_contact_popup')
    } else {
        addContact.classList.add('open_animation_contact_popup');
    }
    addContactCtn.classList.toggle('d-none');
}

/**
 * 
 * close formular popup for contact creation
 */
function closeContactPopup() {
    let addContact = document.getElementById('popup');
    let addContactCtn = document.getElementById('popup-ctn');
    if (window.matchMedia("(min-width: 1000px)").matches &&
        !addContactCtn.classList.contains('d-none')) {
        addContact.classList.remove('open_animation_contact_popup');
        addContact.classList.add('close_animation_contact_popup');
        setTimeout(() => {
            addContactCtn.classList.toggle('d-none');
            addContactCtn.innerHTML = '';
        }, 490);
    } else if (window.matchMedia("(max-width: 1000px)").matches) {
        closeMobileEditMenu();
        closeSelectedContactInformation();
    }
}


/**
 * 
 * close mobile formular popup for contact creation
 */
function closeMobileContactPopup() {
    let addContact = document.getElementById('popup');
    let addContactCtn = document.getElementById('popup-ctn');
    addContact.classList.remove('open_mobile_animation_contact_popup');
    addContact.classList.add('close_mobile_animation_contact_popup');
    setTimeout(() => addContactCtn.classList.toggle('d-none'), 450);
}

/**
 * 
 * show or hide menu to edit / delete contact in mobile version
 */
function toggleAddcontactMobileMenu() {
    document.getElementById('mobile-add-contact-button').classList.toggle('d-none');
    document.getElementById('mobile-contact-edit-menu').classList.toggle('d-none');
}

/**
 * render contact editor
 * @param {Event} event 
 * @param {string} name 
 * @param {string} email 
 * @param {number} phone 
 * @param {string} initial 
 * @param {string} BgColor 
 */
function openEditContact(event, name, email, phone, initial, BgColor) {
    setMobileEditContact(event);
    let editContactCtn = document.getElementById('popup-ctn');
    editContactCtn.innerHTML = returnEditContactPopup(name, email, phone, initial, BgColor);
    openContactPopup();
}

/**
 * style contact editor for mobile version
 * @param {Event} event 
 */
function setMobileEditContact(event) {
    let width = window.innerWidth;
    if (width < 1000) {
        stop(event);
        let editContact = document.getElementById('edit-contact');
        editContact.classList.add('curent_selected_mobile_contact_editor');
    }
}

/**
 * open and render menu for deleting or editing selected contact in mobile version
 * @param {string} name 
 * @param {string} email 
 * @param {number} phone 
 * @param {string} initial 
 * @param {string} BgColor 
 */
function openMobileEditMenu(name, email, phone, initial, BgColor) {
    let mobileEditMenuCtn = document.getElementById('mobile-edit-contact-menu-ctn');
    mobileEditMenuCtn.innerHTML = returnMobileEditContactMenu(name, email, phone, initial, BgColor);
    let mobileEditMenu = document.getElementById('mobile-edit-contact-menu');
    mobileEditMenuCtn.classList.remove('d-none');
    mobileEditMenu.classList.add('animate_edit_contact_menu');
}

/**
 * 
 * close mobile edit menu
 */
function closeMobileEditMenu() {
    let mobileEditMenuCtn = document.getElementById('mobile-edit-contact-menu-ctn');
    let mobileEditMenu = document.getElementById('mobile-edit-contact-menu');
    let editContact = document.getElementById('edit-contact');
    editContact.classList.remove('curent_selected_mobile_contact_editor');
    mobileEditMenu.classList.remove('animate_edit_contact_menu');
    mobileEditMenu.classList.add('close_edit_contact_menu');
    setTimeout(() => mobileEditMenuCtn.classList.add('d-none'), 300);
}

/**
 * 
 * show popup after contact created successfuly
 */
function showContactCreatedPopup() {
    document.getElementById('contact-created-popup').classList.add('animate_contact_created_popup')
}

/**
 * 
 * remove animation of contact created popup
 */
function removeAnimationClass() {
    setTimeout(() =>
        document.getElementById('contact-created-popup').classList.remove('animate_contact_created_popup')
        , 5000);
}

/**
 * 
 * Adds background color styling to the "Contacts" elements
 * 
 */
function contactsBgrColor() {
    document.getElementById('contacts').classList.add('currentTemplate', 'p-none');
    document.getElementById('contacts_mobile').classList.add('currentTemplate', 'p-none');
}


/**
 * 
 * Removes background color styling from elements other than "Contacts"
 * 
 */
function removeBgrColorWithoutContacts() {
    document.getElementById('add_task').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary').classList.remove('currentTemplate', 'p-none');
    document.getElementById('add_task_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('board_mobile').classList.remove('currentTemplate', 'p-none');
    document.getElementById('summary_mobile').classList.remove('currentTemplate', 'p-none');
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

/**
 * 
 * change style of main container 
 * 
 */
function addContentCSS() {
    document.getElementById('content').classList.remove('contentBoard');
    document.getElementById('content').classList.add('content_section');
}