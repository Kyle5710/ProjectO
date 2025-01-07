function setupFunction() {
    displayMode("centered", "pixelated");
    noStroke();
    noCursor();
    pixelDensity(1);

    //font
    textSize(30);

    //text spacing
    textLeading(30);

    //audio volumes
    titleMusic.setVolume(0.7); titleMusic.setLoop(true);
    lobbyMusic.setVolume(0.7); lobbyMusic.setLoop(true);

    enemyHit.setVolume(0.4);
    playerHurt.setVolume(0.8);
    playerAttack.setVolume(1);
    newRoom.setVolume(0.7);
    playerStep.setVolume(0.6); playerStep.setLoop(false);
    obamaLeft.setVolume(0.7); obamaLeft.setLoop(false);

    //put sprites off-screen so not shown during title/intro
    player = createSprite(1000, 1000, 22, 44, "s");
    dummy = createSprite(1000, 1000, 40, 60, "s");
    weaponObama = createSprite(1000, 1000, 84, 160, "s");
    bossObama = createSprite(1000, 1000, 36, 70, "s");

    //create classes
    playerClass = new Player(width / 2, height / 2, player);
    dummyClass = new Dummy(width / 2, height / 2, dummy, player);
    weaponObamaClass = new WeaponObama(width / 2, 10, weaponObama, player);
    bossObamaClass = new BossObama(width / 2, -50, bossObama, player);
    barrierManager = new BarrierManager();

    //hallway barriers
    barrierManager.addBarrier(0, 0, 260, 1000, "Obama");
    barrierManager.addBarrier(400, 0, 260, 1000, "Obama");

    currentMusic = titleMusic;
    titleButtonMode = titleButton;
}
