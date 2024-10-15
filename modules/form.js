import {currentStep} from './main.js';

const custom = document.querySelector('#custom');
const anon = document.querySelector('#anon');
const message = document.querySelector('.message');
const other = document.querySelector('#other');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#password-confirm');
const wrapperSelect = document.querySelectorAll('.wrapper-select');

custom.addEventListener('mouseover', () => {
  message.style.display = 'block';
  message.textContent = 'Customize your entire profile';
});

custom.addEventListener('mouseout', () => {
  message.style.display = 'none';
});

anon.addEventListener('mouseover', () => {
  message.style.display = 'block';
  message.textContent = 'Stay anonymous; We randomize your user profile for you. This includes your username and password (editable in your settings)';
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

wrapperSelect.forEach(select => select.addEventListener('click', (e) => {
  const buttons = select.querySelectorAll('button');
  buttons.forEach(btn => {if(btn !== e.target) btn.classList.remove('select')});
  if(e.target.localName === 'button') {
    e.target.classList.add('select');
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
  const inputField = currentFormStep.querySelector('input');
  if (inputField) {
    // Validate that the input field is not empty
    if (inputField.value.trim() === '') {
      displayMessage('This field cannot be blank');
      return false;
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
  validateStep
}