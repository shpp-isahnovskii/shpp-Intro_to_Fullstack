<?php

session_start();

  /* Triggers for different POST forms. */
  if (isset($_POST['action'])) {
    switch (htmlentities($_POST['action'])) { //htmlentities convert all to text. Typical hacker protection
      case 'task1': task1Sum();
        break;
      case 'task2': task2Sum();
        break;
      case 'task3': task3Download();
        break;
      case 'task4': task4Chees();
        break;
      case 'task5': oneNumSum();
        break;
      case 'logout': session_destroy(); returnHomepage();
        break;
      default: returnHomepage();
        break;
    }
  }

  /**
   * Task 1. Summa for two numbers in range -1000 to 1000.
   */
  function task1Sum() {
    $a = htmlspecialchars($_POST['val1']) ?: 0;
    $b = htmlspecialchars($_POST['val2']) ?: 0;
    $_SESSION['part1Result'] = $a + $b;
    returnHomepage();
  }


  /**
   * Task 2. Summa for numbers what's end at 2,3,7.
   */
  function task2Sum() {
    $a = htmlspecialchars($_POST['val1']) ?: 0;
    $b = htmlspecialchars($_POST['val2']) ?: 0;
    $sum = 0;
    $remainder;

    if($a < $b) {
      list($a, $b) = array($b, $a); //swap $a and $b if $a less then $b  - found here: https://stackoverflow.com/questions/18356437/swap-two-variables-value-without-using-third-variable-in-php
    }

    for ($i = $b; $i <= $a; $i++) {
      $remainder = abs($i % 10);
      if ($remainder === 2 || $remainder === 3 || $remainder === 7) {
        $sum += $i;
      }
    }
    $_SESSION['part2Result'] = $sum;
    returnHomepage();
  }

  /**
   * Task 3. File Downloader: 
   * 1)Adding to the folder; 
   * 2)download from it.
   * Complex task. Used few addition function to do it.
   */
  function task3Download() {
    if(htmlspecialchars($_FILES['my_file']['name'])) {
      $dir = 'downloads/';
      $file = $_FILES['my_file']['name'];
      $path = pathinfo($file);
      $filename = $path['filename'];
      $ext = $path['extension'];
      $temp_name = $_FILES['my_file']['tmp_name'];

      $path_filename_ext = $dir.$filename.".".$ext;
      if(!file_exists($path_filename_ext)) { //if file is not exist
        move_uploaded_file($temp_name, $path_filename_ext); //move it to 'downloads' dir
      }
    }
    returnHomepage();
  }

  /**
   * Task 4: Cheesboard.
   * 1) User input some number to 'chees_size'
   * 2) programm build a chess board based on input. Input must be in format 'X' or 'XxY' like '10' or '10x12' for example.
   */
  function task4Chees() {

    $input = htmlspecialchars($_POST['chees_size']);
    $chop = explode("x", $input);

    $_SESSION['part4Result'] = isValid($chop) ? buildCheesboard($chop): 'invalid input';
    returnHomepage();
  }

  /**
   * This function returns 'true' if all cells of the inputed array is a numbersl.
   */
  function isValid($arr) {
    $size = sizeof($arr);
    if($size == 0 || $size > 2) {
      return false;
    } else {
      foreach($arr as $element) {
        if(!ctype_digit($element)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Function returns text, designed and formated for HTML document. In css I have some classes to supurt style for the blocks.
   */
  function buildCheesboard($arr) {
    sizeof($arr) == 1 ? $x = $y = $arr[0] : $x = $arr[0]; $y = $arr[1];
    $result = "";
    for($i = 0; $i < $y; $i++) {
      $result .= "<tr>";
      for($j = 0; $j < $x; $j++) {
        $result .= (($i + $j) % 2 == 0) ? "<td class='black chess_block'></td>" : "<td class='white chess_block'></td>";
      }
      $result .= "</tr>";
    }
    return $result;
  }
  /* End of Task 4: Cheesboard */

  /**
   * Task 5: Summa for number parts.
   * Example: 23 = 5.
   */
  function oneNumSum() {

    if( ctype_digit($_POST['numItself']) ) {
     
      $num = (string)$_POST['numItself'];
      $arr = str_split($num);
      $result = 0;
      
      foreach($arr as $element) {
        $result += $element; 
      }
      $_SESSION['part5Result'] = $result;
      
    } else {
      $_SESSION['part5Result'] = 'invalid input';
    }

    returnHomepage();
  }

  /**
   * function that returns you to the homepage.
   */
  function returnHomepage() {
    header('Location: ' . $_SERVER['HTTP_REFERER']); //$_SERVER['HTTP_REFERER'] not secured!!
  }
?>