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

	//PLAYER ATTACK ANIMS
	playerUpAttackAnim = loadAnimation("assets/sprites/playerAttack/playerUpMic1.png", "assets/sprites/playerAttack/playerUpMic2.png");

	playerLeftAttackAnim = loadAnimation("assets/sprites/playerAttack/playerLeftMic1.png", "assets/sprites/playerAttack/playerLeftMic2.png");

	playerRightAttackAnim = loadAnimation("assets/sprites/playerAttack/playerRightMic1.png", "assets/sprites/playerAttack/playerRightMic2.png");

	playerDownAttackAnim = loadAnimation("assets/sprites/playerAttack/playerDownMic1.png", "assets/sprites/playerAttack/playerDownMic2.png");

	//MIC ANIMS
	downMic = loadAnimation("assets/sprites/playerAttack/downMic1.png", "assets/sprites/playerAttack/downMic2.png");

	upMic = loadAnimation("assets/sprites/playerAttack/upMic1.png");

	leftMic = loadAnimation("assets/sprites/playerAttack/leftMic1.png", "assets/sprites/playerAttack/leftMic2.png");

	rightMic = loadAnimation("assets/sprites/playerAttack/rightMic1.png", "assets/sprites/playerAttack/rightMic2.png");

	//LOAD DUMMY ASSETS
	dummyIdleAnim = loadAnimation("assets/sprites/dummyIdle/dummyIdle1.png", "assets/sprites/dummyIdle/dummyIdle2.png",
		"assets/sprites/dummyIdle/dummyIdle3.png", "assets/sprites/dummyIdle/dummyIdle4.png");

	dummyHitAnim = loadAnimation("assets/sprites/dummyHit/dummyHit.png");

	//LOAD OBAMA ANIMATIONS
	obamaDownAnim = loadImage("assets/sprites/obamaDown/obamaDown1.png", "assets/sprites/obamaDown/obamaDown2.png",
		"assets/sprites/obamaDown/obamaDown3.png", "assets/sprites/obamaDown/obamaDown4.png",)

	obamaUpAnim = loadImage("assets/sprites/obamaUp/obamaUp1.png", "assets/sprites/obamaUp/obamaUp2.png",
		"assets/sprites/obamaUp/obamaUp3.png", "assets/sprites/obamaUp/obamaUp4.png",)

	//LOAD TITLE SCREEN ASSETS
	userCursor = loadImage("assets/sprites/cursor.png");
	titleBackground = loadImage("assets/sprites/titleScreen/titleBack.png");
	titleButton = loadImage("assets/sprites/titleScreen/titleButton.png");
	titleButtonHover = loadImage("assets/sprites/titleScreen/titleButtonHover.png");
	titleLogo = loadImage("assets/sprites/titleScreen/titleLogo.png");
	buttonSound = loadSound("assets/audio/startButton.wav");
	titleMusic = loadSound("assets/audio/titleMusic.wav");

	//LOAD YAPPING ASSETS
	yappingBack1 = loadImage("assets/yappingScreen/yap1.png");
	yappingBack2 = loadImage("assets/yappingScreen/yap2.png");
	yappingBack3 = loadImage("assets/yappingScreen/yap3.png");
	yappingBack4 = loadImage("assets/yappingScreen/yap4.png");
	yappingBack5 = loadImage("assets/temporaryArt.jpeg");

	//LOAD TUTORIAL ROOM ASSETS
	tutorialBackground = loadImage("assets/sprites/tutorialScreen/tutorialBack.png");
	lobbyMusic = loadSound("assets/audio/lobbyMusic.mp3");

	//LOAD WEAPON ROOM ASSETS
	weaponBackground = loadImage("assets/sprites/weaponScreen/weaponBack.png");
}