var PostIt = function(event) {
  this.css_position = "top:" + event.offsetY + "px; left:" + event.offsetX + "px"

  this.buildPostIt = function(element) {
  	var post_it = ['<div class="post-it" style="' + this.css_position + '">',
     				        '<header class="header"><span class="remove_note">X</span></header>',
            				'<section class="content" contenteditable="true"></section>',
          				'</div>'].join('\n');
	
		element.append(post_it)

	  $('.post-it').draggable({ handle: ".header", containment: "parent" }).resizable({containment: "parent"});
	  $('.remove_note').on('click', function(){
	    $(this).parent().parent().remove();
	  });
  };
};
