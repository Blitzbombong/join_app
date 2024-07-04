/**
 * 
 * This function checks if the width of the text content within elements having the class 'assignedNameText' 
 * is greater than the width of their respective parent elements.
 * 
 */
function checkNameTextLengthToSlideAnimation() {
    let assignedNameElements = document.querySelectorAll('.assignedNameText');

    assignedNameElements.forEach(text => {
        if (text.scrollWidth > text.parentElement.offsetWidth) {
            textSlideAnimation(text);
        } else {
            text.style.animation = 'none';
        }
    });
    resetTimerForTextAnimation();
}


/**
 * 
 * This function is designed to perform a sliding text animation. 
 * It initially slides the text to the left and stops after 2 seconds. 
 * After 5 seconds, it then slides the text to the right and stops after 0.2 seconds.
 * 
 * @param {string} text 
 */
function textSlideAnimation(text) {
    text.style.animation = 'none';
    void text.offsetWidth;
    text.style.animation = 'slideTextToLeftAndStop 1s linear forwards 2s';
    setTimeout(() => {
        text.style.animation = 'none';
        void text.offsetWidth;
        text.style.animation = 'slideTextToRightAndStop 0.2s linear forwards';
    }, 5000);
}


/**
 * 
 * This function is responsible for resetting the timer for the text animation.
 * 
 */
function resetTimerForTextAnimation() {
    if (textSlideAnimationTimer) {
        clearTimeout(textSlideAnimationTimer);
    }
    textSlideAnimationTimer = setTimeout(checkNameTextLengthToSlideAnimation, 7000);
}


/**
 * 
 * This function is designed to restart a specific animation if a minimum time 
 * (mininamLoadingElementJoinTime) has elapsed since the last animation timestamp.
 * 
 */
function restartLoadingElementJoinAnimation() {
    let currentTime = new Date().getTime();
    if (currentTime - lastAnimationTimestamp > mininamLoadingElementJoinTime) {
        let animation = document.querySelector('animate');
        if (animation) {
            animation.beginElement();
            lastAnimationTimestamp = currentTime;
        }
    }
}