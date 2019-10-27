<?php
  if(isset($_POST['ansver']) ) {
    echo 'hi';
    $arr = $_POST['ansver'];

    //get json
    $file_path = './data/json.json';
    $json_file = file_get_contents($file_path);
    $json_file = json_decode($json_file, true);

    foreach ($arr as $n_item_in_post => $key) { // n_item is a serial number, $key is a name of that item
      $json_file[$key]++;
    }
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
  <title>Voting table</title>
</head>
<body>

<?php
  $cols = array( 
    'cols' => array(
      ['id' => 'A','label' => 'breakfasts','type' => 'string'], 
      ['id' => 'B','label' => 'votes'     ,'type' => 'number']
    )
    'rows'
  );
  var_dump($cols);
?>
  <!-- 

{ cols: [{id: 'A', label: 'NEW A', type: 'string'}, {id: 'B', label: 'B-label', type: 'number'}, {id: 'C', label: 'C-label', type: 'date'}],
rows: [{c:[{v: 'a'}, {v: 1.0, f: 'One'}, {v: new Date(2008, 1, 28, 0, 31, 26), f: '2/28/08 12:31 AM'}]},{c:[{v: 'b'},
             {v: 2.0, f: 'Two'},
             {v: new Date(2008, 2, 30, 0, 31, 26), f: '3/30/08 12:31 AM'}
        ]},
         {c:[{v: 'c'},
             {v: 3.0, f: 'Three'},
             {v: new Date(2008, 3, 30, 0, 31, 26), f: '4/30/08 12:31 AM'}
        ]}
  ],
  p: {foo: 'hello', bar: 'world!'}
} -->

  <form action="" enctype="multipart/form-data" method="post">
    <h5>What do you like to have at breakfast?</h5></label><br>
    <label><input type="checkbox" name="ansver[]" value="eggs">яйца</label><br>
    <label><input type="checkbox" name="ansver[]" value="pancakes">блинчики</label><br>
    <label><input type="checkbox" name="ansver[]" value="cottage-cheese">творожок</label><br>
    <label><input type="checkbox" name="ansver[]" value="cheese-pancakes">сырнички</label><br>
    <label><input type="checkbox" name="ansver[]" value="sandwiches">бутеры</label><br>
    <label><input type="checkbox" name="ansver[]" value="soup">супец</label><br>
    <label><input type="checkbox" name="ansver[]" value="coffee">кофеек</label><br>
    <label><input type="checkbox" name="ansver[]" value="whatever">что угодно:)</label><br><br>
    <label><input type="submit" value="submit"></label><br>
    <!-- https://stackoverflow.com/questions/14026361/php-multiple-checkbox-array -->
  </form>
  <p>Just go to the pie: <button onclick="window.location.href='pie.php'">go</button></p>
  
</body>
</html>