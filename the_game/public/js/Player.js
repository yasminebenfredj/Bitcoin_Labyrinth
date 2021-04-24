class Player {
	name;
	vitesse;
	score;
	color;
	positionX;
	positionY;
	positionZ;
	rotationY;

	constructor(name) {

		let r = Math.floor(Math.random() * (255 - 0 + 1));
		let g = Math.floor(Math.random() * (255 - 0 + 1));
		let b = Math.floor(Math.random() * (255 - 0 + 1));
		this.color = "rgb(" + r + "," + g + "," + b + ")";

		this.name = name;
		this.score = 0;
		this.positionX = -290;
		this.positionY = 5;
		this.positionZ = -290;
		this.vitesse = 2;

		this.rotationY = 0;

	}

	createMe(scene){
		let mesh;
		BABYLON.SceneLoader.ImportMesh("", "./documents/models/tank/", "CartoonTank.babylon", scene, (newMeshes, particleSystems, skeletons) => {
				mesh = newMeshes[0];
				mesh.name = this.name;
				let material = new BABYLON.StandardMaterial("material", scene);
				material.diffuseTexture = new BABYLON.Texture("./documents/models/tank/tank_palette_red.png");
				material.emissiveTexture = new BABYLON.Texture("./documents/models/tank/tank_palette_red.png");
				mesh.material = material;
				mesh.rotationOffset = 90; // the viewing angle

				// By default the box/tank is in 0, 0, 0, let's change that...
				mesh.position.y = this.positionY;
				mesh.position.x = this.positionX;
				mesh.position.z = this.positionZ;

				mesh.speed = this.vitesse;
				mesh.scaling = new BABYLON.Vector3(1, 0.5, 0.5);
				mesh.frontVector = new BABYLON.Vector3(0, 0, 1);
				mesh.applyGravity = true;
				mesh.checkCollisions = false;

				let followCamera = createFollowCamera(scene, mesh);
				//let followCamera = createFreeCamera(scene);
				//scene.activeCamera = followCamera;


				mesh.move = () => {
					let yMovement = 0;
					let zMovement = 0;
					if (mesh.position.y > 2) {
						zMovement = 0;
						yMovement = -2;
					}

					if (inputStates.up) {

						mesh.moveWithCollisions(mesh.frontVector.multiplyByFloats(-mesh.speed, -mesh.speed, -mesh.speed));
					}
					if (inputStates.down) {
						mesh.moveWithCollisions(mesh.frontVector.multiplyByFloats(mesh.speed, mesh.speed, mesh.speed));

					}
					if (inputStates.left) {
						mesh.rotation.y -= 0.05;
						mesh.frontVector = new BABYLON.Vector3(Math.sin(mesh.rotation.y), 0, Math.cos(mesh.rotation.y));
					}
					if (inputStates.right) {
						mesh.rotation.y += 0.05;
						mesh.frontVector = new BABYLON.Vector3(Math.sin(mesh.rotation.y), 0, Math.cos(mesh.rotation.y));
					}

					mesh.actionManager = new BABYLON.ActionManager(scene);

					if (scene.gifts) {
						var boundInfo = mesh.getBoundingInfo();
						scene.gifts.forEach(gift => {
							mesh.actionManager.registerAction(
								new BABYLON.ExecuteCodeAction(
									{ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: gift },
									() => {
										this.score += 10;
										gift.dispose();
									}
								)
							);
						}
						);
					}

					this.positionX = mesh.position.x;
					this.positionY = mesh.position.y;
					this.positionZ = mesh.position.z;
				
					this.rotationY = mesh.rotation.y;
				}
			});
		return mesh;
	}



}
