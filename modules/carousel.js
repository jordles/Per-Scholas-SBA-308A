import { currentStep } from "./main.js";

const carousel = document.querySelector('.carousel');
const formItems = document.querySelectorAll('.form-step');

formItems.forEach( (item, index) => {
  const prev = document.createElement('button');
  prev.classList.add('prev');
  prev.textContent = 'Previous';
  prev.classList.add('nav-btn');

  const next = document.createElement('button');
  next.classList.add('next');
  next.textContent = 'Next';
  next.classList.add('nav-btn');

  // Disable the "Previous" button on the first item
  if (index === 0) {
    prev.setAttribute('disabled', true);
    prev.style.cursor = 'not-allowed';
  }

  // Change the "Next" button to "Submit" on the last item
  if (index === formItems.length - 1) {
    next.textContent = 'Submit';
    next.setAttribute('type', 'submit');
  }

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper-btn')
  wrapper.appendChild(prev);
  wrapper.appendChild(next);
  item.appendChild(wrapper);
})

const nextButtons = document.querySelectorAll('.next');
const prevButtons = document.querySelectorAll('.prev');

function moveCarousel() {
  // Move the carousel based on the current step
  carousel.style.transform = `translateX(-${currentStep * 100}%)`;
}

export{
  nextButtons,
  prevButtons,
  moveCarousel
}