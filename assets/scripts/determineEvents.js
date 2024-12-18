function determineEvents() {
	//set font
	textFont(font);

	//background
	if (currentBackground) {
		background(currentBackground);
	}

	//TITLE ROOM
	if (currentScene === "Title") {
		//display title background
		currentBackground = titleBackground;

		//music
		//currentMusic.play();

		//move logo position
		logoPos = moveLogo(logoPos);

		//check if mouse hovering over play button
		titleHover();

		//display images
		imageMode(CENTER);
		image(titleButtonMode, width / 2, 300); // x = width/2, y = 300, width = 254, height = 82
		image(titleLogo, width / 2, logoPos, 300, 140);
		imageMode(NORMAL);

		//display cursor
		image(userCursor, mouseX, mouseY, 33, 33);
	}

	//YAPPING ROOM
	if (currentScene === "Yapping") {
		currentBackground = yappingBack;

		//display text
		textAlign(CENTER, BOTTOM);
		text(yapDialogue[currentLine], width / 2, 340);

		//change the lines in the dialogue based of delay var
		if (millis() - lastChangeTime > delay) {
			//events based on line #
			if (currentLine === 4) {
				fill("red");
			}

			else if (currentLine === 5) {
				//transition to tutorial room here
				nextScene = "Tutorial";
				canMove = false;
				tran = true;
			}

			else {
				fill("white");
			}

			buttonSound.play(); //sfx
			currentLine = (currentLine + 1) % yapDialogue.length; //loops through array infinitely
			lastChangeTime = millis();
		}

		//display cursor
		image(userCursor, mouseX, mouseY, 33, 33);
	}

	//TUTORIAL ROOM
	if (currentScene === "Tutorial") {
		//player can move from here all the way to the boss room
		currentBackground = tutorialBackground;
		currentMusic.pause();
		currentMusic = lobbyMusic;
		//currentMusic.play();
	}

	//WEAPON ROOM
	if (currentScene === "Weapon") {
		currentBackground = weaponBackground;
	}

	if (currentScene === "Boss") {
		currentBackground = tutorialBackground;
	}

    //transition ready for when tran = true
	sceneTransition();
}