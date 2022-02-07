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
var x = true;
var start;
const btns = document.querySelectorAll('button[id^=button-]')

btns.forEach(btn => {
   btn.addEventListener('click', timer);
});

function timer(e) {
  if(x){
    start = new Date();
    x = false;
  }
  else{
    var elapsed = new Date() - start;
    x = true;
      
    recordData(elapsed, e.target.id);
  }
  console.log(x);

}

//figure out how we're logging the 'current stop' to get if it's correct or not
function recordData(elapsed, id) {
  var output = '';
  var correct_bool = 'TBD';
  var correct_btn = 'TBD';

  output += 'time: ' + elapsed;
  output +=  ' correct: ' + correct_bool;
  output += ' btn_clicked: ' + id;
  output += ' btn_correct: ' + correct_btn;
  output += ' color_arr: ' + getColors();

  console.log(output);
}

function getColors() {
  var arr = [];

  for(var i = 0; i < btns.length; i++) {
    var color = window.getComputedStyle(btns[i]);
    arr.push(color.getPropertyValue('background-color'));
  }
  return arr;
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
    console.log("DEFAUlT COLORS HAVE NOW BEEN SELECTED");
    x = true;

  }
  else if(x == 2){
    document.getElementById("button-1").style.backgroundColor = "#a4487e";
    document.getElementById("button-2").style.backgroundColor = "#218B21"; //Should be what protan precieves brown. Green for normal vision
    document.getElementById("button-3").style.backgroundColor = "#f6da00";
    document.getElementById("button-4").style.backgroundColor = "#fff5d2";
    // document.getElementById("button-5").style.backgroundColor = "#218B21";
    // document.getElementById("button-6").style.backgroundColor = "#218B21";
    console.log("STRONG PROTAN SET 1 HAS NOW BEEN SELECTED");
    x = true; //reset flag for recording time
  }
  else{

  }
}
