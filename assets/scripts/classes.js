class Player {
	constructor(xPos, yPos, player, micHitbox) {
		this.x = xPos;
		this.y = yPos;
		this.player = player;
		this.speed = 3;
		this.velocity = createVector(0, 0);
		this.isAttacking = false;
		this.attackStartTime = 0;
		this.attackCooldown = 10; //milliseconds

		//add animations to player sprite
		player.addAnimation("playerUp", playerUpAnim);
		player.addAnimation("playerDown", playerDownAnim);
		player.addAnimation("playerLeft", playerLeftAnim);
		player.addAnimation("playerRight", playerRightAnim);
		player.addAnimation("playerIdleDown", playerIdleDownAnim);
		player.addAnimation("playerIdleUp", playerIdleUpAnim);
		player.addAnimation("playerIdleLeft", playerIdleLeftAnim);
		player.addAnimation("playerIdleRight", playerIdleRightAnim);

		player.addAnimation("playerAttackUp", playerAttackUpAnim);
		player.addAnimation("playerAttackDown", playerAttackDownAnim);
		player.addAnimation("playerAttackRight", playerAttackRightAnim);
		player.addAnimation("playerAttackLeft", playerAttackLeftAnim);

		//frame rate for animations
		playerUpAnim.frameDelay = playerDownAnim.frameDelay = playerLeftAnim.frameDelay = playerRightAnim.frameDelay = 15;
		playerIdleDownAnim.frameDelay = playerIdleUpAnim.frameDelay = playerIdleLeftAnim.frameDelay = playerIdleRightAnim.frameDelay = 30;
		playerAttackDownAnim.frameDelay = playerAttackUpAnim.frameDelay = playerAttackLeftAnim.frameDelay = playerAttackRightAnim.frameDelay = 10;

		//mic instance
		this.mic = new Microphone();
	}

	move() {
		this.velocity.set(0, 0); //reset velocity each frame

		// temp movement dir
		let moveX = 0;
		let moveY = 0;

		//set movement
		if (!this.isAttacking) {
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

	attack() {
		if (this.isAttacking || millis() - this.attackStartTime < this.attackCooldown) {
			return;
		}

		//start attack
		this.isAttacking = true;
		this.attackStartTime = millis();

		//set up attack animations to use later
		const attackAnimations = {
			"Up": "playerAttackUp",
			"Down": "playerAttackDown",
			"Left": "playerAttackLeft",
			"Right": "playerAttackRight"
		};

		//set direction
		const currentAnimation = attackAnimations[lastDir];

		//set anim
		this.player.changeAnimation(currentAnimation);
		this.player.animation.frame = 0 //set to first frame
		this.player.animation.looping = false; //no looping
		this.player.animation.play(); //play

		//show mic
		this.mic.update(this.x, this.y, lastDir);

		const frameDelay = 10; //delay set for the attack anims
		const frameCount = 2;  //all attacks anims are 2 frames long
		this.attackDuration = frameDelay * frameCount; //duration calc

		//convert duration to 60fps
		const convertedDuration = (this.attackDuration / 60) * 1000;

		//attack is complete
		setTimeout(() => {
			this.resetAnimations();
			this.mic.hide();
		},
			convertedDuration);
	}

	resetAnimations() { //reset player animations to the idle ones
		this.isAttacking = false;
		this.player.changeAnimation(`playerIdle` + lastDir);
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

	display(dummy) {
		//rotates player when he gets near the dummy if this isnt here idk why
		this.player.rotation = 0;
		this.player.position.set(this.x, this.y);

		if (this.y < dummy.y - 20) {
			//player behind dummy
			this.mic.display();
			this.player.draw();
			dummy.dummy.draw();
		}

		else {
			//player in front of dummy
			dummy.dummy.draw();
			this.player.draw();
			this.mic.display();
		}
	}

	update(dummy) {
		if (keyIsDown(69) && !this.isAttacking) {
			this.attack();
		}

		this.move();
		this.display(dummy);

		//reset mic hitbox so anims dont loop
		this.mic.reset();
	}
}

class Dummy {
	constructor(xPos, yPos, dummy, player) {
		this.x = xPos;
		this.y = yPos;
		this.dummy = dummy;
		this.player = player;

		//load dummy animations
		dummy.addAnimation("dummyIdle", dummyIdleAnim);
		dummy.addAnimation("dummyHit", dummyHitAnim);

		dummy.changeAnimation("dummyIdle");

		dummyIdleAnim.frameDelay = 30;
		dummyHitAnim.frameDelay = 1;
	}

	animations() {
		//rotates when player gets close if this isnt here for some reason idk why
		this.dummy.rotation = 0;

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

class MicHitbox {
	constructor(mic, dummy) {
		this.mic = mic;
		this.dummy = dummy;
		this.offsets = { //hitbox offset
			"Up": { x: -2, y: 20, width: 50, height: 60 },
			"Down": { x: -2, y: -20, width: 50, height: 60 },
			"Left": { x: 10, y: 0, width: 60, height: 50 },
			"Right": { x: -10, y: 0, width: 60, height: 50 }
		};

		this.hitbox = createSprite(this.mic.position.x, this.mic.position.y, 20, 20, "s");
		this.hitbox.visible = false;
		this.hitDummy = false;
	}

	//reset mic hitbox so anims dont loop
	reset(){
		if(this.hitDummy){
			setTimeout(() => {
				this.hitDummy = false;
			}, 200); //200ms is the delay between enemy animations
		}

		else {
			this.dummy.changeAnimation("dummyIdle");
		}
	}

	update(direction) {
		if (this.mic && this.mic.position) {
			const offset = this.offsets[direction];
			this.hitbox.position.x = this.mic.position.x + offset.x;
			this.hitbox.position.y = this.mic.position.y + offset.y;
			this.hitbox.width = offset.width;
			this.hitbox.height = offset.height;
		}

		//check for collision with dummy using p5play2dcollision library
		if (collideRectRect(
			this.hitbox.position.x - this.hitbox.width / 2, this.hitbox.position.y - this.hitbox.height / 2,
			this.hitbox.width, this.hitbox.height,
			dummy.position.x - dummy.width / 2, dummy.position.y - dummy.height / 2,
			dummy.width, dummy.height
		) && !this.hitDummy) {
			
			this.dummy.changeAnimation("dummyHit"); //find dummyClass
			this.hitDummy = true;
		}
	}
}

class Microphone {
	constructor() {
		this.mic = createSprite(0, 0, "s");

		this.hitbox = new MicHitbox(this.mic, dummy); //hitbox for mic attacks

		//position offset
		this.offsets = {
			"Up": { x: 1, y: -48 },
			"Down": { x: 1, y: 40 },
			"Left": { x: -30, y: 5 },
			"Right": { x: 30, y: 5 }
		};

		//directional anims
		this.mic.addAnimation("micDown", downMic);
		this.mic.addAnimation("micUp", upMic);
		this.mic.addAnimation("micLeft", leftMic);
		this.mic.addAnimation("micRight", rightMic);

		//frame delay
		downMic.frameDelay = upMic.frameDelay = leftMic.frameDelay = rightMic.frameDelay = 10;

		//initially hide mic
		this.mic.visible = false;
	}

	update(playerX, playerY, direction) {
		//show mic
		this.mic.visible = true;

		//prevent rotation
		this.mic.rotation = 0;

		//directional offset
		const offset = this.offsets[direction];

		//update mic position based on offset
		this.mic.position.set(playerX + offset.x, playerY + offset.y);
		this.hitbox.reset();
		this.hitbox.update(direction);

		//anim based on dir
		const animations = {
			"Up": "micUp",
			"Down": "micDown",
			"Left": "micLeft",
			"Right": "micRight"
		};

		//change anim
		this.mic.changeAnimation(animations[direction]);

		//go to frame 0
		this.mic.animation.frame = 0;

		//no looping
		this.mic.animation.looping = false;

		//play anim
		this.mic.animation.play();
	}

	//reset hitbox anims so anims dont loop
	reset(){
		this.hitbox.reset();
	}

	hide() {
		//hide mic
		this.mic.visible = false;

		//stop anim
		this.mic.animation.stop();

		//send hitbox of mic offscreen when finished attack to stop anims looping
		this.hitbox.hitbox.position.set(-1000,-1000);
	}

	display() {
		if (this.mic.visible) {
			this.mic.draw();
		}
	}
}