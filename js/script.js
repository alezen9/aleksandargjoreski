var anchors = document.querySelectorAll('a');

anchors.forEach(element => {
  element.addEventListener('click',function(){
    animateScroll(document.querySelector(element.getAttribute("href")), 700, 'easeInOutQuint');
  })
});