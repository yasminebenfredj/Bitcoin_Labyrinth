const express = require('express')
const Player = require('./public/js/Player')
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);


http.listen(8082, () => {
	console.log("Web server écoute sur http://localhost:8082");
})

// Indicate where static files are located. 
app.use(express.static(__dirname + '/public'));    


// routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


var playerNames = {};
var listOfPlayers = {};



io.on('connect', (socket) => {
	// Nouveau joueur 
	socket.on('connection', (data, username) => {
		socket.username = username;
		
		listOfPlayers[username] = data;
		playerNames[username] = username;

		console.log("Le client "+data.name + " est connecter ");

		// tell all clients to update the list of users on the GUI
		io.emit('updatePlayers', listOfPlayers, playerNames);
	});

	socket.on('updatePlayerData', (username, data) => {
		listOfPlayers[username] = data;
		io.emit('updatePlayers', listOfPlayers, playerNames);

	});

	// Deconnection du joueur 
	socket.on('disconnect', () => {
		delete playerNames[socket.username];
		//playerNames.splice(socket.username);
		delete listOfPlayers[socket.username];	
		console.log("Le client "+ socket.username + " est deconnecter ");
		io.emit('updatePlayers',listOfPlayers, playerNames);

	});
});


