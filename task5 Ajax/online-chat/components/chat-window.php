  <!-- chat content -->
<div id="chatOutput" class="chat-content">
  <?php echo $_SESSION['chat_content']; ?>
</div>
<form class="chat-form" action="#" method="post" id="form-disable">
  <input class="chat-text" type="text" name="" >
  <input class="chat-btn" type="submit" value="Send">
</form>
<button onclick='logout()' class="logout-btn" >logout</button>
<!-- end of chat content -->

<div>
  <div id="demo">hm..</div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="./script/script.js"></script>