<?php
session_start();
const USERS_URL = './database/users/users.json';
const CHATING_URL = './database/chat/chat.json';
$_SESSION['err'] = '';

$chat_content = '';


if( !isset($_POST['name']) && !isset($_POST['pass']) ) {
  header('Location: ./index.php');
} else {

  //get login data
  $name = $_POST['name'];
  $pass = $_POST['pass'];
  //get authorization status
  $authorisation_status = user_autho($name, $pass);

  //make choice
  if($authorisation_status) {
    $_SESSION['err'] = false; //error using in the authorisation page
    $chat_data = data_extract(CHATING_URL);
    $chat_content = show_chat($chat_data);
  } else {
    $_SESSION['err'] = true;
    header('Location: ./index.php');
  }

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

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./styles/index.css">
  <link rel="shortcut icon" href="./icons-folder/favicon.png">
  <title>Easy-Chat</title>
</head>

<body>
  <div class="decoration-top-line"></div>
  <div class="chat-window--wrapper">
    <h1>Easy Chat</h1>
    <div id="chatOutput" class="chat-content">
      <?php echo $chat_content; ?>
    </div>
    <form class="chat-form" action="" method="post">
      <input class="chat-text" type="text" name="" >
      <input class="chat-btn" type="submit" value="Send">
    </form>
  </div>
  <script src="./script/script.js"></script>
</body>
</html>