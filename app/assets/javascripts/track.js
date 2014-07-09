// document.addEventListener('keyup', function(e)
// {
//   switch(e.keyCode)

//   // console.log(javascript:ytplayer.getPlayerState())
//  { 
//   	// case 32: javascript:ytplayer.pauseVideo();
//   	// break;

//   	//if double click, 
//   	case 32: javascript:ytplayer.playVideo();
//   }
// }, false);

function moveProgressBar(input) {
  $('.progressBar').css('left', (input * 10) + 'em'); 
}


function Track(track, duration, existing) {
	this.creatorId = track ?track.creatorId : null;
	this.trackId = track ? track.trackId : null;
	this.videoId = track ? track.videoId : null;
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
		this.attachDblClick();
	}
};

Track.prototype.construct = function() {
	var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

		var transcript = "<div class='language_box'>";
  	if (true){
  		transcript += "<form action='/videos/" + this.videoId + "/tracks/" + this.trackId + "' method='POST'>";
  		transcript += "<input name='authenticity_token' type='hidden' value ='" + AUTH_TOKEN +"'/>";
  		transcript += "<input name='_method' type='hidden' value='delete' /><input type='submit' class ='deleteButton' value='Delete'></form>";
  		transcript += "<form action='/videos/" + this.videoId + "/tracks/" + this.trackId + "/edit' method='POST'>";
  		transcript += "<input name='_method' type='hidden' value='patch' /><input type='submit' class ='editButton' value='Edit'></form>";
  	}
  	transcript += "</div>"
  	transcript += "<div class='show_tracks_box' id='" + this.trackId + "'style='width:"+ this.duration + "em;'>";
  	transcript += "<div class='progressBar'></div>";
    transcript += "</div>";

		$('.track_divs').append(transcript);
};

Track.prototype.constructNew = function() {

	var transcript = "<div class='language_box'><button class='timeButton'>Submit</button>";
		  transcript +="<button class ='deleteButton' onclick='javascript:removeEditTrack();'>Delete</button>";
		  transcript += "<select name = 'language'>";

			for(var i = 0; i < VIDEOAPP.languages.length; i++){
				transcript += "<option>" + VIDEOAPP.languages[i]['title'] + "</option>";
			}
			transcript += "</select>";
		  transcript += "</div>";
			transcript += "<div class='tracks_box' style='width:"+ this.duration + "em;'>";
			transcript += "<div class='progressBar'></div>";
			transcript += "<div class='snapLine ui-widget-header'></div>";
			transcript += "<div class='snapLine'></div>";
			transcript += "<div class='snapLine ui-widget-header'></div></div>";
	$('.track_divs').append(transcript);
};

Track.prototype.fillPostIts = function() {
	for (var i = 0; i < this.transcriptions.length; i++) {	
		this.transcriptions[i] = new PostIt(this.transcriptions[i], this.trackId, true);
	}
};

function removeEditTrack() {
	
}

Track.prototype.attachDblClick = function() {
	$('.tracks_box').each(function() {
		if (!$(this).attr('data-dblclick')) {
		  $(this).on('dblclick',function(event){
	    	if (event.target.className == "tracks_box") {
	      	new PostIt(null, this.trackId, false, $(this),event);
	    	}
	  	});
	  	$(this).attr('data-dblclick', true);
		}
	});
};