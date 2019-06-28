
// Generate arcs

// stores the angles for placing the elements
var theta_ref = {
  left: [],
  right: []
};
// keeps tracke of transitions
var transition_in_progress = false;

// declaring and defining setup function which primarily sets up the elements
var setup = function (n, a, b, id) {
  // select
  if (id == 'left_circle') {
    var theta = theta_ref.left;
  } else {
    var theta = theta_ref.right;
  }
  // which element to initialize on?
  var main = document.getElementById(id);
  // positioning depending on height
  var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
  var circleArray = [];

  // random names for elements
  var colors = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna'];

  for (var i = 0; i < n; i++) {
    var circle = document.createElement('div');
    circle.className = 'circle number' + i;
    circleArray.push(circle);
    //    calculate position from the angle
    circleArray[i].posx = Math.round(a * (Math.cos(theta[i]))) + 'px';
    circleArray[i].posy = Math.round(b * (Math.sin(theta[i]))) + 'px';

    // set position based on the calculated values
    circleArray[i].style.top = ((mainHeight / 1.3) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
    if (id == 'left_circle') {
      circleArray[i].style.left = ((mainHeight / 30) + parseInt(circleArray[i].posx.slice(0, -2))) - 20 + 'px';
    } else {
      circleArray[i].style.right = ((mainHeight / 30) + parseInt(circleArray[i].posx.slice(0, -2))) - 20 + 'px';
    }

    // hide extra elements added for ease of transition for 20 elements
    //    if(i%2!=0){
    //      circleArray[i].style.visibility = 'hidden';
    //    }

    // add some custom styling
    circleArray[i].style.position = "absolute";
    circleArray[i].style.backgroundSize = 'cover';
    var title = document.createElement('p');
    title.style.marginTop = '30px';
    title.style.width = '80px';
    title.style.marginLeft = '-28px';

    // filling data
    title.innerHTML = colors[i];
    circleArray[i].style.backgroundImage = 'url(images/adam.jpg)';

    // adding the trophy for user (here, first user)
    if (i == 0) {
      circleArray[i].style.border = '2px solid gold';
      title.style.marginTop = '5px';
      var trophy = document.createElement('i');
      trophy.className = 'fa fa-trophy';
      trophy.style.color = 'gold';
      if (id == 'left_circle') {
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

// initializing the calling of the generate function which calls the setup function
var generate = function (n, a, b, id) {
  // calcualting the angles to place the elements
  var frags = 360 / n;
  for (var i = 0; i < n; i++) {
    var rad = (frags / 180) * i * Math.PI;
    if (id == 'left_circle') {
      theta_ref.left.push(rad);
    } else {
      theta_ref.right.push(rad);
    }
  }
  // function call
  setup(n, a, b, id)
}
// call of the generate function. Flow starts here.
//  if needed make 10 to 20 elements resulting in 10 elements in each visible side of the ellipse.
// 5 elements are made visible, rest are for accomodating the ease of transition along the circular path
// axis length
var a = 80;
var b = 140;
generate(10, a, b, 'left_circle');
generate(10, a, b, 'right_circle');


// Move arcs
// arrays for storing the count of times required
var swipes = new Object();
swipes.left_array = [];
swipes.right_array = [];

function circularScroll(side, direction) {
  console.log('scrolling')

  if (!transition_in_progress) {
    console.log('not in transition')

    transition_in_progress = true;

    doTransition(side, direction);

    // wait till the current transition to complete to allow next
    setTimeout(function () {
      transition_in_progress = false;
    }, 130);
  }
};

// function to implement tht transition
function doTransition(side, direction) {
  console.log('doing')
    // store the touch direction and side
  if (side == 'left_circle') {
    var theta = theta_ref.left;
  } else {
    var theta = theta_ref.right;
  }
  // same login as initialization
  var main = document.getElementById(side);
  var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
  var elements = document.getElementById(side).childNodes;
  // change the order of angles according to the direction
  if (direction == 'up') {
    var first_theta = theta.shift();
    theta.push(first_theta);
  } else {
    var last_theta = theta.pop();
    theta.unshift(last_theta);
  }
  // postion the new elements accordingly
  // timing of the movement is handled by the css
  elements.forEach(
    function (element, key, listObj, argument) {
      element.posx = Math.round(a * (Math.cos(theta[key]))) + 'px';
      element.posy = Math.round(b * (Math.sin(theta[key]))) + 'px';
      element.style.top = ((mainHeight / 1.3) - parseInt(element.posy.slice(0, -2))) + 'px';
      if (side == 'left_circle') {
        element.style.left = ((mainHeight / 30) + parseInt(element.posx.slice(0, -2))) - 20 + 'px';
      } else {
        element.style.right = ((mainHeight / 30) + parseInt(element.posx.slice(0, -2))) - 20 + 'px';
      }
    });
  // store the new order of angles
  if (side == 'left_circle') {
    theta_ref.left = theta;
    swipes.left_array.shift();
  } else {
    theta_ref.right = theta;
    swipes.right_array.shift();
  }
}


// swipe detection
var touch_s;
var time_s;
$('#left_circle').on('touchstart', function (event) {
  touch_s = event.originalEvent.touches[0].clientY;
  time_s = event.timeStamp;
});
//$('#left_circle').on('touchend', function (event) {
$('#left_circle').on('touchmove', function (event) {
  var touch_e = event.originalEvent.changedTouches[0].clientY;
  var time_e = event.timeStamp;
  // this value calculates if a scroll happened?
  if (touch_s > touch_e + 25) {
    // upscroll code
    exe_times = Math.ceil(100 / (time_e - time_s));
    if (exe_times > 1) {
      exe_times--;
    } else {
      exe_times = 1;
    }
    for (i = 0; i < exe_times; i++) {
      circularScroll('left_circle', 'up');
    }
    touch_s = event.originalEvent.touches[0].clientY;
    // this value calculates if a scroll happened?
  } else if (touch_s < touch_e - 25) {
    // downscroll code
    exe_times = Math.ceil(100 / (time_e - time_s));
    if (exe_times > 1) {
      exe_times--;
    } else {
      exe_times = 1;
    }
    for (i = 0; i < exe_times; i++) {
      circularScroll('left_circle', 'down');
    }
    touch_s = event.originalEvent.touches[0].clientY;
  }
});
$('#right_circle').on('touchstart', function (event) {
  touch_s = event.originalEvent.touches[0].clientY;
  time_s = event.timeStamp;
});
//$('#right_circle').on('touchend', function (event) {
$('#right_circle').on('touchmove', function (event) {
  var touch_e = event.originalEvent.changedTouches[0].clientY;
  var time_e = event.timeStamp;
  // this value calculates if a scroll happened?
  if (touch_s > touch_e + 25) {
    // upscroll code
    exe_times = Math.ceil(100 / (time_e - time_s));
    if (exe_times > 1) {
      exe_times--;
    } else {
      exe_times = 1;
    }
    for (i = 0; i < exe_times; i++) {
      circularScroll('right_circle', 'up');
    }
    touch_s = event.originalEvent.touches[0].clientY;
    // this value calculates if a scroll happened?
  } else if (touch_s < touch_e - 25) {
    // downscroll code
    exe_times = Math.ceil(100 / (time_e - time_s));
    if (exe_times > 1) {
      exe_times--;
    } else {
      exe_times = 1;
    }
    for (i = 0; i < exe_times; i++) {
      circularScroll('right_circle', 'down');
    }
    touch_s = event.originalEvent.touches[0].clientY;
  }
});
