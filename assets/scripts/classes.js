class Player {
	constructor(xPos, yPos, player) {
		this.x = xPos;
		this.y = yPos;
		this.player = player;
		this.speed = 3;
		this.velocity = createVector(0, 0);

		//add animations to player sprite
		player.addAnimation("playerUp", playerUpAnim);
		player.addAnimation("playerDown", playerDownAnim);
		player.addAnimation("playerLeft", playerLeftAnim);
		player.addAnimation("playerRight", playerRightAnim);
		player.addAnimation("playerIdleDown", playerIdleDownAnim);
		player.addAnimation("playerIdleUp", playerIdleUpAnim);
		player.addAnimation("playerIdleLeft", playerIdleLeftAnim);
		player.addAnimation("playerIdleRight", playerIdleRightAnim);

		//frame rate for animations
		playerUpAnim.frameDelay = playerDownAnim.frameDelay = playerLeftAnim.frameDelay = playerRightAnim.frameDelay = 12;
		playerIdleDownAnim.frameDelay = playerIdleUpAnim.frameDelay = playerIdleLeftAnim.frameDelay = playerIdleRightAnim.frameDelay = 24;
	}

	move() {
		this.velocity.set(0, 0); //reset velocity each frame

		// temp movement dir
		let moveX = 0;
		let moveY = 0;

		//set movement

		if (keyIsDown(69)) {
			if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // UP
				this.player.changeAnimation("playerUp");
				moveY = -1;
				lastDir = "Up";
			}

			else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // DOWN
				this.player.changeAnimation("playerDown");
				moveY = 1;
				lastDir = "Down";
			}

			else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // LEFT
				this.player.changeAnimation("playerLeft");
				moveX = -1;
				lastDir = "Left";
			}

			else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // RIGHT
				this.player.changeAnimation("playerRight");
				moveX = 1;
				lastDir = "Right";
			}

			else if (!keyIsPressed) { // IDLE
				this.player.changeAnimation("playerIdle" + lastDir);
			}
		}

		else if (!keyIsDown(69)) {
			if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // UP
				this.player.changeAnimation("playerUp");
				moveY = -1;
				lastDir = "Up";
			}

			else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // DOWN
				this.player.changeAnimation("playerDown");
				moveY = 1;
				lastDir = "Down";
			}

			else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // LEFT
				this.player.changeAnimation("playerLeft");
				moveX = -1;
				lastDir = "Left";
			}

			else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // RIGHT
				this.player.changeAnimation("playerRight");
				moveX = 1;
				lastDir = "Right";
			}

			else if (!keyIsPressed) { // IDLE
				this.player.changeAnimation("playerIdle" + lastDir);
			}
		}


		//normalize velocity
		let tempVelocity = createVector(moveX, moveY);
		tempVelocity.normalize();
		tempVelocity.mult(this.speed);

		//check for collision
		let canMoveX = !this.checkCollision(tempVelocity.x, 0); //horizontal
		let canMoveY = !this.checkCollision(0, tempVelocity.y); //vertical

		//if no collision then move
		if (canMoveX) {
			this.velocity.x = tempVelocity.x;
		}

		if (canMoveY) {
			this.velocity.y = tempVelocity.y;
		}

		//apply movement
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		//border check
		this.x = constrain(this.x, 20, 620);
		this.y = constrain(this.y, 30, 281);

		// Checking room transition
		if (this.x >= 296 && this.x <= 344 && this.y <= 31) {

			if (currentScene !== "Boss") {
				this.x = this.y = 1000; //move player offscreen
				canMove = false; //prevent player movement
				tran = true; //run fade transition

				if (currentScene === "Tutorial") {
					nextScene = "Weapon";
				}

				else if (currentScene === "Weapon") {
					nextScene = "Boss";
				}
			}
		}
	}

	checkCollision(moveX, moveY) {
		//temp hitbox
		let nextX = this.x + moveX;
		let nextY = this.y + moveY;

		for (let barrier of barrierManager.barriers) {
			if (barrier.playerCollision({ x: nextX, y: nextY, width: this.player.width, height: this.player.height })) { //W youtube tutorial
				return true; //collision
			}
		}
		return false; //no collision
	}

	spawnPos() {
		this.y = 269;
		this.x = width / 2;
	}

	display() {
		//rotates player when he gets near the dummy if this isnt here idk why
		this.player.rotation = 0;
		this.player.position.set(this.x, this.y);
	}

	update() {
		this.move();
		this.display();
	}
}

class Dummy {
	constructor(xPos, yPos, dummy) {
		this.x = xPos;
		this.y = yPos;
		this.dummy = dummy;
		this.hit = false;

		//load dummy animations
		dummy.addAnimation("dummyIdle", dummyIdleAnim);
		dummy.addAnimation("dummyHit", dummyHitAnim);

		dummyIdleAnim.frameDelay = 24;
		dummyHitAnim.frameDelay = 1;
	}

	animations() {
		//rotates when player gets close if this isnt here for some reason idk why
		this.dummy.rotation = 0;

		if (this.hit) {
			this.dummy.changeAnimation("dummyHit");
		}

		else {
			this.dummy.changeAnimation("dummyIdle");
		}

		//make the player go above the dummy if in front of it
		//behind the dummy if behind it
		if (playerClass.player.y < this.y) {
			playerClass.player.layer = 0;
			this.dummy.layer = 1;
		}

		else {
			playerClass.player.layer = 1;
			this.dummy.layer = 0;
		}
	}

	position() {
		if (currentScene === "Weapon") { //only shown in weapon room
			this.dummy.position.set(this.x, this.y);

			if (tran) {
				this.dummy.position.set(1000, 1000);
			}
		}
	}

	spawnPos() {
		this.x = 500;
		this.y = height / 2;
	}

	update() {
		this.animations();
		this.position();
	}
}

class Barrier {
	constructor(xPos, yPos, width, height, scene) {
		this.x = xPos;
		this.y = yPos;
		this.width = width;
		this.height = height;
		this.scene = scene;
		this.barrier = createSprite(this.x, this.y, this.width, this.height);
		this.barrier.visible = false; //start hidden (debug var delete when done)
		this.active = false; //start inactive
	}

	setActive(isActive) {
		this.active = isActive;
		this.barrier.rotation = 0; //prevent rotation

		if (isActive) {
			this.barrier.position.set(this.x, this.y);  //set to original position
			//this.barrier.visible = true;
		}

		else {
			this.barrier.position.set(-1000, -1000);  //move off screen
			//this.barrier.visible = false;
		}
	}

	playerCollision(player) {
		if (!this.active) {
			return false; //barrier isnt active then ignore it
		}

		//W youtube tutorial
		let playerRect = {
			x: player.x,
			y: player.y,
			width: player.width,
			height: player.height
		};

		let barrierRect = {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height
		};

		if (collideRectRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height, barrierRect.x, barrierRect.y, barrierRect.width, barrierRect.height)) {
			return true; //collision detected
		}

		return false; //no collision
	}
}

class BarrierManager {
	constructor() {
		this.barriers = []; //array for barriers
	}

	addBarrier(x, y, w, h, scene) { //add and push barrier to array
		let newBarrier = new Barrier(x, y, w, h, scene);
		this.barriers.push(newBarrier);
	}

	updateBarState(currentState) {
		//check for correct scene, if so, barriers become active
		for (let barrier of this.barriers) {
			let isActive = barrier.scene === currentState;
			barrier.setActive(isActive);
		}
	}
}