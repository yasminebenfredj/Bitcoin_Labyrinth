//Ce fichier permet de cree le labyrinth
// Le labyrinth se genere avec un algorithme basé sur le random DFS 
// https://www.baeldung.com/cs/maze-generation

let  table , visited;
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

function createBord(l, w , cubeSize) {
    x = table.length-1;
    y = table[0].length-1;

    xx = Math.floor(x/2)-1;
    yy = Math.floor(y/2)-1;
    for ( var i = 0; i < 5; i++) {
        for ( var j = 0; j < 5; j++) {
            table[xx+i][yy+j] = false ;
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
  
        myGift.position = new BABYLON.Vector3(2, 3, 2); 
        myGift.scaling = new BABYLON.Vector3(1, 2, 1); 
  
        myGift.name = "myGift";
        myGift.applyGravity = true;
        myGift.y = -300;
  
         // params = id, speed, scaling, scene
        let hero = new Gift(myGift, -1, 0.1, 3, scene);
         // make clones
        scene.gifts = [];
         
        index = 0;
        for ( var i = 0; i < sceneSize/sizeCube ; i = i + 2) {
            for ( var j = 0; j < sceneSize/sizeCube ; j = j + 2) {
                if(!lab[i][j] && Math.random() > 0.9 && nbGift > 0)
                {
                    scene.gifts[index] = hero.doClone(myGift, skeletons, i);
                    scene.gifts[index].applyGravity = true;
         
                    scene.gifts[index].position.x = -(sceneSize/2)+(i*(sizeCube)) ;
                    scene.gifts[index].position.z = -(sceneSize/2)+(j*(sizeCube)) ;
                    scene.gifts[index].position.y = sizeCube;

                    var temp = new Gift(scene.gifts[index], index , 0.3, 0.1 , scene);
                    container.meshes.push(scene.gifts[index]);
                    index++;
                    nbGift--;
    
                }
            }
        }
        scene.gifts.unshift(myGift)
      }
  }
