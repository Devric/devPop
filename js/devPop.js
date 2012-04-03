(function() {
  var $;

  $ = jQuery;

  $(document).ready(function() {
    return $('.popit').devPop();
  });

  $.fn.extend({
    devPop: function(options) {
      var settings;
      settings = {
        debug: false
      };
      settings = $.extend(settings, options);
      window.log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      return this.each(function() {
        var o, obj;
        o = settings;
        obj = $(this);
        log("devTab init for: " + obj.attr('id'));
        return log("\n ========== END =========== \n ");
      });
    }
  });

}).call(this);
