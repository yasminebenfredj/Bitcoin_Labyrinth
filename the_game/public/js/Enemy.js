class Enemy {

	constructor(mesh,id, speed,  scene) {

        this.enemyMesh = mesh;
        this.id = id;
        this.scene = scene;
        this.speed = speed;
        mesh.Enemy = this;

	}

    move(x, y ,z, ry) {
		this.enemyMesh.position.x = x;
		this.enemyMesh.position.z = z;
		this.enemyMesh.position.y = y;
        this.enemyMesh.rotation.y = ry;
    }

    doClone(originalMesh, skeletons, id) {
        let myClone;

        myClone = originalMesh.clone("clone_" + id);
        myClone.position = new BABYLON.Vector3(0, 0, 0);
      
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