<?php
    /**
   * T3. Use it for making array from all files in the some directory named $dir inside this function
   */
  function task3ShowFiles() {
    //search all files in 'downloads' directory
    // https://www.php.net/manual/ru/function.opendir.php
    // https://www.php.net/manual/ru/function.readdir.php
    $arr = [];
    $dir = 'downloads/';
    
    if(is_dir($dir)) {
      if($dh = opendir($dir)) {
        while(false !== ( $file = readdir($dh)) ) {
          if (( $file != '.' ) && ( $file != '..' )) {
            $size = filesize($dir.$file);
            $arr[$file] = fileSizeConvert($size);
          }
        }
      }
      closedir($dh);
    }
    return HTMLformated($arr);
  }

  /**
   * T3. This function get size of the file and convert into readable format 0,00 xx 
   * folowed by instruction: //https://www.php.net/manual/ru/function.filesize.php
   */
  function fileSizeConvert($bytes) { 
    $bytes = floatval($bytes);
    $arBytes = [
      pow(1024, 4) => 'TB',
      pow(1024, 3) => 'GB',
      pow(1024, 2) => 'MB',
      1024 => 'KB',
      1 => 'byte'
    ];
    foreach($arBytes as $key => $value) {//run throuth array of bytes indent
      if($bytes >= $key) {
        $result = $bytes / $key;
        $result = str_replace(".", "," , strval(round($result, 2)))." ".$value; //size of the input file in format 0,00 __
        break;
      }
    }
    return $result;
  }

  function HTMLformated($arr) {
    $result = "";
    foreach($arr as $key => $value) { //$key is file name, $value is size MB TB GB..
      if(imageChecked($key)) {
        $result = $result.
        "<div class='file-box'>
          <img src='./downloads/".$key."' alt=\"it's an image\">
          <a class='text-box' href='./downloads/$key' download>".$key.'<br>'.$value.'</a>
        </div>';
      } else {
        $result =  $result.
        "<div class='file-box'>
        <img src='./icons-folder/".'file.png'."' alt=\"it's a file\">
        <a class='text-box' href='./downloads/$key' download>".$key.'<br>'.$value.'</a></div>';
      }
    }
    return $result;
  }
  function imageChecked($filename) {
    $patern = '/((?<=\.)[a-z]+)$/';
    preg_match($patern, $filename, $extension); //return an array
    $imgFormats = ['jpeg','jpg','png','gif','bmp','svg'];

    foreach($imgFormats as $value) {
      if($value == $extension[0]) {
        return true;
      }
    }
    return false;
  }