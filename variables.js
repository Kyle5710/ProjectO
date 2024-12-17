//PLAYER
let player;
let lastDir = "Up"; //stores last direction player moved in
let canMove = false; //if player can move

//DUMMY
let dummy;

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

//YAPPING ROOM
let yapDialogue = ["", "Once upon a time,", "a journalist named Armando",
	"was assigned an important mission.", "To find out Obama's last name,",
	"once and for all."];
let currentLine = 0;
let delay = 2000; //delay between dialogue lines
let lastChangeTime = 0;

//TUTORIAL ROOM
let tutorialBackground;

//WEAPON ROOM
let weaponBackground;

//STATE VARS
let currentBackground, currentScene, currentMusic;

//STORES BARRIERS
let barrierManager;