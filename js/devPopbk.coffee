###
v 0.9
###

$ = jQuery

$(document).ready ->
  $('.popit').devPop({debug:true})

$.fn.extend {}=
  devPop: (options) ->
    settings =
      width  : 500
      height : 600
      debug  : false
      
    settings = $.extend settings, options
    
    window.log = (msg) ->      # Simplify logger()
      console?.log msg if settings.debug
    
    # create devPop
    log '+ creating modal'
    _createModal(settings.height, settings.width)


    # _Insert magic here._
    return @each ()->

      log "** devPop init for: " + $(@).attr('href')

      o         = settings
      obj       = $(@)

      $id       = obj.attr('href')
      $target   = $($id)

      $pop      = $('#devPop')
      $popModal = $pop.find('.devPopModal')
      $popBg    = $pop.find('.devPopBg')

      # keep position with scroll
      # simulate position:fix for mobile devices
      $(window).scroll( ->
        $('#devPop').css
            top: $(window).scrollTop()
      )

      log '+ set up dom'
      _setupDom(obj)

      # show on object click
      # ==============================
      obj.on('click', $target, (e)->
        log '+ click action'
        e.preventDefault()
        $target.show()
               .siblings('div')
               .hide()

        # animate bg and modal open
        $popBg.animate
          opacity:1
        , 150, ->
          $popModal.animate
            top: 50
          , 500


        log ' - show content'
        $('#devPop').show()

        $('html').addClass('noscroll')

        # find width and position $modal
          
      )

      # hide on click
      # ==============================
      $('body').on('click', 'html, .devPopBg, .devPopModal span.close', (e)->
        e.preventDefault()

        $popModal.animate
          top: -1000
        , 'fast', ->
          $popBg.animate
            opacity: 0
          , 'slow' , ->
            $('#devPop').hide()

        $('html').removeClass('noscroll')

      )

      log "\n========== END =========== \n "


# ====================================
# functions
# ====================================


# create modal
# ====================================
_createModal = ($h,$w) ->
  # add containers
  $('body').prepend('<div id="devPop" style="display:none"><div class="devPopModal"><span class="close">X</span></div><div class="devPopBg"/></div>')
  
  log ' - modal created'

  $('.devPopModal').css
    width: $w
    height: $h

  $height = $('.devPopModal').height()
  log $width = ( $(window).width() - $('.devPopModal').outerWidth() ) / 2
  log $('.devPopModal').width()
  log $('.devPopModal').outerWidth()
  log $(window).width()

  $('.devPopModal').css
    top: -1 * ($height + 50)
    left: $width

# build each obj
# ====================================
_setupDom = (el) ->
  $id       = el.attr('href')
  $target   = $($id)
  $pop      = $('#devPop')
  $popModal = $pop.find('.devPopModal')

  log ' - hide content on init'
  $target.css
    'display':'none'

  log ' - move content to modal'
  $target.prependTo($popModal)

  log ' - dom set'
