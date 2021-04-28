
let canvas, mousePos;
let me = undefined;
let socket;
var username, container;
let player  = undefined;
let time = 0;
let nbVie = 3;
let nbGift = 15;
let  labyrinth;

// Autres joueurs
let allPlayers = {};
let playersName = {};
let inputStates = {};

// on load of page
window.onload = init;


function init() {

  username = prompt("Quel est votre nom?");
  alert("Vous avez 3 minutes pour trouver plus que 10 pieces. ;) \nNe vous perdez pas  "+ username);

  // initialize socket.io client-side
  socket = io.connect();

  playersScore = document.querySelector("#playersScore");
  vies = document.querySelector("#vie");
  coins = document.querySelector("#coin");



  socket.on("connect", () => {
    // connection with server
    me =  new Player(username);
    socket.emit("connection", me, username);

  });


  socket.on("updatePlayers", (listOfPlayers, playerNames) => {
    updatePlayers(listOfPlayers, playerNames);
    updatePlayersScore(listOfPlayers);

  });

  socket.on("getLabyrinth", (table) => {
    labyrinth = table;
    startGame();
    me.createMe(scene);
  });

  socket.on("endOfGame", (winner) => {
    alert("Le jeu est terminer. Le gagnant est "+winner.name+" : "+winner.score+"pts. ");
  });

}


function startGame() 
{
  console.log("start");
  canvas = document.querySelector("#myCanvas");

  engine = new BABYLON.Engine(canvas, true);
  scene = createScene();

  scene.enablePhysics();

  container.addAllToScene(); //comme asset pour contenir les ellement du jeu 
  modifySettings();

  //for replay 
  resetPlayers();
  nbVie = 3;
  time = Date.now();

  scene.toRender = () => {
    showTime()
    let endOfGame = endGame(scene);

    if(endOfGame){
      resetPlayers();
      socket.emit("restartGame");
    }

    if(player != undefined)
    {
      socket.emit("updatePlayerData", me.name, me);
      moveAllPlayers();
    }
    
    if(scene.gifts) {
      for(var i = 0 ; i < scene.gifts.length ; i++) {
          scene.gifts[i].Gift.move(scene);
      }
    }
    scene.render();
  };
  scene.assetsManager.load();

}



function createScene() {
  let scene = new BABYLON.Scene(engine);

  container = new BABYLON.AssetContainer(scene);
  scene.assetsManager = configureAssetManager(scene);

  createGround(scene);
  createSky(scene);
  createLights(scene, container);

  createwalls(scene, container);
  createLabyrinth(scene, container);
  createBase(scene) ;
  loadSounds(scene);

  return scene;
}




function configureAssetManager(scene) {
  // useful for storing references to assets as properties. i.e scene.assets.cannonsound, etc.
  scene.assets = {};

  let assetsManager = new BABYLON.AssetsManager(scene);

  assetsManager.onProgress = function (
    remainingCount,
    totalCount,
    lastFinishedTask
  ) {
    engine.loadingUIText =
      "We are loading the scene. " +
      remainingCount +
      " out of " +
      totalCount +
      " items still need to be loaded.";
    console.log(
      "We are loading the scene. " +
        remainingCount +
        " out of " +
        totalCount +
        " items still need to be loaded."
    );
  };

  assetsManager.onFinish = function (tasks) {
    engine.runRenderLoop(function () {
      scene.toRender();
    });
  };

  return assetsManager;
}

function loadSounds(scene) {
  var assetsManager = scene.assetsManager;
  var binaryTask = assetsManager.addBinaryFileTask(
    "goodAudio",
    "documents/sounds/good.mp3"
  );
  binaryTask.onSuccess = function (task) {
    scene.assets.goodAudio = new BABYLON.Sound(
      "goodAudio",
      task.data,
      scene,
      null,
      { loop: true,  autoplay: true}
    );
  };

  binaryTask = assetsManager.addBinaryFileTask(
    "badAudio",
    "documents/sounds/bad.mp3"
  );
  binaryTask.onSuccess = function (task) {
    scene.assets.badAudio = new BABYLON.Sound(
      "badAudio",
      task.data,
      scene,
      null,
      { loop: true,  autoplay: true}

    );
    scene.assets.badAudio.setVolume(0);

  };

  binaryTask = assetsManager.addBinaryFileTask(
    "boxAudio", 
    "documents/sounds/box.wav");
  binaryTask.onSuccess = function (task) {
    scene.assets.boxAudio = new BABYLON.Sound(
      "boxAudio", 
      task.data, scene, null, {
      loop: false,
      spatialSound: true
    });
  };
  binaryTask = assetsManager.addBinaryFileTask(
    "giftAudio",
    "documents/sounds/gift.wav"
  );
  binaryTask.onSuccess = function (task) {
    scene.assets.giftAudio = new BABYLON.Sound(
      "giftAudio",
      task.data,
      scene,
      null,
      { loop: false, spatialSound: true }
    );
  };
}



function updatePlayers(listOfPlayers, playerNames) 
{
  playersName = playerNames ;

  if(Object.keys(allPlayers).length != Object.keys(listOfPlayers).length){
    allPlayers = listOfPlayers;
    createEnemys(scene);
    //console.log( scene.enemys);
  }else{
    allPlayers = listOfPlayers;

  }

}


function moveAllPlayers() 
{
  let myMesh = scene.getMeshByName(me.name);
  if(myMesh){
    myMesh.move();
  }
  let i = 0;
  for (let p in allPlayers) {
      if(scene.enemys) {
        console.log(p.positionX,p.positionY ,p.positionZ, p.rotationY);
        if(p.name != me.name){
          scene.enemys[i].Enemy.move(p.positionX,p.positionY ,p.positionZ, p.rotationY );
        }
    }
    i++;
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
