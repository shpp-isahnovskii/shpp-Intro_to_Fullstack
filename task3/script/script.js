let users = [
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

    if($(this).hasClass('active')) {
      $('.dropdown').removeClass('dropdown');
      $(this).removeClass('active');

    } else {

      $('ul').addClass('dropdown');
      $(this).addClass('active');
      addIndexesToOuterElement(this);
      $(this).css("order", '-1');

    }
  });
}

function addIndexesToOuterElement(child) {
  let parent = $(child).parent(child).find('li');
  $(parent).each( function(index, element) {
    let order = $(element).css('order');
    if(order !== $(child).css('order')) {
      $(element).css('order', index);
    }
  });
}


function tableBuild(table) {
  let fragment = document.createDocumentFragment();
  table.forEach( function(element, index) {
    $(fragment).append(`<li class="option" style="order:${index}"><img src="${element.link}"><div>${element.name}</div></li>`);
  });
  $('.dropdown').append(fragment);
  $(fragment).first($('.option:first-child').addClass('active'));
}