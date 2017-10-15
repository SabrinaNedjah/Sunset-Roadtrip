
////////////
//SETTING //
///////////

const pinkSky = document.querySelector('.pinkSky');
const sunShine = document.querySelector('.sunShine');
const moonLight = document.querySelector('.moonLight');

const activate = function (pinkSky, sunShine, moonLight) {
  pinkSky.classList.add('active');
  sunShine.classList.add('active');
  moonLight.classList.add('active');
}

const desactivate = function (pinkSky, sunShine, moonLight) {
  pinkSky.classList.remove('active');
  sunShine.classList.remove('active');
  moonLight.classList.remove('active');
}

const random = function (scale, shift = 0) {
  return Math.floor(Math.random() * scale + shift)
}

let timeNight = false;
let meteorAfter = 0;
let meteorTimer;


let randTimer = function () {
  newMeteor();
  meteorTimer = setTimeout(function (){
    randTimer();
    meteorAfter = random(5000, 1000);
  }, meteorAfter)
}

let stopTimer = function () {
  clearInterval(meteorTimer);
  meteorAfter = 6000;
}

////////////
//  STAR  //
///////////

for(let i = 0; i < 512; i++) {
  let posX = random(100);
  let posY = random(100);
  let star = document.createElement('div');
  star.classList.add('star');
  star.style.left = posX + 'vw';
  star.style.bottom = posY + 'vh';
  pinkSky.appendChild(star); 
}

let stars = pinkSky.querySelectorAll('.star');

////////////
// METEOR //
// SHOWER //
///////////

const newMeteor = function () {
  const posX = random(100);
  const posY = random(75, 25);
  const transX = random(40, 10);
  const transY = random(15, 15);
  const opacity = Math.random();
  const bias = transY / 100;
  const meteor = document.createElement('div');

  meteor.classList.add('meteor');
  meteor.style.left = `${posX}vw`;
  meteor.style.bottom = `${posY}vh`;

  meteor.addEventListener('transitionend', function () {
    pinkSky.removeChild(meteor);
  });

  pinkSky.appendChild(meteor);
  setTimeout(function () {
    meteor.style.opacity = 0;
    meteor.style.transform =
      `translateX(${transX}vw) translateY(${transY}vh)`;
  }, 15)  
}

const time = function () {  
  if (timeNight) {
    setTimeout(randTimer, 5500)
    activate(pinkSky, sunShine, moonLight);
    stars.forEach(star => {
      const opacity = Math.random();
      const getPosY = 
          parseInt(
            star.style.bottom
            .slice(0, -2), 10
          );
      //stars less opaque
      const bias = getPosY / 100
      star.style.opacity = opacity * bias;
    })  
  } else {
    stopTimer();
    desactivate(pinkSky, sunShine, moonLight);
    stars.forEach(star => {
      star.style.opacity = 0;
    })
  } 
}

pinkSky.addEventListener('click', function () {
  timeNight = !timeNight;
  time();
})

window.onload = time;