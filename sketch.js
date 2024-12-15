function preload() {
	//VARIABLES ARE ALL IN variables.js
	preloadAssets(); //preloadScript.js
}

function setup() {
	//setup stuffs
	createCanvas(640, 360, WEBGL);
	displayMode("centered", "pixelated");
	noStroke();
	noCursor();
	pixelDensity(1);

	//properties
	textSize(40);
	titleMusic.setVolume(1); titleMusic.setLoop(true);
	lobbyMusic.setVolume(1); lobbyMusic.setLoop(true);

	//put sprites off-screen so not shown during title/intro
	player = createSprite(1000, 1000, 80, 151);
	dummy = createSprite(1000, 1000, 88, 140);

	//create classes
	playerClass = new Player(width / 2, height / 2, player);
	dummyClass = new Dummy(width / 2, height / 2, dummy);
	barrierManager = new BarrierManager();

	//dummy barrier
	barrierManager.addBarrier(550, 280, -20, -50, "Weapon");

	//set initial vars
	playerClass.spawnPos();
	titleButtonMode = titleButton;
	currentScene = "Title";
	currentMusic = titleMusic;
}

function draw() {
	barrierManager.updateBarriersForState(currentScene, playerClass.player);

	//main func
	determineEvents();

	//player events
	if (canMove) { //scenes where player can move
		playerClass.update();
		dummyClass.update();
	}

	//transition ready for when tran = true
	sceneTransition();

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

function determineEvents() {
	//set font
	textFont(font);

	//background
	if (currentBackground) {
		background(currentBackground);
	}

	//TITLE ROOM
	if (currentScene === "Title") {
		//display title background
		currentBackground = titleBackground;

		//music
		//currentMusic.play();

		//move logo position
		logoPos = moveLogo(logoPos);

		//check if mouse hovering over play button
		titleHover();

		//display images
		imageMode(CENTER);
		image(titleButtonMode, width / 2, 300); // x = width/2, y = 300, width = 254, height = 82
		image(titleLogo, width / 2, logoPos, 300, 140);
		imageMode(NORMAL);

		//display cursor
		image(userCursor, mouseX, mouseY, 33, 33);
	}

	//YAPPING ROOM
	if (currentScene === "Yapping") {
		currentBackground = yappingBack;

		//display text
		textAlign(CENTER, BOTTOM);
		text(yapDialogue[currentLine], width / 2, 340);

		//change the lines in the dialogue based of delay var
		if (millis() - lastChangeTime > delay) {
			//events based on line #
			if (currentLine === 4) {
				fill("red");
			}

			else if (currentLine === 5) {
				//transition to tutorial room here
				nextScene = "Tutorial";
				tran = true;
			}

			else {
				fill("white");
			}

			buttonSound.play(); //sfx
			currentLine = (currentLine + 1) % yapDialogue.length; //loops through array infinitely
			lastChangeTime = millis();
		}

		//display cursor
		image(userCursor, mouseX, mouseY, 33, 33);
	}

	//TUTORIAL ROOM
	if (currentScene === "Tutorial") {
		canMove = true; //player can move from here all the way to the boss room
		currentBackground = tutorialBackground;
		currentMusic.pause();
		currentMusic = lobbyMusic;
		//currentMusic.play();
	}

	//WEAPON ROOM
	if (currentScene === "Weapon") {
		currentBackground = weaponBackground;
	}
}

function sceneTransition() {
	//transition
	if (tranAlpha > 0) {
		fill(0, 0, 0, tranAlpha);
		rect(0, 0, width, height);
	}

	if (tran) {
		tranAlpha += 255 / (fadeDur / deltaTime);
		if (tranAlpha >= 255) { //transition
			tran = false;
			tranAlpha = 255;
			currentScene = nextScene;
			nextScene = ""; //reset nextScene

			//bring classes back on screen
			playerClass.spawnPos();
			dummyClass.spawnPos();
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
		titleButtonMode = titleButtonHover; //red/blue button

		if (mouseIsPressed) {
			//transition to yapping room here
			nextScene = "Tutorial";
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

//ClASSES
class Player {
	constructor(xPos, yPos, player) {
		this.x = xPos;
		this.y = yPos;
		this.player = player;
		this.speed = 3;
		this.velocity = createVector(0, 0);

		//add animations to player sprite
		player.addAnimation("playerUp", playerUpAnim);
		player.addAnimation("playerDown", playerDownAnim);
		player.addAnimation("playerLeft", playerLeftAnim);
		player.addAnimation("playerRight", playerRightAnim);
		player.addAnimation("playerIdleDown", playerIdleDownAnim);
		player.addAnimation("playerIdleUp", playerIdleUpAnim);
		player.addAnimation("playerIdleLeft", playerIdleLeftAnim);
		player.addAnimation("playerIdleRight", playerIdleRightAnim);

		//frame rate for animations
		playerUpAnim.frameDelay = playerDownAnim.frameDelay = playerLeftAnim.frameDelay = playerRightAnim.frameDelay = 12;
		playerIdleDownAnim.frameDelay = playerIdleUpAnim.frameDelay = playerIdleLeftAnim.frameDelay = playerIdleRightAnim.frameDelay = 24;
	}

	move() {
		this.velocity.set(0, 0); //reset velocity each frame

		// temp movement dir
		let moveX = 0;
		let moveY = 0;

		//set movement
		if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // UP
			this.player.changeAnimation("playerUp");
			moveY = -1;
			lastDir = "Up";
		}
		
		else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // DOWN
			this.player.changeAnimation("playerDown");
			moveY = 1;
			lastDir = "Down";
		}

		else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // LEFT
			this.player.changeAnimation("playerLeft");
			moveX = -1;
			lastDir = "Left";
		}

		else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // RIGHT
			this.player.changeAnimation("playerRight");
			moveX = 1;
			lastDir = "Right";
		}

		else if (!keyIsPressed) { // IDLE
			this.player.changeAnimation("playerIdle" + lastDir);
		}

		//normalize velocity
		let tempVelocity = createVector(moveX, moveY);
		tempVelocity.normalize();
		tempVelocity.mult(this.speed);

		//check for collision
		let canMoveX = !this.checkCollision(tempVelocity.x, 0); //horizontal
		let canMoveY = !this.checkCollision(0, tempVelocity.y); //vertical

		//if no collision then move
		if (canMoveX) {
			this.velocity.x = tempVelocity.x;
		}

		if (canMoveY) {
			this.velocity.y = tempVelocity.y;
		}

		//apply movement
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		//border check
		this.x = constrain(this.x, 20, 620);
		this.y = constrain(this.y, 30, 281);

		// Checking room transition
		if (this.x >= 296 && this.x <= 344 && this.y <= 31) {
			if (currentScene === "Tutorial") {
				nextScene = "Weapon";
				canMove = false; //prevent player movement
				this.x = this.y = 1000; //move player offscreen
				tran = true; //run fade transition
			}
		}
	}

	checkCollision(moveX, moveY) {
		//temp hitbox
		let nextX = this.x + moveX;
		let nextY = this.y + moveY;

		for (let barrier of barrierManager.barriers) {
			if (barrier.playerCollision({ x: nextX, y: nextY, width: this.player.width, height: this.player.height })) { //W youtube tutorial
				return true; //collision
			}
		}
		return false; //no collision
	}


	spawnPos() {
		this.y = 269;
		this.x = width / 2;
	}


	display() {
		//rotates player when he gets near the dummy if this isnt here idk why
		this.player.rotation = 0;

		if (tranAlpha <= 0) {
			this.player.position.set(this.x, this.y);
		}
	}


	update() {
		this.move();
		this.display();
	}
}

class Dummy {
	constructor(xPos, yPos, dummy) {
		this.x = xPos;
		this.y = yPos;
		this.dummy = dummy;
		this.hit = false;

		//load dummy animations
		dummy.addAnimation("dummyIdle", dummyIdleAnim);
		dummy.addAnimation("dummyHit", dummyHitAnim);

		dummyIdleAnim.frameDelay = 24;
		dummyHitAnim.frameDelay = 1;
	}

	animations() {
		//rotates when player gets close if this isnt here for some reason idk why
		this.dummy.rotation = 0;

		if (this.hit) {
			this.dummy.changeAnimation("dummyHit");
		}

		else {
			this.dummy.changeAnimation("dummyIdle");
		}


		//make the player go above the dummy if in front of it
		//behind the dummy if behind it
		if (playerClass.player.y < this.y) {
			playerClass.player.layer = 0;
			this.dummy.layer = 1;
		}

		else {
			playerClass.player.layer = 1;
			this.dummy.layer = 0;
		}
	}

	position() {
		if (tranAlpha <= 0 && currentScene === "Weapon") { //only shown in weapon room
			this.dummy.position.set(this.x, this.y);
		}
	}

	spawnPos() {
		this.x = 500;
		this.y = height / 2;
	}

	update() {
		this.animations();
		this.position();
	}
}

class Barrier {
	constructor(xPos, yPos, width, height, scene) {
		this.x = xPos;
		this.y = yPos;
		this.width = width;
		this.height = height;
		this.scene = scene;
		this.barrier = createSprite(this.x, this.y, this.width, this.height);
		this.barrier.visible = false; //start hidden (debug var delete when done)
		this.active = false; //start inactive
	}

	setActive(isActive) {
		this.active = isActive;
		this.barrier.rotation = 0; //prevent rotation

		if (isActive) {
			this.barrier.position.set(this.x, this.y);  //set to original position
			//this.barrier.visible = true;
		}

		else {
			this.barrier.position.set(-1000, -1000);  //move off screen
			//this.barrier.visible = false;
		}
	}

	playerCollision(player) {
		if (!this.active) {
			return false; //barrier isnt active = ignore it
		}

		//W youtube tutorial
		let playerRect = {
			x: player.x,
			y: player.y,
			width: player.width,
			height: player.height
		};

		let barrierRect = {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height
		};

		if (collideRectRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height, barrierRect.x, barrierRect.y, barrierRect.width, barrierRect.height)) {
			return true; //collision detected
		}

		return false; //no collision
	}
}

class BarrierManager {
	constructor() {
		this.barriers = []; //array for barriers
	}

	addBarrier(x, y, w, h, scene) { //add and push barrier to array
		let newBarrier = new Barrier(x, y, w, h, scene);
		this.barriers.push(newBarrier);
	}

	updateBarriersForState(currentState) {
		//check for correct scene, if so, barriers become active
		for (let barrier of this.barriers) {
			let isActive = barrier.scene === currentState;
			barrier.setActive(isActive);
		}
	}
}





