//I get examples for my code up from here:
//https://webcomplex.com.ua/jquery/plavnyj-skroll-posle-nazhatiya-na-yakornuyu-ssylku.html
//https://jsfiddle.net/L02tck8x/



const page = $("html, body");

$(document).ready(function () {
  
  $("#main-nav, .button-up").on("click", "a", function (event) {

    //found solution to stop scroling if user start's do something else: https://stackoverflow.com/questions/18445590/jquery-animate-stop-scrolling-when-user-scrolls-manually
    page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
      page.stop();
    });

    //event.preventDefault();
    const element = $(this).attr('href');
    const offest = $(element).offset().top;

    const actualOffset = (element != '#about') ? offest : (Math.floor(offest / 2)); 


    $('body,html').animate({ scrollTop: actualOffset }, 1500);
  });
});
