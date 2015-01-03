function Track(track, duration, existing) {
	this.creatorId = track ? track.creatorId : null;
	this.trackId = track ? track.trackId : null;
	this.videoId = track ? track.videoId : null;
	this.language = track ? track.language : null;
	this.transcriptions = [];
	this.duration = duration * 10;
	this.existing = existing;

	if (track) {
		for(var k=0; k < track.transcriptions.length; k++) {
			this.transcriptions[k] = track.transcriptions[k];
		}
	}
	this.initialize();
}

Track.prototype.initialize = function() {
	if (this.existing) {
		this.construct();
		this.fillPostIts();
	}
	else {
		this.constructNew();
	}
};

Track.prototype.construct = function() {
  var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content'),
    id = this.trackId,
    editButton = document.createElement('button'),
    upButton = document.createElement('button'),
    downButton = document.createElement('button'),
    langDisplay = document.createElement('div'),
    languageBox = document.createElement('div'),
    snapLine1 = document.createElement('div'),
    snapLine2 = document.createElement('div'),
    snapLine3 = document.createElement('div'),
    tracksBox = document.createElement('div'),
    trackWrapper = document.createElement('div'),
    trackLine = document.createElement('div'),
    trackContainer = document.querySelectorAll('.track_divs')[0];

  editButton.innerHTML = "Edit";
  editButton.onclick = function () {
    alert("Coming soon"); 
  };

  upButton.className = 'upVote';
  upButton.dataset.trackId = id;
  upButton.innerHTML = 'Up';

  downButton.className = 'downVote';
  downButton.dataset.trackId = id;
  downButton.innerHTML = 'Down';

  langDisplay.className = 'langDisplay';
  langDisplay.id = 'lang' + id;
  langDisplay.innerHTML = this.language;

  languageBox.className = 'language_box';
  languageBox.appendChild(editButton);
  languageBox.appendChild(upButton);
  languageBox.appendChild(downButton);
  languageBox.appendChild(langDisplay);

  snapLine1.className = 'snapLine';
  snapLine2.className = 'snapLine';
  snapLine3.className = 'snapLine';
  
  tracksBox.className = 'show_tracks_box';
  tracksBox.id = id;
  tracksBox.style.width = this.duration + 'em';
  tracksBox.appendChild(snapLine1);
  tracksBox.appendChild(snapLine2);
  tracksBox.appendChild(snapLine3);

  trackWrapper.className = 'trackWrapper';
  trackWrapper.appendChild(tracksBox);

  trackLine.className = 'trackLine';
  trackLine.appendChild(languageBox);
  trackLine.appendChild(trackWrapper);

  window.requestAnimationFrame(function () {
    trackContainer.appendChild(trackLine);
  });
};

Track.prototype.constructNew = function() {
  var submitButton = document.createElement('button'),
    deleteButton = document.createElement('button'),
    langSelect = document.createElement('select'),
    languageBox = document.createElement('div'),
    snapLine1 = document.createElement('div'),
    snapLine2 = document.createElement('div'),
    snapLine3 = document.createElement('div'),
    tracksBox = document.createElement('div'),
    trackWrapper = document.createElement('div'),
    trackLine = document.createElement('div'),
    trackContainer = document.querySelectorAll('.track_divs')[0],
    option,
    i;

  submitButton.innerHTML = 'Submit';
  submitButton.onclick = function () {
     var postIts = [];  
    var languageName = $(this).next().next().val();
    var url = '/videos/' + VIDEOAPP.videoId + '/tracks'
 
    $(tracksBox).find('.post-it').each(function(){
      postIts.push({ content: $(this).children(".content").text(), position_css: this.style['cssText']})
    });

    $.post(url, { data: postIts, languagename: languageName }, function( response ) { location.reload();});
  };

  deleteButton.innerHTML = 'Delete';
  deleteButton.onclick = function () { $(trackLine).remove(); }

  langSelect.name = 'language';
  for (i = 0; i < VIDEOAPP.languages.length; i++) {
    option = document.createElement('option');
    option.innerHTML = VIDEOAPP.languages[i]['title'];
    langSelect.appendChild(option);
  }

  languageBox.className = 'language_box';
  languageBox.appendChild(submitButton);
  languageBox.appendChild(deleteButton);
  languageBox.appendChild(langSelect);

  snapLine1.className = 'snapLine ui-widget-header';
  snapLine2.className = 'snapLine';
  snapLine3.className = 'snapLine ui-widget-header';
  
  tracksBox.className = 'tracks_box';
  tracksBox.style.width = this.duration + 'em';
  tracksBox.appendChild(snapLine1);
  tracksBox.appendChild(snapLine2);
  tracksBox.appendChild(snapLine3);
  tracksBox.ondblclick = function () {
    new PostIt(null, this.trackId, false, $(this),event);
  };

  trackWrapper.className = 'trackWrapper';
  trackWrapper.appendChild(tracksBox);

  trackLine.className = 'trackLine';
  trackLine.appendChild(languageBox);
  trackLine.appendChild(trackWrapper);

  window.requestAnimationFrame(function () {
    trackContainer.appendChild(trackLine);
  });
};


Track.prototype.fillPostIts = function() {
	for (var i = 0; i < this.transcriptions.length; i++) {	
		this.transcriptions[i] = new PostIt(this.transcriptions[i], this.trackId, true);
	}
};

Track.prototype.upVote = function() {
 //  var videoId = this.videoId; 
	// $('.upVote').each(function() {
	// 	if (!$(this).attr('data-upVoteClick')) {
	// 	  $(this).on('click',function(event){
	// 	    var trackId = parseInt($(this).attr('data-trackId'), 10); 
	// 	    var data = trackId;
	// 	    var that = this;
	// 	    $.ajax({
	// 				url: '/videos/' + videoId + '/tracks/' + trackId,
	// 				data: { vote: "up", _method: 'put'}, 
	// 				method: "post"   
	// 	    }).done(function() { $(that).hide(); alert('success'); }); 
	//   	});
	//   	$(this).attr('data-upVoteClick', true);
	// 	}
	// });
};

Track.prototype.downVote = function() {
 //  var videoId = this.videoId; 
	// $('.downVote').each(function() {
	// 	if (!$(this).attr('data-downVoteClick')) {
	// 	  $(this).on('click',function(event){
	// 	    var trackId = parseInt($(this).attr('data-trackId'), 10); 
	// 	    var data = trackId;
	// 	    var that = this;
	// 	    $.ajax({
	// 				url: '/videos/' + videoId + '/tracks/' + trackId ,
	// 				data: { vote: 'down',  _method: 'put'}, 
	// 				method: "post"   
	// 	     }).done(function() { $(that).hide(); alert('success'); }); 
	//   	});
	//   	$(this).attr('data-downVoteClick', true);
	// 	}
	// });
};
