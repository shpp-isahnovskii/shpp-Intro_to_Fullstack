
const input = document.getElementById("sum");
input.addEventListener("keyup", function (event) {

  if (event.keyCode === 13) {
    event.preventDefault();
    sum_of_num();
  }

});

/* Part 1. 
 * Get sum of the numbers in range from -100 to 100.
 * Numbers must ends on 2,3,7 to be calculated.
 */
function sum_of_num() {

  let a = parseInt(document.getElementById("sum_num_1").value);
  let b = parseInt(document.getElementById("sum_num_2").value);

  let index; //start value
  let counter; //counter from start value to end of cycle
  let sum = 0;

  if (a > b) {
    index = a - b;
    counter = b;
  } else {
    index = b - a;
    counter = a;
  }

  let remainder; // reminder of 10

  for (let i = 0; i <= index; i++) {
    remainder = Math.abs(counter % 10);
    if (remainder == 2 || remainder == 3 || remainder == 7) {
      sum += counter;
    }
    counter++;
  }
  document.getElementById("sum_of_two").innerHTML = sum;
}

function reset() {
  if (document.getElementById("sum_of_two").value != "") {
    document.getElementById("sum_num_1").value = "";
    document.getElementById("sum_num_2").value = "";
    document.getElementById("sum_of_two").innerHTML = "";
  }
}
//-------------- end of Part 1 ----------------



/**
 * Part 2.
 * There is two parts: 
 * 1. In first one user input number of seconds and programm convert it into format like hh:mm:ss
 * 2. In second part we have invert of first part. User input some time in format hh:mm:ss and program transfer input into seconds.
 */

/**
 * 1. Function convert secounds what was inputed by user to the time formating like hh:mm:ss
 */
function to_time_convert() {

  let input_seconds = document.getElementById("get_seconds").value;

  let seconds = input_seconds % 60;
  let minutes = (input_seconds - seconds) / 60 % 60;
  let hours = Math.floor(input_seconds / 3600);

  if (hours < 10) { hours = "0" + hours }
  if (minutes < 10) { minutes = "0" + minutes }
  if (seconds < 10) { seconds = "0" + seconds }


  document.getElementById("set_time").innerHTML = hours + ":" + minutes + ":" + seconds;
  // var date = new Date(null);
  // date.setSeconds(input_seconds);
  // var time = date.toISOString().substr(11,8); //https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss/6313008
  // console.log(date);
  // document.getElementById("set_time").innerHTML = time;

}
/**
 * 2. Function convert user input hh:mm:ss to the number amount of seconds in that input
 */

function to_seconds_convert() {
  let input_time = document.getElementById("get_time").value;

  /*Correct input regExp example: https://stackoverflow.com/questions/8318236/regex-pattern-for-hhmmss-time-string 
   *regExp builder: https://regexr.com/
   */
  let regExp = /^([0-9]+)((:[0-5][0-9]){2})$/

  if(!input_time.match(regExp)) {

    alert("Something being wrong.\nPlease use text formated by hh:mm:ss");

  } else {
    let split_time = input_time.split(':');
    let seconds = (+split_time[0]) * 60 * 60 + (+split_time[1]) * 60 + (+split_time[2]);

    document.getElementById("set_seconds").innerHTML = seconds;
  }

  //-------------- end of Part 2 ----------------
}