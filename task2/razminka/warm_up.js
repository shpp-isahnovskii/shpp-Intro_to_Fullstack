
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

  let regExp = /^([0-9]+)$/

  if (!input_seconds.match(regExp)) {

    alert("Invalid value.\nPlease input some numbers");

  } else {
    let seconds = input_seconds % 60;
    let minutes = (input_seconds - seconds) / 60 % 60;
    let hours = Math.floor(input_seconds / 3600);

    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }

    document.getElementById("set_time").innerHTML = hours + ":" + minutes + ":" + seconds;
  }
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

  if (!input_time.match(regExp)) {

    alert("Something being wrong.\nPlease use text in format: hh:mm:ss");

  } else {
    let split_time = input_time.split(':');
    let seconds = (+split_time[0]) * 60 * 60 + (+split_time[1]) * 60 + (+split_time[2]);

    document.getElementById("set_seconds").innerHTML = seconds;
  }
}
//-------------- end of Part 2 ----------------


/**
 * Part 3.
 * User has two input date form. This function will calculate the difference between two dates
 */
function date_difference() {
  let split = /-|:|T/;
  //                    YYYY MM DD HH MM
  //Date input example: 4556-12-23T19:08
  let first_date = new Date(document.getElementById("get_datetime_one").value + "Z");
  let second_date = new Date(document.getElementById("get_datetime_two").value + "Z");
  
  console.log(first_date);
  console.log(second_date);

  if ( (first_date == "Invalid Date") || (second_date == "Invalid Date") ) {
    alert("Invalid input.\nMake sure what all entered values are correct");
  } else {

    if(first_date < second_date) {
      [first_date, second_date] = [second_date, first_date];
    }
    
    //two arrays of dates, prepeared for calculate
    let first_date_arr = [first_date.getSeconds(), first_date.getMinutes(), first_date.getHours(), first_date.getDate(), first_date.getMonth(), first_date.getFullYear()];
    let second_date_arr = [second_date.getSeconds(), second_date.getMinutes(), second_date.getHours(), second_date.getDate(), second_date.getMonth(), second_date.getFullYear()];

    console.log(first_date_arr);
    console.log(second_date_arr);

    let element = {};

    for (let i = 0; i < first_date_arr.length; i++) {

      element[i] = first_date_arr[i] - second_date_arr[i];

      if(element[i] < 0) {
        element[i] = date_recalculate(i, element[i]);
        element[i + 1]--;
      }
    }
  console.log(element);
  }
}


function date_recalculate(index, value) {
  // {seconds, minutes, hours, days, mounths, years}
  switch(index) {
    case 0:             //seconds
    case 1:             //minutes
    case 2: value +=60; //hours
    break;
    case 3: value +=24; //days

    break;
    case 4: value +=31; //months
    break;

  }
  return value;
}

function month_recalculate(value) {
  const days_in_months = [31,28,31,30,31,30,31,31,30,31,30,31];
  
}

//-------------- end of Part 3 ----------------