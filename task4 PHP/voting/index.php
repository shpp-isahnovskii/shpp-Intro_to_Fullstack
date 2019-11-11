<?php
  $formInfo = '';
  if($_SERVER["REQUEST_METHOD"] == "POST") {
    if( isset($_POST['ansver']) ) {
      $arr = $_POST['ansver'];
      //get json
      $file_path = './data/json.json';
      $json_file = file_get_contents($file_path);
      $json_file = json_decode($json_file, true);

      foreach ($arr as $n_item_in_post => $key) { // n_item is a serial number, $key is a name of that item
        isset($json_file[$key]) ? $json_file[$key]++ : $json_file[$key] = 1;
      }
      $json_encoded = json_encode($json_file, TRUE);
      file_put_contents($file_path, $json_encoded); //https://www.php.net/manual/en/function.file-put-contents.php

      header("Location: pie.php"); //go to the pie :P
    } else {
      $formInfo = '<div class="alert">*please, chose something</div>';
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta value="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="shortcut icon" href="./icons-folder/favicon.ico">
  <title>Voting table</title>
  <link rel="stylesheet" href="./styles/index.css">
</head>
  <body>

    <section>
      <form action="" enctype="multipart/form-data" method="post">
        <h3>What do you like to have at breakfast?</h5></label>
        <div class="form__checkboxes">
          <!-- https://stackoverflow.com/questions/14026361/php-multiple-checkbox-array  ansver[]-->
          <label><input type="checkbox" name="ansver[]" value="eggs">яйца</label>
          <label><input type="checkbox" name="ansver[]" value="pancakes">блинчики</label>
          <label><input type="checkbox" name="ansver[]" value="cottage-cheese">творожок</label>
          <label><input type="checkbox" name="ansver[]" value="cheese-pancakes">сырнички</label>
          <label><input type="checkbox" name="ansver[]" value="sandwiches">бутеры</label>
          <label><input type="checkbox" name="ansver[]" value="soup">супец</label>
          <label><input type="checkbox" name="ansver[]" value="coffee">кофеек</label>
          <label><input type="checkbox" name="ansver[]" value="smashed-potatoes">пюрешка</label>
          <label><input type="checkbox" name="ansver[]" value="whatever">что угодно:)</label>
        </div>

        <label><input type="submit" value="submit"></label>
      </form>
      <?php echo $formInfo; ?>
      <p>Just go to the pie: <button onclick="window.location.href='pie.php'">go</button></p>

    </section>
  </body>
</html>