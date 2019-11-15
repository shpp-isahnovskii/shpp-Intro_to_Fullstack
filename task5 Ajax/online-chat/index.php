<?php 
  session_start();
  $err = '';
  if( isset($_SESSION['err']) )
  { 
    $err = '* please enter valid name and pass'; 
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
  <div class="chat-login--wrapper">
    <h1>Easy Chat</h1>
    <form class="login-form" action="./chat-window.php" method="post">
      <label for="name">Enter your name</label>
      <input type="text" name="name" id="name" placeholder="John Doe" autocomplete="off" required>
      <label for="pass">Enter your password</label>
      <input type="password" name="pass" id="pass" placeholder="•••••" required>
      
      <div class="submit-wrapper">
        <input type="submit" value="Submit">
        <div class="shadow"></div>
        <div class="error"><?php echo $err?></div>
      </div>
    </form>
  </div>
</body>
</html>