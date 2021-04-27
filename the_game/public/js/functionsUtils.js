
function  winner(listOfPlayers,name, playerNames){
	let win = listOfPlayers[name];

	for (let player in playerNames) {
		if(listOfPlayers[player].score>=win.score) {
			win = listOfPlayers[player];
		}
	}
	return win;
}

function updatePlayersScore (players) 
{
    playersScore.innerHTML = "";

	for (let name in players) 
    { 
		player = players[name];
        let userLineOfHTML = "<p style='color:"+player.color+"'><font size='+1' color= > <b>" + player.name + " : "+player.score +"</b></font></p>";
        playersScore.innerHTML += userLineOfHTML;
    }
}



function draw() {
    var ctx = canvas.getContext('2d');

    goodAudio.play(true);

    let x;
    if (time < 61000){
        x = 0
    }
    if (time < 60000){
        x = 1
    }
    if (time < 40000){
        x = 2
    }
    if (time < 20000){
        x = 3
    }

    var img = new Image();
    img.src = './documents/images/vie.jpg';

    img.onload = function() {
        for (var i = 0; i <= x; i++) {
          ctx.drawImage(img, 10, 10, 100, 100);
      }
    };
}


