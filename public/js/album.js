function Album(images) {

  $(document).ready(function() {     
    $('#overlay').hide();
    $(window).trigger('resize');
    $(window).trigger('hashchange');
  }); 

  $('#image').click(next);
  $('#next').click(next);
  $('#prev').click(prev);
  $('#overlay').click(unselect);
  $('#close').click(unselect);


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
    $('#image').trigger('load');
    
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



  $("#image")
    .load(function() { 
      //$('#image').css('opacity', 1);
    })
    .each(function() { 
      if(this.complete) $(this).load();
    });

  $('#imageContainer').click(function(e){ 
    e.stopPropagation();
  });

  $('#image').click(function(e){ 
    e.stopPropagation();
  });
   
  $('.arrow').click(function(e){ 
    e.stopPropagation();
  });

  $(window).on('hashchange', function(){  
    select(getIndex());
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
    $('#image').attr('src', '');
    $('#thumb'+getIndex()).removeClass('active');
    location.hash = '';
  }

  var selecting = false;
  function select(i) {  
    if (selecting) {
      return;
    }
    
    if (images[i]) {
      selecting = true;
      
      location.hash = i;
      image = images[i];  

      $('#image').animate({
        'opacity' : 0
      }, 1000);

      $('#image').load(function() { 
        $('#image').unbind().stop().animate({
          'opacity' : 1
        }, 500);
        
        $('#index').text((i+1) + " of " + images.length);
        $('#url').text("Full size").attr('href', image.full);
        
        selecting = false;
      }).attr('src', image.large);
      
      scrollTo(i);

      for (var j = 0; j < images.length; j++) {
        $('#thumb'+j).removeClass('active');
      } 
      
      $('#thumb'+i).addClass('active');
      $('#overlay').show(); 
    }
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