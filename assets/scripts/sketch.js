//ProjectO
//Kyle and Alexandre

function preload() {
	//variables in variables.js
	//classes in classes.js
	preloadAssets(); //check preloadScript.js
}

function setup() {
	createCanvas(640, 360, WEBGL);
	currentScene = "Title";

	setupFunction(); //check setupScript.js
}

function draw() {
	//update barriers based on currentScene
	//barrierManager.updateBarState(currentScene, playerClass.player);

	determineEvents(); //check determineEvents.js

	classEvents(); //scenes where player canMove + dummyClass

	//drawDebug();
}

function playMusic() {
	if (currentScene === "Title" && currentMusic !== titleMusic) {
		currentMusic.pause();
		currentMusic = titleMusic;
	}

	else if (currentScene === "Tutorial" && currentMusic !== lobbyMusic) {
		currentMusic.pause();
		currentMusic = lobbyMusic;
	}

	currentMusic.play();
}

function obamaDialogueFunc() {
	if (player.x !== 1000 && currentScene === "Obama") {
		weaponObamaClass.update();

		if (weaponObama.position.y === 100 && currentScene === "Obama") {
			let dialogue = obamaDialogue[currentLine];
			let wrappedText = wrapText(dialogue, 300); //max width
			let yPos = 292; //vertical distance between lines

			//draw textbox + set textAlign
			imageMode(CENTER);
			image(textBox, width / 2, 300, 460, 120);
			imageMode(NORMAL);
			textAlign(LEFT);

			for (let i = 0; i < wrappedText.length; i++) {
				//display lines
				fill("white");
				text(wrappedText[i], width / 2 - 120, yPos);
				yPos += textLeading();
			}

			if (millis() - lastChangeTime > delay) {
				//events based on line #

				if (currentLine === 1) {
					weaponObamaClass.idle = true;
				}

				if (currentLine === 7) {
					weaponObamaClass.triggerLeave();
					lastDir = "Up";
					obamaLeft.play();
				}

				buttonSound.play();
				currentLine = (currentLine + 1) % obamaDialogue.length; //loops through array infinitely
				lastChangeTime = millis();
			}
		}
	}
}


function bossDialogueFunc() {
	if (bossObamaClass.state === "dialogue") {
		let dialogue = bossDialogue[currentLine];
		let wrappedText = wrapText(dialogue, 300); //max width
		let yPos = 292; //vertical distance between lines

		//draw textbox + set textAlign
		imageMode(CENTER);
		image(textBox, width / 2, 300, 460, 120);
		imageMode(NORMAL);
		textAlign(LEFT);

		for (let i = 0; i < wrappedText.length; i++) {
			//display lines
			fill("white");
			text(wrappedText[i], width / 2 - 120, yPos);
			yPos += textLeading();
		}

		if (millis() - lastChangeTime > delay) {
			//events based on line #
			if (currentLine === 15) {
				bossObamaClass.state = "attack";
			}

			buttonSound.play();
			currentLine = (currentLine + 1) % bossDialogue.length; //loops through array infinitely
			lastChangeTime = millis();
		}
	}
}


function classEvents() {
	if (canMove && tranAlpha <= 0) {
		//scenes where player can move
		playerClass.update(dummyClass);
		dummyClass.update();
	}

	else {
		if (currentScene !== "Yapping" && currentScene !== "Title" && currentScene !== "Obama" && currentScene !== "YOUSUCK") {
			playerClass.spawnPos();
		}

		if (currentScene === "Title") {
			if (player) {
				//get player offscreen and reset health
				playerClass.player.position.set(-1000, -1000);
				playerClass.health = 10;
				bossObamaClass.health = 20;
			}
		}

		if (currentScene === "Weapon" && tranAlpha < 255) {
			dummyClass.spawnPos();
		}
	}
}

function drawDebug() {
	//display current scene
	fill("white");
	textAlign(LEFT);
	text("Scene: " + currentScene, 5, 25);

	//hitboxes
	if (currentScene) {
		player.debug = true;
		dummy.debug = true;
		bossObama.debug = true;
	}
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
			if (nextScene !== "Yapping" && nextScene !== "Title") {
				canMove = true;
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
			nextScene = "Boss";
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

function wrapText(str, maxWidth) { //use this to wrap text when needed W youtube tutorial
	let words = str.split(' ');
	let lines = [];
	let currentLine = words[0];

	for (let i = 1; i < words.length; i++) {
		let testLine = currentLine + ' ' + words[i];
		if (textWidth(testLine) <= maxWidth) {
			currentLine = testLine;
		} else {
			lines.push(currentLine);
			currentLine = words[i];
		}
	}
	lines.push(currentLine);
	return lines;
}