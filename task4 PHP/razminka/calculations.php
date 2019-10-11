<?php

session_start();

  /* Triggers for different forms */
  switch (htmlentities($_POST['action'])) { //htmlentities convert all to text. Typical hacker protection
    case 'task1': task1Sum();
      break;
    case 'task2': task2Sum();
      break;
    case 'task3': task3Save();
      break;
    default:
      # code...
      break;
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





  function returnHome() {
    //echo "<pre>"; print_r($_SERVER); echo "</pre>";
    header('Location: ' . $_SERVER['HTTP_REFERER']); //$_SERVER['HTTP_REFERER'] not secured!!
  }
?>