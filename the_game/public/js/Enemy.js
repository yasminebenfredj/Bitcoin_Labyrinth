class Enemy {
	name;
	vitesse;
	score;
	color;

	mesh;
	scene;


	constructor(name,scene, color, score) {

		this.color = color;

		this.name = name;
		this.score = 0;
        this.scene = this.scene;
        this.initMesh(scene);


	}

	initMesh(scene) {
		BABYLON.SceneLoader.ImportMesh("", "./documents/models/tank/", "CartoonTank.babylon", scene, (newMeshes, particleSystems, skeletons) => {
			this.mesh = newMeshes[0];
			this.mesh.name = this.name;
			let material = new BABYLON.StandardMaterial("material", scene);
			material.diffuseTexture = new BABYLON.Texture("./documents/models/tank/tank_palette_red.png");
			material.emissiveTexture = new BABYLON.Texture("./documents/models/tank/tank_palette_red.png");
			this.mesh.material = material;
			this.mesh.rotationOffset = 90; // the viewing angle

			// By default the box/tank is in 0, 0, 0, let's change that...
			this.mesh.position.y = 16;

			this.mesh.speed = 1;
			this.mesh.scaling = new BABYLON.Vector3(2, 1, 1);
			this.mesh.frontVector = new BABYLON.Vector3(0, 0, 1);
			this.mesh.applyGravity = true;
			this.mesh.checkCollisions = false;
			//this.this.image.showBoundingBox = true;

			//let followCamera = createFollowCamera(scene, this.mesh);
			//let followCamera = createFreeCamera(scene);
			//scene.activeCamera = followCamera;

			this.mesh.move = (positionX, positionY, positionZ, rotationY ) => {

				this.mesh.rotation.y = rotationY;
                this.mesh.position = new BABYLON.Vector3(positionX, positionY, positionZ);
				//this.mesh.actionManager = new BABYLON.ActionManager(scene);

			}
		});
	}

}
