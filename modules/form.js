import {currentStep} from './main.js';

const custom = document.querySelector('#custom');
const anon = document.querySelector('#anon');
const message = document.querySelector('.message');
const other = document.querySelector('#other');
const password = document.querySelector('#password');
const title = document.querySelector('#title');
const body = document.querySelector('#body');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const gender = document.querySelector('.gender');
const username = document.getElementById('username');
const email = document.getElementById('email');
const passwordConfirm = document.querySelector('#password-confirm');
const wrapperSelect = document.querySelectorAll('.wrapper-select');
const coreRoots = document.getElementById('core-roots');


custom.addEventListener('mouseover', () => {
  message.style.display = 'block';
  message.textContent = 'Customize your entire profile';
});

custom.addEventListener('mouseout', () => {
  message.style.display = 'none';
});

anon.addEventListener('mouseover', () => {
  message.style.display = 'block';
  message.textContent = 'Stay anonymous; We randomize your user profile for you. This includes your username and password (editable in your settings later)';
});

anon.addEventListener('mouseout', () => {
  message.style.display = 'none';
});

other.addEventListener('mouseover', () => {
  message.style.display = 'block';
  message.textContent = 'Other is editable, the value will be displayed on your profile';
});

other.addEventListener('mouseout', () => {
  message.style.display = 'none';
});

title.addEventListener('mouseover', () => {
  message.style.display = 'block';
  message.textContent = 'Title can be anything; A catchphrase, your job title, a small description about you, hobbies, etc.';
});

title.addEventListener('mouseout', () => {
  message.style.display = 'none';
});

body.addEventListener('mouseover', () => {
  message.style.display = 'block';
  message.textContent = 'Your bio or a more in depth description about yourself.';
});

body.addEventListener('mouseout', () => {
  message.style.display = 'none';
});

coreRoots.addEventListener('mouseover', () => {
  message.style.display = 'block';
  message.textContent = 'Within the Root community, core roots are key traits that connect people together. You can add as many as you want. We use this data to display and search for like-minded people with similar core roots.';
});

coreRoots.addEventListener('mouseout', () => {
  message.style.display = 'none';
});


wrapperSelect.forEach((select, index ) => select.addEventListener('click', (e) => {
  const buttons = select.querySelectorAll('button');
  buttons.forEach(btn => {
    if(btn !== e.target) 
      btn.classList.remove('select')
      console.log(index);
      if(index === 1 ){
        if(btn.classList.contains('gender')){
          btn.classList.remove('gender');
        }
      }
  });
  if(e.target.localName === 'button') {
    e.target.classList.add('select');
    if(index === 1 ){
      e.target.classList.add('gender');
      
    }
  }
}));

function displayMessage(msg){
  message.textContent = msg;
  message.style.display = 'block';
  setTimeout(() => message.style.display = 'none', 3000);
}

function validateStep(){
  const currentFormStep = document.querySelectorAll('.form-step')[currentStep];

  // Check if the current step contains an input field
  const inputField = currentFormStep.querySelectorAll('input');

  if (inputField) {
    console.log(inputField);
    for (let i = 0; i < inputField.length; i++) {
      if (inputField[i].value.trim() === '') {
        inputField[i].focus();
        displayMessage('This field cannot be blank');
        return false; // Exit the entire function if validation fails
      }
    }
  }

  // Check if the current step contains button selections
  const buttonWrapper = currentFormStep.querySelector('.wrapper-select');
  if (buttonWrapper) {
    // Validate that at least one button is selected
    const selectedButton = buttonWrapper.querySelector('.select');
    if (!selectedButton) {
      displayMessage('You must select an option');
      return false;
    }
  }

  // Additional validation for password fields
  if (currentFormStep.querySelector('#password')) {
    const password = currentFormStep.querySelector('#password').value;
    const confirmPassword = currentFormStep.querySelector('#confirm-password').value;
    if (password !== confirmPassword) {
      displayMessage('Passwords do not match');
      return false;
    }
  }

  return true; // Return true if validation passes
};


export{
  password,
  passwordConfirm,
  displayMessage,
  validateStep,
  firstName,
  lastName,
  gender,
  username,
  email,
  title,
  body
}