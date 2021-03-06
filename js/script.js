// google analythics
var head = document.querySelector('head');
var script1 = document.createElement('script');
script1.setAttribute('src','https://www.googletagmanager.com/gtag/js?id=UA-120730567-2');
script1_att = document.createAttribute('async');
script1.setAttributeNode(script1_att);
head.appendChild(script1);
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-120730567-2');
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
  if((element.id == 'arrow-1') || (element.id == 'arrow-2') || (element.id == 'arrow-3')){
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