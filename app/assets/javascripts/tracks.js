function VideoPlayer(video_id, logged_in) {
	this.video_id = video_id;
	this.logged_in = logged_in;

	this.fillTracks = function(duration) {
		var track = "<div class='language_box'>English</div>"
    track += "<div class='tracks_box' style='width:"+ duration * 10 + "em;'>"
    if (logged_in) {
    	track += "<button class='timeButton'>Get timestamps</button>"
    }
    track += "<div id='progressBar'></div>"
		track += "</div>";
		$('.track_divs').append(track);
	}

	this.updatePlayerInfo = function() {
  if (ytplayer) {
    this.updateHTML("currentTime", Number(ytplayer.getCurrentTime()).toFixed(2));   
    this.updateHTML("totalDuration", Number(ytplayer.getDuration()).toFixed(2));   
    this.moveProgressBar(ytplayer.getCurrentTime()); 
    }
  }

	this.moveProgressBar = function(input) {
	  var progressBar = document.getElementById('progressBar'); 
	  progressBar.style.left = (input * 10) + 'em'; 
	}

	this.updateHTML = function(elmId, value) {
		document.getElementById(elmId).innerHTML = value;
	}
}

function buildPostIt(click_event) {
  return ['<div class="post-it" style="top:' + click_event.offsetY + 'px; left:' + click_event.offsetX + 'px">',
            '<header class="header"><span class="remove_note">X</span></header>',
            '<section class="content" contenteditable="true"></section>',
          '</div>'].join('\n');
}