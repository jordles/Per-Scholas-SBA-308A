import { nextButtons, prevButtons, moveCarousel } from './carousel.js';
import {password, passwordConfirm, displayMessage, validateStep} from './form.js';
import {updateUserInfo} from './apis.js';



/* -------------------------------------------------------------------------- */
/*                                  CAROUSEL                                  */
/* -------------------------------------------------------------------------- */
let anonymous = false;
let currentStep = 0;
nextButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log(validateStep());
    if (!validateStep()) {
      return; // Stop if validation fails
    }
    if(button.getAttribute('type') === 'submit') {
      updateUserInfo();
    }
    currentStep++;
    moveCarousel();
  });
});

prevButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentStep--;
    moveCarousel();
  });
});

/* -------------------------------------------------------------------------- */
/*                                  MESSAGES                                  */
/* -------------------------------------------------------------------------- */



export{
  currentStep
}