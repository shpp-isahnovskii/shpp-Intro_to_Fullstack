/* Part 1. 
 * Get sum of the numbers in range from -100 to 100.
 * Numbers must ends on 2,3,7 to be calculated.
 */

function sum_of_num() {



}
function sum_of_num() {

  let a = parseInt(document.getElementById("sum_num_1").value);
  let b = parseInt(document.getElementById("sum_num_2").value);

  let index;
  let counter;
  let sum = 0;

  if (a > b) {
    index = a - b;
    counter = b;
  } else {
    index = b - a;
    counter = a;
  }

  let remainder; // reminder for formula

  for (let i = 0; i < index; i++) {
    remainder = Math.abs(counter % 10);
    if (remainder == 2 || remainder == 3 || remainder == 7) {
      sum += counter;
      console.log("counter: " + counter);
    }
    counter++;
  }
  console.log("sum: " + sum);
}

function reset() {
  if (document.getElementById("sum_of_two").value != "") {
    document.getElementById("sum_num_1").value = "";
    document.getElementById("sum_num_2").value = "";
    document.getElementById("sum_of_two").innerHTML = "";
  }
}

//-------------- end of Part 1 ----------------

const input = document.getElementById("sum");
input.addEventListener("keyup", function (event) {

  if (event.keyCode === 13) {
    event.preventDefault();
  }

});




