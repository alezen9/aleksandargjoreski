// deferr javascript
function parseJSAtOnload() {
  var links = ["js/AnimateScroll.min.js", "js/alexBox.min.js","js/carousel.min.js"],
  headElement = document.getElementsByTagName("head")[0],
  linkElement, i;
  for (i = 0; i < links.length; i++) {
  linkElement = document.createElement("script");
  linkElement.src = links[i];
  headElement.appendChild(linkElement);
  }
  }
  if (window.addEventListener)
  window.addEventListener("load", parseJSAtOnload, false);
  else if (window.attachEvent)
  window.attachEvent("onload", parseJSAtOnload);
  else window.onload = parseJSAtOnload;

  //for smoothscroll
var anchors = document.querySelectorAll('a');

anchors.forEach(element => {
  if(element.getAttribute('href') != 'media/other/portrait-large.gif'){
    element.addEventListener('click',function(){
      animateScroll(document.querySelector(element.getAttribute("href")), 700, 'easeInOutQuint');
    })
  }
});

// for button effect
var pressElements = document.querySelectorAll('button');

pressElements.forEach(element => {
  element.addEventListener('touchstart',function() {touched(this)});
  element.addEventListener('touchend',function() {moved(this)});
});


function touched(el){
  pressElements.forEach(function (element, index) {
    if(element === el){
      element.classList.add("touched");
    }
  });
}

function moved (el){
  pressElements.forEach(function (element) {
    if(element === el){
      element.classList.remove("touched");
    }
  });
}

// change body bg on card hover
var body = document.querySelector('body');
var card = document.querySelector('.card');
var wrapper2 = document.querySelector('.wrapper-2');
card.addEventListener("mouseover", function(){
  body.style.background = 'rgba(0,0,0,.8)';
});
card.addEventListener("mouseout", function(){
  body.style.background = '#fdfdfd';
});
wrapper2.addEventListener("touchstart", function(){
  body.style.background = '#fdfdfd';
});