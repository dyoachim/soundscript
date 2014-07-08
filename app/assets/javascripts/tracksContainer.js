function TracksContainer(duration, loggedIn, tracks) {
	this.duration = duration;
	this.loggedIn = loggedIn;
	this.tracks = tracks;
	this.trackNum = tracks.length;

	this.initialize();
}

TracksContainer.prototype.constructElement = function() {
	var track = "<div class='language_box'></div><div class='tracks_box' style='width:"+ this.duration * 10 + "em;'>"

  if (this.loggedIn) {
  	track += "<button class='timeButton'>Submit</button>"
  }
  track += "<div class='progressBar'></div></div>";
	$('.track_divs').html(track);
};

TracksContainer.prototype.showExistingTranscript = function() {
	if (this.tracks == "") {
		this.constructElement();
	}
	else {
		var transcript = ["<div class='language_box'>English</div>",
	  									"<div class='show_tracks_box' style='width:"+ this.duration * 10 + "em;'>",
	  									"<div class='progressBar'></div>"];
			
		for(var i = 0; i < this.trackNum; i++) {	
			transcript.push('<div class="track_post-it" style="' + this.tracks[i]['position_css'] + '">' +
	      '<section class="content">' + this.tracks[i]['content'] + '</section></div>');
		}

		transcript.push("</div>");
		$('.track_divs').html(transcript.join(''));
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
	$('.controls_box').html(transportControls);
};


TracksContainer.prototype.initialize = function() {
	this.constructTransportControls();
	this.showExistingTranscript();
};




//Clean up this orphaned function
function appendNewTrack() {
  var track = "<div class='language_box'>English</div>" + 
  	"<div class='tracks_box' style='width:"+ parseFloat($('#totalDuration').text()) * 10 + "em;'>" +
  	"<button class='timeButton'>Submit</button>" +
  	"<button class ='deleteButton'>Delete</button>" +
  	"<button class ='deleteEdit'>Edit</button>" +
  	"<div class='progressBar'></div></div>"
  $('.track_divs').append(track);
}
