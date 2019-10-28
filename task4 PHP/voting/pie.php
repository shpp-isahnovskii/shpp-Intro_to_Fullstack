<?php 
  //get json same part of code like in index php
  $file_path = './data/json.json';
  $json_file = file_get_contents($file_path);
  $json_file = json_decode($json_file, true);
  $pie_file = [array('breakfast', 'votes')];
  foreach ($json_file as $key => $value) {
    $i = array($key, $value);
    $pie_file[] = $i;
  }
?>

<html>
  <head>
    <link rel="shortcut icon" href="./icons-folder/favicon.ico">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
    
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(<?php echo json_encode($pie_file)?>);

        var options = {
          title: 'what is your favorite breakfast?:',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="piechart_3d" style="width: 900px; height: 500px;"></div>
  </body>
  <style>
    body {
      display: flex;
      justify-content: center;
    }

  </style>
</html>