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
  <link rel="stylesheet" type="text/css" href="./styles/index.css">

</head>
<body>

  <article>
      <h3>Part 1</h3>
      <p>Hello there. Fill this two inputs with numbers and I'll will add this two values. Range for inputs is -1000 to 1000</p>
      input two numbers:
    <form autocomplete="off" action="calculations.php" method="POST">
      <input type="number" min="-1000" max="1000" name="val1">
      <input type="number" min="-1000" max="1000" name="val2">
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
      <input type="number" min="-1000" max="1000" name="val1">
      <input type="number" min="-1000" max="1000" name="val2">
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
          require './T3listloader.php';
          echo task3ShowFiles();
        ?>
        </div>
    </div>
  </article>

  <article>
    <h3>Part 4.1</h3>
    <p>Here is two inputs, they build a chess board. Frist input is for rows, second is for columns.</p>

    <canvas id="myCanvas" width="250" height="250"></canvas> <!-- add canvas here and hide it-->
    <input type="number" id="get_chess_x" placeholder="X axis">
    <input type="number" id="get_chess_y" placeholder="Y axis">
    <div class="btn" id="btn_draw_board" onclick="draw_board()">create</div>

    <h3>Part 4.2</h3>
      <p>Here is second chess board, but made by using div's</p>
      <input type="text" id="get_board_size" placeholder="input board size">
      <div class="btn" id="btn_div_board" onclick="draw_div_board()">create</div> 
      <div id="chess_board_div"></div>
  </article>

  <article>
    <h3>Part 5</h3>
    <p>Input text inside this box. Click mouse out from it to make a link list.</p>
    <div class="row_wrapper">

      <div><textarea name="LinksBox" id="text_to_links" class="text_to_links" cols="32" rows="10"></textarea></div>
      <div id="link_output"></div>
    </div>
  </article>

  <article>
    <h3>Part 6</h3>
    <textarea name="marked_text" id="text_to_mark" class="text_to_links" cols="32" rows="10"></textarea>
    <input type="text" id="marker" name="merker_text">
    <div class="btn" onclick="mark_text()">mark</div>
    <div id="div_for_text"></div>
  </article>
  <!-- <script src="./script/warm_up.js" onload="draw_canvas()"></script> -->
</body>   
</html>