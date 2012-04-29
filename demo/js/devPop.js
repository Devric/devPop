(function() {
  var $, _createModal, _rebuildModal, _setupDom;

  if (window.version === void 0) window.version = {};

  version['devTab'] = '0.1.2';

  $ = jQuery;

  $(document).ready(function() {
    $('.popit').devPop({
      debug: false
    });
    return $('head').append('<link rel="stylesheet" type="text/css" href="">');
  });

  $.fn.extend({
    devPop: function(options) {
      var $bg, $container, $modal, o, settings;
      settings = {
        width: 500,
        height: 600,
        debug: false
      };
      settings = $.extend(settings, options);
      window.log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      o = settings;
      $container = $('#devPop');
      $modal = $container.find('.devPopModal');
      $bg = $container.find('.devPopBg');
      log('+ create modal');
      _createModal(o.height, o.width);
      $(window).scroll(function() {
        return $('#devPop').css({
          top: $(window).scrollTop()
        });
      });
      return this.each(function() {
        var $id, $target, obj;
        log("** devPop init for: " + $(this).attr('href'));
        obj = $(this);
        $id = obj.attr('href');
        $target = $($id);
        log('+ setup dom');
        _setupDom(obj);
        obj.on('click', function(e) {
          e.preventDefault();
          if ($('.devPopModal:animated').length < 1) {
            _rebuildModal(obj, o.width, o.height);
            return _openModal(obj);
          }
        });
        $('body').on('click', 'html, .devPopBg, .devPopModal span.close', function(e) {
          e.preventDefault();
          if ($('.devPopModal:animated').length < 1) return _closeModal();
        });
        return log("\n========== END =========== \n ");
      });
    }
  });

  /*
  functions
  */

  _createModal = function($h, $w) {
    var $bg, $close, $container, $modal;
    log(' - creating modal init');
    log(' - building containers');
    $modal = '<div class="devPopModal" />';
    $close = '<span class="close">X</span>';
    $close = $($close);
    $bg = '<div class="devPopBg" />';
    $bg = $($bg);
    $modal = $($modal).prepend($close);
    $container = '( <div id="devPop" /> )';
    $container = $($container);
    $container = $container.prepend($modal);
    $container = $container.prepend($bg);
    $('body').prepend($container);
    log(' - building styles');
    $close.css({
      'z-index': 2140000010
    });
    $modal.css({
      width: $w,
      height: $h,
      top: -$h,
      'z-index': 2140000006
    });
    $bg.css({
      width: '100%',
      height: '100%',
      'z-index': 2140000003
    });
    return $container.css({
      display: 'none',
      'z-index': 2140000000
    });
  };

  _setupDom = function(el) {
    var $container, $id, $modal, $modalWidth, $target, $windowWidth;
    $id = el.attr('href');
    $target = $($id);
    $container = $('#devPop');
    $modal = $container.find('.devPopModal');
    $windowWidth = $(window).width();
    $modalWidth = $modal.outerWidth();
    log(' - hide container on init');
    $target.css({
      'display': 'none'
    });
    log(' - relocate target to modal');
    $target.prependTo($modal);
    return $modal.css({
      left: ($windowWidth - $modalWidth) / 2
    });
  };

  _rebuildModal = function(el, $w, $h) {
    var $modal, $modalWidth, $newh, $neww, $windowWidth;
    log(' - rebuild size if data- exists');
    $modal = $('#devPop .devPopModal');
    $newh = el.data('height');
    $neww = el.data('width');
    $modal.css({
      height: $newh ? $newh : $h,
      width: $neww ? $neww : $w
    });
    $modalWidth = $modal.outerWidth();
    $windowWidth = $(window).width();
    $modal.css({
      left: ($windowWidth - $modalWidth) / 2
    });
    if (!el.data('unlock')) return $('html').addClass('noscroll');
  };

  window._openModal = function(el) {
    var $bg, $container, $modal, $target, $top;
    $container = $('#devPop');
    $bg = $container.find('.devPopBg');
    $modal = $container.find('.devPopModal');
    $target = el.attr('href');
    $target = $($target);
    $top = el.data('top');
    log(' - show conainer');
    $container.show();
    log(' - show hide related content');
    $target.show().siblings('div').hide();
    log(' - animate bg and modal');
    return $bg.animate({
      opacity: 1
    }, 250, function() {
      return $modal.animate({
        top: ($top ? $top : 0)
      }, 500);
    });
  };

  window._closeModal = function() {
    var $bg, $container, $modal;
    $container = $('#devPop');
    $bg = $container.find('.devPopBg');
    $modal = $container.find('.devPopModal');
    $modal.animate({
      top: -1000
    }, 'fast', function() {
      return $bg.animate({
        opacity: 0
      }, 'slow', function() {
        return $('#devPop').hide();
      });
    });
    return $('html').removeClass('noscroll');
  };

}).call(this);
