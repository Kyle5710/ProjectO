function preload() {
	//variables in variables.js
	//classes in classes.js
	preloadAssets(); //check preloadScript.js
}

function setup() {
	setupFunction(); //check setupScript.js
}

function draw() {
	//update barriers based on currentScene
	barrierManager.updateBarState(currentScene, playerClass.player);

	//main func
	determineEvents(); //check determineEvents.js

	if (canMove && tranAlpha <= 0) {
		//scenes where player can move
		playerClass.update();
		dummyClass.update();
	}

	else {
		//can't move so set spawn position
		playerClass.spawnPos();
	}

	//debug
	drawDebug();
}

function drawDebug() {
	//display current scene
	fill("white");
	textAlign(LEFT);
	text("Scene: " + currentScene, 5, 25);

	//hitboxes
	playerClass.player.debug = true;
	dummyClass.dummy.debug = true;
}

function sceneTransition() {
	if (tranAlpha > 0) {
		//create rect
		fill(0, 0, 0, tranAlpha);
		rect(0, 0, width, height);
	}

	if (tran) {
		tranAlpha += 255 / (fadeDur / deltaTime);
		if (tranAlpha >= 255) { //screen fully black
			if (nextScene !== "Yapping") {
				canMove = true; //player can move but tranAlpha prevents it
				//bring classes back on screen
				playerClass.spawnPos();
				dummyClass.spawnPos();
			}

			tran = false;
			tranAlpha = 255;
			currentScene = nextScene;
			nextScene = ""; //reset nextScene
		}
	}

	else if (tranAlpha > 0) {
		tranAlpha -= 255 / (fadeDur / deltaTime);
	}
}

function titleHover() {
	//calc button properties to account for imageMode(CENTER)
	let yPos = width / 2 - 254 / 4;
	let xPos = 300 - 82 / 4;
	let bWidth = 254 / 2;
	let bHeight = 82 / 2;

	//check for mouse collision
	buttonHover = collidePointRect(mouseX, mouseY, yPos, xPos, bWidth, bHeight);

	if (buttonHover) {
		//collision
		titleButtonMode = titleButtonHover; //red + blue button

		if (mouseIsPressed) {
			//transition to yapping room here
			nextScene = "Yapping";
			canMove = false;
			tran = true;
			buttonSound.play();
			lastChangeTime = millis();
		}
	}

	else {
		//no collision
		titleButtonMode = titleButton; //normal button
	}
}

function moveLogo(logoPos) {
	//check logo pos
	if (logoPos <= 80 || logoPos >= 120) {
		logoDir = !logoDir;
	}

	//move logo
	if (logoDir) {
		return logoPos - 0.5;
	}

	else {
		return logoPos + 0.5;
	}
}