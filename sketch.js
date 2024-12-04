// stores player sprite
let player;

//for the fade transition
let opacityIn = 255;
let opacityOut = 0;

//title variables
let titleBackground, titleButton, titleMusic;
let logoPos = 100; //initial y pos of logo
let logoDir = true; //direction of logo
let buttonHover = false; //mouse over button

//yapping variables
let yapDialogue = ["Once upon a time,", "a journalist named Armando",
	"was assigned an important mission.", "To find out Obama's last name,",
	"once and for all."];
let currentLine = 0;
let delay = 3000; //3 seconds in miliseconds between lines
let lastChangeTime = 0;

//tutorial variables
let tutorialBackground;

//state variables
let currentBackground, currentScene, currentMusic, currentDialogue, playerDir;

function preload() {
	//LOAD FONT
	font = loadFont("assets/font/font.ttf");

	//LOAD PLAYER ANIMATIONS
	playerUpAnim = loadAnimation("assets/sprites/playerUp/tile000.png", "assets/sprites/playerUp/tile001.png",
		"assets/sprites/playerUp/tile002.png", "assets/sprites/playerUp/tile003.png");
	
	//frame rate for specific animation
	playerUpAnim.frameDelay = 5;

	playerDownAnim = loadAnimation("assets/sprites/playerDown/playerDown1.png", "assets/sprites/playerDown/playerDown2.png",
		"assets/sprites/playerDown/playerDown3.png", "assets/sprites/playerDown/playerDown4.png");

	playerDownAnim.frameDelay = 12;
	
		//LOAD TITLE SCREEN ASSETS
	userCursor = loadImage("assets/sprites/cursor.png");
	titleBackground = loadImage("assets/sprites/titleBack.png");
	titleButton = loadImage("assets/sprites/titleButton.png");
	titleButtonHover = loadImage("assets/sprites/titleButtonHover.png");
	titleLogo = loadImage("assets/sprites/titleLogo.png");
	buttonSound = loadSound("assets/audio/startButton.wav");
	titleMusic = loadSound("assets/audio/titleMusic.wav");

	//LOAD YAPPING ASSETS
	yappingBack = loadImage("assets/sprites/temporaryArt.jpeg");

	//LOAD TUTORIAL ROOM ASSETS
	tutorialBackground = loadImage("assets/sprites/tutorialBack.png");

	//set music properties
	titleMusic.setVolume(1); titleMusic.setLoop(true);
}

function setup() {
	//setup stuffs
	createCanvas(640, 360, WEBGL);
	displayMode("centered", "pixelated");
	noStroke();
	noCursor();

	//text properties
	textSize(40);
	fill("white");

	//put player off-screen so not shown during title/intro
	player = createSprite(1000, 1000, 60, 40);

	//add animations to player sprite
	player.addAnimation("playerUp", playerUpAnim);
	player.addAnimation("playerDown", playerDownAnim);

	//create player class
	playerClass = new Player(width / 2, height / 2, player);

	//set initial vars
	titleButtonMode = titleButton;
	currentScene = "Title";
	currentMusic = titleMusic;
}

function draw() {
	//main func
	determineEvents();

	//player events
	if (currentScene === "Tutorial" || opacityOut !== 0) {
		//scenes where the player is displayed and can move
		playerClass.update();
	}
}

function fadeOut(){
	if(opacityOut < 255){
		opacityOut += 5;
	}
	this.sprite
	tint(opacityOut, opacityOut, opacityOut);
}

function fadeIn(){
	if(opacityIn > 0){
		opacityIn -= 5;
	}

	tint(opacityIn, opacityIn, opacityIn);
}

function determineEvents() {
	//have a state var that tells us what scene we are in
	//and use it to determine events on screen

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
		text(yapDialogue[currentLine], width / 2, 300);

		//change the lines in the dialogue based of delay var
		if (millis() - lastChangeTime > delay) {
			//events based on line #
			if (currentLine === 3) {
				fill("red");
			}

			if (currentLine === 4) {
				fadeIn();
				currentScene = "Tutorial";
			}

			buttonSound.play();
			currentLine = (currentLine + 1) % yapDialogue.length; //loops through array infinitely
			lastChangeTime = millis();
		}

		//display cursor
		image(userCursor, mouseX, mouseY, 33, 33);
	}

	//TUTORIAL ROOM EVENTS
	if (currentScene === "Tutorial") {
		currentBackground = tutorialBackground;

		//fade out transition
		fadeOut();
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
			buttonSound.play();
			lastChangeTime = millis();
			currentScene = "Tutorial";
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
	}

	move() {
		this.velocity.set(0, 0); //so he doesnt move by himself

		if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // UP
			this.player.changeAnimation("playerUp");
			playerDir = "UP";
			this.velocity.y -= 1;
		}

		if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // DOWN
			this.player.changeAnimation("playerDown");
			playerDir = "DOWN";
			this.velocity.y += 1;
		}

		if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // LEFT
			playerDir = "LEFT";
			this.velocity.x -= 1;
		}

		if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // RIGHT
			playerDir = "RIGHT";
			this.velocity.x += 1;
		}

		//normalize velocity so diagonal isnt faster
		this.velocity.normalize();
		this.velocity.mult(this.speed);

		//apply movement
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		//border checking
		if (this.x < 10) {
			this.x = 10;
		}

		if (this.x > 630) {
			this.x = 630;
		}
		if (this.y < 50) {
			this.y = 50;
		}

		if (this.y > 303) {
			this.y = 303;
		}
	}

	display() {
		//display armando
		this.player.position.set(this.x, this.y);
	}

	update() {
		this.move();
		this.display();
	}
}