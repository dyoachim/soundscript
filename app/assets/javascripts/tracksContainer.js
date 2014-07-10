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
		'<div style="font-family: "Quicksand", sans-serif;"><span id="totalDuration">--:--</span></div>'+
		'<a href="javascript:ytplayer.seekTo(0)"><li id="replay"></li></a>' +
		'<a id="playPauseLink" href="javascript:playPauseVideo(ytplayer)"><li id="play"></li></a>' +
		'<a href="javascript:ytplayer.seekTo(ytplayer.getCurrentTime() - 5)">' +
		'<li id="rewind"></li></a><br>' +
		'</ul>';
	if (this.loggedIn) {
		transportControls += '<div id="button_add_track"><button class="appendTrack">Add Track</button></div>'
	}
	$('.controls_box').append(transportControls);
};

function playPauseVideo(player) {
	if (player.getPlayerState() === 1) {
		$('#playPauseLink').html('<li id="play"></li>')
		player.pauseVideo();
	}
	else {
		$('#playPauseLink').html('<li id="pause"></li>')
		player.playVideo();
	}
}


TracksContainer.prototype.initialize = function() {
	this.constructTransportControls();
	this.attachAddNewTrack();
	this.constructTracks();
};

TracksContainer.prototype.updateHTML = function(elmId, currentTime, totalTime) {
	document.getElementById(elmId).innerHTML = currentTime.toHHMMSS() + " / " + totalTime.toHHMMSS();
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

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (minutes < 10) {minutes = minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time    = minutes+':'+seconds;
  return time;
}

