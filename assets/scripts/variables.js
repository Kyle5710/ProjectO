//PLAYER
let player;
let lastDir = "Up"; //stores last direction player moved in
let canMove = false; //if player can move
let stepSound = false; //player step sfx
let playerBuff = false;
let playerDebuff = false;
let playerDamage = 1;

//DUMMY
let dummy;

//MICROPHONE
let mic;

//SPEEDRUN TIMER
let speedrunStart;
let speedrunEnd;

//OBAMA
let weaponObama; //obama room
let bossObama; //boss room
let peakObama; //boss2 room

//PORTRAIT
let showPortrait = false;

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
let speedrunTimerVisible = false;

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
let obamaDialogue = ["", "WOAHH!!!", "Who are you supposed to be?", "A reporter?", "Hmph.", "Well unfortunately, I'm quite busy at the moment.",
	"Presidential duties or whatever...", "If you excuse me, I'll be leaving now."];

//BOSS ROOM
let bossObamaEvent = true;
let bossDialogue = ["", "You're quite persistent.", "What's your problem anyway?", "Oh, you want to know my last name?", "Unfortunately, I can't tell you that.",
	"GUARDS, ARREST THIS MAN!!!", "...", "They appear to be unresponsive.", "...", "I knew hiring Carson was a mistake.", "...", "Hey, why are you looking at me like that?",
	"I've watched Karate Kid before...", "I'm pretty dangerous you know.", "...", "Alright, square up then!"];

let boss2Dialogue = ["", "What a brave and confident soul.", "Wandering further into the White House.",
	"However, your journey ends here.", "Nobody will ever learn my last name.", "Not you,", "or my guards,", "especially Carson...", "(I should've never hired that useless-)",
	"ANYWAYS,", "PREPARE FOR MY ULTIMATE ATTACK!", "THE EXACT SAME THING BUT FASTER!", "Wait.", "WHAT.", "We really didn't have the budget for a new attack?",
	"Really?", "THIS IS YOUR FAULT!"];

//BUTTON ROOM
let buttonEvent = true;
let darkStage = true;
let buttonState = "setButtons";
let buttonDialogueRunning = false;
let currentButton = null; //stores dialogue of last button hit
let buttonsDialogue = [];
let buttons = []; //where the randomized buttons end up

let dummyKids; //vars for the dummies in the crowd
let dummyWife;
let tv; //tv in gameshow
let carlos; //npcs
let edward;
let godfrey;
let crug;
let sans;
let health;

let canLeaveButton = false; //if player has hit the button to leave the room yet

//dialogue upon entering room
let buttonDialogue = ["", "*Ahem*", "WELCOME TO OBAMA'S GAMESHOW!", "TODAY WE HAVE AN UNEXPECTED,",
	"and rather intrusive...", "CONTESTANT!!!", "CARSON HIT THE LIGHTS!!!", "...", "HIT THE LIGHTS!", "...",
	"CARSON YOU NEED TO PLUG IT IN,", "THERE'S A CORD RIGHT IN FRONT OF YOU!", "*sigh* let me just do it...", "*click*",
	"ANYWAYS,", "THERE ARE 5 BUTTONS BEFORE YOU,", "AND DEPENDING ON WHICH ONE YOU PICK,",
	"SOMETHING WILL HAPPEN!!!", "WITHOUT FURTHER ADO...", "GET UP THERE AND HIT A BUTTON!"];

//LONGHALLWAY ROOMS
let longHallwayEvent = true;
let longHallway2Event = true;
let longHallway3Event = true;
let dummyKilled = false;

//BOSS2 ROOM
let peakObamaEvent = true;

//YOUSUCK ROOM
let timerStart = 0;
let timerDuration = 3000;
let timerStarted = false;

//STATE VARS
let currentBackground, currentScene, currentMusic, currentPortrait;

//helps manage classEvents()
const excludedRooms = ["Yapping", "Title", "Obama", "YOUSUCK", "longHallway", "longHallway2", "longHallway3"];