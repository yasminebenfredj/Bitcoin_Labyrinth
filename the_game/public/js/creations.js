//Ce fichier permet de cree le labyrinth
// Le labyrinth se genere avec un algorithme basé sur le random DFS 
// https://www.baeldung.com/cs/maze-generation


let sizeCube = 30;
let sceneSize = 600;


function createLabyrinth(scene, container) {
  /*
  
    const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
    wallMaterial.emissiveTexture = new BABYLON.Texture("./documents/images/moss-diffuse.jpg");
    wallMaterial.bumpTexture = new BABYLON.Texture("./documents/images/wall_moss-normal.jpg");
    wallMaterial.parallaxScaleBias = 0.1;
    wallMaterial.specularPower = 1000.0;
*/
    const grassMaterial = new BABYLON.StandardMaterial("grass");
    grassMaterial.diffuseTexture = new BABYLON.Texture("./documents/images/Grass_02.png");
	grassMaterial.bumpTexture = new BABYLON.Texture("./documents/images/Grass_02_Nrm.png");
    grassMaterial.useParallax = true;
    grassMaterial.useParallaxOcclusion = true;
    grassMaterial.parallaxScaleBias = 0.1;
    grassMaterial.specularPower = 1000.0;



    var cube = BABYLON.Mesh.CreateBox("cube", sizeCube, scene);
    cube.checkCollisions = true;
    cube.position.x = 1 ;
    cube.position.z = -100;
    cube.position.y = -100;
    cube.material = grassMaterial;


    lab = labyrinth;
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
                let etage2 = walls[index].clone("clone1"+index);
                etage1.position.y = sizeCube/2 + sizeCube;
                etage2.position.y = sizeCube/2 + (sizeCube * 2);
          
                container.meshes.push(etage1);
                container.meshes.push(etage2);
          
                container.meshes.push(walls[index]);
                index++;

            }
        }
    }
    createGifts(scene);
    return walls;
}




function createEnemys(scene){
    let meshTask = scene.assetsManager.addMeshTask(
        "Kachujin task",
        "Kachujin",
        "./documents/models/Personage/",
        "femme.babylon"
      );
      meshTask.onSuccess = function (task) {
        onEnemyImported(
          task.loadedMeshes,
          task.loadedParticleSystems,
          task.loadedSkeletons
        );
      };

    function onEnemyImported(newMeshes, particleSystems, skeletons) {
        
        let enemy = newMeshes[0];

        let material = new BABYLON.StandardMaterial("material", scene);
        material.diffuseTexture = new BABYLON.Texture("./documents/models/Personage/Kachujin_diffuse.png");
        material.emissiveTexture = new BABYLON.Texture("./documents/models/Personage/Kachujin_normal.png");
        material.specularTexture = new BABYLON.Texture("./documents/models/Personage/Kachujin_specular.png");

        enemy.material = material;
  
        enemy.position = new BABYLON.Vector3(0, 20, 0); 
        enemy.scaling = new BABYLON.Vector3(0.12, 0.29, 0.12);
        enemy.frontVector = new BABYLON.Vector3(0, 0, 1);
        enemy.applyGravity = true;
        enemy.checkCollisions = false;
        enemy.name = "enemy";
        enemy.y = 20;
  
         // params = id, speed, scaling, scene
        let theEnnemy = new Enemy(enemy, -1, 0.1,  scene);
         // make clones
        scene.enemys = [];
         
        index = 0;
        for (let p in allPlayers) 
        { 
            scene.enemys[index] = theEnnemy.doClone(enemy, skeletons, index);
            scene.enemys[index].applyGravity = true;
            scene.enemys[index].position.x = p.positionX;
            scene.enemys[index].position.z = p.positionZ;
            scene.enemys[index].position.y = p.positionY;

            var temp = new Enemy(scene.enemys[index], index , p.vitesse, 0.1 , scene);
            container.meshes.push(scene.enemys[index]);
            index++;
        }
      };
  }







function createGifts(scene) {
    let meshTask = scene.assetsManager.addMeshTask(
        "BITCOIN task",
        "BITCOIN",
        "./documents/models/gift/",
        "gift.babylon"
      );
      meshTask.onSuccess = function (task) {
        onGiftImported(
          task.loadedMeshes,
          task.loadedParticleSystems,
          task.loadedSkeletons
        );
      };
      function onGiftImported(newMeshes, particleSystems, skeletons) {
        let myGift = newMeshes[0];
 
        let giftMaterial = new BABYLON.StandardMaterial("Tree", scene);
        giftMaterial.diffuseTexture = new BABYLON.Texture("./documents/models/gift/BTC_Albedo.png");

        myGift.material = giftMaterial;
  
        myGift.position = new BABYLON.Vector3(0, -300, 0); 
        myGift.scaling = new BABYLON.Vector3(1, 2, 1); 
  
        myGift.name = "myGift";
        myGift.applyGravity = true;
        myGift.y = -300;
  
         // params = id, speed, scaling, scene
        let hero = new Gift(myGift, -1, 0.1, scene);
         // make clones
        scene.gifts = [];
         
        index = 0;
        for ( var i = 0; i < sceneSize/sizeCube ; i = i + 2) {
            for ( var j = 0; j < sceneSize/sizeCube ; j = j + 2) {
                if(!lab[i][j] && Math.random() > 0.9 && nbGift > 0)
                {
                    scene.gifts[index] = hero.doClone(myGift, skeletons, index);
                    scene.gifts[index].applyGravity = true;
         
                    scene.gifts[index].position.x = -(sceneSize/2)+(i*(sizeCube)) ;
                    scene.gifts[index].position.z = -(sceneSize/2)+(j*(sizeCube)) ;
                    scene.gifts[index].position.y = sizeCube;

                    var temp = new Gift(scene.gifts[index], index , 0.3, scene);
                    container.meshes.push(scene.gifts[index]);
                    index++;
                    nbGift--;
    
                }
            }
        }
        scene.gifts.unshift(myGift)
      }
  }
