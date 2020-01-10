<?php

const USERS_URL = './database/users/users.json';
const CHATING_URL = './database/chat/chat.json';
const CHAT_PAGE = './components/chat-window.php';
const LOGIN_PAGE = './components/login-window.php';

main();

function main() {
  if( isset($_POST['name']) && isset($_POST['pass']) ) { //if have data
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['pass'] = $_POST['pass'];
    setActiveForm(); //- try to login
    return;
  }
  if ($_SERVER['REQUEST_METHOD'] == 'POST') { //if got data from post
    if(isset($_POST['text'])) {
      //refresh chat
    } else {
      //...
    }
    //make two parts: 1 for login, 2 for refresh chat
    setActiveForm(); //- try to login
  } else {
    set_login_form();
    require_once($_SESSION['current_page']);
  }
}

function setActiveForm() {
  if( login() ) {
    set_chat_form();//if login - go to chat page
  } else {
    set_login_form();//if not - go to login page
  }
  require_once($_SESSION['current_page']);
}

function login() {
  //get authorization status true or false
  return user_autho($_SESSION['name'], $_SESSION['pass']);
}

//extract chat data and show it
function set_chat_form() {
  $chat_data = data_extract(CHATING_URL);
  $_SESSION['chat_content'] = show_chat($chat_data);
  $_SESSION['current_page'] = CHAT_PAGE; //set page
}
//set error and go to login page
function set_login_form() {
  $_SESSION['current_page'] = LOGIN_PAGE; //set page
}

//search user data if not found - return to main page
function user_autho($name, $pass) {
  $users_data = data_extract(USERS_URL);//get users data

  foreach ($users_data as $key => $value) {
    if($key == $name && $value == $pass ) {
      return true;
    }
  }
  return false;
}

//extract array of users in format name => pass
function data_extract($path) {
  $json = file_get_contents($path);
  return json_decode($json);
}

//render chat messages
function show_chat($data) {
  $content = '';
  foreach ($data as $element => $message) { //read some 1 message
    $m = get_object_vars($message);
      $content .= 
    '<article>
        <h5 class="chat-name">'.$m['name'].'</h5>
        <div class="chat-message-wrapper">
          <p class="chat-message">'.$m['message'].'</p>
          <p class="chat-time">'.$m['time'].'</p>
        </div>
      </article>';
  }
  return $content;
}

?>
