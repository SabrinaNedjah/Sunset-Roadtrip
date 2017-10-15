const sky = document.querySelector('#sky');
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');

const activate = (...elems) => 
  elems.forEach(elem =>
    elem.classList.add('active'))
const deactivate = (...elems) =>
  elems.forEach(elem =>
    elem.classList.remove('active'))
const random = (scale, shift = 0) =>
  Math.floor(Math.random() * scale + shift)

let nightTime = false;
let nextMeteor = 0;

let meteorTimer;
let randomTimer = () => {
  newMeteor();
  meteorTimer = setTimeout(() => {
    randomTimer();
    nextMeteor = random(5000, 1000);
  }, nextMeteor)
}
let stopTimer = () => {
  clearInterval(meteorTimer);
  nextMeteor = 6000;
}

//stars
for(let i = 0; i < 512; i++) {
  let posX = random(100);
  let posY = random(100);
  let star = document.createElement('div');
  star.classList.add('star');
  star.style.left = posX + 'vw';
  star.style.bottom = posY + 'vh';
  sky.appendChild(star); 
}

let stars = sky.querySelectorAll('.star');

//meteor shower
const newMeteor = () => {
  console.log(nextMeteor);
  let posX = random(100);
  let posY = random(75, 25);
  let transX = random(40, 10);
  let transY = random(15, 15);
  let opacity = Math.random();
  let bias = transY / 100;
  
  let meteor = 
      document.createElement('div');
  meteor.classList.add('meteor');
  meteor.style.left = `${posX}vw`;
  meteor.style.bottom = `${posY}vh`;
  //meteor.style.opacity = opacity * bias;
  meteor.addEventListener('transitionend', () => {
    sky.removeChild(meteor);
  });
  sky.appendChild(meteor);
  
  setTimeout(() => {
    meteor.style.opacity = 0;
    meteor.style.transform =
      `translateX(${transX}vw) translateY(${transY}vh)`;
  }, 15)   
}

const time = () => {  
  if (nightTime) {
    setTimeout(randomTimer, 5500)
    activate(sky, sun, moon);
    stars.forEach(star => {
      let opacity = Math.random();
      let getPosY = 
          parseInt(
            star.style.bottom
            .slice(0, -2), 10
          );
      //make stars less opaque near bottom of view
      let bias = getPosY / 100
      star.style.opacity = opacity * bias;
    })  
  } else {
    stopTimer();
    deactivate(sky, sun, moon);
    stars.forEach(star => {
      star.style.opacity = 0;
    })
  } 
}

sky.addEventListener('click', () => {
  nightTime = !nightTime;
  time();
})

window.onload = time;