  <!-- chat content -->
<div id="chatOutput" class="chat-content">
  <?php echo $_SESSION['chat_content']; ?>
</div>
<form class="chat-form" action="" method="post">
  <input class="chat-text" type="text" name="" >
  <input class="chat-btn" type="submit" value="Send">
</form>
<!-- end of chat content -->

<div>
  <div id="demo">hm..</div>
  <button onclick="loadDoc()">go</button>
</div>

<script src="./script/script.js"></script>