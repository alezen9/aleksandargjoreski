var carousel = document.querySelector('.carousel');
var cells = carousel.querySelectorAll('.carousel__cell');
var cellCount = cells.length; // cellCount set from cells-range input value
var selectedIndex = 0;
var cellWidth = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = true;
var rotateFn = 'rotateY';
var radius = Math.round( ( cellWidth / 2) / Math.tan( Math.PI / cellCount ) );
var theta = 360 / cellCount;
// console.log( cellWidth, cellHeight );

swipedetect(carousel, function(swipedir){
    if(swipedir == 'left'){
        selectedIndex++;
        rotateCarousel();
    }else if(swipedir == 'right'){
        selectedIndex--;
        rotateCarousel();
    }
});


function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';

    cells.forEach((el,index) => {
        if(selectedIndex >= 0){
            if(index == selectedIndex%cellCount){
                el.style.opacity = 1;
            }else{
                el.style.opacity = 0.1;
            }
        }else{
            var i = (cellCount-Math.abs(selectedIndex%cellCount) == cellCount) ? 0 : cellCount-Math.abs(selectedIndex%cellCount);
            if(index == i){
                el.style.opacity = 1;
            }else{
                el.style.opacity = 0.1;
            }
        }
    });
}

var prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
});

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
});

function changeCarousel() {
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
      cell.style.opacity = 1;
      var cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }
  rotateCarousel();
}


function onOrientationChange() {
  rotateFn = 'rotateY';
  changeCarousel();
}

// set initials
onOrientationChange();


//--------------------------------------------------------swipe detection-------------------------------------------------------
function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 5, //required min distance traveled to be considered swipe
    restraint = 50, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 600, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        //e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        //e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                e.preventDefault()
            }
        }
        handleswipe(swipedir)
        //e.preventDefault()
    }, false)
  }