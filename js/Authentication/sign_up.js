
/**
 * 
 * load user from backend server when page loaded
 */
async function initSignUp() {
    await loadUsers();
}

/**
 * 
 * register new user and redirect to login page
 */
async function signUp() {
    let user = document.getElementById('user-input').value;
    let email = document.getElementById('email-input').value;
    let password = document.getElementById('password-input').value;
    if (loginIsValid && isChecked) {
        users.push({ user, email, password });
        await setItem('users', JSON.stringify(users));
        resetForm();
        showSignUpConfirmation();
        setTimeout(() => window.location.href = "../HTML/login.html", 2000);
    }
}

/**
 * 
 * check if user already exist and return custom validty message if failure exist
 */
function checkExistingUser() {
    resetSignUpCustomValidity();
    let userError = document.getElementById('user-input');
    let emailError = document.getElementById('email-input');
    let username = document.getElementById('user-input').value;
    let userEmail = document.getElementById('email-input').value;
    let user = users.find(u => u.user == username);
    let email = users.find(u => u.email == userEmail);
    returnLoginCustomValidityMessage(user, email, userError, emailError);
}

/**
 * 
 * clear all formular input and set sign up button to disabled 
 */
function resetForm() {
    let signUpButton = document.getElementById('signUpButton');
    let user = document.getElementById('user-input');
    let email = document.getElementById('email-input');
    let password = document.getElementById('password-input');
    let confirmedPassword = document.getElementById('password-confirmation');
    user.value = "";
    email.value = "";
    password.value = "";
    confirmedPassword.value = "";
    signUpButton.disabled = true;
}

/**
 * 
 * show confirmation by successed registration
 */
function showSignUpConfirmation() {
    document.getElementById('sign-up-animation-div').classList.remove('d-none');
    document.getElementById('sign-up-animation').classList.add('add_sign_Up_animation');
}


/**
 * 
 * @param {string} name 
 * @returns {string} first capitalize letter of @param
 */

function returnContactInitialLetter(name) {
    return name.replace(/[^A-Z]+/g, '');
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
 * 
 * @param {string} user 
 * @param {string} email 
 * @param {HTMLInputElement} userError 
 * @param {HTMLInputElement} emailError 
 */
function returnLoginCustomValidityMessage(user, email, userError, emailError) {
    if (user) {
        !loginIsValid
        userError.setCustomValidity('This User Already exist');
    } else if (email) {
        !loginIsValid
        emailError.setCustomValidity('This email adress has already been registered');
    } else {
        loginIsValid;
    }
}

/**
 * 
 * clear the sign up form validity message
 */
function resetSignUpCustomValidity() {
    document.getElementById('user-input').setCustomValidity('');
    document.getElementById('email-input').setCustomValidity('');
}

/**
 * activate sign up button if privacy policy is accepted
 */
function activateButton() {
    let signUpButton = document.getElementById('signUpButton');
    isChecked ? signUpButton.disabled = false : signUpButton.disabled = true && signUpValidation();
}

/**
 * 
 * custom password validation for password (min 8 charachter with at least 1 lowercase, 1 uppercase and 1 digit)
 */
function passwordValidation() {
    let password = document.getElementById('password-input');
    let confirmedPassword = document.getElementById('password-confirmation');
    let passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    passwordValidation.test(password.value) ? loginIsValid = true : loginIsValid = false;
    !loginIsValid ? password.setCustomValidity('The Password must be at least 8 characters with at least one lowercase, one uppercase and one digit. ') :
        password.setCustomValidity('');
    password.value === confirmedPassword.value ? loginIsValid = true : loginIsValid = false;
    !loginIsValid ? confirmedPassword.setCustomValidity('The Confirm Password confirmation does not match') :
        confirmedPassword.setCustomValidity('');
}

/**
 * 
 * return failure message if privacy policy is not checked
 */
function signUpValidation() {
    let errorMsg = document.getElementById('input-error');
    !isChecked && !errorMsg.textContent ? errorMsg.innerHTML = returnPrivacyPoliceErrorMsg() :
        errorMsg.innerHTML = '';
}

/**
 * 
 * show / hide privacy policy check button and set isChecked variable when selected or not
 */
function checkPrivatePolicyButton() {
    isChecked = !isChecked;
    document.getElementById('check-button').classList.toggle('d-none');
    document.getElementById('checked-button').classList.toggle('d-none');
}



