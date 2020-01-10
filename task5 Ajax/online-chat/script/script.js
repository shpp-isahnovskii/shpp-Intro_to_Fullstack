
window.onload = function() {
  var textarea = document.getElementById('chatOutput');
  textarea.scrollTop = textarea.scrollHeight;
}

//prevent submit for chat page
$('#form-disable').on('submit', function() {
  console.log('asd');
  e.preventDefault();
});

function logout() {
  window.location.href = "./components/logout.php";
}

function loadDoc() {
  var xhttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "./ajax_info.txt", true);
  xhttp.send();
}