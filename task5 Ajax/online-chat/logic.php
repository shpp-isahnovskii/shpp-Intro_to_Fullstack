<?php

const USERS_URL = './database/users/users.json';
const CHATING_URL = './database/chat/chat.json';
const CHAT_PAGE = './components/chat-window.php';
const LOGIN_PAGE = './components/login-window.php';

$_SESSION['err'] = false;
$_SESSION['chat_content'] = '';
$_SESSION['current_page'] = '';

chose_current_window();

function chose_current_window() {

  if ($_SERVER["REQUEST_METHOD"] == "POST") { //TODO refactoring
    set_login_form();
    $_SESSION['err'] = true;
  }
  if( !isset($_POST['name']) || !isset($_POST['pass']) ) {
    set_login_form();
    $_SESSION['err'] = false;

  } else {
    if(user_autho($_POST['name'], $_POST['pass']) ){
      set_chat_form();
      $_SESSION['err'] = true;

    } else {
      set_login_form();
    }
  }
  require($_SESSION['current_page']);
}

function login() {
    //get login data
    $name = $_POST['name'];
    $pass = $_POST['pass'];
    //get authorization status
    return user_autho($name, $pass);
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
