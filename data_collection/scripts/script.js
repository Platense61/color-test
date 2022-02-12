var select = 1;
// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

function changeColor(x) {
  if (x == '1'){
    select = 1;
  }
  else if (x == '2'){
    select = 2;
  }
  else if (x == '3'){
    select = 3;
  }
  else if (x == '4'){
    select = 4;
  }
  else if (x == '5'){
    select = 5;
  }
  else if (x == '6'){
    select = 6;
  }

}

pickr.on('change', (color, source, instance) => {
    console.log(color.toRGBA());
    const rgbaColor = color.toRGBA().toString();
    console.log(rgbaColor);
    if (select == 1) {
      document.getElementById("button-1").style.background = rgbaColor;
      console.log('select');
    }

    else if (select == 2) {
      document.getElementById("button-2").style.backgroundColor = rgbaColor;
      console.log(select);
    }

    else if (select == 3) {
      document.getElementById("button-3").style.background = rgbaColor;
      console.log(select);
    }

    else if (select == 4) {
      document.getElementById("button-4").style.background = rgbaColor;
      console.log(select);
    }

    else if (select == 5) {
      document.getElementById("button-5").style.background = rgbaColor;
      console.log(select);
    }

    else if (select == 6) {
      document.getElementById("button-6").style.background = rgbaColor;
      console.log(select);
    }
})

//timeout for counting timer
// setTimeout(function, 1000);
//var x = true;
var start; // timer starts as soon as page is loaded and is refreshed every button click
const btns = document.querySelectorAll('button[id^=button-]');
var color_arr = [];
var curr_stop = document.getElementById('current_stop');
var prev_btn_color;
var curr_btn_color;

function rgbToHex(rgb) {
  return '#' + rgb.match(/[0-9|.]+/g).map((x,i) => i === 3 ? parseInt(255 * parseFloat(x)).toString(16) : parseInt(x).toString(16)).join('')
}

// everything that needs to be initialized goes here
function initPage() {
  btns.forEach(btn => {
    btn.addEventListener('click', timer);
  });

 color_arr = getColors();
 setBusStop();
}

// stops the timer, calls outputting function, starts timer and refreshes color
function timer(e) {
  var elapsed = new Date() - start;
  //x = true;     
  recordData(elapsed, e.target.id);
  //console.log(x);
  setBusStop();
}

// sets the 'correct color' to a random color from one of the 6 buttons
// starts the timer
function setBusStop() {
  var rand = Math.floor(Math.random() * 6);
  start = new Date();
  //x = false;
  prev_btn_color = curr_btn_color;
  curr_btn_color = color_arr[rand];

  while(curr_btn_color == prev_btn_color) {
    rand = Math.floor(Math.random() * 6);
    curr_btn_color = color_arr[rand]; 
    //console.log('current color to pick: ' + curr_btn_color);
  }
  //console.log('current color to pick: ' + curr_btn_color);
  //console.log('rand: ' + rand);
  curr_stop.style.backgroundColor = curr_btn_color;
}

// prints important data structures to the console
function recordData(elapsed, id) {
  //console.log(id + typeof(id));
  var output = '';
  var correct_bool = calcCorrectStop(id);
  var correct_btn = colorToBtn(curr_btn_color) + 1;

  output += 'time: ' + elapsed;
  output += ', correct: ' + correct_bool;
  output += ', btn_clicked: ' + id;
  output += ', btn_correct: button-' + correct_btn;
  output += ', color_arr: ' + color_arr;

  console.log(output);
}

// updates the color array based off what colors are displayed
function getColors() {
  var arr = [];
  for(var i = 0; i < btns.length; i++) {
    var color = window.getComputedStyle(btns[i]).getPropertyValue('background-color');
    arr.push(color);
    //console.log('button ' + i + ' color: ' + color);
  }

  return arr;
}

// returns whether the correct button was clicked or not
function calcCorrectStop(id) {
  var btn_color = window.getComputedStyle(document.getElementById(id)).getPropertyValue('background-color');
  if(btn_color == curr_btn_color) {
    return true;
  }
  return false;
}

// returns the index of the button that is displaying color 'rgb'
// returns -1 otherwise
function colorToBtn(rgb) {
  for(var i = 0; i < btns.length; i++) {
    var btn_color = window.getComputedStyle(btns[i]).getPropertyValue('background-color');
    if(rgb == btn_color) {
      return i;
    }
  }
  return -1;
}


function presets(x){
  if(x == 1){
    //change back to original red
    document.getElementById("button-1").style.backgroundColor = "#ff0000";
    //change back to original brown
    document.getElementById("button-2").style.backgroundColor = "#7f6000";
    //change back to original brown
    document.getElementById("button-3").style.backgroundColor = "#385723";
    //change back to original brown
    document.getElementById("button-4").style.backgroundColor = "#ffff00";
    //change back to original brown
    document.getElementById("button-5").style.backgroundColor = "#002f8e";
    //change back to original brown
    document.getElementById("button-6").style.backgroundColor = "#7030a0";
    //console.log("DEFAUlT COLORS HAVE NOW BEEN SELECTED");
    //x = true;

  }
  else if(x == 2 || x == 3){
    document.getElementById("button-1").style.backgroundColor = "#a4487e";
    document.getElementById("button-2").style.backgroundColor = "#218B21"; //Should be what protan precieves brown. Green for normal vision
    document.getElementById("button-3").style.backgroundColor = "#f6da00";
    document.getElementById("button-4").style.backgroundColor = "#fff5d2";
    document.getElementById("button-5").style.backgroundColor = "#00bbff";
    // document.getElementById("button-6").style.backgroundColor = "#218B21";
    //console.log("STRONG PROTAN SET 1 HAS NOW BEEN SELECTED");
    //x = true; //reset flag for recording time
  }
  else{

  }
  setTimeout(function(){ 
    console.log('presetchangerd');
    color_arr = getColors();
    setBusStop();
  }, 300);
}

initPage();