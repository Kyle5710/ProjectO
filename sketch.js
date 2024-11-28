//title variables
let titleScreen, titleButton, titleMusic;
let logoPos = 100; //initial y pos of logo
let logoDir = true; //direction of logo

//state variables
let currentBackground, currentScene;

function preload() {
	//load font file
	font = loadFont("assets/font/font.ttf");

	//load necessary title assets
	titleScreen = loadImage("assets/title/titleBack.png");
	titleButton = loadImage("assets/title/titleButton.png");
	titleLogo = loadImage("assets/title/titleLogo.png");
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

		//move logo position
		logoPos = moveLogo(logoPos);

		//display images
		imageMode(CENTER);
		image(titleButton, width / 2, 300);
		image(titleLogo, width / 2, logoPos, 300, 140);
		imageMode(NORMAL);
	}
}

//MAKE THIS BETTER IN LIKE JANUARY LAST MIN BEFORE THE DEADLINE
function moveLogo(logoPos) {
	if (logoPos === 80) {
		logoDir = false;
	}

	else if (logoPos === 120) {
		logoDir = true;
	}

	if (logoDir) {
		return logoPos - .5;
	}

	else if (!logoDir) {
		return logoPos + .5;
	}
}