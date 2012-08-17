# create plugin obj if not exists
# =====================================
if window.plugins == undefined then window.plugins = {}


# define plugin, and push it to obj
# =====================================
pluginName                            = 'popIt'
plugins[ pluginName ]                 = '0.0.1'
plugins[ pluginName + '_description'] = 'extendable modal plugin'
plugins[ pluginName + '_url']         = 'devric.co.cc'


# start plugin
# =====================================
$.fn[ pluginName ] = (option) ->
  opt = $.extend $.fn[ pluginName ].prototype.defaults, option

  # simple loger
  if window.log == undefined 
    window.log = (msg) -> console?.log msg if opt.debug

  log 'Plugin: ' + pluginName + ' INIT'

  # shorcuts
  Proto = $.fn[ pluginName ].prototype
  obj   = $(this)

  # build on start
  Proto.init()

  @each ->
    Proto.click(this)


# core functions
# =====================================
$.fn[ pluginName ].prototype =
  defaults :
    options      : '5'
    modalId      : 'popit'
    fadeInSpeed  : 1000
    fadeOutSpeed : 1000
    debug        : false

  init : ( modalId ) ->
    # create base dom
    $bg      = '<div class="bg"></div>'
    $close   = '<span class="close" />'
    $content = '<div class="content" />'
    $content = $($content).prepend($close)

    $modal = '<div id="' + @defaults.modalId + '" />'
    $modal = $($modal).prepend($content,$bg)

    $('body').prepend($modal)

    # style base dom
    $modal.css
        display : 'none'

    $($bg).css

  create : ->
    return console.log @defaults.debug

  destroy : ->

  click : (el)->
    testv = @defaults.options
    $(el).on 'click', this, ->
      console.log el
      console.log testv



# extended functions
# =====================================
