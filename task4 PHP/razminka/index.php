<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>razminka</title>
  <link rel="shortcut icon" href="./icons-folder/favicon.ico">
  <link rel="stylesheet" type="text/css" href="./styles/index.css">

</head>
<body>

  <article>
      <h3>Part 1</h3>
      <p>Hello there. Fill this two inputs with numbers and I'll will add this two values. Range for inputs is -1000 to 1000</p>
      input two numbers:
    <form autocomplete="off" action="calculations.php" method="POST">
      <input type="number" min="-1000" max="1000" name="val1" placeholder="3">
      <input type="number" min="-1000" max="1000" name="val2" placeholder="4">
      <span>
      <?= isset($_SESSION['part1Result']) ? "sum of values is ".$_SESSION['part1Result'] : ""; ?>
      </span>
      <input type="hidden" value="task1" name="action">
      <input type="submit" value="calculate" class="btn">
    </form>
  </article>
  
  <article>
    <h3>Part 2</h3>
    <p>Fill this two inputs with numbers. I'll will calculate all numbers between this two, what's ends for 2,3,7.</p>
    <form autocomplete="off" action="calculations.php" method="POST">
      <input type="number" min="-1000" max="1000" name="val1" placeholder="2">
      <input type="number" min="-1000" max="1000" name="val2"placeholder="12">
      <span>
      <?= isset($_SESSION['part2Result']) ? "sum of values is ".$_SESSION['part2Result'] : ""; ?>
      </span>
      <input type="hidden" value="task2" name="action">
      <input type="submit" value="calculate" class="btn">
    </form>
  </article>


  <article>
    <div class="article3-wrap">
      <div>
        <h3>Part 3</h3>
        <p>Hey! Here you can download some files.</p>
        
          <form action="calculations.php" enctype="multipart/form-data" method="POST">
            <input type="hidden" value="task3" name="action">
            <span>Upload file:</span><input type="file" name="my_file">
            <br>
            <input type="submit" value="download" class="btn">
          </form>
      </div>
        <div class="download-box">
        <?php
          require './Task3listloader.php';
          echo task3ShowFiles();
        ?>
        </div>
    </div>
  </article>

  <article>
    <h3>Part 4</h3>
    <p>Cheesboard. Here is the input for the numbers. Click build button to build a chessboard. U can build board in format XxY, for example 22x32</p>
      <form action="calculations.php" method="POST">
        <input type="hidden" value="task4" name="action">
        <input type="text" name="chees_size" placeholder="4x3">
        <input type="submit" value="build" class="btn">
      </form>
        <table class="cheesTable">
          <?= isset($_SESSION['part4Result']) ? $_SESSION['part4Result'] : ""; ?>
        </table>
  </article>

  <article>
    <h3>Part 5</h3>
    <p>Input number inside this box. Press button and see summa of the number parts. Example: 14 = 5. Don't use minuse values (-23) or doubles like 21.2</p>
    <form action="calculations.php" method="POST">
      <input type="hidden" value="task5" name="action">
      <input type="number" name="numItself" placeholder="43">
      <input type="submit" value="calculate" class="btn">
    </form>
    <span>
      <?= isset($_SESSION['part5Result']) ? $_SESSION['part5Result'] : ""; ?>
    </span>
  </article>

  <article>
    <h3>Part 6</h3>
    <p>In this task we will generate array of random numbers, then programm remove repeats, then sort and reverse this array and multiply values.</p>
    <p>I have no time for good realisation of this task.. so actualy is's only inside the calculations file.</p>
    <form action="calculations.php" method="POST">
      <input type="hidden" value="task6" name="action">
      <input type="submit" value="generate" class="btn">
    </form>
    <span>
    <?= isset($_SESSION['part6Result']) ? print_r($_SESSION['part6Result']) : ""; ?>
    </span>
  </article>

  <article>
    <h3>Part 8</h3>
    <p>Input text into textarea and Programm will calc amount of symbols it this text</p>
    <form action="calculations.php" method="POST">
      <input type="hidden" value="task8" name="action">
      <textarea name="textToCalc" class="text_for_calc" cols="32" rows="10">✌.|•͡˘‿•͡˘|.✌</textarea>
      <input type="submit" value="calculate" class="btn">
    </form>
    <span>
      <?= isset($_SESSION['part8Result']) ? $_SESSION['part8Result'] : ""; ?>
    </span>
  </article>

  <article>
  <h3>Reset data session.</h3>
  <!-- add session -->
  Session counter is: <span class="session"><?= isset($_SESSION['sessionCounter']) ? $_SESSION['sessionCounter']++ : $_SESSION['sessionCounter'] = 1; ?></span>
  <br>
  Logout:

    <form action="calculations.php" method="POST">
      <input type="submit" value="logout" name="action" class="btn">
    </form>
  </article>
  <!-- <script src="./script/warm_up.js" onload="draw_canvas()"></script> -->
</body>   
</html>