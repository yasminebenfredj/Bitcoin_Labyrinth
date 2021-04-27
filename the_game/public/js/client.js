var goodAudio = new Audio('documents/sounds/good.mp3'); //j'ai pas trouver mon bonheur dans Babylon.sounds
var badAudio = new Audio('documents/sounds/bad.mp3');
var boxAudio = new Audio('documents/sounds/box.wav');
var giftAudio = new Audio('documents/sounds/gift.wav');

let canvas, mousePos;
let me = undefined;
let socket;
var username, container;
let player  = undefined;
let time = 0;
let nbVie = 3;
let nbGift = 20;

// Autres joueurs
let allPlayers = {};
let playersName = {};
let inputStates = {};

// on load of page
window.onload = init;


function init() {

  username = prompt("Quel est votre nom?");
  alert("Vous avez 3 minutes pour retrouver les 10 pieces et la clé du coffre. \nNe vous perdez pas ;)\nBon Courage "+ username);

  // initialize socket.io client-side
  socket = io.connect();

  playersScore = document.querySelector("#playersScore");
  vies = document.querySelector("#vie");
  coins = document.querySelector("#coin");



  socket.on("connect", () => {
    // connection with server
    me =  new Player(username, scene);
    player  = me.createMe(scene);


    let data = me;
    socket.emit("connection", data, username);

  });


  socket.on("updatePlayers", (listOfPlayers, playerNames) => {
    updatePlayers(listOfPlayers, playerNames);
    updatePlayersScore(listOfPlayers);

  });


  socket.on("endOfGame", (winner) => {
    alert("Le jeu est terminer. Le gagnant est "+winner.name+" : "+winner.score+"pts. ");
  });



  startGame();
}



function startGame() 
{
  console.log("start");
  canvas = document.querySelector("#myCanvas");

  engine = new BABYLON.Engine(canvas, true);
  scene = createScene();
  container.addAllToScene(); //comme asset pour contenir les ellement du jeu 
  modifySettings();

  //for replay 
  resetPlayers();
  nbVie = 3;
  time = Date.now();

  engine.runRenderLoop(() => {
    let endOfGame = endGame();
    if(endOfGame){
      var response;
      var response = confirm("Voulez vous rejouer ? ");
      if (response == true) {
        startGame();
      } else {
        alert("Au revoir!");
      }
    }

    if(player != undefined)
    {
      moveAllPlayers();
      allPlayers[me.name] = me
      socket.emit("updatePlayerData", me.name, me);

    }

    
    //moveCurrentPlayer();

    if(scene.gifts) {
      for(var i = 0 ; i < scene.gifts.length ; i++) {
          scene.gifts[i].Gift.move(scene);
      }
    }
    scene.render();
  });

}



function createScene() {
  let scene = new BABYLON.Scene(engine);

  container = new BABYLON.AssetContainer(scene);

  let ground = createGround(scene);
  container.meshes.push(ground);

  let freeCamera = createFreeCamera(scene);

  //let followCamera = createFollowCamera(scene, tank);


  scene.activeCamera = freeCamera;

  createLights(scene, container);
  createSky(scene);

  //container.meshes.push(scene.gifts);
  createwalls(scene, container);
  createLabyrinth(scene, container);
  createBase(scene) ;

  return scene;
}


function updatePlayers(listOfPlayers, playerNames) 
{
  playersName = playerNames ;
  allPlayers = listOfPlayers;
}



function moveAllPlayers() 
{
  let myMesh = scene.getMeshByName(me.name);
  if(myMesh){
    myMesh.move();
  }

}







window.addEventListener("resize", () => {
  engine.resize()
});



// ####################### Gestion des touches Clavier et souris ###########################

function modifySettings() {
  // as soon as we click on the game window, the mouse pointer is "locked"
  // you will have to press ESC to unlock it
  scene.onPointerDown = () => {
      if(!scene.alreadyLocked) {
          console.log("requesting pointer lock");
          canvas.requestPointerLock();
      } else {
          console.log("Pointer already locked");
      }
  }

  document.addEventListener("pointerlockchange", () => {
      let element = document.pointerLockElement || null;
      if(element) {
          // lets create a custom attribute
          scene.alreadyLocked = true;
      } else {
          scene.alreadyLocked = false;
      }
  })

  // key listeners for the tank
  inputStates.left = false;
  inputStates.right = false;
  inputStates.up = false;
  inputStates.down = false;
  inputStates.space = false;


  
  //add the listener to the main, window object, and update the states
  window.addEventListener('keydown', (event) => {
      if ((event.key === "ArrowLeft") || (event.key === "q")|| (event.key === "Q")) {
         inputStates.left = true;
      } else if ((event.key === "ArrowUp") || (event.key === "z")|| (event.key === "Z")){
         inputStates.up = true;
      } else if ((event.key === "ArrowRight") || (event.key === "d")|| (event.key === "D")){
         inputStates.right = true;
      } else if ((event.key === "ArrowDown")|| (event.key === "s")|| (event.key === "S")) {
         inputStates.down = true;
      }  else if (event.key === " ") {
         inputStates.space = true;
      }
  }, false);

  //if the key will be released, change the states object 
  window.addEventListener('keyup', (event) => {
      if ((event.key === "ArrowLeft") || (event.key === "q")|| (event.key === "Q")) {
         inputStates.left = false;
      } else if ((event.key === "ArrowUp") || (event.key === "z")|| (event.key === "Z")){
         inputStates.up = false;
      } else if ((event.key === "ArrowRight") || (event.key === "d")|| (event.key === "D")){
         inputStates.right = false;
      } else if ((event.key === "ArrowDown")|| (event.key === "s")|| (event.key === "S")) {
         inputStates.down = false;
      }  else if (event.key === " ") {
         inputStates.space = false;
      }
  }, false);
}






