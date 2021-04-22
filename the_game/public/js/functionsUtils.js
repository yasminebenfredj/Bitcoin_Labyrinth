
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
