function Album(images) {

  $(document).ready(function() {     
    $('#overlay').hide();
    $(window).trigger('resize');
    $(window).trigger('hashchange');
  }); 
  
  $('#imageContainer img').click(next);
  $('#next').click(next);
  $('#prev').click(prev);
  $('#imageContainer').click(unselect);
  $('#overlay').click(unselect);
  $('#close').click(unselect);
  
  $('#imageContainer img').click(function(e){ 
    e.stopPropagation();
  }); 

  $('#imageContainer').click(function(e){ 
    e.stopPropagation();
  }); 
  
  $('.arrow').click(function(e){ 
    e.stopPropagation();
  });

  $(window).on('hashchange', function(){  
    select(getIndex());
  });


  var pressing = false;
  $('body').keydown(function(e) {
    if ($('#overlay').is(":visible") && !pressing) {
      pressing = true;
      if (e.keyCode == 27) {
        unselect();
      }
      if (e.keyCode == 37) {
        prev();
      }
      if (e.keyCode == 39) {
        next();
      }
    }
  });
  $('body').keyup(function(e) {
    pressing = false;
  });

  $(window).resize(function() {
    var width = $('#thumbsContainer').width(); 
   
    var boundingWidth;

    if      (width > 1200) boundingWidth = (100/7)+'%';
    else if (width >  992) boundingWidth = (100/6)+'%';
    else if (width >  768) boundingWidth = (100/5)+'%';
    else if (width >  480) boundingWidth = (100/4)+'%';
    else if (width >  320) boundingWidth = (100/3)+'%';
    else                   boundingWidth = (100/2)+'%';
                       
    $('.thumb').each(function() {  
      $(this).css('width', boundingWidth);
      $(this).css('height', $(this).css('width'));
    });
  });
  

  
  
  function getIndex() {
    var hash = location.hash.slice(1);
    if ($.isNumeric(hash) && Math.floor(hash) == hash) {
      return +hash;
    }
    else {
      return -1;
    }
  }

  function next() {
    select((getIndex()+1) % images.length); 
  }

  function prev() {
    select((getIndex()-1) + ((getIndex()-1) < 0 ? images.length : 0));
  }

  function unselect() { 
    $('#overlay').hide();
    $('#thumb'+getIndex()).removeClass('active');
    var yScroll = document.body.scrollTop;
    window.location.hash = '';
    document.body.scrollTop = yScroll;
  }

  function select(i) {  
    image = images[i];  
    
    if (image) { 
      location.hash = i;

      $('#imageContainer img').stop().css({
        'opacity' : 0
      });
      
      var buffer = new Image();
      buffer.onload = function() { 
        $('#imageContainer img')
          .attr('src', buffer.src)
          .stop()
          .animate({
            'opacity' : 1
          }, 800);
      }
      buffer.src = selectSize(image); 
      
      scrollTo(i);

      for (var j = 0; j < images.length; j++) {
        $('#thumb'+j).removeClass('active');
      } 
      $('#thumb'+i).addClass('active');
      
      $('#overlay').show(); 
    }
  } 
  
  function selectSize(image) {
    var dimension = Math.max($(window).width(), $(window).height());
    if (dimension >  512) return image.medium;
    else                  return image.small;
  }
  
  function scrollTo(i) {
    if (images[i]) { 
      if ($('#thumb'+i).offset().top < $(window).scrollTop() + 51) {
        $('html, body').animate({ scrollTop : $('#thumb'+i).offset().top }, 200, 'swing');
      }
    
      var diff = ($('#thumb'+i).offset().top + $('#thumb'+i).outerHeight(true)) - ($(window).scrollTop() + $(window).height());
      if (diff > 0) { 
        $('html, body').animate({ scrollTop : $(window).scrollTop() + diff }, 200, 'swing');
      }
    }
  }
}