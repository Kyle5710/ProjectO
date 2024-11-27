let titleScreen;

function preload(){
	titleScreen = loadImage("favicon.png");
}

function setup() {
	new Canvas(640, 360);
	displayMode("centered", "pixelated");
}

function draw() {
	background(titleScreen);
}
