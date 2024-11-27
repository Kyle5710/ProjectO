//title variables
let titleScreen, titleButton;

//state variables
let currentBackground, currentScene;

function preload() {
	//load font file
	font = loadFont("assets/font/font.ttf");

	//load necessary title assets
	titleScreen = loadImage("assets/title/titleBack.png");
	titleButton = loadImage("assets/title/titleButton.png");
}

function setup() {
	new Canvas(640, 360);
	displayMode("centered", "pixelated");

	//set font
	textFont(font);

	//update current scene
	currentScene = "Title";
	determineBackground();
}

function draw() {
	//set background
	background(currentBackground);
	determineBackground();
}

function determineBackground() {
	//have a state var that tells us what scene we are in
	//and use it to determine what background should be
	//displayed on screen

	if (currentScene === "Title") {
		currentBackground = titleScreen;
	}
}