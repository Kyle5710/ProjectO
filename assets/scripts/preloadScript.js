function preloadAssets() {
	//LOAD FONT
	font = loadFont("assets/font/font.ttf");

	//LOAD AUDIO
	enemyHit = loadSound("assets/audio/enemyHit.wav");
	playerAttack = loadSound("assets/audio/playerAttack.mp3");
	newRoom = loadSound("assets/audio/newRoom.mp3");
	playerStep = loadSound("assets/audio/playerStep.wav");
	cameraFlash = loadSound("assets/audio/cameraFlash.wav");
	obamaLeft = loadSound("assets/audio/obamaLeft.mp3");
	playerHurt = loadSound("assets/audio/playerHurt.wav");
	explosion = loadSound("assets/audio/explosion.mp3");
	click = loadSound("assets/audio/click.mp3");

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
	playerAttackUpAnim = loadAnimation("assets/sprites/playerAttack/playerUpMic1.png", "assets/sprites/playerAttack/playerUpMic2.png");
	playerAttackLeftAnim = loadAnimation("assets/sprites/playerAttack/playerLeftMic1.png", "assets/sprites/playerAttack/playerLeftMic2.png");
	playerAttackRightAnim = loadAnimation("assets/sprites/playerAttack/playerRightMic1.png", "assets/sprites/playerAttack/playerRightMic2.png");
	playerAttackDownAnim = loadAnimation("assets/sprites/playerAttack/playerDownMic1.png", "assets/sprites/playerAttack/playerDownMic2.png");

	//PLAYER DEATH SPRITE
	playerDeathAnim = loadAnimation("assets/sprites/playerDeath/playerDeath.png");

	//MIC ANIMS
	downMic = loadAnimation("assets/sprites/playerAttack/downMic1.png", "assets/sprites/playerAttack/downMic2.png");
	upMic = loadAnimation("assets/sprites/playerAttack/upMic1.png", "assets/sprites/playerAttack/upMic2.png");
	leftMic = loadAnimation("assets/sprites/playerAttack/leftMic1.png", "assets/sprites/playerAttack/leftMic2.png");
	rightMic = loadAnimation("assets/sprites/playerAttack/rightMic1.png", "assets/sprites/playerAttack/rightMic2.png");

	//LOAD DUMMY ASSETS
	dummyIdleAnim = loadAnimation("assets/sprites/dummyIdle/dummyIdle1.png", "assets/sprites/dummyIdle/dummyIdle2.png",
		"assets/sprites/dummyIdle/dummyIdle3.png", "assets/sprites/dummyIdle/dummyIdle4.png");
	dummyHitAnim = loadAnimation("assets/sprites/dummyHit/dummyHit.png");
	dummyMournAnim = loadAnimation("assets/sprites/dummyFamily/dummyMourn.png");

	//LOAD OBAMA ANIMS
	obamaDownAnim = loadAnimation("assets/sprites/obamaDown/obamaDown1.png", "assets/sprites/obamaDown/obamaDown2.png",
		"assets/sprites/obamaDown/obamaDown3.png", "assets/sprites/obamaDown/obamaDown4.png");
	obamaUpAnim = loadAnimation("assets/sprites/obamaUp/obamaUp1.png", "assets/sprites/obamaUp/obamaUp2.png",
		"assets/sprites/obamaUp/obamaUp3.png", "assets/sprites/obamaUp/obamaUp4.png");
	obamaIdleAnim = loadAnimation("assets/sprites/obamaIdle/obamaIdle1.png", "assets/sprites/obamaIdle/obamaIdle2.png",
		"assets/sprites/obamaIdle/obamaIdle3.png", "assets/sprites/obamaIdle/obamaIdle4.png");

	//LOAD BOSS OBAMA ANIMS
	obamaJetpack = loadAnimation("assets/sprites/obamaJetpack/obamaJetpack1.png", "assets/sprites/obamaJetpack/obamaJetpack2.png");

	//PORTRAITS
	angry = loadImage("assets/sprites/portraits/angry.png");
	appalled = loadImage("assets/sprites/portraits/appalled.png");
	confused = loadImage("assets/sprites/portraits/confused.png");
	happy = loadImage("assets/sprites/portraits/happy.png");
	neutral = loadImage("assets/sprites/portraits/neutral.png");
	shock = loadImage("assets/sprites/portraits/shock.png");
	sansundertale = loadImage("assets/sprites/portraits/sansundertale.png");
	facepalm = loadImage("assets/sprites/portraits/facepalm.png");

	dummyAppalled = loadImage("assets/sprites/portraits/dummy.png");

	//LOAD TITLE SCREEN ASSETS
	userCursor = loadImage("assets/sprites/cursor.png");
	titleBackground = loadImage("assets/sprites/titleScreen/titleBack.png");
	titleButton = loadImage("assets/sprites/titleScreen/titleButton.png");
	titleButtonHover = loadImage("assets/sprites/titleScreen/titleButtonHover.png");
	titleLogo = loadImage("assets/sprites/titleScreen/titleLogo.png");
	buttonSound = loadSound("assets/audio/startButton.wav");
	titleMusic = loadSound("assets/audio/titleMusic.wav");

	//LOAD YAPPING ASSETS
	yappingBack1 = loadImage("assets/sprites/yappingScreen/yap1.png");
	yappingBack2 = loadImage("assets/sprites/yappingScreen/yap2.png");
	yappingBack3 = loadImage("assets/sprites/yappingScreen/yap3.png");
	yappingBack4 = loadImage("assets/sprites/yappingScreen/yap4.png");
	yappingBack5 = loadImage("assets/sprites/yappingScreen/yap5.png");

	//LOAD TUTORIAL ROOM ASSETS
	tutorialBackground = loadImage("assets/sprites/tutorialScreen/tutorialBack.png");
	lobbyMusic = loadSound("assets/audio/lobbyMusic.mp3");

	//LOAD WEAPON ROOM ASSETS
	weaponBackground = loadImage("assets/sprites/weaponScreen/weaponBack.png");
	textBox = loadImage("assets/sprites/textBox.png");
	yapBox = loadImage("assets/sprites/yapBox.png");

	//BOSS ROOM ASSETS
	bossBackground = loadImage("assets/sprites/bossScreen/bossBack.png");
	bossMusic = loadSound("assets/audio/bossMusic.mp3");

	//STAGE ROOM ASSETS
	stageBackground = loadImage("assets/sprites/stageScreen/stageBack.png");
	stageDarkBackground = loadImage("assets/sprites/stageScreen/stageDark.png");

	blueButtonUp = loadAnimation("assets/sprites/buttons/blueUp.png");
	blueButtonDown = loadAnimation("assets/sprites/buttons/blueDown.png");
	greenButtonUp = loadAnimation("assets/sprites/buttons/greenUp.png");
	greenButtonDown = loadAnimation("assets/sprites/buttons/greenDown.png");
	purpleButtonUp = loadAnimation("assets/sprites/buttons/purpleUp.png");
	purpleButtonDown = loadAnimation("assets/sprites/buttons/purpleDown.png");
	redButtonUp = loadAnimation("assets/sprites/buttons/redUp.png");
	redButtonDown = loadAnimation("assets/sprites/buttons/redDown.png");
	yellowButtonUp = loadAnimation("assets/sprites/buttons/yellowUp.png");
	yellowButtonDown = loadAnimation("assets/sprites/buttons/yellowDown.png");

	arrow = loadImage("assets/sprites/arrow.png");

	dummyKidsIdle = loadAnimation("assets/sprites/dummyFamily/dummyKids1.png", "assets/sprites/dummyFamily/dummyKids2.png",
		"assets/sprites/dummyFamily/dummyKids3.png", "assets/sprites/dummyFamily/dummyKids4.png");
	dummyKidsDeath = loadAnimation("assets/sprites/dummyFamily/dummyKidsDeath.png");
	dummyWifeIdle = loadAnimation("assets/sprites/dummyFamily/dummyWife1.png", "assets/sprites/dummyFamily/dummyWife2.png",
		"assets/sprites/dummyFamily/dummyWife3.png", "assets/sprites/dummyFamily/dummyWife4.png");
	dummyWifeDeath = loadAnimation("assets/sprites/dummyFamily/dummyWifeDeath.png");

	gameshowMusic = loadSound("assets/audio/gameshow.mp3");
	gameshowChoice = loadSound("assets/audio/choice.mp3");

	//LOAD HALLWAYS ASSETS
	hallwayBackground = loadImage("assets/sprites/hallway/hallway.png");
	longHallwayBackground = loadImage("assets/sprites/hallway/longHallway.png");
	hallwayCurveBackground = loadImage("assets/sprites/hallway/hallwayCurve.png");
	hallwaysMusic = loadSound("assets/audio/hallwaysMusic.mp3");

	//LOAD BOSS2 ROOM ASSETS
	peakObamaIdle = loadAnimation("assets/sprites/peakObama/peakObama.png");

	obamaProjectile = loadAnimation("assets/sprites/peakObama/projectile.png");

	//LOAD YOU SUCK ROOM ASSETS
	youSuckBackground = loadImage("assets/sprites/youSuckScreen/youSuckBackground.png");
}