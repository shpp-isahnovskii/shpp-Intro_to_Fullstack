function sum_of_num(){

  let a = parseInt(document.getElementById("sum_num_1").value);
  let b = parseInt(document.getElementById("sum_num_2").value);

  let index;
  let counter;
  let sum = 0;

  if(a > b) {
    index = a - b;
    counter = b;
  } else {
    index = b - a;
    counter = a;
  }
  
  for(let i = 0; i < index; i++) {
    if(counter % 2 === 0 || counter % 3 === 0 || counter % 7 === 0) {
      sum =+ counter;
      console.log(counter);
    }
    counter++;
  }
  console.log(sum);
}

function reset() {
  if(document.getElementById("sum_of_two").value != "") {
    document.getElementById("sum_num_1").value = "";
    document.getElementById("sum_num_2").value = "";
    document.getElementById("sum_of_two").innerHTML = "";
  }
}
var input = document.getElementById("sum");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   sum_of_num();
  }
});