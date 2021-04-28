const express = require('express')
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

let labyrinth , visited;
let sizeCube = 30;
let sceneSize = 600;
let port = process.env.PORT || 3000;
http.listen(port, () => {
	console.log("Web server écoute sur http://localhost:", port);
})

// Indicate where static files are located. 
app.use(express.static(__dirname + '/public'));    


// routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


var playerNames = {};
var listOfPlayers = {};


//generation du labirynth
labyrinth = emptyLabyrinth(sceneSize, sceneSize, sizeCube, true);
visited = emptyLabyrinth(sceneSize, sceneSize, sizeCube, false);
dfsGenerateLabyrinth(sceneSize, sceneSize , sizeCube);

io.on('connect', (socket) => {

	// Nouveau joueur 
	socket.on('connection', (data, username) => {

		//console.log(data);
		socket.username = username;
		
		listOfPlayers[username] = data;
		playerNames[username] = username;

		console.log("Le client "+data.name + " est connecter ");

		// tell all clients to update the list of users on the GUI
		io.emit('getLabyrinth', labyrinth);
		io.emit('updatePlayers', listOfPlayers, playerNames);
	});

	socket.on('updatePlayerData', (username, data) => {
		listOfPlayers[username] = data;
		io.emit('updatePlayers', listOfPlayers, playerNames);

	});

    
	socket.on('restartGame', () => {
		//generation du labirynth
        labyrinth = emptyLabyrinth(sceneSize, sceneSize, sizeCube, true);
        visited = emptyLabyrinth(sceneSize, sceneSize, sizeCube, false);
        dfsGenerateLabyrinth(sceneSize, sceneSize , sizeCube);
        for (let player in listOfPlayers) {
            player.score = 0;
        }
		io.emit('getLabyrinth', labyrinth);
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



//generation d'un nouveau labyrinth dans le server 




function createBord(l, w , cubeSize) {
    x = labyrinth.length-1;
    y = labyrinth[0].length-1;

    xx = Math.floor(x/2)-1;
    yy = Math.floor(y/2)-1;
    for ( var i = 0; i < 5; i++) {
        for ( var j = 0; j < 5; j++) {
            labyrinth[xx+i][yy+j] = false ;
        }

    }
}


function dfsGenerateLabyrinth(l, w , cubeSize) {

    startVertex = [0,0];
    randomizedDFS(l , w ,cubeSize,startVertex);
    randomGenerateLabyrinth(l, w , cubeSize);
    createBord(l, w , cubeSize);

}

function randomizedDFS(l , w ,cubeSize,vertex) {
    visited[vertex[0]][vertex[1]] = true;
    nextVertex = unvisitedNeighbour(l , w, cubeSize , vertex);
    while( nextVertex != null){
        labyrinth[vertex[0]][vertex[1]] = false;

        randomizedDFS(l , w ,cubeSize,nextVertex);
        nextVertex = unvisitedNeighbour(l , w, cubeSize, vertex);
    }

    nextVertex = getRandomVertex(l , w, cubeSize);
    while( nextVertex != null){
        labyrinth[vertex[0]][vertex[1]] = false;

        randomizedDFS(l , w ,cubeSize,nextVertex);
        nextVertex = getRandomVertex(l , w, cubeSize);
    }
}

function unvisitedNeighbour(l , w, cubeSize, vertex) {
    let x = vertex[0];
    let y = vertex[1];
    let neighbours = [];
    for( var i = -1; i < 2 ; i++ ){
        for( var j = -1; j < 2 ; j++ ){
            if(x+i < l/cubeSize &&  x+i>= 0  && y+j < w/cubeSize && y+j >= 0  && (i != j)  && (i != -j) && (-i != j)){
                if(!visited[x+i][y+j]){
                    neighbours.push([x+i, y+j]);
                }
            }
        }
    }
    if(neighbours.length != 0){
        r = Math.floor(Math.random() * (neighbours.length ))
        markVisitedNeighbours(l , w, cubeSize,vertex);

        return neighbours[r];
    }
    return null;
}

function markVisitedNeighbours(l , w, cubeSize,vertex) {
    let x = vertex[0];
    let y = vertex[1];
    for( var i = -1; i < 2 ; i++ ){
        for( var j = -1; j < 2 ; j++ ){
            if(x+i < l/cubeSize &&  x+i>= 0  && y+j < w/cubeSize && y+j >= 0 && (i != j) ){
                visited[x+i][y+j] = true;
            }
        }
    }
}


function randomGenerateLabyrinth(l, w , cubeSize) {
    
    for ( var i = 0; i < l/cubeSize ; i++) {
        for ( var j = 0; j < w/cubeSize ; j++) {
            if(Math.random() > 0.8){
                labyrinth[i][j] = false ;

            }
        }
    }
}


function emptyLabyrinth(l, w , cubeSize, inside) {
    var  t = [];
    for ( var i = 0; i < l/cubeSize ; i++) {
        t.push([]);
        for ( var j = 0; j < w/cubeSize ; j++) {
            t[i][j]= inside;
        }
    }
    return t;
}

function getRandomVertex(l , w, cubeSize) {
    let i = 0;
    let j = 0;
    let x = 0;
    while(visited[i][j] && x <= 101) {
        x++;
        i = Math.floor(Math.random() * (l/cubeSize));
        j = Math.floor(Math.random() * (w/cubeSize));
    }
    if(x >=  100){
        return null;
    }
    return [i,j];
}







