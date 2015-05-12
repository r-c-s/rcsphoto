function Album(images) {
  var current  = 0;
  var pressing = false;

  $(document)
    .ready(function() { 
      $('#overlay').hide();
      $(window).trigger('resize');
      $(window).trigger('hashchange');
    }); 

  $('#image').click(next);
  $('#next').click(next);
  $('#prev').click(prev);
  $('#overlay').click(unselect);
  $('#close').click(unselect);

  $('body')
    .keydown(function(e) {
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
    })
    .keyup(function(e) {
      pressing = false;
    });


  $(window).on('hashchange', function(){ 
    var index = location.hash.slice(1);
    if (index == '') {
      return;
    }
    if (+index >= 0 && +index < images.length) {
      select(+index);
    } 
  });


  $(window)
    .resize(function() {
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

  function next() {
    select((current+1) % images.length); 
  }

  function prev() {
    select((current-1) + ((current-1) < 0 ? images.length : 0));
  }

  function unselect() { 
    location.hash = '';
    $('#overlay').hide();
    $('#image').attr('src', '');
    $('#thumb'+current).removeClass('active');
  }

  function select(i) {  
    if (images[i]) {
      current = i;
      location.hash = i;
      image   = images[current];

      $('#overlay').show(); 
      $('#image').attr('src', image.medium);
      $('#index').text((i+1) + " of " + images.length);
      $('#url').text("Full size").attr('href', image.full);
      
      if ($('#thumb'+i).offset().top < $(window).scrollTop() + 51) {
        $('html, body').animate({ scrollTop : $('#thumb'+i).offset().top }, 200, 'swing');
      }
    
      var diff = ($('#thumb'+i).offset().top + $('#thumb'+i).outerHeight(true)) - ($(window).scrollTop() + $(window).height());
      if (diff > 0) { 
        $('html, body').animate({ scrollTop : $(window).scrollTop() + diff }, 200, 'swing');
      }
      
      for (var j = 0; j < images.length; j++) {
        $('#thumb'+j).attr('class', 'thumb scale ' + (j == i ? 'active' : ''))
      } 
    }
  }
}