//title variables
let titleBackground, titleButton, titleMusic;
let logoPos = 100; //initial y pos of logo
let logoDir = true; //direction of logo
let buttonHover = false; //mouse over button

//yapping variables
let yapDialogue = ["the the the the hteh ethe e hte hte htehteh yes"];
let currentLine = 0;
let delay = 3000; //3 seconds in miliseconds between lines
let lastChangeTime = 0;

//tutorial variables
let tutorialBackground;

//state variables
let currentBackground, currentScene, currentMusic, currentDialogue;

function preload() {
	//load font file
	font = loadFont("assets/font/font.ttf");

	//LOAD TITLE SCREEN ASSETS
	userCursor = loadImage("assets/sprites/cursor.png");
	titleBackground = loadImage("assets/sprites/titleBack.png");
	titleButton = loadImage("assets/sprites/titleButton.png");
	titleButtonHover = loadImage("assets/sprites/titleButtonHover.png");
	titleLogo = loadImage("assets/sprites/titleLogo.png");
	titleMusic = loadSound("assets/audio/titleMusic.wav");

	//LOAD YAPPING ASSETS
	yappingBack = loadImage("assets/sprites/blackscreen.png");

	//LOAD TUTORIAL ROOM ASSETS
	tutorialBackground = loadImage("assets/sprites/tutorialBack.png");

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
	textAlign(CENTER);

	displayMode("centered", "pixelated");

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
}

function determineEvents() {
	//have a state var that tells us what scene we are in
	//and use it to determine events on screen

	//ALWAYS RUNNING EVENTS

	//set font
	textFont(font);
/* 
	//music
	if (currentMusic) {
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
		text(yapDialogue[currentLine], width / 2, height / 2);

		//change the lines in the dialogue based of delay var
		if (millis() - lastChangeTime > delay) {
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