(function() {
  var $, _createModal, _setupDom;

  $ = jQuery;

  $(document).ready(function() {
    return $('.popit').devPop({
      debug: true
    });
  });

  $.fn.extend({
    devPop: function(options) {
      var settings;
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
      log('+ creating modal');
      _createModal(settings.height, settings.width);
      return this.each(function() {
        var $id, $pop, $popBg, $popModal, $target, o, obj;
        log("** devPop init for: " + $(this).attr('href'));
        o = settings;
        obj = $(this);
        $id = obj.attr('href');
        $target = $($id);
        $pop = $('#devPop');
        $popModal = $pop.find('.devPopModal');
        $popBg = $pop.find('.devPopBg');
        $(window).scroll(function() {
          return $('#devPop').css({
            top: $(window).scrollTop()
          });
        });
        log('+ set up dom');
        _setupDom(obj);
        obj.on('click', $target, function(e) {
          log('+ click action');
          e.preventDefault();
          $target.show().siblings('div').hide();
          $popBg.animate({
            opacity: 1
          }, 150, function() {
            return $popModal.animate({
              top: 50
            }, 500);
          });
          log(' - show content');
          $('#devPop').show();
          return $('html').addClass('noscroll');
        });
        $('body').on('click', '.devPopBg, .devPopModal span.close', function(e) {
          e.preventDefault();
          $popModal.animate({
            top: -1000
          }, 'fast', function() {
            return $popBg.animate({
              opacity: 0
            }, 'slow', function() {
              return $('#devPop').hide();
            });
          });
          return $('html').removeClass('noscroll');
        });
        return log("\n========== END =========== \n ");
      });
    }
  });

  _createModal = function() {
    var $height, $width;
    $('body').prepend('<div id="devPop" style="display:none"><div class="devPopModal paperstack"><span class="close">X</span></div><div class="devPopBg"/></div>');
    log(' - modal created');
    $height = $('.devPopModal').height();
    log($width = ($(window).width() - $('.devPopModal').outerWidth()) / 2);
    log($('.devPopModal').width());
    log($('.devPopModal').outerWidth());
    log($(window).width());
    return $('.devPopModal').css({
      top: -1 * ($height + 50),
      left: $width
    });
  };

  _setupDom = function(el) {
    var $id, $pop, $popModal, $target;
    $id = el.attr('href');
    $target = $($id);
    $pop = $('#devPop');
    $popModal = $pop.find('.devPopModal');
    log(' - hide content on init');
    $target.css({
      'display': 'none'
    });
    log(' - move content to modal');
    $target.prependTo($popModal);
    return log(' - dom set');
  };

}).call(this);
