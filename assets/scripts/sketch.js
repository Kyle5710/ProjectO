//ProjectO
//Kyle and Alexandre

//Written Response Here: 
//Question 1: Don't bite off more than you can chew. Scope creep played a huge role here as we assumed we could get more done then we really had the time (or experience) for.
//For example, going for an entirely new phase was quite ambitious.

//Question 2: Yes, everything in our list of “required features” was completed.

//Question 3: The most challenging part of the project was trying to make phase 2.
//There wasn’t enough time to make new AI, so we reused his AI in phase 1. 
//That still proved to be a pain because it was easy to forget about renaming variables and such. 
//Making the “base” sprites for the Player and Obama also proved challenging because we wanted designs that could fit in our limited sprite margins.

//Question 4: Phase 2 was originally going to have a new attack where Obama would throw ice cream projectiles at you, but it was scrapped because it was extremely unstable and kept breaking easily. 
//There are leftovers of this because some of the NPCs during the game show were meant to be used as projectiles, thus they were left in the “projectiles” folder.

//Controls:
//If you press Tab while on the titleScreen, a speedrun timer while appear in the top left.
//Mouse to press play on the titleScreen.
//WASD or arrow keys → movement
//E → attack

//If you want to teleport to a certain scene, currentScene = "sceneYouWantToGoTo"; in the console will teleport you there.
//List of scenes: Title, Yapping, Tutorial, Obama, Weapon, Boss, Button, longHallway, longHallway2, longHallway3, Boss2, End, YOUSUCK 
//(End and YOUSUCK scenes may have some bugs upon teleporting to them specifically)
//Additionally, if you want to make dialogue run faster, delay = 1; in the console will speed it up quite a lot (2000 is the default).

//Bugs:
//There is one bug where Armando (main character) will teleport to the top left of the screen upon moving between rooms. 
//However, this bug only happened when I tried the game on the school computers and I couldn't recreate the issue at home.

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
	speedrunTimer(); //speedrun timer if tab pressed in titlescreen

	//debug
	//drawDebug();
}

//debug func
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

function speedrunTimer() {
	if (keyIsPressed && keyCode === 9 && currentScene === "Title") { //press tab on titlescreen
		speedrunTimerVisible = true;
	}

	if (speedrunTimerVisible) { //if speedrun timer is visible
		let finalTime = millis() - speedrunStart; //convert this to mins and seconds later

		let minutes = Math.floor(finalTime / 60000); //find mins
		let seconds = Math.floor((finalTime % 60000) / 1000); //find seconds
		let milliseconds = Math.floor(finalTime % 1000); //find milliseconds

		fill("white");
		textSize(30);
		text("Time: " + minutes + ":" + seconds.toString().padStart(2, '0') + ":" + milliseconds.toString().padStart(3, '0'), 5, 20); //make sure milliseconds has max 3 digits
	}
}

//change portrait position for that one gameshow scene
function showPortraits() {
	if (showPortrait && buttonState !== "dialogue") {
		image(currentPortrait, 107, 260);
	}

	else if (buttonState === "dialogue") {
		image(currentPortrait, 107, 20);
	}
}

//plays music depending on scene
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

	else if (currentScene === "Boss2" && peakObamaClass.state === "attack" && currentMusic !== boss2Music) {
		currentMusic.pause();
		currentMusic = boss2Music;
	}

	if (!currentMusic.isPlaying()) {
		currentMusic.play();
	}

}

//randomizes placement of buttons for gameshow
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
		dialogue: ["...", "Wow.", "SOMEBODY was supposed to take out the good ones.",
			"RIGHT, CARSON?", "...", "Anyways, I guess you get a damage buff."],
		events: ["goodButton", "obamaAngry", "obamaConfused", "obamaNeutral", "damageBuff"]
	};

	let jokeButton = {
		dialogue: ["...", "*explosion*", "...", "...", "Maybe YOU should be the president."],
		events: ["dummyExplosion", "obamaAppalled", "dummyAppalled", "obamaNeutral"]
	};

	let jokeButton2 = {
		dialogue: ["...", "...", "Does that one just not work?", "Huh.", "Definitely not because of lazy devs or anything.", "Surely not."],
		events: ["jokeButton2", "obamaConfused", "obamaNeutral", "obamaThinking", "obamaNeutral"]
	};

	let badButton = {
		dialogue: ["...", "Wow.", "You just hit the damage debuff button.", "…", "That's definitely going to hurt your speedrun."],
		events: ["badButton", "obamaFacepalm", "obamaFacepalm2", "damageDebuff"]
	};

	let doorButton = {
		dialogue: ["...", "What.", "Didn't I-", "Carson, did you activate the door button?", "I told you to do that, remember?",
			"He was going to be trapped in here, remember?", "...", "This guy is useless..."],
		events: ["doorButton", "obamaAppalled", "obamaConfused", "obamaHappy", "obamaFacepalm", "obamaFacepalm2", "unlockDoor"]
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
			currentPortrait = confused;
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
			currentPortrait = thinking;
			break;

		case "obamaFacepalm":
			currentPortrait = facepalm;
			break;

		case "obamaFacepalm2":
			currentPortrait = facepalm2;
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

//ALL DIALOGUE FUNCTIONS (COULD BE DONE SMOOTHER BUT I DONT WANT TO TOUCH IT LMAO)
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

				if (currentLine === 0) currentPortrait = shock;

				else if (currentLine === 1) {
					weaponObamaClass.idle = true;
					currentPortrait = confused;
				}

				else if (currentLine === 2) currentPortrait = thinking;
				else if (currentLine === 3) currentPortrait = appalled;
				else if (currentLine === 4 || currentLine === 6) currentPortrait = neutral;
				else if (currentLine === 5) currentPortrait = happy;


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
			else if (currentLine === 1) currentPortrait = thinking;
			else if (currentLine === 2) currentPortrait = appalled;
			else if (currentLine === 3 || currentLine === 5 || currentLine === 7 || currentLine === 11 || currentLine === 13) currentPortrait = neutral;
			else if (currentLine === 4) currentPortrait = angry;
			else if (currentLine === 6) currentPortrait = happy;
			else if (currentLine === 8) currentPortrait = facepalm;
			else if (currentLine === 9) currentPortrait = facepalm2;
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

			else if (currentLine !== 12) {
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

function boss2DialogueFunc() {
	if (peakObamaClass.state === "dialogue") {
		//show portrait sprites
		showPortrait = true;

		let dialogue = boss2Dialogue[currentLine];
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
			if (currentLine === 0 || currentLine === 3 || currentLine === 5 || currentLine === 9) currentPortrait = neutral;
			else if (currentLine === 1 || currentLine === 10) currentPortrait = happy;
			else if (currentLine === 15) currentPortrait = angry;
			else if (currentLine === 6 || currentLine === 11) currentPortrait = appalled;
			else if (currentLine === 2 || currentLine === 14) currentPortrait = thinking;
			else if (currentLine === 7) currentPortrait = facepalm;
			else if (currentLine === 8) currentPortrait = facepalm2;
			else if (currentLine === 12) currentPortrait = shock;
			else if (currentLine === 4 || currentLine === 13) currentPortrait = confused;

			if (currentLine === 16) {
				peakObamaClass.state = "attack";
				showPortrait = false;
			}

			buttonSound.play();
			currentLine = (currentLine + 1) % boss2Dialogue.length; //loops through array infinitely
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

	else if (currentScene === "Weapon" && tranAlpha < 255) { //set dummy pos
		dummyClass.spawnPos();
	}

	else {
		if (!excludedRooms.includes(currentScene)) { //make sure currentScene isnt in the const excludedScenes
			if (buttonState === "gameshowTalking" && currentScene === "Button") {
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
			nextScene = "Yapping";
			canMove = false;
			tran = true;

			if (!buttonSound.isPlaying()) {
				buttonSound.play();
			}

			speedrunStart = millis(); //start speedrun timer
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

