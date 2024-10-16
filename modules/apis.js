import {firstName, lastName, gender, username, email, password, title, body, anonymous} from './form.js';
import {carouselContainer} from './carousel.js';
let userInfo;
const userResults = document.getElementById('user-results');
const coreRoots = document.getElementById('core-roots');
const inputs = document.querySelectorAll('#core-tree > input');
async function generateUserData(gender){
  //fetch a random user's information
  //we can have the user choose their country or location, or stay anonymous 
  if(gender === 'other') gender = "";
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
  const gender = anonymous ? "" : document.querySelector('.gender').value;
  console.log(gender);
  await generateUserData(gender);
  let response2;

  // Update userInfo object
  if (firstName) userInfo.name.first = firstName.value.trim();
  if (lastName) userInfo.name.last = lastName.value.trim();
  if(!anonymous){
    if (username) userInfo.login.username = username.value.trim();
    if (email) userInfo.email = email.value.trim();
    if (password) userInfo.login.password = password.value.trim();

    userInfo.login.sha256 = await hashPassword(userInfo.login.password, userInfo.login.salt);
  
    response2 = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
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
  }
  else{
    response2 = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...userInfo,
      })
    });
  }
  userInfo = await response2.json();
  console.log("Updated userInfo through PATCH:", userInfo);
}

async function displayUserInfo(){
  
  

  /* ---------------------------------- BIO --------------------------------- */
  const bio = document.createElement('div');

  const bioWrapper = document.createElement('div');
  const img = document.createElement('img');
  console.log(userInfo)
  img.style.position = "relative";
  img.style.borderRadius = "50% 5% 50% 5%";
  img.src = userInfo.picture.large;
  bioWrapper.appendChild(img);

  const email = document.createElement('p');
  email.textContent = `Email: ${userInfo.email}`; 
  bioWrapper.appendChild(email);

  const id = document.createElement('p');
  id.textContent = `ID: ${userInfo.id}`; 
  bioWrapper.appendChild(id);
  
  
  bio.appendChild(bioWrapper);

  const name = document.createElement('p');
  name.style.borderTop = "2px solid black";
  name.style.borderBottom = "2px solid black";
  name.style.fontSize = "2rem";
  name.style.width = "fit-content";
  name.style.marginBottom = 0;
  name.textContent = `${userInfo.name.first} ${userInfo.name.last}`;
  bio.appendChild(name);

  const title = document.createElement('span');
  title.style.fontStyle = "italic";
  title.textContent = userInfo.title;
  
  bio.appendChild(title);

  const body = document.createElement('p');
  body.style.fontSize = "1.5rem";
  body.textContent = userInfo.body;
  bio.appendChild(body);
  /* -------------------------------- METRICS ------------------------------- */
  const metrics = document.createElement('div');
  const wordCloud = await grabCoreRoots();
  metrics.appendChild(wordCloud);

  const coreTree = await grabCoreTree();
  metrics.appendChild(coreTree);
  /* ------------------------------- DISPLAY ------------------------------- */
  userResults.appendChild(bio);
  userResults.appendChild(metrics);
  carouselContainer.classList.add('none');
  userResults.classList.remove('none');
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


/* -------------------------------------------------------------------------- */
/*                                   METRICS                                  */
/* -------------------------------------------------------------------------- */


async function grabCoreRoots(){
  const text = coreRoots.value;
  const response = await fetch(`https://quickchart.io/wordcloud?text=${text}&fontScale=75`);
  
  const img = document.createElement('img');
  img.style.borderRadius = "10px";
  img.src = response.url;
  return img;
}

async function grabCoreTree(){
  const label = [];
  const data = [];
  inputs.forEach(input => {
    label.push(input.id[0].toUpperCase() + input.id.slice(1));
    data.push(input.value);
  })

  // Construct the full chart configuration string
  const chartConfig = {
    type: 'radar',
    data: {
      labels: label,
      datasets: [{
        label: 'Your Core Tree',
        data: data,
        borderColor: '#05668d',
        pointBackgroundColor: '#00a896',
        backgroundColor: '#00a8978c'
      }]
    },
    options: {
      scale: {
        ticks: {
          min: 1,
          max: 5,
          stepSize: 1
        }
      }
    }
  };

  const encodedChartConfig = encodeURIComponent(JSON.stringify(chartConfig));
  
  const response = await fetch(`https://quickchart.io//chart?bkg=rgba(255, 255, 255, 0)&c=${encodedChartConfig}`);
  console.log(response);
  const img = document.createElement('img');
  img.src = response.url;
  return img;
}
export{
  updateUserInfo,
  displayUserInfo
}