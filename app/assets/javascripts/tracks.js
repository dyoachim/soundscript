function updatePlayerInfo() {
  if (ytplayer) {
    updateHTML("currentTime", Number(ytplayer.getCurrentTime()).toFixed(2));   
    updateHTML("totalDuration", Number(ytplayer.getDuration()).toFixed(2));   
    moveProgressBar(ytplayer.getCurrentTime()); 
  }
}

function moveProgressBar(input) {
  $('.progressBar').css('left', (input * 10) + 'em'); 
}

function updateHTML(elmId, value) {
	document.getElementById(elmId).innerHTML = value;
}