function setupFunction() {
    createCanvas(640, 360, WEBGL);
    displayMode("centered", "pixelated");
    noStroke();
    noCursor();
    pixelDensity(1);

    //font
    textSize(30);

    //text spacing
    textLeading(30);

    //audio volumes
    titleMusic.setVolume(1); titleMusic.setLoop(true);
    lobbyMusic.setVolume(1); lobbyMusic.setLoop(true);

    enemyHit.setVolume(0.4);
    playerAttack.setVolume(1);
    newRoom.setVolume(0.7);
    playerStep.setVolume(0.6); playerStep.setLoop(false);
    obamaLeft.setVolume(0.7); obamaLeft.setLoop(false);

    //put sprites off-screen so not shown during title/intro
    player = createSprite(1000, 1000, 80, 151, "s");
    dummy = createSprite(1000, 1000, 40, 60, "s");
    weaponObama = createSprite(1000, 1000, 84, 160, "s");

    //create classes
    playerClass = new Player(width / 2, height / 2, player);
    dummyClass = new Dummy(width / 2, height / 2, dummy, player);
    weaponObamaClass = new WeaponObama(width / 2, 10, weaponObama, player);
    barrierManager = new BarrierManager();

    //dummy barrier
    //barrierManager.addBarrier(550, 280, -20, -50, "Weapon");

    //set initial vars
    titleButtonMode = titleButton;
    currentScene = "Title";
    currentMusic = titleMusic;
}
