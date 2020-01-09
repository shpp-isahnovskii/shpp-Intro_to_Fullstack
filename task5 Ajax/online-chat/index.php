<?php 
  session_start();
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
      <!-- login form or chat -->
      <?php require('./logic.php') ?>
      <!-- end login form or chat -->
    </div>
  </body>
</html>