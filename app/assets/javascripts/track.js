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
  $('.progressBar').css('position', 'fixed');
  $('.trackWrapper').animate({scrollLeft: input * 160},249);
}


function Track(track, duration, existing) {
	this.creatorId = track ?track.creatorId : null;
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
		this.upVote(); 
		this.downVote();
	}
	else {
		this.constructNew();
	}
	this.attachDblClick();
	this.attachScroll();
};

Track.prototype.construct = function() {
	var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
	var transcript = "<div class='trackLine'>";
	transcript += "<div class='forward'>";
	transcript += "<div class='language_box'>";
	if (true){
		transcript += "<button class='editButton' onclick='javascript:showEditForm(this);'>Edit</button>"
		transcript += "<button class='editButton upVote' data-trackId='" + this.trackId  +"'>Up Vote</button>"
		transcript += "<button class='editButton downVote' data-trackId='" + this.trackId  +"'>Down Vote</button>"
	}
	transcript += "<div class='langDisplay' id='lang" + this.trackId + "'>" + this.language + "</div>";
	transcript += "</div>";
	transcript += "<div class='trackWrapper'>";
	transcript += "<div class='show_tracks_box' id='" + this.trackId + "'style='width:"+ this.duration + "em;'>";
	transcript += "<div class='progressBar'></div>";
	transcript += "<div class='snapLine'></div>";
	transcript += "<div class='snapLine'></div>";
	transcript += "<div class='snapLine'></div>";
  transcript += "</div>";
  transcript += "</div>";
  transcript += "</div>";
  

  transcript += "<div class='reversed'>";
	transcript += "<div class='language_box'>";
	transcript += "<button class='editButton' id='submitEdit" + this.trackId + "'>Submit</button>";
	transcript += "<button class='editButton' onclick='javascript:hideEditForm(this);'>Cancel</button>"
	transcript += "<form action='/videos/" + this.videoId + "/tracks/" + this.trackId + "' method='POST'>";
	transcript += "<input name='authenticity_token' type='hidden' value ='" + AUTH_TOKEN +"'/>";
	transcript += "<input name='_method' type='hidden' value='delete' /><input type='submit' class ='deleteButton' value='Delete'></form>";
	transcript += "<select class='langSelect' id='select" + this.trackId + "' name = 'language'>";
	for(var i = 0; i < VIDEOAPP.languages.length; i++){
		transcript += "<option>" + VIDEOAPP.languages[i]['title'] + "</option>";
	}
	transcript += "</select>";
	transcript += "</div>"
	transcript += "<div class='trackWrapper'>"
	transcript += "<div class='tracks_box' id='" + this.trackId + "edit'style='width:"+ this.duration + "em;'>";
	transcript += "<div class='progressBar'></div>";
	transcript += "<div class='snapLine ui-widget-header'></div>";
	transcript += "<div class='snapLine'></div>";
	transcript += "<div class='snapLine ui-widget-header'></div></div>"
  transcript += "</div>";
  transcript += "</div>";

	$('.track_divs').append(transcript);
	attachSubmitEdit($('#submitEdit' + this.trackId), this.trackId);
};

Track.prototype.constructNew = function() {

	var transcript = "<div class='trackLine'>";
	    transcript += "<div class='forward'>";
	    transcript += "<div class='language_box'><button class='timeButton'>Submit</button>";
		  transcript +="<button class ='deleteButton' onclick='javascript:removeEditTrack(this);'>Delete</button>";
		  transcript += "<select name='language'>";

			for(var i = 0; i < VIDEOAPP.languages.length; i++){
				transcript += "<option>" + VIDEOAPP.languages[i]['title'] + "</option>";
			}
			transcript += "</select>";
		  transcript += "</div>";
		  transcript += "<div class='trackWrapper'>";
			transcript += "<div class='tracks_box' style='width:"+ this.duration + "em;'>";
			transcript += "<div class='progressBar'></div>";
			transcript += "<div class='snapLine ui-widget-header'></div>";
			transcript += "<div class='snapLine'></div>";
			transcript += "<div class='snapLine ui-widget-header'>";
			transcript += "</div></div></div></div></div>";
	$('.track_divs').append(transcript);
};

Track.prototype.fillPostIts = function() {
	for (var i = 0; i < this.transcriptions.length; i++) {	
		this.transcriptions[i] = new PostIt(this.transcriptions[i], this.trackId, true);
	}
};

function removeEditTrack(element) {
	$(element).parent().parent().parent().remove();
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


Track.prototype.upVote = function() {
  var videoId = this.videoId; 
	$('.upVote').each(function() {
		if (!$(this).attr('data-upVoteClick')) {
		  $(this).on('click',function(event){
		    var trackId = parseInt($(this).attr('data-trackId'), 10); 
		    var url  = '/videos/' + videoId + '/tracks/' + trackId ; 
		    var data = trackId;
		    var that = this;
		    $.ajax({
			url: url,
			data: { vote: "up", _method: 'put'}, 
			method: "post"   
		      }).done(function() {
			$(that).hide(); 
		      }); 
	  	});
	  	$(this).attr('data-upVoteClick', true);
		}
	});
};

Track.prototype.downVote = function() {
  var videoId = this.videoId; 
	$('.downVote').each(function() {
		if (!$(this).attr('data-downVoteClick')) {
		  $(this).on('click',function(event){
		    var trackId = parseInt($(this).attr('data-trackId'), 10); 
		    var url  = '/videos/' + videoId + '/tracks/' + trackId ; 
		    var data = trackId;
		    var that = this;
		    $.ajax({
			url: url,
			data: { vote: 'down',  _method: 'put'}, 
			method: "post"   
		      }).done(function() {
			$(that).hide(); 
		      }); 
	  	});
	  	$(this).attr('data-downVoteClick', true);
		}
	});
};

Track.prototype.attachScroll = function() {
	$('.trackWrapper').each(function() {
		if (!$(this).attr('data-scroll')) {
			$(this).on('scroll',function(event){
				var xPosition = $(this).scrollLeft();
				$('.trackWrapper').each(function() {
					$(this).scrollLeft(xPosition);
				});
	  	});
	  	$(this).attr('data-scroll', true);
		}
	});
};

var attachSubmitEdit = function(element, trackId) {
	element.on("click", function(){
    var postIts = [];  
    var languageName = $('#select'+ trackId).val();
    var url = '/videos/' + VIDEOAPP.videoId + '/tracks/' + trackId;
 
    element.parent('.language_box').next().children('.tracks_box').find('.post-it').each(function(){
      postIts.push({ content: $(this).children(".content").text(), position_css: this.style['cssText']})
    });

    $.post(url, { _method: "put", data: postIts, languagename: languageName }, function( response ) {

    }).done(function() {		

    $('#' + trackId).children().remove(".track_post-it");
    $('#lang' + trackId).html("<div>" + languageName + "</div>");
    $('#' + trackId + "edit").children().remove(".post-it");

 		for (var i = 0; i < postIts.length; i++) {	
 			new PostIt(postIts[i], trackId, true);
 		}
    });
    
  	hideEditForm(element);
	});
};
