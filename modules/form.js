import {currentStep} from './main.js';

const custom = document.querySelector('#custom');
const anon = document.querySelector('#anon');
const message = document.querySelector('.message');
const other = document.querySelector('#other');
const password = document.querySelector('#password');
const title = document.querySelector('#title');
const body = document.querySelector('#body');
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

let userInfo;
async function generateUserData(gender){
  //fetch a random user's information
  //we can have the user choose their country or location, or stay anonymous 
  const response = await fetch(`https://randomuser.me/api/?gender=${gender}`);
  const data = await response.json();
  console.log(data);
  const user = data.results[0];
  userInfo = {
    seed: data.info.seed,
    name: {
      first: user.name.first,
      last: user.name.last
    },
    email: user.email,
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

  

};
async function updateUserInfo() {
  // Grab values from input fields
  const firstName = document.getElementById('first').value.trim();
  const lastName = document.getElementById('last').value.trim();
  const gender = document.querySelector('.gender').value;
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim();

  await generateUserData(gender);

  // Update userInfo object
  if (firstName) userInfo.name.first = firstName;
  if (lastName) userInfo.name.last = lastName;
  /* if (gender) userInfo.gender = gender; */
  if (username) userInfo.login.username = username;
  if (email) userInfo.email = email;
  if (password) userInfo.login.password = password;
  /* if (title) userInfo.title = title;
  if (body) userInfo.body = body; */

  const response2 = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...userInfo,
      title: title,
      body: body,
    })
  });

  userInfo = await response2.json();
  console.log("Updated userInfo through PATCH:", userInfo);
}
export{
  password,
  passwordConfirm,
  displayMessage,
  validateStep,
  updateUserInfo
}