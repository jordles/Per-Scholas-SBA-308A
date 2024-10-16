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
const coreTree = document.getElementById('core-tree');
const nurturing = document.querySelector('label[for="nurturing"]');
const adaptability = document.querySelector('label[for="adaptability"]');
const grounded = document.querySelector('label[for="grounded"]');
const simplicity = document.querySelector('label[for="simplicity"]');
const creativity = document.querySelector('label[for="creativity"]');

let anonymous = false;
// Function to handle mouseover and mouseout events
function handleHover(element, messageText) {
  element.addEventListener('mouseover', (e) => {
    e.stopPropagation();
    message.classList.remove('none');
    message.textContent = messageText;
  });

  element.addEventListener('mouseout', () => {
    message.classList.add('none');
  });
}

// Map of elements and corresponding messages
const elementsWithMessages = [
  { element: custom, message: 'Customize your entire profile' },
  { element: anon, message: 'Stay anonymous; We randomize your user profile for you (except the display name you gave earlier). This includes your username and password (editable in your settings later)'},
  { element: other, message: 'Other is editable, the value will be displayed on your profile' },
  { element: title, message: 'Title can be anything; A catchphrase, your job title, a small description about you, hobbies, etc.' },
  { element: body, message: 'Your bio or a more in depth description about yourself.' },
  { element: coreRoots, message: 'Within the Root community, core roots are key traits that connect people together. You can add as many as you want, and make sure to separate your words by comma or spaces. We use this data to display and search for like-minded people with similar core roots.' },
  { element: coreTree, message: "Along with core roots, the core tree is another metric we use to connect you with like-minded people. The core tree is a representation of your personality in accordance to Root's core values. Hover over each personality trait to learn more." },
  { element: nurturing, message: 'Nurturing measures how open and sociable you are. [0 - solitude -> 5 - sociable]'},
  { element: adaptability, message: 'Adaptability measures how flexible you are. [0 - stagnant -> 5 - change]'},
  { element: grounded, message: 'Grounded measures your type of thinking and behavior. [0 - emotional -> 5 - logical]'},
  { element: simplicity, message: 'Simplicity measures how you approach and experience life. [0 - complexity -> 5 - minimalism]'},
  { element: creativity, message: 'Creativity measures your focus on the future. [0 - traditional -> 5 - innovative]'},
];

// Loop through the elements and assign the event listeners
elementsWithMessages.forEach(item => {
  handleHover(item.element, item.message);
});

wrapperSelect.forEach((select, index ) => select.addEventListener('click', (e) => {
  const buttons = select.querySelectorAll('button');
  buttons.forEach(btn => {
    if(btn !== e.target) 
      btn.classList.remove('select')
      console.log(index);
      console.log(btn);
      if(index === 0 && btn.id === 'anon'){
        anonymous = false;
      }
      if(index === 1 ){
        if(btn.classList.contains('gender')){
          btn.classList.remove('gender');
        }
      }
  });
  if(e.target.localName === 'button') {
    e.target.classList.add('select');
    if(index === 0 && e.target.id === 'anon'){
      anonymous = true;
    }
    if(index === 1 ){
      e.target.classList.add('gender');
      
    }
  }
}));

function displayMessage(msg){
  message.textContent = msg;
  message.classList.remove('none');
  setTimeout(() => message.classList.add('none'), 3000);
}

function validateStep(){
  const currentFormStep = document.querySelectorAll('.form-step')[currentStep];

  // Check if the current step contains an input field
  const inputField = currentFormStep.querySelectorAll('input');

  if (inputField) {
    console.log(inputField);
    for (let i = 0; i < inputField.length; i++) {
      if(inputField[i].id === 'last') continue;
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
  body,
  anonymous
}