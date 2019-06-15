
let a = document.getElementById("sum_num_1");
let b = document.getElementById("sum_num_2");

function sum_of_num(){
  let counter;
  let sum = 0;

  if(a > b) {
    counter = a - b;
  } else {
    counter = b - a;
  }

  for (let index = 0; index < counter; index++) {
    
    
    sum += 

  }

  let regxp = /[237]$/g;

  let found = a.value.match(regxp);

  console.log(found);


  document.getElementById("sum_of_two").innerHTML = parseInt(a.value) + parseInt(b.value);
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