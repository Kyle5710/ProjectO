//PLAYER
let player;
let lastDir = "Up"; //stores last direction player moved in
let canMove = false; //if player can move
let stepSound = false; //player step sfx

//DUMMY
let dummy;

//MICROPHONE
let mic;

//OBAMA
let weaponObama; //obama room
let bossObama; //boss room

//STORES BARRIERS
let barrierManager;

//FADE TRANSITION
let tranAlpha = 0;
let tran = false; //if a transition is happening or not
let fadeDur = 1000;
let nextScene = "";

//TITLE ROOM
let titleBackground, titleButton, titleMusic;
let logoPos = 100; //initial y pos of logo
let logoDir = true; //direction of logo
let buttonHover = false; //mouse over button
let tutorialEvent = true;

//YAPPING ROOM
let yapDialogue = ["", "Once upon a time,", "a journalist named Armando",
	"was assigned an important mission.", "To find out Obama's last name,",
	"once and for all."];
let currentLine = 0;
let delay = 2000; //delay between dialogue lines  originally 2000 btw
let lastChangeTime = 0;
let back = 0;

//TUTORIAL ROOM
let tutorialBackground;

//WEAPON ROOM
let weaponBackground;
let weaponEvent = true;

//OBAMA ROOM
let obamaEvent = true; //prevent player from moving during event
let obamaDialogue = ["", "WOAHH!!!", "Who are you supposed to be?", "A reporter?", "Hmph.", "Well, unfortunately I'm quite busy at the moment.",
	"Presidential duties or whatever...", "If you excuse me, I'll be leaving now."];

//BOSS ROOM
let bossObamaEvent = true;
let bossDialogue = ["", "You're persistent aren't you?", "What do you want anyway?", "My last name!!!", "Nah gang that's been kept under wraps for years",
	"YO GUARDS BEAT HIS ASS!", "...", "They seem to be unresponsive.", "...", "I knew hiring Carson was a mistake.", "...", "Hey, why you looking at me like that?",
	"I've watched Karate Kid before...", "I'm pretty dangerous you know.", "...", "Alright, wassup then!"];

//BUTTON ROOM
let buttonEvent = true;
let buttonDialogue = ["", "This is button dialogue replace it later on."];

//YOUSUCK ROOM
let timerStart = 0;
let timerDuration = 5000;
let timerStarted = false;

//STATE VARS
let currentBackground, currentScene, currentMusic;
