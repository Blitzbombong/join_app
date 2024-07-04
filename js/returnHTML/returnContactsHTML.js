function returnContactPage() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = `
        <main class="contacts_content">
            <section id="contact-list-section" class="contact_list_section">

                <div class="add_contact_btn_div">
                    <div onclick="openAddContact()" id="add-contact-button">
                        <span>Add new contact</span>
                        <img src="../images/person_add.svg" alt="">
                    </div>
                </div>
                <div id="contact-list" class="contacts_list_div"></div>
            </section>
            <section id="contactInformations" class="selected_contact_infos">
                <div class="contact_title_ctn">
                    <div class="contact_title">
                        <h1>Contacts</h1>
                        <img onclick="closeSelectedContactInformation()" src="../images/arrow-left-line.svg">
                    </div>
                    <div class="contacts_subtitle">
                        <div class="contacts_title_vector">
                            <img src="../images/Vector 5.svg" alt="">
                        </div>
                        <span>Better with a Team</span>
                    </div>
                </div>
                <div id="selected-contact-content" class="padding_left_62"></div>
                <div id="contact-created-popup">
                    <span>Contact created successfully</span>
                </div>
            </section>

            <div class="mobile_add_contact_button_ctn">
                <div onclick="openAddContact()" id="mobile-add-contact-button" class="mobile_add_contact_button">
                    <img src="..//images/person_add.svg">
                </div>
            </div>
        </main>
    `;
}

function returnContactsOrganizer(i, organizerLetter) {
    return `
    <div id="contact-organizer${i}">
        <div class="contact_organizer">
            <span>${organizerLetter}</span>
        </div>
        <hr class="divider">
    </div>
`;
}

function returnContacts(i, contactMatches) {
    return `
            <div onclick="showContactInformation('${contactMatches['name']}', '${contactMatches['email']}', '${contactMatches['phone']}','${contactMatches['initial']}', '${contactMatches['BgColor']}')" id="${contactMatches['email']}" class="contact_div">
                <div id="${contactMatches['name']}-profil-picture" class="contact_circle" style="background-color:${contactMatches['BgColor']}">
                ${contactMatches['initial']}
                </div>
                <div class="flex_column gap_5 overflow_hidden">
                    <span id="contact-name-${i}" class="contact_name">${contactMatches['name']}</span>
                    <span id="contact-email-${i}" class="contact_email">${contactMatches['email']}</span>
                </div>
            </div>
    `;
}

function returnContactInformations(name, email, phone, initial, BgColor) {
    return `
        <div class="align_item_center gap_54">
            <div class="selected_contact_circle" style="background-color:${BgColor}">
            ${initial}
            </div>
            <div class="flex_column align_item_start gap_8">
                <div id="selected-contact-${name}" class="selected_contact_name">
                    ${name}
                </div>
                <div class="align_item_center gap_16">
                    <div onclick="openEditContact(event, '${name}', '${email}', '${phone}', '${initial}', '${BgColor}')" id="edit-selected-contact-${name}" class="edit_selected_contact align_item_center gap_8">
                        <img src="../images/edit.svg" alt="">
                        <span>Edit</span>
                    </div>
                    <div onclick="toggleDeleteContactConfirmationPopup()" id="delete-selected-contact-${name}" class="delete_selected_contact align_item_center gap_8">
                        <img src="../images/delete.svg" alt="">
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact_information_title">
            Contact Information
        </div>
        <div class="flex_column gap_15">
            <span class="font_weight_700">Email</span>
            <a href="mailto:${email}" id="selected-contact-${email}" class="selected_contact_email">${email}</a>
        </div>
        <div class="flex_column gap_15">
            <span class="font_weight_700">Phone</span>
            <a href="tel:${phone}" id="${name}-phone-number" class="selected_contact_phone">${phone}</a>
        </div>
        
        <div id="mobile-contact-editor" class="mobile_add_contact_button_ctn">
            <div onclick="openMobileEditMenu('${name}', '${email}', '${phone}', '${initial}', '${BgColor}')" id="mobile-contact-edit-menu" class="mobile_add_contact_button d-none">
                <img src="..//images/more_menu.svg">
            </div>
        </div>
        
        <div onclick="closeMobileEditMenu()" id="mobile-edit-contact-menu-ctn" class="mobile_edit_contact_ctn d-none"></div>
        
        <div id="contact-deletion-ctn" class="contact_deletion_ctn d-none">
            <div class="contact_deletion">
                <div>
                    <p>Are you sure you want to delete this Contact: </p>
                    <span>${name}?</span>
                </div>
                <div class="contact_deletion_btn_ctn gap_16">
                    <button onclick="toggleDeleteContactConfirmationPopup()" id="cancel-deletion"><img src="../images/close.svg" alt="">Cancel</button>
                    <button onclick="deleteContact('${email}')" id="confirm-deletion"><img src="../images/delete.svg" alt="">Delete</button>
                </div>
            </div>    
        </div>
    `;
}

function returnAddContactPopup() {
    return `
        <div onclick="stop(event)" id="popup" class="contact_popup">
            <section class="section_left">
                <div class="close_mobile_contact_popup_div">
                    <div onclick="closeMobileContactPopup()" id="close-contact-popup">
                        <img src="../images/close.svg">
                    </div>
                </div>
                <div class="call_to_action_ctn">
                    <img class="call_to_action_logo" src="../images/join_logo.svg">
                    <div class="call_to_action_text">
                        <h2>Add contact</h2>
                        <span>Tasks are better with a team!</span>
                    </div>
                    <div class="call_to_action_vector">
                        <img src="../images/vector.svg" alt="">
                    </div>
                </div>
            </section>

            <section class="section_right">
                <div class="contact_profil_ctn">
                    <div class="contact_profil">
                        <img src="../images/person_white.svg">
                    </div>
                </div>
                <div class="flex_column width_100">
                    <div class="close_desktop_contact_popup_div">
                        <div onclick="closeContactPopup()" id="close-contact-popup">
                            <img src="../images/close.svg">
                        </div>
                    </div>
                    <form onsubmit="addNewContact(); return false" class="contact_form">
                        <div class="contact_inputs_ctn">
                            <div class="contact_input">
                                <input onblur="checkExistingContact()" id="new-contact-name" required type="text" placeholder="Name">
                                <img src="../images/person.svg" alt="">
                            </div>
                            <div class="contact_input">
                                <input onblur="checkExistingContact()" id="new-contact-email" required type="Email" placeholder="Email">
                                <img src="../images/mail.svg" alt="">
                            </div>
                            <div class="contact_input">
                                <input onblur="checkExistingContact()" id="new-contact-phone" required type="tel" placeholder="Phone">
                                <img src="../images/call.svg" alt="">
                            </div>
                        </div>
                        <div class="contact_buttons_ctn">
                            <button type="button" id="contact-popup-left-button" onclick="closeContactPopup() "class="contact_popup_left_button">Cancel<img src="../images/close.svg"></button>
                            <button class="contact_popup_right_button">Create contact <img src="../images/check.svg"></button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    `;
}

function returnEditContactPopup(name, email, phone, initial, BgColor) {
    return `
        <div onclick="stop(event)" id="popup" class="contact_popup">
            <section class="section_left">
                <div class="close_mobile_contact_popup_div">
                    <div onclick="closeMobileContactPopup()" id="close-contact-popup">
                        <img src="../images/close.svg">
                    </div>
                </div>
                <div class="call_to_action_ctn">
                    <img class="call_to_action_logo" src="../images/join_logo.svg">
                    <div class="call_to_action_text">
                        <h2>Edit contact</h2>
                    </div>
                    <div class="call_to_action_vector">
                        <img src="../images/vector.svg" alt="">
                    </div>
                </div>
            </section>

            <section class="section_right">
                <div class="contact_profil_ctn">
                    <div class="selected_contact_circle" style="background-color:${BgColor}">
                    ${initial}
                    </div>
                </div>
                <div class="flex_column width_100">
                    <div class="close_desktop_contact_popup_div">
                        <div onclick="closeContactPopup()" id="close-contact-popup">
                            <img src="../images/close.svg">
                        </div>
                    </div>
                    <form onsubmit="editContact('${name}','${email}','${phone}','${initial}','${BgColor}'); return false" class="contact_form">
                        <div class="contact_inputs_ctn">
                            <div class="contact_input">
                                <input id="edited-${name}" value="${name}" type="text">
                                <img src="../images/person.svg" alt="">
                            </div>
                            <div class="contact_input">
                                <input id="edited-${email}" value="${email}" type="Email">
                                <img src="../images/mail.svg" alt="">
                            </div>
                            <div class="contact_input">
                                <input id="edited-${phone}" value="${phone}" type="tel">
                                <img src="../images/call.svg" alt="">
                            </div>
                        </div>
                        <div class="contact_buttons_ctn">
                            <button type="button" onclick="deleteContact('${email}')" class="contact_popup_left_button">Delete<img src="../images/close.svg"></button>
                            <button class="contact_popup_right_button">Save<img src="../images/check.svg" alt=""></button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    `;
}

function returnMobileEditContactMenu(name, email, phone, initial, BgColor) {
    return `
    <div id="mobile-edit-contact-menu" class="mobile_edit_contact_menu">
        <div onclick="openEditContact(event, '${name}', '${email}', '${phone}', '${initial}', '${BgColor}')" id="edit-contact" class="mobile_edit_contact">
            <img src="..//images/edit.svg">
            <span>Edit</span>
        </div>
        <div onclick="toggleDeleteContactConfirmationPopup()" id="delete-contact" class="mobile_edit_contact">
            <img src="..//images/delete.svg">
            <span>Delete</span>
        </div>
    </div>
    `;
}