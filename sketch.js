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
let currentBackground, currentScene, currentMusic, currentDialogue;

function preload() {
	//LOAD GLOBAL FILES
	font = loadFont("assets/font/font.ttf");
	playerImage = loadImage("assets/sprites/playerPlaceHolder.png");

	//LOAD PLAYER ANIMATIONS

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

	//LOAD ATTACK ROOM ASSETS

	//LOAD BOSS ROOM ASSETS

	//set music properties
	titleMusic.setVolume(1); titleMusic.setLoop(true);
}

function setup() {
	createCanvas(640, 360, WEBGL);
	noStroke();
	noCursor();

	//text properties
	textSize(40);
	fill("white");

	displayMode("centered", "pixelated");

	//create player but dont display him yet
	playerClass = new Player(width / 2, height / 2);

	//set original titleButton sprite
	titleButtonMode = titleButton;

	//set initial scene
	currentScene = "Title";

	//set initial music
	currentMusic = titleMusic;
}

function draw() {
	//main func
	determineEvents();

	//player events
	playerClass.update();
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
			if (currentLine === 3) {
				fill("red");
			}

			if (currentLine === 4) {
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
			currentScene = "Yapping";
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

//Classes
class Player {
	constructor(xPos, yPos) {
		this.x = xPos;
		this.y = yPos;
		this.speed = 3;
		this.velocity = createVector(0, 0);
	}

	move() {
		this.velocity.set(0, 0); //so he doesnt move by himself

		if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // UP
			this.velocity.y -= 1;
		}
		if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // DOWN
			this.velocity.y += 1;
		}
		if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // LEFT
			this.velocity.x -= 1;
		}
		if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // RIGHT
			this.velocity.x += 1;
		}

		//normalize velocity so diagonal isnt faster
		this.velocity.normalize();
		this.velocity.mult(this.speed);

		//apply movement
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}


	display() {
		//display armando
		image(playerImage, this.x, this.y);
	}

	update() {
		//scenes where the player is displayed and can move
		if (currentScene === "Tutorial") { 
			this.move();
			this.display();
		}
	}
}

class Barrier {
	constructor(){

	}
}