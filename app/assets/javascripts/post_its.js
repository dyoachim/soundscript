// var PostIt = function(obj) {
//   this.content = obj['content'];
//   this.css_position = obj['position']['left'];

//   this.buildPostIt = function() {
//   return ['<div class="post-it" style="top:' + this.y_position + 'px; left:' + this.x_position + 'px">',
//             '<header class="header"><span class="remove_note">X</span></header>',
//             '<section class="content" contenteditable="true">'+ this.content +'</section>',
//           '</div>'].join('\n');
//   };
// };

function buildPostIt(click_event) {
  return ['<div class="post-it" style="top:' + click_event.offsetY + 'px; left:' + click_event.offsetX + 'px">',
            '<header class="header"><span class="remove_note">X</span></header>',
            '<section class="content" contenteditable="true">Hey post it content</section>',
          '</div>'].join('\n');
}
