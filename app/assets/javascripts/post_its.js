// var PostIt = function(event) {
//   this.css_position = "top:" + event.offsetY + "px; left:" + event.offsetX + "px"

//   this.buildPostIt = function(element) {
//   	var post_it = ['<div class="post-it" style="' + this.css_position + '">',
//      				        '<section class="header"></section>',
//             				'<section class="content" contenteditable="true">Click here to edit</section>',
//             				'<span class="removeNote">X</span>',
//           				'</div>'].join('\n');
	
// 		element.append(post_it)

// 	  $('.post-it').draggable({ handle: ".header", containment: "parent", snap: ".ui-widget-header", snapMode: "outer" }).resizable({containment: "parent"});
// 	  $('.removeNote').on('click', function(){
// 	    $(this).parent().remove();
// 	  });
//   };
// };

function PostIt(entry, trackId, existing, element,eventData) {
  this.content = entry ? entry.content : null;
  this.positionCss = entry ? entry.position_css : null;
  this.trackId = trackId;
  this.existing = existing;
  this.eventData = eventData ? eventData : null;
  this.element = element ? element : null;

  this.initialize();
}

PostIt.prototype.initialize = function() {
  if (this.existing)
    this.construct();
  else
    this.constructNew(this.eventData, this.element);
};

PostIt.prototype.construct = function() {
 var postIt = ['<div class="track_post-it" style="' + this.positionCss + '">',
                   '<section class="header"></section>',
                '<section class="content">' + this.content + '</section>',
                '</div>'].join('\n');

  var editPostIt = ['<div class="post-it" style="' + this.positionCss + '">',
                   '<section class="header"></section>',
                '<section class="content" contenteditable="true">' + this.content + '</section>',
                '<span class="removeNote">X</span>',
                '</div>'].join('\n');

 $('#' + this.trackId).append(postIt);
 $('#' + this.trackId + 'edit').append(editPostIt);

 $('.post-it').draggable({ handle: ".header", containment: "parent", snap: ".ui-widget-header", snapMode: "outer" }).resizable({containment: "parent"});
 $('.removeNote').on('click', function(){
   $(this).parent().remove();
 });
};

PostIt.prototype.constructNew = function(event, element) {
 var post_it = ['<div class="post-it" style= "top:' + event.offsetY + 'px; left:' + event.offsetX + 'px">',
                   '<section class="header"></section>',
                 '<section class="content" contenteditable="true">Click here to edit</section>',
                 '<span class="removeNote">X</span>',
               '</div>'].join('\n');

 element.append(post_it);

 $('.post-it').draggable({ handle: ".header", containment: "parent", snap: ".ui-widget-header", snapMode: "outer" }).resizable({containment: "parent"});
 $('.removeNote').on('click', function(){
   $(this).parent().remove();
 });
};