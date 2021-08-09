(function() {
  var parallaxCheck, resetForm, resetFormError;

  $(document).ready(function() {
    var mail, rev2, revapi;
    mail = "jorge.mollon@gmail.com";
    revapi = $('#slider').revolution({
      delay: 7000,
      startwidth: 960,
      startheight: 450,
      onHoverStop: "off",
      fullWidth: "on",
      fullScreen: "off"
    });
    rev2 = $('#slider-tienda').revolution({
      delay: 4000,
      startwidth: 600,
      startheight: 295,
      onHoverStop: "off",
      thumbWidth: 100,
      thumbHeight: 50,
      ThumbNumber: 3,
      hideThumbs: 200,
      hideTimerBar: "on",
      navigationType: "thumbs",
      navigationArrows: "none",
      shadow: 2
    });
    $('.dest-carrousel').slick({
      vertical: true,
      verticalSwiping: true,
      speed: 400,
      slidesToShow: 3,
      arrows: false,
      autoplaySpeed: 4000,
      autoplay: true
    });
    parallaxCheck();
    $(document).foundation();
    new WOW().init();
    $('.menu-link').on('click', function(ev) {
      var tag;
      ev.preventDefault;
      tag = $(ev.target).attr('href');
      return $(tag).velocity("scroll", {
        duration: 1000
      });
    });
    $('.submit.button').on('click', function(ev) {
      var formData;
      ev.preventDefault();
      formData = {
        nombre: $('#mail_nombre').val(),
        email: $('#mail_email').val(),
        mensaje: $('#mail_mensaje').val(),
        to: mail
      };
      if ($('#mail_nombre').val() !== "") {
        Parse.initialize("wOlDC0POj324yXYDCRd65f7mqUvwO8dGTYCmH7lz", "ZIeGRd5nttoX06iWEIzvJlGkQRDmh89SthvKurDi");
        Parse.Cloud.run("correo", formData, {
          success: function(obj) {
            return console.log("parse success de vuelta");
          }
        });
        $('#mail_nombre').val("");
        $('#mail_email').val("");
        $('#mail_mensaje').val("Mensaje enviado correctamente, gracias.");
        $('.submit.button').css('background', 'green').val('ENVIADO').addClass('animated bounceOutRight');
        $('.submit.button').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          return setTimeout(resetForm, 2000);
        });
      } else {
        $('#form_error').text("Por favor, revisa los datos del formulario.");
        setTimeout(resetFormError, 3000);
      }
      return false;
    });
    return $('#mapa').simplegmaps();
  });

  resetForm = function() {
    $('.submit.button').css('background', '#008CBA').val('Enviar').removeClass('animated bounceOutRight').show();
    $('#mail_mensaje').val("");
    return $('#form_error').text("");
  };

  resetFormError = function() {
    return $('#form_error').text("");
  };

  $(window).resize(function() {
    return parallaxCheck();
  });

  parallaxCheck = function() {
    var width;
    width = $(window).width();
    $('.parallax').width(width);
    if (width > 1220) {
      $('.parallax').addClass('par-fixed');
      $('.bg1').parallax("50%", 0.4);
      return $('.bg2').parallax("50%", 0.4);
    } else {
      return $('.parallax').removeClass('par-fixed');
    }
  };

}).call(this);
