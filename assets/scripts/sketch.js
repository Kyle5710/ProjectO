//ProjectO
//Kyle and Alexandre

//TODO:
//GAMESHOW AUDIENCE
//2ND BOSS PHASE (HE ATTACKS LIKE PHASE ONE BUT INSTEAD OF AN IDLE MAKE HIM THROW
//PROJECTILES TOWARDS THE PLAYER || PLAYER BUFF AND PLAYER DEBUFF TO TRACK DAMAGE DEALT
//WHICH CAN BE HIT IN THE BUTTON ROOM)
//END SCENE (OBAMA DIES OR SOMETHING)
//END SCREEN (ACTUAL STATS AND STUFF)
//WIN SCREEN (SPEEDRUN TIME ON IT)
//SPEEDRUN TIMER

//Written Response Here:

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
	barrierManager.updateBarState(currentScene, playerClass.player);

	determineEvents(); //check determineEvents.js
	showPortraits(); //show character portraits
	classEvents(); //scenes where player canMove + dummyClass

	print(playerDamage);

	//debug
	//drawDebug();
}

function showPortraits() {
	if (showPortrait && buttonState !== "dialogue") {
		image(currentPortrait, 107, 260);
	}

	else if (buttonState === "dialogue") {
		image(currentPortrait, 107, 20);
	}
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

	else if (currentScene === "Boss" && bossObamaClass.state === "attack" && currentMusic !== bossMusic) {
		currentMusic.pause();
		currentMusic = bossMusic;
	}

	else if (currentScene === "Button") {
		if (buttonState === "dialogue" && currentMusic !== gameshowMusic) {
			currentMusic.pause();
			currentMusic = gameshowMusic;
		}

		else if (buttonState === "gameshow" && currentMusic !== gameshowChoice) {
			currentMusic.pause();
			currentMusic = gameshowChoice;
		}
	}

	else if (currentScene === "longHallway" && currentMusic !== hallwaysMusic) {
		currentMusic.pause();
		currentMusic = hallwaysMusic;
	}

	currentMusic.play();
}

function randomizeButtons() {
	//set pos and anims of all the buttons
	let buttonInfo = [
		{ x: 120, y: 186.5, upAnimation: blueButtonUp, downAnimation: blueButtonDown },
		{ x: 220, y: 186.5, upAnimation: greenButtonUp, downAnimation: greenButtonDown },
		{ x: 320, y: 186.5, upAnimation: purpleButtonUp, downAnimation: purpleButtonDown },
		{ x: 420, y: 186.5, upAnimation: redButtonUp, downAnimation: redButtonDown },
		{ x: 520, y: 186.5, upAnimation: yellowButtonUp, downAnimation: yellowButtonDown }
	];

	//button dialogue + events (later)
	let goodButton = {
		dialogue: ["", "Wow.", "You weren't supposed to click that one.", "Did you cheat or something?", "Anyways, I guess you get a damage buff"],
		events: ["goodButton", null, null, "damageBuff"]
	};

	let jokeButton = {
		dialogue: ["", "*explosion*", "...", "...", "Maybe YOU should be the president"],
		events: ["dummyExplosion", "obamaAppalled", "dummyAppalled", "obamaNeutral"]
	};

	let jokeButton2 = {
		dialogue: ["", "...", "Does that one just not work?", "huh", "definitely not because of lazy devs or anything", "surely not"],
		events: ["jokeButton2", "obamaConfused", "obamaNeutral", "obamaThinking", "obamaNeutral"]
	};

	let badButton = {
		dialogue: ["", "Wow.", "How unfortunate for you.", "On the other hand, I'm quite entertained.", "You'll get a damage debuff"],
		events: ["badButton", "obamaFacepalm", "obamaHappy", "damageDebuff"]
	};

	let doorButton = {
		dialogue: ["", "...", "Carson.", "Remember when I told you to deactivate", "A CERTAIN BUTTON", "We were going to trap them here remember?", "...", "this guy is useless..."],
		events: ["doorButton", "obamaNeutral", "obamaNeutral", "obamaAngry", "obamaHappy", "obamaNeutral", "unlockDoor"]
	};

	//randomize the dialogue (shoutout the indian guy on yt who taught fisher yates shuffle algo)
	let buttonsDialogue = [goodButton, jokeButton, jokeButton2, badButton, doorButton];
	for (let i = buttonsDialogue.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[buttonsDialogue[i], buttonsDialogue[j]] = [buttonsDialogue[j], buttonsDialogue[i]];
	}

	//give each button its pos, anim, dialogue, events
	for (let i = 0; i < buttonInfo.length; i++) {
		let button = new Sprite(buttonInfo[i].x, buttonInfo[i].y, 20, 20, "s"); //xPos, yPos, w, h, static
		button.addAnimation("up", buttonInfo[i].upAnimation);
		button.addAnimation("down", buttonInfo[i].downAnimation);
		button.changeAnimation("up");
		button.dialogue = buttonsDialogue[i].dialogue;
		button.events = buttonsDialogue[i].events;

		//put them into global array
		buttons.push(button);
	}
}

function gameshowEvents(event) {
	switch (event) {
		case "jokeButton2":
			currentPortrait = neutral;
			tv.changeAnimation("tvNothing");
			break;

		case "badButton":
			currentPortrait = neutral;
			tv.changeAnimation("tvBad");
			break;

		case "goodButton":
			currentPortrait = neutral;
			tv.changeAnimation("tvGood");
			break;

		case "doorButton":
			currentPortrait = appalled;
			tv.changeAnimation("tvDoor");
			break;

		case "damageBuff":
			currentPortrait = happy;
			playerDamage *= 2;
			break;

		case "damageDebuff":
			currentPortrait = neutral;
			playerDamage /= 2;
			break;

		case "dummyExplosion":
			currentPortrait = ""; //explosion portrait would be cool
			explosion.play(); //sfx
			//change anims
			dummyKids.changeAnimation("dummyKidsDeath");
			dummyKids.animation.looping = false;
			dummyWife.changeAnimation("dummyWifeDeath");
			dummyWife.animation.looping = false;
			dummy.changeAnimation("dummyMourn");
			carlos.changeAnimation("carlosSad");
			godfrey.changeAnimation("godfreySad");
			edward.changeAnimation("edwardSad");
			crug.changeAnimation("crugSad");
			sans.changeAnimation("sansSad");
			heart.changeAnimation("heartSad");
			tv.changeAnimation("tvDummy");
			dummyKilled = true;
			break;

		case "obamaAppalled":
			currentPortrait = appalled;
			break;

		case "dummyAppalled":
			currentPortrait = dummyAppalled;
			break;

		case "obamaNeutral":
			currentPortrait = neutral;
			carlos.changeAnimation("carlosIdle");
			godfrey.changeAnimation("godfreyIdle");
			edward.changeAnimation("edwardIdle");
			heart.changeAnimation("heartIdle");
			crug.changeAnimation("crugIdle");
			sans.changeAnimation("sansIdle");
			dummy.changeAnimation("dummyIdle");
			break;

		case "obamaConfused":
			currentPortrait = confused;
			break;

		case "obamaThinking":
			print("obamaThinking portrait");
			break;

		case "obamaFacepalm":
			currentPortrait = facepalm;
			break;

		case "obamaHappy":
			currentPortrait = happy;
			break;

		case "obamaAngry":
			currentPortrait = angry;
			break;

		case "unlockDoor":
			currentPortrait = facepalm;
			canLeaveButton = true;
			break;
	}
}

function obamaDialogueFunc() {
	if (player.x !== 1000 && currentScene === "Obama") {
		weaponObamaClass.update();

		if (weaponObama.position.y === 100) {
			//show portrait sprites
			showPortrait = true;

			let dialogue = obamaDialogue[currentLine];
			let wrappedText = wrapText(dialogue, 310); //max width
			let yPos = 292;

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

				if (currentLine === 0) {
					currentPortrait = shock;
				}

				else if (currentLine === 1) {
					weaponObamaClass.idle = true;
					currentPortrait = confused;
				}

				else if (currentLine === 3) {
					currentPortrait = appalled;
				}

				else if (currentLine === 4) {
					currentPortrait = neutral;
				}

				else if (currentLine === 7) {
					weaponObamaClass.triggerLeave();
					lastDir = "Up";
					obamaLeft.play();
					showPortrait = false;
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
		//show portrait sprites
		showPortrait = true;

		let dialogue = bossDialogue[currentLine];
		let wrappedText = wrapText(dialogue, 310); //max width
		let yPos = 292;

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
			if (currentLine === 0 || currentLine === 10) currentPortrait = confused;
			else if (currentLine === 2 || currentLine === 8) currentPortrait = appalled;
			else if (currentLine === 3 || currentLine === 5 || currentLine === 7 || currentLine === 9 || currentLine === 13) currentPortrait = neutral;
			else if (currentLine === 4) currentPortrait = angry;
			else if (currentLine === 6) currentPortrait = happy;
			else if (currentLine === 12) currentPortrait = shock;
			else if (currentLine === 14) currentPortrait = sansundertale;

			if (currentLine === 15) {
				bossObamaClass.state = "attack";
				showPortrait = false;
			}

			buttonSound.play();
			currentLine = (currentLine + 1) % bossDialogue.length; //loops through array infinitely
			lastChangeTime = millis();
		}
	}
}

function buttonDialogueFunc() {
	if (currentScene === "Button" && buttonState === "dialogue") {
		//show portrait sprites
		showPortrait = true;

		let dialogue = buttonDialogue[currentLine];
		let wrappedText = wrapText(dialogue, 310); //max width
		let yPos = 52;

		//draw textbox + set textAlign
		imageMode(CENTER);
		image(textBox, width / 2, 60, 460, 120);
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

			if (currentLine === 0 || currentLine === 2 || currentLine === 6 || currentLine === 13 || currentLine === 17) currentPortrait = neutral;
			else if (currentLine === 1 || currentLine === 4 || currentLine === 7 || currentLine === 14 || currentLine === 16) currentPortrait = happy;
			else if (currentLine === 3 || currentLine === 15 || currentLine === 18) currentPortrait = confused;
			else if (currentLine === 8) currentPortrait = appalled;
			else if (currentLine === 9 || currentLine === 10) currentPortrait = angry;
			else if (currentLine === 11) currentPortrait = facepalm;

			if (currentLine === 12) {
				currentPortrait = facepalm2;
				darkStage = false; //turn off the darkStage background
				click.play(); //sfx
				//set dummies positions
				dummyKids.position.set(555, 70);
				dummyWife.position.set(600, 65);
				tv.position.set(width / 2, 40);
				carlos.position.set(70, 60);
				edward.position.set(170, 50);
				godfrey.position.set(450, 50);
				heart.position.set(410, 30);
				sans.position.set(228, 50);
				crug.position.set(395, 70);
				dummyClass.dummy.position.set(510, 60);
			}

			else if (currentLine === 19) {
				canMove = true;
				showPortrait = false;
				buttonState = "gameshow";
			}

			else if (currentLine !== 13) {
				buttonSound.play();
			}

			currentLine = (currentLine + 1) % buttonDialogue.length; //loops through array infinitely
			lastChangeTime = millis();
		}
	}
}

function gameshowDialogueFunc() {
	if (buttonDialogueRunning && buttonState === "gameshowTalking") {
		//show portrait sprites
		showPortrait = true;

		//we store the dialogue of the button that was hit in currentButton
		let dialogue = currentButton.dialogue[currentLine];
		let wrappedText = wrapText(dialogue, 310); //max width
		let yPos = 292;

		//textbox
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
			let event = currentButton.events[currentLine];
			if (event) {
				//call func based on event from currentLine
				gameshowEvents(event);
			}

			if (currentLine === currentButton.dialogue.length - 1) {
				//dialogue over
				showPortrait = false;
				buttonDialogueRunning = false;
				buttonState = "gameshow";

				let index = buttons.indexOf(currentButton); //get index from the array
				if (index !== -1) { //it exists
					currentButton.remove(); //remove sprite
					buttons.splice(index, 1); //remove from array
				}
			}

			buttonSound.play();
			currentLine = (currentLine + 1) % currentButton.dialogue.length; //loops through array infinitely
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

	else if (currentScene === "Weapon" && tranAlpha < 255) {
		dummyClass.spawnPos();
	}

	else {
		if (currentScene !== "Yapping" && currentScene !== "Title" && currentScene !== "Obama" && currentScene !== "YOUSUCK" && currentScene !== "longHallway" && currentScene !== "longHallway2" && currentScene !== "longHallway3") {
			if (buttonState === "gameshowTalking" && currentScene === "Button") {
				playerClass.x = playerClass.x;
				playerClass.y = playerClass.y;
				playerClass.mic.mic.position.set(-1000, -1000);
			}

			else if (buttonEvent) {
				playerClass.spawnPos();
				buttonEvent = false;
			}

			else if (currentScene !== "Button" && nextScene !== "End" && currentScene !== "End") {
				playerClass.spawnPos();
			}
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
		peakObama.debug = true;
	}
}

function sceneTransition() {
	if (tranAlpha > 0) {
		//create rect
		fill(0, 0, 0, tranAlpha);
		rectMode(CORNER);
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
			nextScene = "Boss2";
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
		}

		else {
			lines.push(currentLine);
			currentLine = words[i];
		}
	}

	lines.push(currentLine);
	return lines;
}

