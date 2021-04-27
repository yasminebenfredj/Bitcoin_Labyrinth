
//Ce fichiers permet la creation de la scene 

function createGround(scene) 
{

    var grid = {
        'h' : sizeCube,
        'w' : sizeCube
    };
	
    const ground = new BABYLON.MeshBuilder.CreateTiledGround("Tiled Ground", {xmin: -sceneSize*0.7, zmin: -sceneSize*0.7, xmax: sceneSize*0.7, zmax: sceneSize*0.7, subdivisions: grid});

	//Create the multi material
    //Create differents materials
    /*
    const grassMaterial = new BABYLON.StandardMaterial("grass");
    grassMaterial.diffuseTexture = new BABYLON.Texture("./documents/images/Ground_01.png");
	grassMaterial.bumpTexture = new BABYLON.Texture("./documents/images/Ground_01_Nrm.png");
    grassMaterial.useParallax = true;
    grassMaterial.useParallaxOcclusion = true;
    grassMaterial.parallaxScaleBias = 0.08;
    grassMaterial.specularPower = 300.0;
	grassMaterial.specularColor = new BABYLON.Color3(1, 1, 1);

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
*/

    const rockMaterial3 = new BABYLON.StandardMaterial("rock2");
    rockMaterial3.diffuseTexture = new BABYLON.Texture("./documents/images/Ground_01.png");
    rockMaterial3.bumpTexture = new BABYLON.Texture("./documents/images/Ground_01_Nrm.png");
    rockMaterial3.useParallax = true;
    rockMaterial3.useParallaxOcclusion = true;
    rockMaterial3.parallaxScaleBias = 0.08;
    rockMaterial3.specularPower = 300.0;
	rockMaterial3.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    ground.material = rockMaterial3;

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

  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:2000}, scene);
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./documents/models/sky/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

}




function createLights(scene, container) {
    // i.e sun light with all light rays parallels, the vector is the direction.
   
    let light0 = new BABYLON.PointLight("dir1", new BABYLON.Vector3(0,300,-200), scene);
    let light1 = new BABYLON.PointLight("dir2", new BABYLON.Vector3(0,300,200), scene); 
    let light2 = new BABYLON.PointLight("dir3", new BABYLON.Vector3(-200,300,-200), scene); 
    var light3 = new BABYLON.PointLight("dir4", new BABYLON.Vector3(200,300,200), scene);
    light0.intensity = 1;
    light1.intensity = 0.6;
    light2.intensity = 0.6;
    light3.intensity = 0.6;
  
    container.lights.push(light0);
    container.lights.push(light1);
    container.lights.push(light2);
    container.lights.push(light3);
  
  
     var light4 = new BABYLON.PointLight("dir5", new BABYLON.Vector3(0, 1000, 0), scene); //soleil
    light4.intensity = 1;
    container.lights.push(light4);
  
    var light5 = new BABYLON.PointLight("dir5", new BABYLON.Vector3(0, 300, 280), scene); //soleil
    light5.intensity = 1;
    container.lights.push(light5);
  
    var light6 = new BABYLON.PointLight("dir5", new BABYLON.Vector3(0, 300, -280), scene); //soleil
    light6.intensity = 1;
    container.lights.push(light6);
  
    var light7 = new BABYLON.PointLight("dir5", new BABYLON.Vector3(-280, 300, 0), scene); //soleil
    light7.intensity = 1;
    container.lights.push(light7);
  
    var light8 = new BABYLON.DirectionalLight("dir5", new BABYLON.Vector3(0, -1, 0), scene); //soleil
    light8.intensity = .3;
    container.lights.push(light8);
    
  }
  


function createwalls(scene, container) {

    /*
      const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
      const wallMaterial2 = new BABYLON.StandardMaterial("wallMaterial2", scene);
    
      wallMaterial.emissiveTexture = new BABYLON.Texture("./documents/images/g1.png");
      wallMaterial.bumpTexture = new BABYLON.Texture("./documents/images/g1N.png");
    
      wallMaterial2.emissiveTexture = new BABYLON.Texture("./documents/images/moss-diffuse.jpg");
      wallMaterial2.bumpTexture = new BABYLON.Texture("./documents/images/wall_moss-normal.jpg");
    
      wallMaterial.parallaxScaleBias = 0.1;
      wallMaterial.specularPower = 1000.0;
    
      wallMaterial2.parallaxScaleBias = 0.1;
      wallMaterial2.specularPower = 1000.0;
    */
      const rockMaterial = new BABYLON.StandardMaterial("rock");
      rockMaterial.diffuseTexture = new BABYLON.Texture("./documents/images/Grass_04.png");
      rockMaterial.bumpTexture = new BABYLON.Texture("./documents/images/Grass_04_Nrm.png");
      rockMaterial.useParallax = true;
      rockMaterial.useParallaxOcclusion = true;
      rockMaterial.parallaxScaleBias = 0.05;
      rockMaterial.specularPower = 200.0;
      rockMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    
    
      var cube = BABYLON.Mesh.CreateBox("cube", sizeCube, scene);
      cube.checkCollisions = true;
      cube.position.x = 0 ;
      cube.position.z = -100;
      cube.position.y = -100;
      cube.material = rockMaterial;
    
      walls = [];
      for (let index = -sceneSize/2; index < sceneSize/2+sizeCube ; index = index+sizeCube ) {  // ^ ||droite||
    
            //scene is optional and defaults to the current scene
            walls[index] = cube.clone("clone1"+index);
            walls[index].position.y = sizeCube/2;
            walls[index].position.x = sceneSize/2 ;
            walls[index].position.z = index;
        
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

  //camera.attachControl(true);
  //camera.inputs.addMouseWheel();

  camera.radius = 30; // how far from the object to follow
  camera.heightOffset = 100; // how high above the object to place the camera
  camera.rotationOffset = 0; // the viewing angle
  camera.cameraAcceleration = 0.1; // how fast to move
  camera.maxCameraSpeed = 3; // speed limit

  return camera;
}

function createUniversalCamera(scene, target) {

    //Add the camera, to be shown as a cone and surrounding collision volume
    var camera = new BABYLON.UniversalCamera("MyCamera", new BABYLON.Vector3(0, 200,0), scene);
    //camera.attachControl(canvas, true);
    camera.speed = 2;
    camera.angularSpeed = 0.07;
    camera.checkCollisions = true;
    camera.cameraRotation = new BABYLON.Vector2(0,180);
    camera.direction = new BABYLON.Vector3(-Math.cos(camera.angle), 0, Math.sin(camera.angle));

    return camera;
}

function hautCamera(scene) {

    let camera = new BABYLON.FreeCamera("hautCamera", new BABYLON.Vector3(0, 600, 0), scene);
    //camera.attachControl(canvas);
    camera.inputs.addMouseWheel();
    camera.setTarget(BABYLON.Vector3.Zero());
    return camera;
}



function createBase(scene) {

    // load the Dude 3D animated model
     // name, folder, skeleton name 
     BABYLON.SceneLoader.ImportMesh("shrine", "./documents/models/jardin/", "SportModel.babylon", scene,  (newMeshes, particleSystems, skeletons) => {
        let shrine = newMeshes[0];
 
        let shrineMaterial = new BABYLON.StandardMaterial("shrine", scene);
        shrineMaterial.diffuseTexture = new BABYLON.Texture("./documents/models/jardin/shrine_001_diff1.png");
        shrineMaterial.bumpTexture = new BABYLON.Texture("./documents/models/jardin/shrine_texture_nrm1.jpg");

        shrine.material = shrineMaterial;
 
        shrine.position = new BABYLON.Vector3(0,2, 0);  
        shrine.scaling = new BABYLON.Vector3(10, 20, 10);
 
        shrine.name = "base";
        shrine.applyGravity = true;
        shrine.checkCollisions = false;

        container.meshes.push(shrine);

    });

}




