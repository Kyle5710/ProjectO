function determineEvents() {
	//background
	if (currentBackground) {
		background(currentBackground);
	}

	//set font
	textFont(font);

	//music
	playMusic();

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
		image(titleButtonMode, width / 2, 300); //x = width/2, y = 300, width = 254, height = 82
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
			if (currentLine === 0) {
				currentBackground = yappingBack1;
			}
			if (currentLine === 1) {
				currentBackground = yappingBack2;
			}
			if (currentLine === 2) {
				currentBackground = yappingBack3;
			}
			if (currentLine === 3) {
				currentBackground = yappingBack4;
			}

			if (currentLine === 4) {
				textSize(40);
				fill("red");
				currentBackground = yappingBack5;
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
			if (!canMove) {
				playerClass.display(dummyClass);
			}
			bossObamaClass.update();
		}
	}

	//LOSE SCREEN
	if (currentScene === "YOUSUCK") {
		if (!timerStarted) {
			timerStart = millis();
			timerStarted = true;
		}

		let elapsedTime = millis() - timerStart;
		let remainingTime = timerDuration - elapsedTime;

		allSprites.remove();

		canMove = false;
		playerClass.player.position.set(-1000, -1000);
		player.changeAnimation("playerDeath");

		currentBackground = youSuckBackground;
		rect(0, 0, width, height);

		textAlign(CENTER, CENTER);
		textSize(30);
		fill(255);

		if (remainingTime > 0) {
			let secondsLeft = Math.ceil(remainingTime / 1000); //convert to secs
			text("Dang, you suck.", width / 2, height / 2 - 60)
			text("Travelling back in time in " + secondsLeft + " seconds.", width / 2, height / 2);
		}

		else {
			text("Good Luck!", width / 2, height / 2);
		}

		if (remainingTime <= 0) {
			location.reload();
		}
	}

	//when tran = true
	sceneTransition();
}