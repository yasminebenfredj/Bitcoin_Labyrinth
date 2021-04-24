

let  table , visited;
let sizeCube = 30;
let sceneSize = 600;

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




function createGround(scene) 
{


    var grid = {
        'h' : sizeCube,
        'w' : sizeCube
    };
	
    const ground = new BABYLON.MeshBuilder.CreateTiledGround("Tiled Ground", {xmin: -sceneSize*0.7, zmin: -sceneSize*0.7, xmax: sceneSize*0.7, zmax: sceneSize*0.7, subdivisions: grid});

	//Create the multi material
    //Create differents materials
    const grassMaterial = new BABYLON.StandardMaterial("grass");
    grassMaterial.diffuseTexture = new BABYLON.Texture("./documents/images/Ground_01.png");
	grassMaterial.bumpTexture = new BABYLON.Texture("./documents/images/Ground_01_Nrm.png");
    grassMaterial.useParallax = true;
    grassMaterial.useParallaxOcclusion = true;
    grassMaterial.parallaxScaleBias = 0.08;
    grassMaterial.specularPower = 300.0;
	grassMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);

    const rockMaterial = new BABYLON.StandardMaterial("rock");
    rockMaterial.diffuseTexture = new BABYLON.Texture("./documents/images/Ground_02.png");
    rockMaterial.bumpTexture = new BABYLON.Texture("./documents/images/Ground_02_Nrm.png");
    rockMaterial.useParallax = true;
    rockMaterial.useParallaxOcclusion = true;
    rockMaterial.parallaxScaleBias = 0.08;
    rockMaterial.specularPower = 300.0;
	rockMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);

	const rockMaterial2 = new BABYLON.StandardMaterial("rock2");
    rockMaterial2.diffuseTexture = new BABYLON.Texture("./documents/images/Ground_03.png");
    rockMaterial2.bumpTexture = new BABYLON.Texture("./documents/images/Ground_03_Nrm.png");
    rockMaterial2.useParallax = true;
    rockMaterial2.useParallaxOcclusion = true;
    rockMaterial2.parallaxScaleBias = 0.08;
    rockMaterial2.specularPower = 300.0;
	rockMaterial2.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);


    const rockMaterial3 = new BABYLON.StandardMaterial("rock2");
    rockMaterial3.diffuseTexture = new BABYLON.Texture("./documents/images/Ground_04.png");
    rockMaterial3.bumpTexture = new BABYLON.Texture("./documents/images/Ground_04_Nrm.png");
    rockMaterial3.useParallax = true;
    rockMaterial3.useParallaxOcclusion = true;
    rockMaterial3.parallaxScaleBias = 0.08;
    rockMaterial3.specularPower = 300.0;
	rockMaterial3.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    // Create Multi Material
    const multimat = new BABYLON.MultiMaterial("multi", scene);
    multimat.subMaterials.push(rockMaterial3);
    multimat.subMaterials.push(rockMaterial3);
	multimat.subMaterials.push(rockMaterial2);


    // Apply the multi material
    // Define multimat as material of the tiled ground
    ground.material = multimat;
   
    // Needed variables to set subMeshes
    const verticesCount = ground.getTotalVertices();
    const tileIndicesLength = ground.getIndices().length / (grid.w * grid.h);
    
    // Set subMeshes of the tiled ground
    ground.subMeshes = [];
    let base = 0;
    for (let row = 0; row < grid.h; row++) {
        for (let col = 0; col < grid.w; col++) {
            ground.subMeshes.push(new BABYLON.SubMesh(row%2 ^ col%2, 0, verticesCount, base , tileIndicesLength, ground));
            base += tileIndicesLength;
        }
    }
  return ground;

}

function createSky(scene)
{
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1500}, scene);
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./documents/models/sky/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
}


function createwalls(scene, container) {


  const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
  const wallMaterial2 = new BABYLON.StandardMaterial("wallMaterial2", scene);

  wallMaterial.emissiveTexture = new BABYLON.Texture("./documents/images/moss-diffuse2.jpg");
  wallMaterial.bumpTexture = new BABYLON.Texture("./documents/images/wall_moss-normal2.jpg");

  wallMaterial2.emissiveTexture = new BABYLON.Texture("./documents/images/moss-diffuse.jpg");
  wallMaterial2.bumpTexture = new BABYLON.Texture("./documents/images/wall_moss-normal.jpg");

  wallMaterial.parallaxScaleBias = 0.1;
  wallMaterial.specularPower = 1000.0;

  wallMaterial2.parallaxScaleBias = 0.1;
  wallMaterial2.specularPower = 1000.0;

  const rockMaterial = new BABYLON.StandardMaterial("rock");
  rockMaterial.diffuseTexture = new BABYLON.Texture("./documents/images/Ground_02.png");
  rockMaterial.bumpTexture = new BABYLON.Texture("./documents/images/Ground_02_Nrm.png");
  rockMaterial.useParallax = true;
  rockMaterial.useParallaxOcclusion = true;
  rockMaterial.parallaxScaleBias = 0.08;
  rockMaterial.specularPower = 300.0;
  rockMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);



  var cube = BABYLON.Mesh.CreateBox("cube", sizeCube, scene);
  cube.checkCollisions = true;
  cube.position.x = 0 ;
  cube.position.z = -100;
  cube.position.y = -100;

  //cube.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, -Math.PI/2,0);
  if(Math.random() > 0.9) {
    cube.material = wallMaterial2;
  }
  else{
    cube.material = wallMaterial;
  }


  walls = [];
  for (let index = -sceneSize/2; index < sceneSize/2+sizeCube ; index = index+sizeCube ) {  // ^ ||droite||

          //scene is optional and defaults to the current scene
          walls[index] = cube.clone("clone1"+index);
          walls[index].position.y = sizeCube/2;
          walls[index].position.x = sceneSize/2 ;
          walls[index].position.z = index;
          //walls[index].rotation.x = -20.4445;

          let etage1 = walls[index].clone("clone1"+index);
          let etage2 = walls[index].clone("clone1"+index);
          etage1.position.y = sizeCube/2 + sizeCube;
          etage2.position.y = sizeCube/2 + (sizeCube * 2);

		  container.meshes.push(etage1);
          container.meshes.push(etage2);

		  container.meshes.push(walls[index]);
      }
	 
  walls1 = [];
  for (let index = -sceneSize/2; index < sceneSize/2 +sizeCube; index = index+sizeCube) {  // ^ ||gauche||

      //scene is optional and defaults to the current scene
	  walls1[index] = cube.clone("clone2"+index);
      walls1[index].position.y = sizeCube/2;
      walls1[index].position.x = -sceneSize/2 - sizeCube;
      walls1[index].position.z = index;

      let etage1 = walls1[index].clone("clone1"+index);
      let etage2 = walls1[index].clone("clone1"+index);
      etage1.position.y = sizeCube/2 + sizeCube;
      etage2.position.y = sizeCube/2 + (sizeCube * 2);

      container.meshes.push(etage1);
      container.meshes.push(etage2);
	  container.meshes.push(walls1[index]);

  }

  walls2 = [];
  for (let index = -sceneSize/2; index < sceneSize/2+sizeCube; index = index +sizeCube ) { // <-- bas -->

      //scene is optional and defaults to the current scene
	  walls2[index] = cube.clone("clone3"+index);
      walls2[index].position.y = sizeCube/2;
      walls2[index].position.x = index ;
      walls2[index].position.z = sceneSize/2 ;
      let etage1 = walls2[index].clone("clone1"+index);
      let etage2 = walls2[index].clone("clone1"+index);
      etage1.position.y = sizeCube/2 + sizeCube;
      etage2.position.y = sizeCube/2 + (sizeCube * 2);

      container.meshes.push(etage1);
      container.meshes.push(etage2);
	  container.meshes.push(walls2[index]);

  }

  walls3 = [];
  for (let index = -sceneSize/2 -sizeCube; index < sceneSize/2+sizeCube; index = index +sizeCube ) { // <-- haut --> 

      //scene is optional and defaults to the current scene
	  walls3[index] = cube.clone("clone4"+index);
      walls3[index].position.y = sizeCube/2;
      walls3[index].position.x = index;
      walls3[index].position.z = -sceneSize/2 - sizeCube;
      let etage1 = walls3[index].clone("clone1"+index);
      let etage2 = walls3[index].clone("clone1"+index);
      etage1.position.y = sizeCube/2 + sizeCube;
      etage2.position.y = sizeCube/2 + (sizeCube * 2);

      container.meshes.push(etage1);
      container.meshes.push(etage2);
	  container.meshes.push(walls3[index]);

  }
  
}

function createLights(scene, container) {
  // i.e sun light with all light rays parallels, the vector is the direction.
  
  let light0 = new BABYLON.PointLight("dir1", new BABYLON.Vector3(150,100, 200), scene);
  let light1 = new BABYLON.PointLight("dir2", new BABYLON.Vector3(-150,100, -150), scene); 
  let light2 = new BABYLON.PointLight("dir3", new BABYLON.Vector3(-200,100, 150), scene); 
  var light3 = new BABYLON.PointLight("dir4", new BABYLON.Vector3(150, 100, -150), scene);
  var light4 = new BABYLON.PointLight("dir5", new BABYLON.Vector3(0, 1000, 0), scene); //soleil

  var light5 = new BABYLON.PointLight("dir5", new BABYLON.Vector3(0, 300, 280), scene); //soleil
  var light6 = new BABYLON.PointLight("dir5", new BABYLON.Vector3(0, 300, -280), scene); //soleil
  var light7 = new BABYLON.PointLight("dir5", new BABYLON.Vector3(-280, 300, 0), scene); //soleil
  var light8 = new BABYLON.PointLight("dir5", new BABYLON.Vector3(280, 300, 0), scene); //soleil


  light0.intensity = 0.6;
  light1.intensity = 0.6;
  light2.intensity = 0.6;
  light3.intensity = 0.6;
  light4.intensity = 1;
  light5.intensity = 1;
  light6.intensity = 1;
  light7.intensity = 1;
  light8.intensity = 1;

  container.lights.push(light0);
  container.lights.push(light1);
  container.lights.push(light2);
  container.lights.push(light3);
  container.lights.push(light4);

  container.lights.push(light5);
  container.lights.push(light6);
  container.lights.push(light7);
  container.lights.push(light8);
}

function createFreeCamera(scene) {
  let camera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 50, 0), scene);
  camera.attachControl(canvas);
  // prevent camera to cross ground
  camera.checkCollisions = true; 
  camera.speed = 1;
  // avoid flying with the camera

  // Add extra keys for camera movements
  // Need the ascii code of the extra key(s). We use a string method here to get the ascii code
  camera.keysUp.push('z'.charCodeAt(0));
  camera.keysDown.push('s'.charCodeAt(0));
  camera.keysLeft.push('q'.charCodeAt(0));
  camera.keysRight.push('d'.charCodeAt(0));
  camera.keysUp.push('Z'.charCodeAt(0));
  camera.keysDown.push('S'.charCodeAt(0));
  camera.keysLeft.push('Q'.charCodeAt(0));
  camera.keysRight.push('D'.charCodeAt(0));

  return camera;
}

function createFollowCamera(scene, target) {

  let camera = new BABYLON.FollowCamera("followCamera", target.position, scene, target);


  camera.radius = 25; // how far from the object to follow
  camera.heightOffset = 10; // how high above the object to place the camera
  camera.rotationOffset = 0; // the viewing angle
  camera.cameraAcceleration = 0.1; // how fast to move
  camera.maxCameraSpeed = 3; // speed limit


  return camera;
}








function createLabyrinth(scene, container) {
  
  
    const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
    wallMaterial.emissiveTexture = new BABYLON.Texture("./documents/images/moss-diffuse.jpg");
    wallMaterial.bumpTexture = new BABYLON.Texture("./documents/images/wall_moss-normal.jpg");
    wallMaterial.parallaxScaleBias = 0.1;
    wallMaterial.specularPower = 1000.0;

    const grassMaterial = new BABYLON.StandardMaterial("grass");
    grassMaterial.diffuseTexture = new BABYLON.Texture("./documents/images/wall-texture.jpg");
	grassMaterial.bumpTexture = new BABYLON.Texture("./documents/images/wall-map.jpg");
    grassMaterial.useParallax = true;
    grassMaterial.useParallaxOcclusion = true;
    grassMaterial.parallaxScaleBias = 0.1;
    grassMaterial.specularPower = 1000.0;






  
    var cube = BABYLON.Mesh.CreateBox("cube", sizeCube, scene);
    //cube.checkCollisions = true;
    cube.position.x = 1 ;
    cube.position.z = -100;
    cube.position.y = -100;

    //cube.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, -Math.PI/2,0);
    cube.material = grassMaterial;
  


    table = emptyLabyrinth(sceneSize, sceneSize, sizeCube, true);
    visited = emptyLabyrinth(sceneSize, sceneSize, sizeCube, false);


    dfsGenerateLabyrinth(sceneSize, sceneSize,sizeCube );

    lab = table;
    walls = [];
    index = 0;
    

    for ( var i = 0; i < sceneSize/sizeCube ; i++) {
        for ( var j = 0; j < sceneSize/sizeCube ; j++) {
            if(lab[i][j])
            {


                walls[index] = cube.clone("clone1"+index);
                walls[index].position.y = sizeCube/2;
                walls[index].position.x = -(sceneSize/2)+(i*(sizeCube)) ;
                walls[index].position.z = -(sceneSize/2)+(j*(sizeCube)) ;
                //console.log( -(sceneSize/2)+(i*(sizeCube)),  -(sceneSize/2)+(j*(sizeCube)) );

                let etage1 = walls[index].clone("clone1"+index);
                //let etage2 = walls[index].clone("clone1"+index);
                etage1.position.y = sizeCube/2 + sizeCube;
                //etage2.position.y = sizeCube/2 + (sizeCube * 2);
          
                container.meshes.push(etage1);
                //container.meshes.push(etage2);
          
                container.meshes.push(walls[index]);
                index++;

            }
        }
    }
    return walls;
}

function createBord(l, w , cubeSize) {
    x = table.length-1;
    y = table[0].length-1;

    for ( var i = 2; i < table.length-2; i++) {
        table[i][y] = true ;
        table[i][0] = true ;

        table[0][i] = true ;
        table[x][i] = true ;
    }
    table[1][1] = false ;
    table[1][y-1] = false ;
    table[x-1][1] = false ;
    table[x-1][y-1] = false ;



}


function dfsGenerateLabyrinth(l, w , cubeSize) {

    startVertex = [0,0];
    randomizedDFS(l , w ,cubeSize,startVertex);
    randomGenerateLabyrinth(l, w , cubeSize);
    //createBord(l, w , cubeSize);

}



function randomizedDFS(l , w ,cubeSize,vertex) {
    visited[vertex[0]][vertex[1]] = true;
    nextVertex = unvisitedNeighbour(l , w, cubeSize , vertex);
    while( nextVertex != null){
        table[vertex[0]][vertex[1]] = false;

        randomizedDFS(l , w ,cubeSize,nextVertex);
        nextVertex = unvisitedNeighbour(l , w, cubeSize, vertex);
    }

    nextVertex = getRandomVertex(l , w, cubeSize);
    while( nextVertex != null){
        table[vertex[0]][vertex[1]] = false;

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
                table[i][j] = false ;

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





function createGifts(scene) {
    // load the Dude 3D animated model
     // name, folder, skeleton name 
     BABYLON.SceneLoader.ImportMesh("BITCOIN", "./documents/models/gift/", "gift.babylon", scene,  (newMeshes, particleSystems, skeletons) => {
         let myGift = newMeshes[0];
  
         let giftMaterial = new BABYLON.StandardMaterial("Gift", scene);
         giftMaterial.diffuseTexture = new BABYLON.Texture("./documents/models/gift/BTC_Albedo.png");
         myGift.material = giftMaterial;
  
         myGift.position = new BABYLON.Vector3(2, 3, 2);  
         myGift.position.y = sizeCube/2;
  
         myGift.name = "myGift";
         myGift.applyGravity = true;
  
         // params = id, speed, scaling, scene
         let hero = new Gift(myGift, -1, 0.1, 3, scene);
  
         // make clones
         scene.gifts = [];
         
         index = 0;
         for ( var i = 0; i < sceneSize/sizeCube ; i++) {
            for ( var j = 0; j < sceneSize/sizeCube ; j++) {
                if(!lab[i][j] && Math.random() > 0.8)
                {
                    scene.gifts[index] = hero.doClone(myGift, skeletons, i);
                    scene.gifts[index].applyGravity = true;
         
                    scene.gifts[index].position.x = -(sceneSize/2)+(i*(sizeCube)) ;
                    scene.gifts[index].position.z = -(sceneSize/2)+(j*(sizeCube)) ;
                    scene.gifts[index].position.y = sizeCube/2;

                    var temp = new Gift(scene.gifts[index], index , 0.3, 0.1 , scene);
                    container.meshes.push(scene.gifts[index]);
                    index++;
    
                }
            }
        }
  
     });
  }

