$(document).ready(function() {
  $('.bxslider').bxSlider({
    auto: true,
    pause: 5000,
    autoStart: true,
    autoHover: true,
    controls: false
  });
  var map = new GMaps({
    div: '#map',
    lat: -29.889686,
    lng: -50.269870,
    zoom: 17  
  });
  map.addMarker({
    lat: -29.889686,
    lng: -50.269870,
    title: 'Litoralmania',
  });

  $('.menu a').click(function(event){
    //prevent the default action for the click event
    event.preventDefault();

    //get the full url - like mysitecom/index.htm#home
    var full_url = this.href;

    //split the url by # and get the anchor target name - home in mysitecom/index.htm#home
    var parts = full_url.split("#");
    var trgt = parts[1];

    //get the top offset of the target anchor
    var target_offset = $("#"+trgt).offset();
    var target_top = target_offset.top;

    //goto that anchor by setting the body scroll top to anchor top
    $('html, body').animate({scrollTop:target_top}, 500);
  });
  $( 'form' ).parsley( {
    errors: {
        classHandler: function ( elem, isRadioOrCheckbox ) {
          return false
            // return $( elem ).parent();
        }
    }
  });

  $('#contact').on('submit', function(e) {

    $.post(
      $(this).attr('action'),
      $(this).serializeArray(),
      function(data) {
        var elem = $('<p>').addClass('alert');
        if(data.error) {
          elem.addClass('error');
        } else {
          elem.addClass('success');
        }
        elem.html(data.message);
        $('#contact').before(elem);
        window.setTimeout(function() {
          $('.alert').fadeOut();
        }, 6000);
      },
      'json'
    );

    return e.preventDefault();
  });
});
  