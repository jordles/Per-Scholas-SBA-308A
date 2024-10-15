import {firstName, lastName, gender, username, email, password, title, body} from './form.js';

let userInfo;
async function generateUserData(gender){
  //fetch a random user's information
  //we can have the user choose their country or location, or stay anonymous 
  if(gender === 'other') gender = '';
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
  // const firstName = document.getElementById('first').value.trim();
  // const lastName = document.getElementById('last').value.trim();
  // const gender = document.querySelector('.gender').value;
  // const username = document.getElementById('username').value.trim();
  // const email = document.getElementById('email').value.trim();
  // const password = document.getElementById('password').value.trim();
  /* const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim(); */

  await generateUserData(gender);

  // Update userInfo object
  if (firstName) userInfo.name.first = firstName.value.trim();
  if (lastName) userInfo.name.last = lastName.value.trim();
  /* if (gender) userInfo.gender = gender; */
  if (username) userInfo.login.username = username.value.trim();
  if (email) userInfo.email = email.value.trim();
  if (password) userInfo.login.password = password.value.trim();

  userInfo.login.sha256 = await hashPassword(userInfo.login.password, userInfo.login.salt);

  const response2 = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...userInfo,
      title: title.value.trim(),
      body: body.value.trim(),
    })
  });

  userInfo = await response2.json();
  console.log("Updated userInfo through PATCH:", userInfo);
}

async function hashPassword(password, salt) {
  // Combine password and salt
  const combined = password + salt;
  
  // Encode the combined string into a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(combined);

  // Use SubtleCrypto to hash the combined password and salt
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const sha256Hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return sha256Hash;
}

export{
  updateUserInfo
}