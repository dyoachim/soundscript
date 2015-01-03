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

TracksContainer.prototype.initialize = function() {
  this.attachAddNewTrack();
  this.constructTracks();
};

TracksContainer.prototype.updateHTML = function(elmId, currentTime, totalTime) {
  var timer = currentTime.toHHMMSS() + " / " + totalTime.toHHMMSS();
  window.requestAnimationFrame(function () {
    document.getElementById(elmId).innerHTML = timer;
  });
}

TracksContainer.prototype.attachAddNewTrack = function() {
  var duration = this.duration;
  $('.controls_box').on("click", '.appendTrack',function(){
    new Track(null, duration, false);
  });
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

function playPauseVideo(player) {
	if (player.getPlayerState() === 1) {
    player.pauseVideo();
  } else { 
    player.playVideo(); 
  }
}
