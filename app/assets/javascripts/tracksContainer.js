function TracksContainer(duration, loggedIn, tracks, userId, languages) {
	this.duration = duration;
	this.loggedIn = loggedIn;
	this.tracks = tracks;
	this.trackNum = tracks.length;
	this.userId = userId;
	this.languages = languages;

	this.initialize();
}

TracksContainer.prototype.constructElement = function() {
console.log(languages);
// console.log(languages[0]['title']);


// var wanted = languages.filter( function(language){return (language.title== "English");} );

// console.log(wanted);

	var track = ""
	track += "<div class='language_box'>";
	track += "<select name = 'Language'>";

		for(var i = 0; i < this.languages.length; i++){
			track += "<option>" + this.languages[i]['title'] + "</option>";
		}
			track += "</select>";
			if (this.loggedIn) {
		  	track += "<button class='timeButton'>Submit</button>"
		  }
	track += "</div><div class='tracks_box' style='width:"+ this.duration * 10 + "em;'>";

  track += "<div class='progressBar'></div></div>";
	$('.track_divs').html(track);
};

TracksContainer.prototype.showExistingTranscript = function() {
	var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

	if (this.tracks == "") {
		this.constructElement();
	}
	else {
		var transcript = ""
		

		for(var i = 0; i < this.trackNum; i++) {	

			transcript += "<div class='language_box'>";

    	if (true){

    		transcript += "<form action='/videos/" + this.tracks[i]['videoId'] + "/tracks/" + this.tracks[i]['trackId'] + "' method='POST'>";


    		transcript += "<input name='authenticity_token' type='hidden' value ='" + AUTH_TOKEN +"'/>";
    		transcript += "<input name='_method' type='hidden' value='delete' /><input type='submit' class ='deleteButton' value='Delete'></form>";
    		transcript += "<form action='/videos/" + this.tracks[i]['videoId'] + "/tracks/" + this.tracks[i]['trackId'] + "/edit' method='POST'>";
    		transcript += "<input name='_method' type='hidden' value='patch' /><input type='submit' class ='editButton' value='Edit'></form>";
    	}
    	transcript += "</div>"
	  	transcript += "<div class='show_tracks_box' style='width:"+ this.duration * 10 + "em;'>";
	  	transcript += "<div class='progressBar'></div>";
			transcript += "<div class='track_post-it' style='" + this.tracks[i]['position_css'] + "'>";
	    transcript += "<section class='content'>" + this.tracks[i]['content'] + "</section></div></div>";
		}

		$('.track_divs').html(transcript);
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
  	"<div class='progressBar'></div>" +
		"<div class='snapLine ui-widget-header'></div>" +
		"<div class='snapLine'></div>" +
		"<div class='snapLine ui-widget-header'></div></div>"
  $('.track_divs').append(track);
}
