class Player {
	name;
	vitesse;
	score;
	color;
	positionX;
	positionY;
	positionZ;

	rotationY;




	constructor(name, scene) {

		let r = Math.floor(Math.random() * (255 - 0 + 1));
		let g = Math.floor(Math.random() * (255 - 0 + 1));
		let b = Math.floor(Math.random() * (255 - 0 + 1));
		this.color = "rgb(" + r + "," + g + "," + b + ")";

		this.name = name;
		this.score = 0;
		this.positionX = 0;
		this.positionY = 16;
		this.positionZ = 0;
		this.vitesse = 1;

		this.rotationY = 0;



	}



}
