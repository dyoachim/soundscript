function TracksContainer(duration, loggedIn, tracks, userId) {
	this.duration = duration;
	this.loggedIn = loggedIn;
	this.tracks = tracks;
	this.trackNum = tracks.length;
	this.userId = userId;

	this.initialize();
}

TracksContainer.prototype.constructTracks = function() {
	for (var i = 0; i < this.trackNum; i++) {
		this.tracks[i] = new Track(this.tracks[i], this.duration, true);
	}
};

TracksContainer.prototype.constructTransportControls = function() {
	var transportControls = "<ul>" +
		'<a href="javascript:ytplayer.pauseVideo()"><li id="pause"></li></a>' +
		'<a href="javascript:ytplayer.playVideo()"><li id="play"></li></a>' +
		'<a href="javascript:ytplayer.seekTo(0)"><li id="replay"></li></a>' +
		'<a href="javascript:ytplayer.seekTo(ytplayer.getCurrentTime() - 5)">' +
		'<li id="rewind"></li></a><br>' +
		'<li style="font-family: "Quicksand", sans-serif;"><span id="currentTime">--:--</span> / <span id="totalDuration"></span></li>' +
		'</ul>';
	if (this.loggedIn) {
		transportControls += '<div id="button_add_track"><button class="appendTrack">Add Track</button></div>'
	}
	$('.controls_box').append(transportControls);
};


TracksContainer.prototype.initialize = function() {
	this.constructTransportControls();
	this.attachAddNewTrack();
	this.constructTracks();
};

TracksContainer.prototype.updateHTML = function(elmId, value) {
	document.getElementById(elmId).innerHTML = value;
}

TracksContainer.prototype.attachAddNewTrack = function() {
	var duration = this.duration;
  $('.controls_box').on("click", '.appendTrack',function(){
    new Track(null, duration, false);
  });
}


function showEditForm(button) {
	$(button).parent().parent().css('z-index',"3");
}

function hideEditForm(button) {
	$(button).parent().parent().prev().css('z-index',"4");
}