import { nextButtons, prevButtons, moveCarousel, carouselContainer } from './carousel.js';
import {password, passwordConfirm, displayMessage, validateStep, anonymous} from './form.js';
import {updateUserInfo, displayUserInfo} from './apis.js';



/* -------------------------------------------------------------------------- */
/*                                  CAROUSEL                                  */
/* -------------------------------------------------------------------------- */

let currentStep = 0;
nextButtons.forEach(button => {
  button.addEventListener('click', async () => {
    console.log(validateStep());
    if (!validateStep()) {
      return; // Stop if validation fails
    }
    if(button.getAttribute('type') === 'submit') {
      await updateUserInfo();
      displayUserInfo();
    }
    (anonymous && currentStep === 1) ? currentStep += 4 : currentStep++;
    moveCarousel();
  });
});

prevButtons.forEach(button => {
  button.addEventListener('click', () => {
    (anonymous && currentStep === 5) ? currentStep -= 4 : currentStep--;
    moveCarousel();
  });
});

/* -------------------------------------------------------------------------- */
/*                                  MESSAGES                                  */
/* -------------------------------------------------------------------------- */



export{
  currentStep,
}