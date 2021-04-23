

let  table , visited;


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
        'h' : 30,
        'w' : 30
    };
	
    const ground = new BABYLON.MeshBuilder.CreateTiledGround("Tiled Ground", {xmin: -300, zmin: -300, xmax: 300, zmax: 300, subdivisions: grid});

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

	const rockMaterial2 = new BABYLON.StandardMaterial("rock2");
    rockMaterial2.diffuseTexture = new BABYLON.Texture("./documents/images/Ground_03.png");

    // Create Multi Material
    const multimat = new BABYLON.MultiMaterial("multi", scene);
    multimat.subMaterials.push(grassMaterial);
    multimat.subMaterials.push(grassMaterial);
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
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000}, scene);
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./documents/models/sky/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
}


function createwalls(scene, container) {
  walls = [];


  const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
  wallMaterial.emissiveTexture = new BABYLON.Texture("./documents/images/moss-diffuse.jpg");
  wallMaterial.bumpTexture = new BABYLON.Texture("./documents/images/wall_moss-normal.jpg");
  //wallMaterial.specularTexture = new BABYLON.Texture("./documents/images/wall-map.jpg");

  wallMaterial.parallaxScaleBias = 0.1;
  wallMaterial.specularPower = 1000.0;
  let sizeCube = 20;

  var cube = BABYLON.Mesh.CreateBox("cube", sizeCube, scene);
  cube.checkCollisions = true;
  cube.position.x = 0 ;
  cube.position.z = -100;

  //cube.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, -Math.PI/2,0);
  cube.material = wallMaterial;

  sceneSize = 300;


  for (let index = -sceneSize; index < sceneSize+sizeCube; index = index+sizeCube ) {

          //scene is optional and defaults to the current scene
          walls[index] = cube.clone("clone1"+index);
          walls[index].position.y = 10;
          walls[index].position.x = sceneSize;
          walls[index].position.z = index;
          walls[index].rotation.x = -20.4;

          let etage1 = walls[index].clone("clone1"+index);
          let etage2 = walls[index].clone("clone1"+index);
          etage1.position.y = 10 + sizeCube;
          etage2.position.y = 10 + (sizeCube * 2);

		  container.meshes.push(etage1);
          container.meshes.push(etage2);

		  container.meshes.push(walls[index]);
      }
	 
  walls1 = [];
  for (let index = -sceneSize; index < sceneSize; index = index+sizeCube) {

      //scene is optional and defaults to the current scene
	  walls1[index] = cube.clone("clone2"+index);
      walls1[index].position.y = 10;
      walls1[index].position.x = -sceneSize;
      walls1[index].position.z = index;

      let etage1 = walls1[index].clone("clone1"+index);
      let etage2 = walls1[index].clone("clone1"+index);
      etage1.position.y = 10 + sizeCube;
      etage2.position.y = 10 + (sizeCube * 2);

      container.meshes.push(etage1);
      container.meshes.push(etage2);
	  container.meshes.push(walls1[index]);

  }

  walls2 = [];
  for (let index = -sceneSize; index < sceneSize; index = index +sizeCube ) {

      //scene is optional and defaults to the current scene
	  walls2[index] = cube.clone("clone3"+index);
      walls2[index].position.y = 10;
      walls2[index].position.x = index;
      walls2[index].position.z = sceneSize ;
      let etage1 = walls2[index].clone("clone1"+index);
      let etage2 = walls2[index].clone("clone1"+index);
      etage1.position.y = 10 + sizeCube;
      etage2.position.y = 10 + (sizeCube * 2);

      container.meshes.push(etage1);
      container.meshes.push(etage2);
	  container.meshes.push(walls2[index]);

  }

  walls3 = [];
  for (let index = -sceneSize; index < sceneSize; index = index +sizeCube ) {

      //scene is optional and defaults to the current scene
	  walls3[index] = cube.clone("clone4"+index);
      walls3[index].position.y = 10;
      walls3[index].position.x = index;
      walls3[index].position.z = -sceneSize;
      let etage1 = walls3[index].clone("clone1"+index);
      let etage2 = walls3[index].clone("clone1"+index);
      etage1.position.y = 10 + sizeCube;
      etage2.position.y = 10 + (sizeCube * 2);

      container.meshes.push(etage1);
      container.meshes.push(etage2);
	  container.meshes.push(walls3[index]);

  }
  
}

function createLights(scene, container) {
  // i.e sun light with all light rays parallels, the vector is the direction.
  
  let light0 = new BABYLON.PointLight("dir1", new BABYLON.Vector3(50,-2000, 50), scene); //soleil
  let light1 = new BABYLON.PointLight("dir2", new BABYLON.Vector3(-50,1000, -50), scene); //soleil
  let light2 = new BABYLON.PointLight("dir3", new BABYLON.Vector3(0,2000, 0), scene); //soleil
  light0.intensity = 0.4;
  light1.intensity = 0.3;
  light2.intensity = 0.4;
  container.lights.push(light0);
  container.lights.push(light1);
  container.lights.push(light2);


}

function createFreeCamera(scene) {
  let camera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 50, 0), scene);
  camera.attachControl(canvas);
  // prevent camera to cross ground
  camera.checkCollisions = true; 
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
  let camera = new BABYLON.FollowCamera("tankFollowCamera", target.position, scene, target);

  camera.radius = 60; // how far from the object to follow
  camera.heightOffset = 14; // how high above the object to place the camera
  camera.rotationOffset = 0; // the viewing angle
  camera.cameraAcceleration = .2; // how fast to move
  camera.maxCameraSpeed = 5; // speed limit

  return camera;
}








function createLabyrinth(scene, container) {
  
  
    const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
    wallMaterial.emissiveTexture = new BABYLON.Texture("./documents/images/moss-diffuse.jpg");
    wallMaterial.bumpTexture = new BABYLON.Texture("./documents/images/wall_moss-normal.jpg");
    //wallMaterial.specularTexture = new BABYLON.Texture("./documents/images/wall-map.jpg");
  
    wallMaterial.parallaxScaleBias = 0.1;
    wallMaterial.specularPower = 1000.0;
    let sizeCube = 20;
  
    var cube = BABYLON.Mesh.CreateBox("cube", sizeCube, scene);
    //cube.checkCollisions = true;
    cube.position.x = 0 ;
    cube.position.z = -100;
  
    //cube.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, -Math.PI/2,0);
    cube.material = wallMaterial;
  
    sceneSize = 600;

    table = emptyLabyrinth(sceneSize, sceneSize, sizeCube, true);
    visited = emptyLabyrinth(sceneSize, sceneSize, sizeCube, false);


    dfsGenerateLabyrinth(sceneSize, sceneSize,sizeCube );
    console.log(table);
    console.log(visited);

    lab = table;
    walls = [];
    index = 0;
    

    for ( var i = 0; i < sceneSize/sizeCube ; i++) {
        for ( var j = 0; j < sceneSize/sizeCube ; j++) {
            if(lab[i][j])
            {


                walls[index] = cube.clone("clone1"+index);
                walls[index].position.y = 10;
                walls[index].position.x = -(sceneSize/2)+(i*(sizeCube)) ;
                walls[index].position.z = -(sceneSize/2)+(j*(sizeCube)) ;
                //console.log( -(sceneSize/2)+(i*(sizeCube)),  -(sceneSize/2)+(j*(sizeCube)) );

                let etage1 = walls[index].clone("clone1"+index);
                let etage2 = walls[index].clone("clone1"+index);
                etage1.position.y = 10 + sizeCube;
                etage2.position.y = 10 + (sizeCube * 2);
          
                container.meshes.push(etage1);
                container.meshes.push(etage2);
          
                container.meshes.push(walls[index]);
                index++;

            }
        }
    }
    return walls;
}


function dfsGenerateLabyrinth(l, w , cubeSize) {

    startVertex = [0,0];
    randomizedDFS(l , w ,cubeSize,startVertex);
    randomGenerateLabyrinth(l, w , cubeSize);

}



function randomizedDFS(l , w ,cubeSize,vertex) {
    visited[vertex[0]][vertex[1]] = true;
    nextVertex = unvisitedNeighbour(l , w, cubeSize , vertex);
    while( nextVertex != null){
        table[vertex[0]][vertex[1]] = false;

        randomizedDFS(l , w ,cubeSize,nextVertex);
        nextVertex = unvisitedNeighbour(l , w, cubeSize, vertex);
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
            if(x+i < l/cubeSize &&  x+i>= 0  && y+j < w/cubeSize && y+j >= 0 && (i != j) && (i != -j) && (-i != j)){
                visited[x+i][y+j] = true;
            }
        }
    }
}


function randomGenerateLabyrinth(l, w , cubeSize) {
    for ( var i = 0; i < l/cubeSize ; i++) {
        for ( var j = 0; j < w/cubeSize ; j++) {
            if(Math.random() > 0.5){
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
    while(visited[i][j] && x < 500) {
        x++;
        i = Math.floor(Math.random() * (l/cubeSize));
        j = Math.floor(Math.random() * (w/cubeSize));
    }
    return [i,j];
}