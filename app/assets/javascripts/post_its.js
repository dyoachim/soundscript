var PostIt = function(event) {
  this.css_position = "top:" + event.offsetY + "px; left:" + event.offsetX + "px"

  this.buildPostIt = function(element) {
  	var post_it = ['<div class="post-it" style="' + this.css_position + '">',
     				        '<section class="header"></section>',
            				'<section class="content" contenteditable="true">Click here to edit</section>',
            				'<span class="removeNote">X</span>',
          				'</div>'].join('\n');
	
		element.append(post_it)

	  $('.post-it').draggable({ handle: ".header", containment: "parent", snap: ".ui-widget-header", snapMode: "outer" }).resizable({containment: "parent"});
	  $('.removeNote').on('click', function(){
	    $(this).parent().remove();
	  });
  };
};
