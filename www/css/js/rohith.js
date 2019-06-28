// Generate arcs

var theta_ref = {left:[],right:[]};

var setup = function (n, a, b, id) {
  if(id=='left_circle'){
    var theta = theta_ref.left;
  } else{
    var theta = theta_ref.right;
  }
  var main = document.getElementById(id);
  var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
  var circleArray = [];
  var colors = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna'];
  for (var i = 0; i < n; i++) {
    var circle = document.createElement('div');
    circle.className = 'circle number' + i;
    circleArray.push(circle);
    circleArray[i].posx = Math.round(a * (Math.cos(theta[i]))) + 'px';
    circleArray[i].posy = Math.round(b * (Math.sin(theta[i]))) + 'px';
    circleArray[i].style.position = "absolute";
    circleArray[i].style.backgroundImage = 'url(images/adam.jpg)';
    circleArray[i].style.backgroundSize= 'cover';
    circleArray[i].style.top = ((mainHeight / 1.3) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
    if(id=='left_circle'){
      circleArray[i].style.left = ((mainHeight/ 30 ) + parseInt(circleArray[i].posx.slice(0, -2)))-20 + 'px';
    } else {
      circleArray[i].style.right = ((mainHeight/ 30 ) + parseInt(circleArray[i].posx.slice(0, -2)))-20 + 'px';
    }
    var title = document.createElement('p');
    title.style.marginTop = '30px';
    title.style.width = '80px';
    title.style.marginLeft = '-28px';

    title.innerHTML = colors[i];

    if(i==0){
      circleArray[i].style.border ='2px solid gold';
      title.style.marginTop = '5px';
      var trophy = document.createElement('i');
      trophy.className = 'fa fa-trophy';
      trophy.style.color = 'gold';
      if(id=='left_circle'){
        trophy.style.marginLeft = '-30px';
      } else {
        trophy.style.marginLeft = '40px';
      }
      trophy.style.marginTop = '7px';
      trophy.style.fontSize = '18px';
      circleArray[i].appendChild(trophy);
    }

    circleArray[i].appendChild(title);
    main.appendChild(circleArray[i]);
  }
};

var generate = function(n, a, b, id) {
  var frags = 360 / n;
  for (var i = 0; i<n; i++) {
    var rad = (frags / 180) * i * Math.PI;
    if(id=='left_circle'){
      theta_ref.left.push(rad);
    } else{
      theta_ref.right.push(rad);
    }
  }
  setup(n, a, b, id)
}
generate(10, 80, 140, 'left_circle');
generate(10, 80, 140, 'right_circle');


// Move arcs

function circularScroll(a, b, side, direction){
  if(side=='left_circle'){
    var theta = theta_ref.left;
  } else{
    var theta = theta_ref.right;
  }
  var main = document.getElementById(side);
  var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
  var elements = document.getElementById(side).childNodes;
  if(direction=='up'){
    var first_theta = theta.shift();
    theta.push(first_theta);
  } else{
    var last_theta = theta.pop();
    theta.unshift(last_theta);
  }
  if(side=='left_circle'){
    theta_ref.left = theta;
  } else{
    theta_ref.right = theta;
  }
  elements.forEach(
    function(element, key, listObj, argument) {
      element.posx = Math.round(a * (Math.cos(theta[key]))) + 'px';
      element.posy = Math.round(b * (Math.sin(theta[key]))) + 'px';
      element.style.top = ((mainHeight / 1.3) - parseInt(element.posy.slice(0, -2))) + 'px';
      if(side=='left_circle'){
        element.style.left = ((mainHeight/ 30 ) + parseInt(element.posx.slice(0, -2)))-20 + 'px';
      } else{
        element.style.right = ((mainHeight/ 30 ) + parseInt(element.posx.slice(0, -2)))-20 + 'px';
      }
    });
}


// swipe detection
var touch_s;
var time_s;
$('#left_circle').on('touchstart', function (event) {
  touch_s = event.originalEvent.touches[0].clientY;
  time_s = event.timeStamp;
});
$('#left_circle').on('touchend', function (event) {
//$('#left_circle').on('touchmove', function (event) {
  var touch_e = event.originalEvent.changedTouches[0].clientY;
  var time_e = event.timeStamp;
  if (touch_s > touch_e + 45) {
    // upscroll code
//    exe_times = Math.ceil(100/(time_e-time_s));
//    for(i=0;i<exe_times;i++){
      circularScroll(80, 140, 'left_circle', 'up');
//    }
//    touch_s = event.originalEvent.touches[0].clientY;
  } else if (touch_s < touch_e - 45) {
    // downscroll code
//    exe_times = Math.ceil(100/(time_e-time_s));
//    for(i=0;i<exe_times;i++){
      circularScroll(80, 140, 'left_circle', 'down');
//    }
//    touch_s = event.originalEvent.touches[0].clientY;
  }
});
$('#right_circle').on('touchstart', function (event) {
  touch_s = event.originalEvent.touches[0].clientY;
  time_s = event.timeStamp;
});
$('#right_circle').on('touchend', function (event) {
//$('#right_circle').on('touchmove', function (event) {
  var touch_e = event.originalEvent.changedTouches[0].clientY;
  var time_e = event.timeStamp;
  if (touch_s > touch_e + 45) {
    // upscroll code
//    exe_times = Math.ceil(100/(time_e-time_s));
//    for(i=0;i<exe_times;i++){
      circularScroll(80, 140, 'right_circle', 'up');
//    }
//    touch_s = event.originalEvent.touches[0].clientY;
  } else if (touch_s < touch_e - 45) {
    // downscroll code
//    exe_times = Math.ceil(100/(time_e-time_s));
//    for(i=0;i<exe_times;i++){
      circularScroll(80, 140, 'right_circle', 'down');
//    }
//    touch_s = event.originalEvent.touches[0].clientY;
  }
});
