function PostIt(entry, trackId, existing, element, eventData) {
  'use strict';
  this.content = entry ? entry.content : null;
  this.positionCss = entry ? entry.position_css : null;
  this.trackId = trackId;
  this.existing = existing;
  this.eventData = eventData || null;
  this.element = element || null;

  this.initialize();
}

PostIt.prototype.initialize = function () {
  'use strict';
  if (this.existing) {
    this.construct();
  } else {
    this.constructNew(this.eventData, this.element);
  }
};

PostIt.prototype.construct = function () {
  'use strict';
  var postIt = document.createElement('div'),
    header = document.createElement('div'),
    content = document.createElement('div'),
    that = this;

  header.className = 'header';

  content.className = 'content';
  content.innerHTML = this.content;

  postIt.className = 'track_post-it';
  postIt.style.cssText = this.positionCss;
  postIt.appendChild(header);
  postIt.appendChild(content);

  window.requestAnimationFrame(function () {
    document.getElementById(that.trackId).appendChild(postIt);
  });
};

PostIt.prototype.constructNew = function (event, element) {
  'use strict';
  var postIt = document.createElement('div'),
    header = document.createElement('section'),
    content = document.createElement('section'),
    removeNote = document.createElement('span');

  header.className = 'header';

  content.className = 'content';
  content.contentEditable = true;
  content.innerHTML = 'Click here to edit.';

  removeNote.className = 'removeNote';
  removeNote.innerHTML = 'X';
  removeNote.onclick = function () {
    postIt.remove();
  };

  postIt.className = 'post-it';
  postIt.style.top = event.offsetY + 'px';
  postIt.style.left = event.offsetX + 'px';
  postIt.appendChild(header);
  postIt.appendChild(content);
  postIt.appendChild(removeNote);
  $(postIt).draggable({ handle: ".header", containment: "parent", snap: ".ui-widget-header", snapMode: "outer" }).resizable({containment: "parent"});

  window.requestAnimationFrame(function () {
    element.append(postIt);
  });
};