//title variables
let titleScreen, titleButton, titleMusic;
let logoPos = 100; //initial y pos of logo
let logoDir = true; //direction of logo
let buttonHover = false; //mouse over button

//state variables
let currentBackground, currentScene, currentMusic;

function preload() {
	//load font file
	font = loadFont("assets/font/font.ttf");

	//load necessary title assets
	titleScreen = loadImage("assets/sprites/titleBack.png");
	titleButton = loadImage("assets/sprites/titleButton.png");
	titleButtonHover = loadImage("assets/sprites/titleButtonHover.png");
	titleLogo = loadImage("assets/sprites/titleLogo.png");
	titleMusic = loadSound("assets/audio/titleMusic.wav");

	//set music properties
	titleMusic.setVolume(1); titleMusic.setLoop(true);
}

function setup() {
	createCanvas(640, 360, WEBGL);
	noStroke();
	displayMode("centered", "pixelated");
	
	//set font
	textFont(font);

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
		currentBackground = titleScreen;

		//move logo position
		logoPos = moveLogo(logoPos);

		//check if mouse hovering over play button
		titleHover();

		//display images
		imageMode(CENTER);
		image(titleButtonMode, width / 2, 300); // x = width/2, y = 300, width = 254, height = 82
		image(titleLogo, width / 2, logoPos, 300, 140);
		imageMode(NORMAL);
	}

	if(currentScene === "Room1"){
		print("ROOM 1");
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

		if(mouseIsPressed){
			currentScene = "Room1";
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