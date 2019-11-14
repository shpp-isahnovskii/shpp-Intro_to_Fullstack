<?php 
  session_start();
  
  $users_list = './users/users.json';

  $users_data = users_data_extract($users_list);
  function users_data_extract($path) {
    $json = file_get_contents($path);
    return json_decode($json);
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
    <form class="login-form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="post">
      <label for="name">Enter your name</label>
      <input type="text" name="" id="name" placeholder="John Doe" autocomplete="off" required>
      <label for="pass">Enter your password</label>
      <input type="password" name="" id="pass" placeholder="•••••" required>
      <div class="submit-wrapper">
        <input type="submit" value="Submit">
        <div class="shadow"></div>
      </div>
    </form>
    <div><?php $err ?></div>
  </div>
</body>
</html>