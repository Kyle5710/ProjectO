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
    bossMusic.setVolume(0.4); bossMusic.setLoop(true);
    gameshowMusic.setVolume(0.5); gameshowMusic.setLoop(true);
    gameshowChoice.setVolume(0.6); gameshowChoice.setLoop(true);
    hallwaysMusic.setVolume(1); hallwaysMusic.setLoop(true);

    enemyHit.setVolume(0.4);
    playerHurt.setVolume(1);
    playerAttack.setVolume(1);
    newRoom.setVolume(0.7); newRoom.setLoop(false);
    playerStep.setVolume(0.6); playerStep.setLoop(false);
    obamaLeft.setVolume(0.7); obamaLeft.setLoop(false);
    click.setVolume(1);
    explosion.setVolume(1);

    //put sprites off-screen so not shown during title/intro
    player = createSprite(1000, 1000, 22, 44, "s");
    dummy = createSprite(1000, 1000, 40, 60, "s");
    weaponObama = createSprite(1000, 1000, 84, 160, "s");
    bossObama = createSprite(1000, 1000, 36, 70, "s");

    //same thing for dummies + gameshow crowd but here cause too small for a whole class
    dummyKids = createSprite(1000, 1000, 108, 84, "s");
    dummyKids.addAnimation("dummyKidsDeath", dummyKidsDeath);
    dummyKids.addAnimation("dummyKidsIdle", dummyKidsIdle);

    dummyWife = createSprite(1000, 1000, 88, 152, "s");
    dummyWife.addAnimation("dummyWifeDeath", dummyWifeDeath);
    dummyWife.addAnimation("dummyWifeIdle", dummyWifeIdle);

    dummyKidsIdle.frameDelay = dummyWifeIdle.frameDelay = 15;

    carlos = createSprite(1000, 1000, 272, 212, "s");
    carlos.addAnimation("carlosIdle", carlosIdle);

    edward = createSprite(1000, 1000, 128, 256, "s");
    edward.addAnimation("edwardIdle", edwardIdle);

    godfrey = createSprite(1000, 1000, 80, 120, "s");
    godfrey.addAnimation("godfreyIdle", godfreyIdle);

    tv = createSprite(1000, 1000, 208, 110, "s");
    tv.addAnimation("tvGood", tvGood);
    tv.addAnimation("tvDummy", tvDummy);
    tv.addAnimation("tvDoor", tvDoor);
    tv.addAnimation("tvOff", tvOff);


    //create classes
    playerClass = new Player(width / 2, height / 2, player);
    dummyClass = new Dummy(width / 2, height / 2, dummy, player);
    weaponObamaClass = new WeaponObama(width / 2, 10, weaponObama, player);
    bossObamaClass = new BossObama(width / 2, -50, bossObama, player);
    barrierManager = new BarrierManager();

    //hallway barriers
    barrierManager.addBarrier(0, 0, 260, 1000, "Obama");
    barrierManager.addBarrier(400, 0, 260, 1000, "Obama");

    //button barrier
    barrierManager.addBarrier(0, 0, 1000, 130, "Button");

    //longHallway1 barriers
    barrierManager.addBarrier(0, -25, 1000, 100, "longHallway");
    barrierManager.addBarrier(0, 265, 1000, 100, "longHallway");

    //longHallway2 barriers (really bad wait for actual bg to fix)
    barrierManager.addBarrier(-100, 265, 1000, 100, "longHallway2");
    barrierManager.addBarrier(-340, -25, 640, 100, "longHallway2");
    barrierManager.addBarrier(367, 0, 260, 1000, "longHallway2");

    //longHallway3 barriers
    barrierManager.addBarrier(0, 0, 260, 1000, "longHallway3");
    barrierManager.addBarrier(400, 0, 260, 1000, "longHallway3");

    currentMusic = titleMusic;
    titleButtonMode = titleButton;
}
