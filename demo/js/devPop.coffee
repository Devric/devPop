###
v 0.1.1
###

$ = jQuery

# quit init this plugin
$(document).ready ->
  $('.popit').devPop({debug:true})

  # add css into dom
  $('head').append('<link rel="stylesheet" type="text/css" href="">')
  

$.fn.extend {} =
  devPop: (options) ->

    settings =
      width  : 500
      height : 600
      debug  : false

    settings = $.extend settings, options

    window.log = (msg) -> # loger
      console?.log msg if settings.debug

    o = settings

    $container = $('#devPop')
    $modal     = $container.find('.devPopModal')
    $bg        = $container.find('.devPopBg')

    log '+ create modal'
    _createModal(o.height, o.width)

    # each obj
    return @each ()->

      log "** devPop init for: " + $(@).attr('href')

      obj     = $(@)
      $id     = obj.attr('href')
      $target = $($id)

      log '+ setup dom'
      _setupDom(obj)

      # keep position with scroll
      # simulate position:fix for mobile devices
      $(window).scroll( ->
        $('#devPop').css
            top: $(window).scrollTop()
      )

      # click open : if !animate
      obj.on('click', (e)->
        e.preventDefault()

        if  $('.devPopModal:animated').length < 1 
          _rebuildModal(obj, o.width, o.height)
          _openModal(obj)
      )

      # click close : if !animate
      $('body').on('click', 'html, .devPopBg, .devPopModal span.close', (e)->
        e.preventDefault()

        if  $('.devPopModal:animated').length < 1 
          _closeModal()
      )

      log "\n========== END =========== \n "

      

###
functions
###

# Creats essential elements
# ================================
_createModal = ($h, $w) ->
  log ' - creating modal init'
  
  log ' - building containers'
  $modal = '<div class="devPopModal" />'
  $close = '<span class="close">X</span>'
  $close = $($close)
  $bg    = '<div class="devPopBg" />'
  $bg    = $($bg)

  # add close button
  $modal = $($modal).prepend($close) 

  $container = '( <div id="devPop" /> )'
  $container = $($container)
  $container = $container.prepend($modal)
  $container = $container.prepend($bg)

  $('body').prepend($container)

  log ' - building styles'

  # setup styles
  $close.css
    'z-index': 2140000010

  $modal.css
    width     : $w
    height    : $h
    top       : - $h
    'z-index' : 2140000006

  $bg.css
    width     : '100%'
    height    : '100%'
    'z-index' : 2140000003

  $container.css
    display : 'none'
    'z-index': 2140000000



# setup each obj
# ================================
_setupDom = (el) ->
  $id        = el.attr('href')
  $target    = $($id)
  $container = $('#devPop')
  $modal     = $container.find('.devPopModal')

  $windowWidth = $(window).width()
  $modalWidth = $modal.outerWidth()

  log ' - hide container on init'
  $target.css
    'display' : 'none'

  log ' - relocate target to modal'
  $target.prependTo($modal)

  $modal.css
    left: ( $windowWidth - $modalWidth ) / 2




# rebuild modal on click
# ================================
_rebuildModal = (el, $w, $h) ->
  log ' - rebuild size if data- exists'

  $modal = $('#devPop .devPopModal')

  $newh = el.data('height')
  $neww = el.data('width')

  $modal.css
    height: if $newh then $newh else $h
    width: if $neww then $neww else $w

  $modalWidth = $modal.outerWidth()
  $windowWidth = $(window).width()

  $modal.css
    left : ($windowWidth - $modalWidth) / 2

  if !el.data('unlock')
    $('html').addClass('noscroll')

# open animation
# ================================
window._openModal = (el) ->
  $container = $('#devPop')
  $bg = $container.find('.devPopBg')
  $modal = $container.find('.devPopModal')
  $target = el.attr('href')
  $target = $($target)
   
  $top = el.data('top')

  log ' - show conainer'
  $container.show()

  log ' - show hide related content'
  $target.show()
         .siblings('div')
         .hide()

  log ' - animate bg and modal'
  $bg.animate
    opacity : 1
  , 250, ->
    $modal.animate
      top: ( if $top then $top else 0 )
    , 500



# close animation
# ================================
window._closeModal = () ->
  $container = $('#devPop')
  $bg = $container.find('.devPopBg')
  $modal = $container.find('.devPopModal')

  $modal.animate
    top: -1000
  , 'fast', ->
    $bg.animate
      opacity: 0
    , 'slow' , ->
      $('#devPop').hide()

  $('html').removeClass('noscroll')
