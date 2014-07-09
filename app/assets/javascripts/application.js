// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
$(document).ready( function(){

  $('#form_nav').hide();

  $('#browse').on("click", function(event){
    event.preventDefault();
    $('#form_nav').show();
    $('#browse').hide();
  });

  $('.track_divs').on("click", ".timeButton", function(){
    var postIts = [];  
    console.log($(this).next().next());
    var languageName = $(this).next().next().val();
    var url = '/videos/' + VIDEOAPP.videoId + '/tracks'
 
    $(this).parent('.language_box').next().children('.tracks_box').find('.post-it').each(function(){
      postIts.push({ content: $(this).children(".content").text(), position_css: this.style['cssText']})
    });

    $.post(url, { data: postIts, languagename: languageName }, function( response ) {});
    location.reload();
  });
});
