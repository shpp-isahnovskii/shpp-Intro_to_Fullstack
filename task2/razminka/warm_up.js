/* Part 1. 
 * Get sum of the numbers in range from -100 to 100.
 * Numbers must ends on 2,3,7 to be calculated.
 */

const input = document.getElementById("sum");
input.addEventListener("keyup", function (event) {

  if (event.keyCode === 13) {
    event.preventDefault();
    sum_of_num();
  }
  
});

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

function get_time() {
  let input_seconds = document.getElementById("get_seconds").value;

  var date = new Date(null);
  date.setSeconds(input_seconds);
  var time = date.toISOString().substr(11,8); //https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss/6313008
  document.getElementById("set_time").innerHTML = time;
}