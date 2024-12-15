function preloadAssets() {
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

	//LOAD DUMMY ASSETS
	dummyIdleAnim = loadAnimation("assets/sprites/dummyIdle/dummyIdle1.png", "assets/sprites/dummyIdle/dummyIdle2.png",
		"assets/sprites/dummyIdle/dummyIdle3.png", "assets/sprites/dummyIdle/dummyIdle4.png");

	dummyHitAnim = loadAnimation("assets/sprites/dummyHit/dummyHit.png");

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
	lobbyMusic = loadSound("assets/audio/lobbyMusic.mp3");

	//LOAD WEAPON ROOM ASSETS
	weaponBackground = loadImage("assets/sprites/weaponScreen/weaponBack.png");
}