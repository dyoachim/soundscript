function TracksContainer(duration, loggedIn, tracks, userId) {
	this.duration = duration;
	this.loggedIn = loggedIn;
	this.tracks = tracks;
	this.trackNum = tracks.length;
	this.userId = userId;

	this.initialize();
}

// TracksContainer.prototype.constructElement = function() {
// 	var track = ""
// 	track += "<div class='language_box'>";
// 	track += "<select name = 'language'>";

// 		for(var i = 0; i < this.languages.length; i++){
// 			track += "<option>" + this.languages[i]['title'] + "</option>";
// 		}
// 			track += "</select>";
// 			if (this.loggedIn) {
// 		  	track += "<button class='timeButton'>Submit</button>"
// 		  }
// 	track += "</div><div class='tracks_box' style='width:"+ this.duration * 10 + "em;'>";
//   track += "<div class='progressBar'></div></div>";
// 	$('.track_divs').append(track);
// };

TracksContainer.prototype.constructTracks = function() {
	for (var i = 0; i < this.trackNum; i++) {
		this.tracks[i] = new Track(this.tracks[i], this.duration, true);
	}
};

TracksContainer.prototype.constructTransportControls = function() {
	var transportControls = "<ul>" +
		'<a id="pause_link" href="javascript:ytplayer.pauseVideo()"><li id="pause"></li></a>' +
		'<a href="javascript:ytplayer.playVideo()"><li id="play"></li></a>' +
		'<a href="javascript:ytplayer.seekTo(0)"><li id="replay"></li></a>' +
		'<a href="javascript:ytplayer.seekTo(ytplayer.getCurrentTime() - 5)">' +
		'<li id="rewind"></li></a><br>' +
		'<li style="font-family: "Quicksand", sans-serif;"><span id="currentTime">--:--</span> / <span id="totalDuration"></span></li>' +
		'</ul>';
	if (this.loggedIn) {
		transportControls += '<div id="button_add_track"><button class="appendTrack">Add Track</button></div>'
	}
	$('.controls_box').html(transportControls);
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
