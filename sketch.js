//stores player sprite
let player;

//if player can move
let canMove = false;

//fade transition
let tranAlpha = 0;
let tran = false;
let fadeDur = 1000;
let nextScene = "";

//title room variables
let titleBackground, titleButton, titleMusic;
let logoPos = 100; //initial y pos of logo
let logoDir = true; //direction of logo
let buttonHover = false; //mouse over button

//yapping room variables
let yapDialogue = ["", "Once upon a time,", "a journalist named Armando",
	"was assigned an important mission.", "To find out Obama's last name,",
	"once and for all."];
let currentLine = 0;
let delay = 2000; //2 second in miliseconds between lines
let lastChangeTime = 0;

//tutorial room variables
let tutorialBackground;

//weapon room variables
let weaponBackground;

//state variables
let currentBackground, currentScene, currentMusic, currentDialogue;

function preload() {
	//LOAD FONT
	font = loadFont("assets/font/font.ttf");

	//LOAD PLAYER ANIMATIONS
	playerUpAnim = loadAnimation("assets/sprites/playerUp/playerUp1.png", "assets/sprites/playerUp/playerUp2.png",
		"assets/sprites/playerUp/playerUp3.png", "assets/sprites/playerUp/playerUp4.png");

	playerDownAnim = loadAnimation("assets/sprites/playerDown/playerDown1.png", "assets/sprites/playerDown/playerDown2.png",
		"assets/sprites/playerDown/playerDown3.png", "assets/sprites/playerDown/playerDown4.png");

	playerLeftAnim = loadAnimation("assets/sprites/playerLeft/playerLeft1.png", "assets/sprites/playerLeft/playerLeft2.png",
		"assets/sprites/playerLeft/playerLeft3.png", "assets/sprites/playerLeft/playerLeft4.png");

	playerRightAnim = loadAnimation("assets/sprites/playerRight/playerRight1.png", "assets/sprites/playerRight/playerRight2.png",
		"assets/sprites/playerRight/playerRight3.png", "assets/sprites/playerRight/playerRight4.png");

	playerIdleDownAnim = loadAnimation("assets/sprites/playerIdle/playerIdleDown1.png", "assets/sprites/playerIdle/playerIdleDown2.png");

	playerIdleUpAnim = loadAnimation("assets/sprites/playerIdle/playerIdleUp1.png", "assets/sprites/playerIdle/playerIdleUp2.png");

	playerIdleLeftAnim = loadAnimation("assets/sprites/playerIdle/playerIdleLeft1.png", "assets/sprites/playerIdle/playerIdleLeft2.png");

	playerIdleRightAnim = loadAnimation("assets/sprites/playerIdle/playerIdleRight1.png", "assets/sprites/playerIdle/playerIdleRight2.png");

	//LOAD TITLE SCREEN ASSETS
	userCursor = loadImage("assets/sprites/cursor.png");
	titleBackground = loadImage("assets/sprites/titleScreen/titleBack.png");
	titleButton = loadImage("assets/sprites/titleScreen/titleButton.png");
	titleButtonHover = loadImage("assets/sprites/titleScreen/titleButtonHover.png");
	titleLogo = loadImage("assets/sprites/titleScreen/titleLogo.png");
	buttonSound = loadSound("assets/audio/startButton.wav");
	titleMusic = loadSound("assets/audio/titleMusic.wav");

	//LOAD YAPPING ASSETS
	yappingBack = loadImage("assets/sprites/temporaryArt.jpeg");

	//LOAD TUTORIAL ROOM ASSETS
	tutorialBackground = loadImage("assets/sprites/tutorialScreen/tutorialBack.png");

	//LOAD WEAPON ROOM ASSETS
	weaponBackground = loadImage("assets/sprites/weaponScreen/weaponBack.png");

	//set music properties
	titleMusic.setVolume(1); titleMusic.setLoop(true);
}

function setup() {
	//setup stuffs
	createCanvas(640, 360, WEBGL);
	displayMode("centered", "pixelated");
	noStroke();
	noCursor();
	pixelDensity(1);

	//text properties
	textSize(40);

	//put player off-screen so not shown during title/intro
	player = createSprite(1000, 1000, 80, 151);

	//create player class
	playerClass = new Player(width / 2, height / 2, player);

	//set initial player position
	playerClass.spawnPos();

	//set initial idle animation (goes off of last key pressed)
	keyCode = UP_ARROW;

	//set initial vars
	titleButtonMode = titleButton;
	currentScene = "Title";
	currentMusic = titleMusic;
}

function draw() {
	//main func
	determineEvents();

	//player events
	if (canMove) {
		//scenes where the player is displayed and can move
		playerClass.update();
	}
}

function determineEvents() {
	//ALWAYS RUNNING EVENTS

	//set font
	textFont(font);

	//music
	/* if (currentMusic) {
		currentMusic.play();
	} */

	//background
	if (currentBackground) {
		background(currentBackground);
	}

	//TITLE SCREEN EVENTS
	if (currentScene === "Title") {
		//display title background
		currentBackground = titleBackground;

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

	//YAP SESSION EVENTS
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

	//TUTORIAL ROOM EVENTS
	if (currentScene === "Tutorial") {
		canMove = true; //player can move from here all the way to the boss room
		currentBackground = tutorialBackground;
	}

	//WEAPON ROOM EVENTS
	if (currentScene === "Weapon") {
		currentBackground = weaponBackground;
	}

	//transition ready for when tran = true
	sceneTransition();
}

function sceneTransition() {
	//transition
	if (tranAlpha > 0) {
		fill(0, 0, 0, tranAlpha);
		rect(0, 0, width, height);
	}

	if (tran) {
		tranAlpha += 255 / (fadeDur / deltaTime);
		if (tranAlpha >= 255) {
			tran = false;
			tranAlpha = 255;
			currentScene = nextScene;
			nextScene = ""; //reset nextScene
			playerClass.spawnPos();
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
		this.speed = 3;
		this.player = player;
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

		//frame rate for specific animation
		playerUpAnim.frameDelay = 12;
		playerDownAnim.frameDelay = 12;
		playerLeftAnim.frameDelay = 12;
		playerRightAnim.frameDelay = 12;
		playerIdleDownAnim.frameDelay = 24;
		playerIdleUpAnim.frameDelay = 24;
		playerIdleLeftAnim.frameDelay = 24;
		playerIdleRightAnim.frameDelay = 24;
	}

	move() {
		this.velocity.set(0, 0); //so he doesnt move by himself

		if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // UP
			this.player.changeAnimation("playerUp");
			this.velocity.y -= 1;
		}

		else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // DOWN
			this.player.changeAnimation("playerDown");
			this.velocity.y += 1;
		}

		else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // LEFT
			this.player.changeAnimation("playerLeft");
			this.velocity.x -= 1;
		}

		else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // RIGHT
			this.player.changeAnimation("playerRight");
			this.velocity.x += 1;
		}

		else if (!keyIsPressed) { //IDLE animations

			if(keyCode === 83 || keyCode === DOWN_ARROW){
				this.player.changeAnimation("playerIdleDown");
			}
			
			if (keyCode === 87 || keyCode === UP_ARROW){
				this.player.changeAnimation("playerIdleUp");
			}

			if (keyCode === 65 || keyCode === LEFT_ARROW){
				this.player.changeAnimation("playerIdleLeft");
			}

			if (keyCode === 68 || keyCode === RIGHT_ARROW){
				this.player.changeAnimation("playerIdleRight");
			}
		}

		//normalize velocity so diagonal isnt faster
		this.velocity.normalize();
		this.velocity.mult(this.speed);

		//apply movement
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		//border checking
		if (this.x < 20) {
			this.x = 20;
		}

		if (this.x > 620) {
			this.x = 620;
		}
		if (this.y < 30) {
			this.y = 30;
		}

		if (this.y > 281) {
			this.y = 281;
		}

		//checking room transition
		if (this.x >= 296 && this.x <= 344 && this.y <= 31) { //xPos must be between 303 and 342
			if (currentScene === "Tutorial") {
				//transition to weapon room here
				nextScene = "Weapon";
				canMove = false; //player cannot move
				this.x = 1000; this.y = 1000; //move player offscreen
				tran = true; //fade transition
			}

			/* if (currentScene = "Weapon") {
				//transition to boss room here
				nextScene = "Boss";
				tran = true;
				this.spawnPos();
			} */
		}
	}

	spawnPos() {
		this.y = 269;
		this.x = width / 2;
	}

	display() {
		//display armando
		if (tranAlpha <= 0) {
			this.player.position.set(this.x, this.y);
			print(this.x);
		}
	}

	update() {
		this.move();
		this.display();
	}
}