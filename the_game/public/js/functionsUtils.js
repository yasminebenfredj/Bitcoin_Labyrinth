
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



function endGame(scene) {
    let playTime = Date.now() - time;


    if (nbVie < 2 ){
         scene.assets.goodAudio.setVolume(0);
        scene.assets.badAudio.setVolume(0.7);
    }

    if (playTime > 190010 && scene.gifts){
        scene.assets.badAudio.setVolume(0);
        scene.assets.goodAudio.setVolume(0.7);
        
        if(me.score < 10) {
            alert("Le jeu est terminer "+me.name+"!  \nVous avez perdu avec : "+me.score+" monnais recolter. ");
            return true;
        }
        else{

            alert("Le jeu est terminer "+me.name+"! \nVous avez gagner avec : "+me.score+" monnais recolter.");
            return true;
        }
    }

    if (vies.firstChild && playTime >= 63000*(4-nbVie)){
        vies.removeChild(vies.firstChild);
        nbVie--;
    }
    return false;
}


function resetPlayers(){
    vies.innerHTML = "";
    coins.innerHTML = "";

    let userLineOfHTML = "<img src='./documents/images/vie.jpg' height='50px' width='50px'>";
    vies.innerHTML += userLineOfHTML;
    vies.innerHTML += userLineOfHTML;
    vies.innerHTML += userLineOfHTML;

    for (let player in allPlayers) {
		player.score = 0;
	}
}

function drawCoin(){
    coins.innerHTML = "";
    let userLineOfHTML = "<img src='./documents/images/coin.png' height='50px' width='50px'>";

    for(var i = 0 ; i < me.score ; i++){
        coins.innerHTML += userLineOfHTML;
    }
  }


  function showTime() {
    let show = document.querySelector("#time");
    show.innerHTML = Math.floor((190000 - (Date.now() - time))/1000);
  }
