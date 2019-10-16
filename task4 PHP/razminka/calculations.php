<?php

session_start();

  /* Triggers for different forms */
  if (isset($_POST['action'])) {
    switch (htmlentities($_POST['action'])) { //htmlentities convert all to text. Typical hacker protection
      case 'task1': task1Sum();
        break;
      case 'task2': task2Sum();
        break;
      case 'task3': task3Download();
        break;
      default: returnHome();
        break;
    }
  }

  function task1Sum() {
    $a = htmlspecialchars($_POST['val1']) ?: 0;
    $b = htmlspecialchars($_POST['val2']) ?: 0;
    $_SESSION['part1Result'] = $a + $b;
    returnHome();
  }


  /**
   * Task 2. Summa for numbers what's end at 2,3,7
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
    returnHome();
  }

  /**
   * Task 3. File Downloader: 
   * 1)Adding to the folder; 
   * 2)download from it.
   * Complex task. Used few addition function to do it.
   */
  function task3Download() {
    if($_FILES['my_file']['name']) {
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
    returnHome();
  }
  
  function returnHome() {
    header('Location: ' . $_SERVER['HTTP_REFERER']); //$_SERVER['HTTP_REFERER'] not secured!!
  }
?>