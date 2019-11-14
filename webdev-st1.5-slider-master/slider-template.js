const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60/60';
const IMAGES = [
  '?image=1080', 
  '?image=1079', 
  '?image=1069', 
  '?image=1063', 
  '?image=1050',
  '?image=1039'
];



window.onload = function() {

//get wrapper for smal images
const divForSmall = document.getElementById('small-imgs');
//add content
divForSmall.innerHTML = this.addSmallImgs();

//get wrapper for big images
const divForBig = document.getElementById('big-imgs');
//add content
divForBig.innerHTML = this.addBigImgs();

//current active element ID
let activeIMG = 0;

//add listeners to small images and bound actions with big
const smallElements = divForSmall.childNodes;
const bigElements = divForBig.childNodes;
smallElements.forEach(div => {
  div.addEventListener('mouseup', (e)=> {
    const id = e.currentTarget.dataset.id; //id of clicked small img taked from data-id="x";

    bigElements[activeIMG].classList.toggle("hidden"); //hide current big img
    activeIMG = +id;
    bigElements[activeIMG].classList.toggle("hidden"); //show new current big img

  });
});

//add events on the buttons < and >

// <
const previous = document.getElementById("img-before");
previous.addEventListener("mouseup", goLeft); 

function goLeft() {

  bigElements[activeIMG].classList.toggle("hidden"); //hide current imf
  activeIMG = activeIMG - 1 < 0 ? IMAGES.length - 1 : activeIMG - 1;
  bigElements[activeIMG].classList.toggle("hidden"); //show previous img

  document.getElementById(activeIMG+'radio').checked = true; //set new radio-active :)

}

// >
const after = document.getElementById("img-after");
after.addEventListener("mouseup", goRight);

function goRight() {
  bigElements[activeIMG].classList.toggle("hidden"); //hide current img
  activeIMG = activeIMG + 1 >= IMAGES.length ? 0 : activeIMG + 1;
  bigElements[activeIMG].classList.toggle("hidden"); //show next img

  document.getElementById(activeIMG+'radio').checked = true; //set new radio-active :)
}

//keydonw events on the buttons
// < is 37 and > is 39
window.addEventListener('keydown', (e) => {
  let key = e.keyCode;
  if (key === 37) goLeft();
  if(key === 39) goRight();
});
}

//make arr of imgs prewiev
function addSmallImgs() {
  let result = '';
  const preUrl = API_URL + SMALL_SIZE; //pre-url without index

  for (let i = 0; i < IMAGES.length; i++) {
    result += 
    `<div data-id="${i}">` 
    + this.addRadioLabel( i, 'small-label', preUrl + IMAGES[i] )
    + "</div>";
  }
  return result;
}

//window main img
function addBigImgs() {
  let result = '';
  const preUrl = API_URL + BIG_SIZE; //pre-url without index

  for (let i = 0; i < IMAGES.length; i++) {
    result += 
    `<div data-id="${i}" class="${i === 0 ? '' : 'hidden'}">` 
    + this.addImg( i, 'window-img', preUrl + IMAGES[i] ) 
    + "</div>";
  }
  return result;
}


//bounded radio and label string
function addRadioLabel(n, className, link) {
  return addRadio(n) + addLabel(n, className, link);
}
//make radio input string for small imgs
function addRadio(n) {
  return `<input type="radio" name="button" class="radio-button" id="${n}radio" ${n === 0 ? 'checked' : ''}></input>`;
}
//make label for radio input string for small imgs
function addLabel(n, className, link) {
  return `<label for='${n}radio' class="${className}"><img src="${link}" alt="img" data-id="${n}"></label>`;
}

//make img for big imgs
function addImg(n, className, link) {
  return `<img src="${link}" class="${className}" alt="img" >`;
}

