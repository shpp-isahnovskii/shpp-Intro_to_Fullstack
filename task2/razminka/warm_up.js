
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

  let a = parseInt(document.getElementById("sum_num_1").value); //first input
  let b = parseInt(document.getElementById("sum_num_2").value); //second input

  let index; //start value
  let counter; //counter from start value to end of cycle
  let sum = 0;

  if (a > b) { // define bigger value and prepare values for calculation
    index = a - b;
    counter = b;
  } else {
    index = b - a;
    counter = a;
  }

  let remainder; // reminder of 10

  for (let i = 0; i <= index; i++) {
    remainder = Math.abs(counter % 10);
    if (remainder == 2 || remainder == 3 || remainder == 7) { //check if val ends for 2, 3, 7
      sum += counter;
    }
    counter++;
  }
  document.getElementById("sum_of_two").innerHTML = sum;
}

//reset calculated values
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

  if (!input_seconds.match(regExp)) { //validation for numbers only in the input

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
  let regExp = /^([0-9]+)((:[0-5][0-9]){2})$/ //correct input for this form looks like this:  0:59:59

  if (!input_time.match(regExp)) { //if not mach

    alert("Something being wrong.\nPlease use text in format: hh:mm:ss");

  } else {
    let split_time = input_time.split(':');
    let seconds = (+split_time[0]) * 60 * 60 + (+split_time[1]) * 60 + (+split_time[2]); //transform hours to minutes then to seconds + min to sec + sec

    document.getElementById("set_seconds").innerHTML = seconds;
  }
}
//-------------- end of Part 2 ----------------


/**
 * Part 3.
 * User has two input date form. This function will calculate the difference between two dates
 */
function dates_difference() {
  //let split = /-|:|T/;
  //                    YYYY MM DD HH MM
  //Date input example: 4556-12-23T19:08
  let first_date = new Date(document.getElementById("get_datetime_one").value + "Z");
  let second_date = new Date(document.getElementById("get_datetime_two").value + "Z");

  if ((first_date == "Invalid Date") || (second_date == "Invalid Date")) {
    alert("Invalid input.\nMake sure what all entered values are correct");
  } else {

    if (first_date < second_date) { //change to date values if second one bigger then first
      [first_date, second_date] = [second_date, first_date];
    }
    date_calculation(first_date, second_date);
  }
}
/**
 * Function take two dates, calculate difference and set this value in the html doc.
 * @param {date one} d1 current date
 * @param {date two} d2 date for substract
 */
function date_calculation(d1, d2) {
  result = new Array(6).fill(0);
  for (let i = 0; i < result.length; i++) {
    result[i] = dates_subtract(d1, d2, i) + result[i];

    if (result[i] < 0) {
      result[i] = result[i] + value_bust(i, d1); // result[i] can be 0, or -1 if previous value was busted
      result[i + 1]--; //minus 1 value to the next value in the array
    }
  }
  document.getElementById("set_new_date").innerHTML = "seconds(" + result[0] + "), " + "minutes(" + result[1] + "), " + "hours(" + result[2] + "), " + "days(" + result[3] + "), " + "months(" + result[4] + "), " + "years(" + result[5] + ").";
}

/**
 * 
 * @param {data one} d1 current date
 * @param {date two} d2 date to substract
 * @param {index in the array} index different calculation depending on the value
 */
function dates_subtract(d1, d2, index) {

  let result = 0;

  switch (index) {
    case 0: result = d1.getSeconds() - d2.getSeconds();
      break;
    case 1: result = d1.getMinutes() - d2.getMinutes();
      break;
    case 2: result = d1.getHours() - d2.getHours();
      break;
    case 3: result = d1.getDate() - d2.getDate();
      break;
    case 4: result = d1.getMonth() - d2.getMonth();
      break;
    default: result = d1.getFullYear() - d2.getFullYear();
  }
  return result;
}

function value_bust(index, d1) {
  //case: 0 - seconds, 1 - minutes, 2 - hours, 3 - days, 4 - mounths, 5 - years.
  let value = 0;

  switch (index) {
    case 0:             //transform 1 minute to +60 seconds
    case 1: value = 60; //from hours to minutes +60
      break;
    case 2: value = 24; //from days to hours + 24
      break;
    case 3: value = month_discover(d1); //from months to days 28-31
      break;
    case 4: value = 12; //from years to months +12
      break;
  }

  return value;
}
/**
 * Return days (28-31) of the next month
 * @param {current date} date use this current date to get next month in amount of days
 */
function month_discover(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

//-------------- end of Part 3 ----------------

/**
 * Part 4.
 * User has two inputs in the date form: amount_x and amounty. This function will create chess board a*b
 * lowest size is 1x1;
 */
let canvas; // make the canvas for a one time. doesn't need to be redraw in draw_board() cycle
let ctx; // same as canvas, i don't push this let inside the draw_board()

/**
 * this function get two inputs: x and y sizes of the futured canvas. Then We unhide canvas and buttons that build chess board.
 */
function draw_canvas() {

  canvas = document.getElementById("myCanvas");
  if (canvas.getContext) { //if browser support canvas
    
    ctx = canvas.getContext('2d'); //add drawing context
    document.getElementById("btn_draw_board").style.display = "block";//display hidden element

  } else {
    alert("your browser don't support the canvas");
  }
}


/**
 * We draw a board on our canvas here. For this we take our global ctx and canvas. Then take new values from our user: x y chess boxes.
 * Finaly we calculate size of each box and draw them on the canvas.
 */
function draw_board() {

  let rows = +document.getElementById("get_chess_x").value; //add "+" symbol before to transform string into int
  let cols = +document.getElementById("get_chess_y").value;
  
  let canva_height = canvas.height;
  let canva_width = canvas.width;

  ctx.clearRect(0, 0, canva_width, canva_height);//clear canvas

  let max_size = cols >= rows ? cols : rows; //take maxi value to calculete size of the squares from this value

  let square_size = Math.sqrt((canva_height * canva_width) / (max_size * max_size)); // one square width or heigth size

  //cycle to buils a chess board
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      if ((x + y) % 2 == 0) {
        ctx.fillRect(x * square_size, y * square_size, square_size, square_size);//coordinates (x, y, width, height)
      }
    }
  }
}
//-------------- end of Part 4.1 ----------------

/**
 * Part 4.2 - There is i used div-s to make board.
 */
function draw_div_board() {

  let board_size = document.getElementById("get_board_size").value; // get size of the board (n * n)

  if(document.getElementById("chess_board_div").firstChild) { //if something inside. Means if board was built once then remove it
    remove_old_board("chess_board_div");
  }
  
  for(let i = 0; i < board_size; i++) {
    for(let j = 0; j < board_size; j++) {
      let new_div = document.createElement("div");
      if( (i + j) % 2) {
        new_div.setAttribute("class", "black chess_block");
      } else {
        new_div.setAttribute("class", "white chess_block");
      }
      document.getElementById("chess_board_div").appendChild(new_div);
    }
  document.getElementById("chess_board_div").appendChild(document.createElement("br"));
  }
  set_board_size("chess_board_div", board_size); // "chess_board_div" - id of the div  that response for size of the board
}

/**
 * Function build board inside the tag
 * @param {id wrapper of the board. Board will be spawn in it} div_name 
 * @param {size of the board} board_size 
 */
function set_board_size(div_name, board_size) {
  /*get window size width and height*/
  let bigger_val = window.innerWidth; 
  let lower_val = window.innerHeight;

    if(bigger_val < lower_val) {
      [bigger_val, lower_val] = [lower_val, bigger_val];
    }
    bigger_val *= 0.8; // wanna get 80% of the min width
    bigger_val = bigger_val - bigger_val % 10; //subtract remainder
    let board =  document.getElementById(div_name);
    board.style.width = `${bigger_val}px`;
    board.style.height = `${bigger_val}px`;

    let one_box_size = Math.floor((bigger_val / board_size) / 2) + "px";
    board.querySelectorAll("div.chess_block").forEach(el => el.style.padding = one_box_size);
}
/**
 * Addition function for part 4.2 (chess board) for deleting all chess squares
 * @param {id of the element in which everything will be deleted} elementId 
 */
function remove_old_board(elementId) {
    // Removes an element from the document
    var myNode = document.getElementById(elementId);
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}