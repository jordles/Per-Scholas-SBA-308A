import { nextButtons, prevButtons, moveCarousel, carouselContainer } from './carousel.js';
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
      carouselContainer.classList.add('none');
      
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