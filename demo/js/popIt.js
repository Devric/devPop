(function() {
  var pluginName;

  if (window.plugins === void 0) window.plugins = {};

  pluginName = 'popIt';

  plugins[pluginName] = '0.0.1';

  plugins[pluginName + '_description'] = 'extendable modal plugin';

  plugins[pluginName + '_url'] = 'devric.co.cc';

  $.fn[pluginName] = function(option) {
    var Proto, obj, opt;
    opt = $.extend($.fn[pluginName].prototype.defaults, option);
    if (window.log === void 0) {
      window.log = function(msg) {
        if (opt.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
    }
    log('Plugin: ' + pluginName + ' INIT');
    Proto = $.fn[pluginName].prototype;
    obj = $(this);
    Proto.init();
    return this.each(function() {
      return Proto.click(this);
    });
  };

  $.fn[pluginName].prototype = {
    defaults: {
      options: '5',
      modalId: 'popit',
      fadeInSpeed: 1000,
      fadeOutSpeed: 1000,
      debug: false
    },
    init: function(modalId) {
      var $bg, $close, $content, $modal;
      $bg = '<div class="bg"></div>';
      $close = '<span class="close" />';
      $content = '<div class="content" />';
      $content = $($content).prepend($close);
      $modal = '<div id="' + this.defaults.modalId + '" />';
      $modal = $($modal).prepend($content, $bg);
      $('body').prepend($modal);
      $modal.css({
        display: 'none'
      });
      return $($bg).css;
    },
    create: function() {
      return console.log(this.defaults.debug);
    },
    destroy: function() {},
    click: function(el) {
      var testv;
      testv = this.defaults.options;
      return $(el).on('click', this, function() {
        console.log(el);
        return console.log(testv);
      });
    }
  };

}).call(this);
