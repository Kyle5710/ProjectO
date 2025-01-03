function setupFunction() {
    createCanvas(640, 360, WEBGL);
    displayMode("centered", "pixelated");
    noStroke();
    noCursor();
    pixelDensity(1);

    //properties
    textSize(40);
    titleMusic.setVolume(1); titleMusic.setLoop(true);
    lobbyMusic.setVolume(1); lobbyMusic.setLoop(true);

    //put sprites off-screen so not shown during title/intro
    player = createSprite(1000, 1000, 80, 151, "s");
    dummy = createSprite(1000, 1000, 40, 60, "s");

    //create classes
    playerClass = new Player(width / 2, height / 2, player);
    dummyClass = new Dummy(width / 2, height / 2, dummy, player);
    barrierManager = new BarrierManager();

    //dummy barrier
    barrierManager.addBarrier(550, 280, -20, -50, "Weapon");

    //set initial vars
    titleButtonMode = titleButton;
    currentScene = "Title";
    currentMusic = titleMusic;
}
