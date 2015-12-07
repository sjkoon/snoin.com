/* copy IE related js */
import 'file-loader?name=[path][name].[ext]&context=./!html5shiv/dist/html5shiv.min.js';
import 'file-loader?name=[path][name].[ext]&context=./!html5shiv/dist/html5shiv-printshiv.min.js';
import 'file-loader?name=[path][name].[ext]&context=./!respond.js/dest/respond.min.js';
import 'file-loader?name=[path][name].[ext]&context=./!respond.js/dest/respond.matchmedia.addListener.min.js';

/* import external deps */
import 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap';
import 'jquery-easing/jquery.easing.1.3.js';

/* import internal deps */
import './plugins/jqBootstrapValidation.js';
import './style.scss';

$(document).ready(function() {
  var $navbar = $('#menu');

  (function() {
    var docElem = document.documentElement,
      didScroll = false,
      changeHeaderOn = 300;

    function init() {
      $(window).on('scroll', function() {
        if(!didScroll) {
          didScroll = true;
          setTimeout(scrollPage, 250);
        }
      });
    }

    function scrollPage() {
      var sy = scrollY();
      if (sy >= changeHeaderOn) {
        $navbar.addClass('navbar-shrink');
      } else {
        $navbar.removeClass('navbar-shrink');
      }
      didScroll = false;
    }

    function scrollY() {
      return window.pageYOffset || docElem.scrollTop;
    }

    init();
    scrollPage();

    $('body').scrollspy({
      target: '#menu'
    });
  })();

  $(window).on('hashchange', function(e) {
    e.preventDefault();
  });

  $('a.page-scroll').click(function(event) {
    var $this = $(this);
    $('html, body').stop().animate({
      scrollTop: $($this.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  $('nav[aria-expended=true] ul li a', $navbar).click(function() {
    $('nav', $navbar)
      .attr('aria-expended', 'false')
      .removeClass('collapse in');
  });

  var $form = $('#contactForm');
  $form.submit(function () {
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var message = $('#message').val();

    contact(name, email, phone, message, window.alert);
    return false;
  });
});