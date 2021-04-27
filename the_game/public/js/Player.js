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
		this.positionX = 0;
		this.positionY = 1;
		this.positionZ = 0;
		this.vitesse = 3;

		this.rotationY = 0;

	}

	createMe(scene){
		let mesh;
		BABYLON.SceneLoader.ImportMesh("Kachujin", "./documents/models/Personage/", "femme.babylon", scene, (newMeshes, particleSystems, skeletons) => {
				mesh = newMeshes[0];
				var skeleton = skeletons[0];


				mesh.name = this.name;
				let material = new BABYLON.StandardMaterial("material", scene);
				material.diffuseTexture = new BABYLON.Texture("./documents/models/Personage/Kachujin_diffuse.png");
				material.emissiveTexture = new BABYLON.Texture("./documents/models/Personage/Kachujin_normal.png");
				material.specularTexture = new BABYLON.Texture("./documents/models/Personage/Kachujin_specular.png");

				mesh.material = material;

				// By default the box/tank is in 0, 0, 0, let's change that...
				mesh.position.y = this.positionY;
				mesh.position.x = this.positionX;
				mesh.position.z = this.positionZ;

				mesh.speed = this.vitesse;
				mesh.scaling = new BABYLON.Vector3(0.12, 0.29, 0.12);
				mesh.frontVector = new BABYLON.Vector3(0, 0, 1);
				mesh.applyGravity = true;
				mesh.checkCollisions = false;

				
				// move
        		skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
       		 	skeleton.animationPropertiesOverride.enableBlending = true;
        		//skeleton.animationPropertiesOverride.blendingSpeed = 0.05; //par defaut 
        		skeleton.animationPropertiesOverride.loopMode = 1;
    
        		var stop = skeleton.getAnimationRange("stop");
        		var walk = skeleton.getAnimationRange("walk");
        		var box = skeleton.getAnimationRange("box");


				//if (box) scene.beginAnimation(skeleton, box.from, box.to, true);
				if (stop) scene.beginAnimation(skeleton, stop.from+1, stop.to, true, 2);
				//if (pose) scene.beginAnimation(skeleton, pose.from, pose.to, true);


				let universalCamera = createUniversalCamera(scene);
				let followCamera = createFollowCamera(scene, mesh);
				//scene.activeCamera = followCamera;
				scene.activeCameras.push(universalCamera);
				scene.activeCameras.push(followCamera);
				//mesh.parent = followCamera;
				universalCamera.parent = mesh;

				universalCamera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
				followCamera.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3); 


				let isWalk = false;
				var nb = 0;

				mesh.move = () => {
					nb++;
					

					let yMovement = 0;
					let zMovement = 0;
					if (mesh.position.y > 2) {
						zMovement = 0;
						yMovement = -2;
					}
					

					if (inputStates.up) {
						if(!isWalk) {
							if (walk) scene.beginAnimation(skeleton, walk.from, walk.to, true,0.5);
							isWalk = true;
						}
						nb = 0;
						mesh.moveWithCollisions(mesh.frontVector.multiplyByFloats(-mesh.speed, -mesh.speed, -mesh.speed));

					}
					if (inputStates.down) {
						if(!isWalk) {
							if (walk) scene.beginAnimation(skeleton, walk.from, walk.to, true,0.5);
							isWalk = true;
						}
						nb = 0;
						mesh.moveWithCollisions(mesh.frontVector.multiplyByFloats(mesh.speed, mesh.speed, mesh.speed));


					}
					if (inputStates.left) {
						mesh.rotation.y -= 0.07;
						mesh.frontVector = new BABYLON.Vector3(Math.sin(mesh.rotation.y), 0, Math.cos(mesh.rotation.y));

					}
					if (inputStates.right) {
						mesh.rotation.y += 0.07;
						mesh.frontVector = new BABYLON.Vector3(Math.sin(mesh.rotation.y), 0, Math.cos(mesh.rotation.y));

					}
					if(nb>10 && isWalk){
						if (stop) scene.beginAnimation(skeleton, stop.from+1, stop.to, true, 0.5);
						isWalk = false;

					}
					if (inputStates.space) {
						boxAudio.play();
						isWalk = true;
						if (box) scene.beginAnimation(skeleton, box.from, box.to, true, 1.5);
						nb = -10;
					}

					let base = scene.getMeshByName("base");
					mesh.actionManager = new BABYLON.ActionManager(scene);

					mesh.actionManager.registerAction(
						new BABYLON.ExecuteCodeAction(
							{ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: base },
							() => {
								mesh.position.y = 20;

							}
						)
					);

					if((mesh.position.x >= 15 || mesh.position.x <= -15) && (mesh.position.z >= 15 || mesh.position.z <= -15 )){
						mesh.position.y = 1;
					}

					if (scene.gifts) {
						var boundInfo = mesh.getBoundingInfo();
						scene.gifts.forEach(gift => {
							mesh.actionManager.registerAction(
								new BABYLON.ExecuteCodeAction(
									{ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: gift },
									() => {
										giftAudio.play();
										this.score += 1;
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
