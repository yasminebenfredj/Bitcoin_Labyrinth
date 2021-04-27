
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



function endGame() {
    let playTime = Date.now() - time;

    if (nbVie > 1){
        goodAudio.play(true); 
    }
    else{
        goodAudio.pause(); 
        badAudio.play(true); 
    }

    if (playTime > 300010 && scene.gifts){

        if(me.score < 10) {
            badAudio.play(true); 

            alert("Le jeu est terminer "+me.name+"!  \nVous avez perdu avec : "+me.score+" monnais recolter. ");
            return true;
        }
        else{
            badAudio.pause(); 
            goodAudio.play(true); 
            alert("Le jeu est terminer "+me.name+"! \nVous avez gagner avec : "+me.score+" monnais recolter.");
            return true;
        }
    }

    if (vies.firstChild && playTime >= 100000*(4-nbVie)){
        vies.removeChild(vies.firstChild);
        //if (vies.firstChild){vies.removeChild(vies.firstChild);}
        nbVie--;
    }
    return false;
}


function resetPlayers(){
    vies.innerHTML = "";

    let userLineOfHTML = "<img src='./documents/images/vie.jpg' height='50px' width='50px'>";
    vies.innerHTML += userLineOfHTML;
    vies.innerHTML += userLineOfHTML;
    vies.innerHTML += userLineOfHTML;

    for (let player in allPlayers) {
		player.score = 0;
	}
}
