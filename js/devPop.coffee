$ = jQuery

$(document).ready ->
  $('.popit').devPop();

$.fn.extend {}=
  devPop: (options) ->
    settings =
      debug   : false
      
    settings = $.extend settings, options
    
    window.log = (msg) ->      # Simplify logger()
      console?.log msg if settings.debug
    
    # _Insert magic here._
    return @each ()->

      o   = settings
      obj = $(@)

      log "devTab init for: " + obj.attr('id')

      log "\n ========== END =========== \n "


# ====================================
# functions
# ====================================


# initial setup
# ====================================
