
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

  const a = parseInt(document.getElementById("sum_num_1").value); //first input
  const b = parseInt(document.getElementById("sum_num_2").value); //second input

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
    if (remainder === 2 || remainder === 3 || remainder === 7) { //check if val ends for 2, 3, 7
      sum += counter;
    }
    counter++;
  }
  document.getElementById("sum_of_two").innerHTML = sum;
}

//reset calculated values
function reset() {
  if (!document.getElementById("sum_of_two").value) {
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

  const input_seconds = document.getElementById("get_seconds").value;

  const regExp = /^([0-9]+)$/

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
  const input_time = document.getElementById("get_time").value;

  /*Correct input regExp example: https://stackoverflow.com/questions/8318236/regex-pattern-for-hhmmss-time-string 
   *regExp builder: https://regexr.com/
   */
  const regExp = /^([0-9]+)((:[0-5][0-9]){2})$/ //correct input for this form looks like this:  0:59:59

  if (!input_time.match(regExp)) { //if not mach

    alert("Something being wrong.\nPlease use text in format: hh:mm:ss");

  } else {
    const split_time = input_time.split(':');
    const seconds = (+split_time[0]) * 60 * 60 + (+split_time[1]) * 60 + (+split_time[2]); //transform hours to minutes then to seconds + min to sec + sec

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
  const first_date = new Date(document.getElementById("get_datetime_one").value + "Z");
  const second_date = new Date(document.getElementById("get_datetime_two").value + "Z");

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
  document.getElementById("set_new_date").innerHTML = ` ${result[0]} seconds, ${result[1]} minutes, ${result[2]} hours, ${result[3]} days, ${result[4]} months, ${result[5]} years.`;
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
    document.getElementById("btn_draw_board").style.display = "block";//display hidden element <!>

  } else {
    alert("your browser don't support the canvas");
  }
}


/**
 * We draw a board on our canvas here. For this we take our global ctx and canvas. Then take new values from our user: x y chess boxes.
 * Finaly we calculate size of each box and draw them on the canvas.
 */
function draw_board() {

  const rows = +document.getElementById("get_chess_x").value; //add "+" symbol before to transform string into int
  const cols = +document.getElementById("get_chess_y").value;
  
  const canva_height = canvas.height;
  const canva_width = canvas.width;

  ctx.clearRect(0, 0, canva_width, canva_height);//clear canvas

  const max_size = cols >= rows ? cols : rows; //take maxi value to calculete size of the squares from this value

  const square_size = Math.sqrt((canva_height * canva_width) / (max_size * max_size)); // one square width or heigth size

  //cycle to buils a chess board
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      if ((x + y) % 2 === 0) {
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

  const board_size = document.getElementById("get_board_size").value.split('x'); // get size of the board (n * n)
  const board = document.getElementById("chess_board_div");
  
  remove_child_elements(board); //if something inside. Means if board was built once then remove it
  
  const xy = get_xy(board_size);

  build_board(xy[0],xy[1], board); //build it with out the size

  set_board_size(board, xy[0], xy[1]);
}


//get X Y from input values, also throw invalid input in user don't used XxY formating
function get_xy(board_size) {
  let xy = [0,0];
  switch (board_size.length) {
    case 1: checkNaN(board_size[0]) ? alert('invalid input') : xy[0] = board_size[0], xy[1] = board_size[0];
    break;
    case 2: (checkNaN(board_size[0]) || checkNaN(board_size[1]) === true) ? alert('invalid input') : xy[0] = board_size[0], xy[1] = board_size[1];
    break;
    default: alert('invalid input');
    break;
  }
  return xy;
}

//div blocks builder for our chees table
function build_board(x, y, board) {

  let chessBlock = document.createDocumentFragment(); //create element, it will be fill append to the to the parent board

  for(let i = 0; i < y; i++) {
    for(let j = 0; j < x; j++) {
      let new_div = document.createElement("div");
      if( (i + j) % 2 === 0) {
        new_div.setAttribute("class", "black chess_block");
      } else {
        new_div.setAttribute("class", "white chess_block");
      }
      chessBlock.appendChild(new_div);
    }
    board.appendChild(chessBlock);
  }
}

// check for NaN
function checkNaN(argument) {
  return isNaN(parseInt(argument)) ? true : false;
}

/**
 * Function build board inside the tag
 * @param {id wrapper of the board. Board will be spawn in it} parent_div_name 
 * @param {size of the board} board_size from User input. for Example "8" - amount of sqares at each side
 */
function set_board_size(board, x, y) {
  //get window size width
  const window_x = window.innerWidth * 0.8; // wanna get 80% of the max width
    
  const bigger_value = +x > +y ? x : y; 

  const one_box_size = Math.floor(window_x / bigger_value / 2);  //  /2 because I use padding for build board and i need a whole number to *2 it again. Example: side is 11, if I get 11/2 padding without floor it will be 5.5 - i dont need that val.
  
  board.style.width = `${one_box_size * x * 2}px`;

  board.style.height = `${one_box_size * y * 2}px`;
  
  board.querySelectorAll("div.chess_block").forEach(el => el.style.padding = one_box_size +"px");
}

function remove_child_elements(node) {
    if(node.firstChild) {
      while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
}

//-------------- end of Part 4.2 ----------------

/**
 * Part 5
 * A User inputs any number of links and IP addresses separated by a comma. 
 * If text-area becomes not active: return all valid links, sorted by alphabet. 
 * Each link opens in a new window.
 */

/*If user click mouse outside from textarea, then we execute */
text_to_links.onblur = function() {
  if (this.classList.contains('onfocus')) {
    this.classList.remove('onfocus');
    make_link_list(text_to_links.value);
  }
  text_to_links.classList.add('onblur');
};
text_to_links.onfocus = function() {
  if (this.classList.contains('onblur')) {
    this.classList.remove('onblur');
  }
  text_to_links.classList.add('onfocus');
};

function make_link_list(get_text) {

  /* first remove old one list*/
  const link_list = document.getElementById("link_output");
  remove_child_elements(link_list);

  //add www.links and IPs regExp
  
  const IPExp = /((([0-9]){1,3})\.){3}([0-9]){1,3}/g;
  const LinkExp = /(https?:\/\/(www\.)*(\w)+([\.A-Za-z]){2,})((\/){1}([\w\-\._~:?#[\]@!\$&'\(\)\*\+,;=.])+)*/g;

  //create new one list

  let allIP = get_text.match(IPExp);
  const allLinks = get_text.match(LinkExp);

  if (allIP != null) { //add hhtp to all IP data
    allIP = allIP.map(n => `http://${n}`);
  }
  //make new div with those data
  list_maker(link_list, allIP);
  list_maker(link_list, allLinks);
}

function list_maker(parent, data) {
  if(data != null && typeof data[Symbol.iterator] ==='function') { //example how to find iterable function: https://stackoverflow.com/questions/18884249/checking-whether-something-is-iterable
    data.sort();
    data.forEach(element => {
      let a = document.createElement("a");
      a.href = element;
      a.title = "open this link in new page";
      a.text = element.replace(/https?:\/\/(www.)*/,'');
      a.target="_blank"; //open link in a new page
      parent.appendChild(a);
      parent.innerHTML += '<br>';
    });
  }
}

//-------------- end of Part 5 ----------------

/**
 * Part 6
 * User input text in the 'textarea' and the key-word into 'input'. 
 * Our task is to mark this text inside the textarea.
 */
function mark_text() {
  let text = document.getElementById("text_to_mark");
  const div_for_text = document.getElementById("div_for_text");
  let marker = document.getElementById("marker").value;
  const shielding = /(\\)|(\.)|(\[)|(\])|(\{)|(\})|(\()|(\))|(\<)|(\>)|(\*)|(\+)|(\-)|(\=)|(\!)|(\?)|(\^)|(\$)/g
  marker = marker.replace(shielding, '\\$&');
  
  const regex = new RegExp(marker, 'gi');
  div_for_text.innerHTML = text.value.replace(regex,`<mark>$&</mark>`);
}