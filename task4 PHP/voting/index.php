<?php
  if(isset($_POST['ansver']) ) {
    $arr = $_POST['ansver'];
    //get json
    $file_path = './data/json.json';
    $json_file = file_get_contents($file_path);
    $json_file = json_decode($json_file, true);

    foreach ($arr as $n_item_in_post => $key) { // n_item is a serial number, $key is a name of that item
      isset($json_file[$key]) ? $json_file[$key]++ : $json_file[$key] = 1;
    }
    var_dump($json_file);
    $json_encoded = json_encode($json_file, TRUE);
    file_put_contents($file_path, $json_encoded); //https://www.php.net/manual/en/function.file-put-contents.php

    header("Location: pie.php"); //go to the pie :P
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
  <p>Just go to the pie: <button onclick="window.location.href='pie.php'">go</button></p>

</section>
<style>
  body {
    margin: 0;
    display: flex;
    height: 80vh;
    align-items: center;
    justify-content: center;
  }
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid silver;
    padding: 2rem 3rem;
    border-radius: 8px;
  }
  .form__checkboxes {
    display: flex;
    flex-direction: column;
    border: 1px solid silver;
    padding: 1rem;
    border-radius: 8px;
    
  }
  input[type=submit] {
    margin-top: 0.5rem;
    width: 100%;
    border-radius: 4px;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.17);
    background-color: silver;
  }
  label {
    font-size: 1.2rem;
    padding: 2px;
  }
  input[type=checkbox] {
    transform: scale(1.5);
  }
  </style>
</body>
</html>