function determineEvents() {
	//background
	if (currentBackground) {
		background(currentBackground);
	}

	//set font
	textFont(font);

	/* //music
	currentMusic.play(); */

	//TITLE ROOM
	if (currentScene === "Title") {
		//display title background
		currentBackground = titleBackground;

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
		let dialogue = yapDialogue[currentLine];
		let wrappedText = wrapText(dialogue, 440); //max width
		let yPos = 327; //vertical distance between lines

		//textbox
		imageMode(CENTER);
		image(yapBox, width / 2, 320, 460, 60);
		imageMode(NORMAL);

		//text
		textAlign(LEFT);
		for (let i = 0; i < wrappedText.length; i++) {
			//display lines
			text(wrappedText[i], width / 2 - 205, yPos);
			yPos += textLeading();
		}

		if (millis() - lastChangeTime > delay) {
			//events based on line #
			if (currentLine === 0){
				currentBackground = yappingBack1;
			}
			if (currentLine === 1){
				currentBackground = yappingBack2;
			}
			if (currentLine === 2){
				currentBackground = yappingBack3;
			}
			if (currentLine === 3){
				currentBackground = yappingBack4;
			}

			if (currentLine === 4) {
				currentBackground = yappingBack5;
				textSize(40);
				fill("red");
			}

			else if (currentLine === 5) {
				//transition to tutorial room here
				nextScene = "Tutorial";
				canMove = false;
				tran = true;

				//reset textSize
				textSize(30);
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
		currentBackground = tutorialBackground;

		if (tutorialEvent) {
			canMove = false;
			player.changeAnimation("playerIdleUp");
			playerClass.display(dummyClass);
		}

		else {
			canMove = true;
		}

		/* //set music
		currentMusic.pause();
		currentMusic = lobbyMusic;
		currentMusic.play(); */
	}

	//OBAMA ROOM
	if (currentScene === "Obama") {
		currentBackground = weaponBackground;

		if (obamaEvent) {
			player.changeAnimation("playerIdleUp");
			playerClass.display(dummyClass);
		}
	}

	//WEAPON ROOM
	if (currentScene === "Weapon") {
		currentBackground = weaponBackground;

		if (weaponEvent) {
			canMove = false;
			player.changeAnimation("playerIdleUp");
			playerClass.display(dummyClass);
		}

		else {
			canMove = true;
		}

	}

	//BOSS ROOM
	if (currentScene === "Boss") {
		currentBackground = weaponBackground;

		if (bossObamaEvent) {
			canMove = false;
			player.changeAnimation("playerIdleUp");
			playerClass.display(dummyClass);
		}
	}

	//when tran = true
	sceneTransition();
}