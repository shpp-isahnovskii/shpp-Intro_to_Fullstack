const users = [
  {
    name: 'Smith',
    link: './images/0.png'
  },
  {
    name: 'Jhon',
    link: './images/1.png'
  },
  {
    name: 'Yana',
    link: './images/2.png'
  },
  {
    name: 'Nin',
    link: './images/3.png'
  },
  {
    name: 'Elis',
    link: './images/4.png'
  }
];

$(document).ready(
 function() {
  tableBuild(users);
  clickListener();
});


function clickListener() {
  $('.option').click( function() {
    if (!$(':animated').length) {
      
      $('.removeMe').slideToggle(); // 'select friend' arrow - hide animation

      /*toggle for active class*/
      if($(this).hasClass('active')) { 
        $('.option:not(.active)').slideToggle();
        $(this).toggleClass('active');
        
      } else {
        $('.removeMe').remove(); //remove 'select friend' forever
        $(this).toggleClass('active');
        $('.option:not(.active)').slideToggle();
        addIndexesToOuterElement(this);
        $(this).css('order', '-1');
      }
    } 
  });
}

function addIndexesToOuterElement(child) {
  const parent = $(child).parent(child).find('li');
  $(parent).each( function(index, element) {
    const order = $(element).css('order');
    if(order !== $(child).css('order')) {
      $(element).css('order', index);
    }
  });
}

function tableBuild(table) {
  let fragment = document.createDocumentFragment();
  $(fragment).append(`<li class="option removeMe" style="order: -1"><div>Select Friend<span>▼</span></div></li>`);
  table.forEach( function(element, index) {
    $(fragment).append(`<li class="option" style="order:${index}; display:none"><img src="${element.link}"><div>${element.name}</div></li>`);
  });
  $('.dropdownMenu').append(fragment);
  $(fragment).first($('.option:first-child').addClass('active'));
}