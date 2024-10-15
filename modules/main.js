import { nextButtons, prevButtons, moveCarousel } from './carousel.js';
import {password, passwordConfirm, displayMessage} from './form.js';
(async function main(){
  //fetch a random user's information
  //we can have the user choose their country or location, or stay anonymous 
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  console.log(data);
  const user = data.results[0];
  const userInfo = {
    seed: data.info.seed,
    name: user.name,
    gender: user.gender,
    picture: user.picture,
    id: user.id.value,
    login: {
      uuid: user.login.uuid,
      username: user.login.username,
      password: user.login.password,
      salt: user.login.salt,
      sha256: user.login.sha256
    }
  }
  console.log(userInfo);

  // const response2 = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     body: userInfo,
  //     id: userInfo.id
  //   })
  // });

  // const data2 = await response2.json();
  // console.log(data2);

})();


/* -------------------------------------------------------------------------- */
/*                                  CAROUSEL                                  */
/* -------------------------------------------------------------------------- */
let currentStep = 0;
nextButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // if(e.target.parentNode.parentNode.)
    if(button.textContent === 'Submit') {
      if(password.value !== passwordConfirm.value) {
        return displayMessage('Passwords do not match');
      }
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