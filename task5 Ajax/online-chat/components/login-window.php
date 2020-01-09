<?php 
    $err = '';
    if( $_SESSION['err'] === true )
    { 
      $err = '* please enter valid name and pass'; 
      session_destroy();
    }
?>

<form class="login-form" method="post">
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
