class Gift {
    constructor(giftMesh, id, speed, scaling, scene) {
        this.giftMesh = giftMesh;
        this.id = id;
        this.scene = scene;
        this.scaling = scaling;

        if(speed)
            this.speed = speed;
        else
            this.speed = 1;

        // in case, attach the instance to the mesh itself, in case we need to retrieve
        // it after a scene.getMeshByName that would return the Mesh
        // SEE IN RENDER LOOP !
        giftMesh.Gift = this;

        // scaling
        this.giftMesh.scaling = new BABYLON.Vector3(1 , 1, 1);


    }

    move() {
        this.giftMesh.rotation.y -= 0.02;
    }

    doClone(originalMesh, skeletons, id) {
        let myClone;
        let xrand = Math.floor(Math.random()*500 - 250);
        let zrand = Math.floor(Math.random()*500 - 250);
      
        myClone = originalMesh.clone("clone_" + id);
        myClone.position = new BABYLON.Vector3(xrand, 0, zrand);
      
        if(!skeletons) return myClone;
      
        // The mesh has at least one skeleton
        if(!originalMesh.getChildren()) {
            myClone.skeleton = skeletons[0].clone("clone_" + id + "_skeleton");
            return myClone;
        } else {
            if(skeletons.length === 1) {
                // the skeleton controls/animates all children, like in the Dude model
                let clonedSkeleton = skeletons[0].clone("clone_" + id + "_skeleton");
                myClone.skeleton = clonedSkeleton;
                let nbChildren = myClone.getChildren().length;
      
                for(let i = 0; i < nbChildren;  i++) {
                    myClone.getChildren()[i].skeleton = clonedSkeleton
                }
                return myClone;
            } else if(skeletons.length === originalMesh.getChildren().length) {
                // each child has its own skeleton
                for(let i = 0; i < myClone.getChildren().length;  i++) {
                    myClone.getChildren()[i].skeleton() = skeletons[i].clone("clone_" + id + "_skeleton_" + i);
                }
                return myClone;
            }
        }
      
        return myClone;
      }
    
}

