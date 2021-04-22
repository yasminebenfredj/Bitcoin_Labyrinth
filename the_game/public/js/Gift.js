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
}

