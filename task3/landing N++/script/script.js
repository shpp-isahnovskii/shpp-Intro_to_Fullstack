//I get examples for my code up from here:
//https://webcomplex.com.ua/jquery/plavnyj-skroll-posle-nazhatiya-na-yakornuyu-ssylku.html
//https://jsfiddle.net/L02tck8x/


$(document).ready(function () {
  
  $("#main-nav, .button-up").on("click", "a", function (event) {

    event.preventDefault();
    const element = $(this).attr('href');
    let offest = $(element).offset().top;

    const actualOffset = (element != '#about') ? offest : (Math.floor(offest / 2)); 


    $('body,html').animate({ scrollTop: actualOffset }, 1500);
  });
});
