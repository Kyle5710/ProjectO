//title variables
let titleScreen, titleButton, titleMusic;

//state variables
let currentBackground, currentScene;

function preload() {
	//load font file
	font = loadFont("assets/font/font.ttf");

	//load necessary title assets
	titleScreen = loadImage("assets/title/titleBack.png");
	titleButton = loadImage("assets/title/titleButton.png");
	titleMusic = loadSound("assets/audio/titleMusic.wav");
	//set music properties
	titleMusic.setVolume(1); titleMusic.setLoop(true);
}

function setup() {
	new Canvas(640, 360);
	displayMode("centered", "pixelated");

	//set font
	textFont(font);

	//update current scene
	currentScene = "Title";
	determineEvents();
}

function draw() {
	//set background
	background(currentBackground);
	determineEvents();
}

function determineEvents() {
	//have a state var that tells us what scene we are in
	//and use it to determine events on screen

	if (currentScene === "Title") {
		//display title background
		currentBackground = titleScreen;

		//play title music
		titleMusic.play();

		//display the play button
		imageMode(CENTER);
		image(titleButton, width/2, 300);
		imageMode(NORMAL);
	
	}
}

