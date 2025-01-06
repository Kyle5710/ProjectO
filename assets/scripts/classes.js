class Player {
	constructor(xPos, yPos, player) {
		this.x = xPos;
		this.y = yPos;
		this.player = player;
		this.speed = 4;
		this.velocity = createVector(0, 0);
		this.isAttacking = false;
		this.attackStartTime = 0;
		this.attackCooldown = 10; //milliseconds
		this.health = 10;
		this.playerHit = false;

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

		player.addAnimation("playerDeath", playerDeathAnim);

		//frame rate for animations
		playerUpAnim.frameDelay = playerDownAnim.frameDelay = playerLeftAnim.frameDelay = playerRightAnim.frameDelay = 15;
		playerIdleDownAnim.frameDelay = playerIdleUpAnim.frameDelay = playerIdleLeftAnim.frameDelay = playerIdleRightAnim.frameDelay = 30;
		playerAttackDownAnim.frameDelay = playerAttackUpAnim.frameDelay = playerAttackLeftAnim.frameDelay = playerAttackRightAnim.frameDelay = 10;

		//mic instance
		this.mic = new Microphone();
	}

	drawHealthBar() {
		const barWidth = 420;
		const barHeight = 20;

		//map values for healthbar + scale to current health
		const currentHealthWidth = map(this.health, 0, 10, 0, barWidth);

		rectMode(CENTER);
		//grey bg
		fill(200);
		rect(width / 2, 333, barWidth, barHeight);


		//blue healthbar
		fill(0, 0, 255);
		rect(width / 2, 333, currentHealthWidth, barHeight);
		rectMode(NORMAL);

		stroke("black");
		strokeWeight(2);
		fill("white");
		textSize(20);
		textAlign(CENTER);
		text("Armando, the reporter", width / 2, 338);

	}

	stepSound() {
		let anim = this.player.animation;
		let currentFrame = anim.frame;

		if ((currentFrame % 2 === 1) && !stepSound) {
			stepSound = true;
			playerStep.play();
		}

		else if (currentFrame % 2 === 0) {
			stepSound = false;
		}
	}

	move() {
		this.velocity.set(0, 0); //reset velocity each frame

		//temp movement dir
		let moveX = 0;
		let moveY = 0;

		//set movement
		if (!this.isAttacking) {
			if (keyIsDown(87) || keyIsDown(UP_ARROW)) { //UP
				this.player.changeAnimation("playerUp");
				moveY = -1;
				lastDir = "Up";
				this.stepSound();
			}

			else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { //DOWN
				this.player.changeAnimation("playerDown");
				moveY = 1;
				lastDir = "Down";
				this.stepSound();
			}

			else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { //LEFT
				this.player.changeAnimation("playerLeft");
				moveX = -1;
				lastDir = "Left";
				this.stepSound();
			}

			else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { //RIGHT
				this.player.changeAnimation("playerRight");
				moveX = 1;
				lastDir = "Right";
				this.stepSound();
			}

			else if (!keyIsPressed) { //IDLE
				this.player.changeAnimation("playerIdle" + lastDir);
				stepSound = false;
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

		//room transition
		if (this.x >= 296 && this.x <= 344 && this.y <= 31) {

			if (currentScene !== "Boss") {
				newRoom.play(); //sfx
				this.x = this.y = -1000; //move player offscreen
				canMove = false; //prevent player movement
				tran = true; //run fade transition

				if (currentScene === "Tutorial") {
					nextScene = "Obama";
				}

				else if (currentScene === "Obama") {
					nextScene = "Weapon";
				}

				else if (currentScene === "Weapon") {
					nextScene = "Boss";
					dummy.position.set(-1000, -1000);
				}
			}

			else if (currentScene === "Boss" && !bossObamaEvent) {
				nextScene = "Button";
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

		//play sfx
		playerAttack.play();

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
		lastDir = "Up";
	}

	display(dummy) {
		this.player.rotation = 0; //prevent rotation
		this.player.position.set(this.x, this.y);

		//WEAPON DRAWING
		if (currentScene === "Weapon") {
			if (this.y < dummy.y) {
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

		//BOSS DRAWING
		else if (currentScene === "Boss") {
			if (bossObamaClass.state === "attack") {
				this.drawHealthBar();
			}

			if (player.y < bossObama.y) {
				//player behind obama
				this.mic.display();
				this.player.draw();
				bossObama.draw();
			}

			else {
				//player in front of obama
				bossObama.draw();
				this.player.draw();
				this.mic.display();
			}
		}

		//ALL OTHER SCENES
		else {
			this.player.draw();
			this.mic.display();
		}

		if (tranAlpha <= 0) {
			//run dialogue funcs
			obamaDialogueFunc();
			bossDialogueFunc();

			if (currentScene === "Tutorial") {
				tutorialEvent = false;
			}

			else if (currentScene === "Weapon") {
				weaponEvent = false;
			}
		}
	}

	death() {
		if (this.health <= 0) {
			//reload the page to end the game cause i spent like an hour trying to reset vars and stuff 
			//and do not want to ever live through that experience ever again i think i broke my mouse oml
			if (!timerStarted) {
				currentScene = "YOUSUCK";
				timerStart = millis();
				timerStarted = true;
			}
		}
	}

	update(dummy) {
		if (keyIsDown(69) && !this.isAttacking) {
			this.attack();
		}

		this.move();
		this.death();
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
	}

	animations() {
		//rotates when player gets close if this isnt here for some reason idk why
		this.dummy.rotation = 0;
	}

	spawnPos() {
		if (nextScene !== "Boss") {
			this.x = 150;
			this.y = height / 2;
			this.dummy.position.set(this.x, this.y);
		}
	}

	update() {
		this.animations();
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
	constructor(mic, dummy, bossObama) {
		this.mic = mic;
		this.dummy = dummy;
		this.obama = bossObama;

		this.offsets = { //hitbox offset
			"Up": { x: -2, y: 20, width: 50, height: 60 },
			"Down": { x: -2, y: -20, width: 50, height: 60 },
			"Left": { x: 10, y: 0, width: 60, height: 50 },
			"Right": { x: -10, y: 0, width: 60, height: 50 }
		};

		this.hitbox = createSprite(this.mic.position.x, this.mic.position.y, 20, 20, "s");
		this.hitbox.visible = true;
		this.hitbox.debug = true;
		this.hitDummy = false;
		this.hitBoss = false;
	}

	//reset mic hitbox so anims dont loop
	reset() {
		if (this.hitDummy) {
			setTimeout(() => {
				this.hitDummy = false;
			}, 200); //200ms is the delay between enemy animations
		}

		else {
			this.dummy.changeAnimation("dummyIdle");
		}

		if (this.hitBoss) {
			setTimeout(() => {
				this.hitBoss = false;
			}, 200); //200ms is the delay between enemy animations
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
			dummy.width, dummy.height) && !this.hitDummy) {

			this.dummy.changeAnimation("dummyHit"); //find dummyClass
			enemyHit.play(); //sfx
			this.hitDummy = true;
		}

		//collision with bossObama
		if (collideRectRect(
			this.hitbox.position.x - this.hitbox.width / 2, this.hitbox.position.y - this.hitbox.height / 2,
			this.hitbox.width, this.hitbox.height,
			bossObama.position.x - bossObama.width / 2, bossObama.position.y - bossObama.height / 2,
			bossObama.width, bossObama.height) && !this.hitBoss) {

			enemyHit.play(); //sfx
			bossObamaClass.health -= 1;
			print(bossObamaClass.health);
			this.hitBoss = true;
		}
	}
}

class Microphone {
	constructor() {
		this.mic = createSprite(0, 0, "s");

		this.hitbox = new MicHitbox(this.mic, dummy, bossObama); //hitbox for mic attacks

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
	reset() {
		this.hitbox.reset();
	}

	hide() {
		//hide mic
		this.mic.visible = false;

		//stop anim
		this.mic.animation.stop();

		//send hitbox of mic offscreen when finished attack to stop anims looping
		this.hitbox.hitbox.position.set(-1000, -1000);
	}

	display() {
		if (this.mic.visible) {
			this.mic.draw();
		}
	}
}

class WeaponObama {
	constructor(xPos, yPos, weaponObama, player) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.obama = weaponObama;
		this.player = player;
		this.idle = false;
		this.state = "entering";

		//add anims
		weaponObama.addAnimation("obamaDown", obamaDownAnim);
		weaponObama.addAnimation("obamaUp", obamaUpAnim);
		weaponObama.addAnimation("obamaIdle", obamaIdleAnim);

		obamaUpAnim.frameDelay = obamaIdleAnim.frameDelay = 15;
		obamaDownAnim.frameDelay = 5;
	}

	enter() {
		canMove = false; //player cant move

		//set anims
		if (!this.idle) {
			this.obama.changeAnimation("obamaDown");
		}

		else {
			this.obama.changeAnimation("obamaIdle");
		}

		this.player.changeAnimation("playerIdleUp");

		//update obama pos
		this.obama.position.set(this.xPos, this.yPos);

		//obama movement
		if (this.yPos < 100) {
			this.yPos += 10;
			playerClass.y -= 8;
		}

		else {
			this.yPos = 100;
		}
	}

	leave() {
		//set anim
		this.obama.changeAnimation("obamaUp");

		//obama movement
		if (this.yPos > -100) {
			this.yPos -= 3;
		}

		else {
			this.yPos = -100;
			canMove = true;
		}

		if (this.yPos === -100) {
			obamaEvent = false; //obama cutscene over
		}
	}

	triggerLeave() {
		this.state = "leaving"; //changed from obamaDialogueFuncFunc() in sketch.js
	}

	update() {
		if (this.state === "entering") {
			this.enter();
		}

		else if (this.state === "leaving") {
			this.leave();
		}

		this.obama.position.y = this.yPos;
	}
}

class BossObama {
	constructor(xPos, yPos, obama, player) {
		this.x = xPos;
		this.y = yPos;
		this.obama = obama;
		this.player = player;
		this.state = "entering";
		this.currentAttackState = "idle";
		this.chargeCooldown = 0;
		this.chargeAngle = null;
		this.isCharging = false;
		this.attackCooldown = 0;
		this.health = 20;

		bossObama.addAnimation("obamaDown", obamaDownAnim);
		bossObama.addAnimation("obamaUp", obamaUpAnim);
		bossObama.addAnimation("obamaIdle", obamaIdleAnim);
		bossObama.addAnimation("obamaJetpack", obamaJetpack);
	}

	enter() {
		canMove = false;//player cant move

		//set anims
		this.obama.animation.frameDelay = 15;
		this.obama.changeAnimation("obamaDown");

		//move obama
		if (this.y < 100 && tranAlpha <= 0) {
			this.y += 2;
		}

		//play dialogue
		else if (this.y === 100) {
			this.obama.changeAnimation("obamaIdle");
			this.state = "dialogue";
		}
	}

	dialogue() {
		bossDialogueFunc();
	}

	chargeAttack() {
		//random gives a value between 0-1 so 50% chance to get t or f
		let shouldBounce = random() > 0.5;

		//randomize speed and duration
		let moveSpeed = random(3, 4);
		let attackDuration = int(random(60, 240));

		if (this.currentAttackState === "charge") {
			if (!this.isCharging) {
				//start charge + set vars
				this.obama.changeAnimation("obamaJetpack");
				let angleToPlayer = Math.atan2(this.player.y - this.y, this.player.x - this.x);
				let randomize = random(-Math.PI / 12, Math.PI / 12);
				this.chargeAngle = angleToPlayer + randomize;
				this.chargeTimer = 0;
				this.isCharging = true;
				this.attackDuration = attackDuration;
			}

			//find next pos to move to
			let nextX = this.x + Math.cos(this.chargeAngle) * moveSpeed;
			let nextY = this.y + Math.sin(this.chargeAngle) * moveSpeed;

			//these are checks for the wall/boundaries
			let onLeftWall = this.x <= 30;
			let onRightWall = this.x >= 610;
			let onTopWall = this.y <= 50;
			let onBottomWall = this.y >= 275;

			if (shouldBounce) {
				//attack will bounce off of walls
				if (nextX <= 30 || nextX >= 610) this.chargeAngle = Math.PI - this.chargeAngle;
				if (nextY <= 50 || nextY >= 275) this.chargeAngle = -this.chargeAngle;
			}

			else {
				//attack wont bounce and will slide off of walls or stop
				if (onLeftWall || onRightWall) {
					this.chargeAngle = this.player.y > this.y ? Math.PI / 2 : -Math.PI / 2;
				}
				if (onTopWall || onBottomWall) {
					this.chargeAngle = this.player.x > this.x ? 0 : Math.PI;
				}
			}

			this.x = constrain(nextX, 31, 609);
			this.y = constrain(nextY, 51, 274);

			//stop charging
			if (this.attackDuration <= this.chargeTimer++) {
				this.currentAttackState = "idle";
				this.chargeCooldown = 60; //time between attacks
				this.isCharging = false;
			}

			//same thing but if sliding into walls
			if (!shouldBounce && (onLeftWall || onRightWall || onTopWall || onBottomWall)) {
				this.currentAttackState = "idle";
				this.chargeCooldown = 60;
				this.isCharging = false;
			}

			return;
		}

		//idle state
		if (this.currentAttackState === "idle") {
			this.obama.changeAnimation("obamaIdle");

			if (this.chargeCooldown > 0) {
				this.chargeCooldown--;
				return;
			} else if (this.chargeCooldown === 0) {
				this.currentAttackState = "charge";
			}
		}
	}

	drawHealthBar() {
		const barWidth = 420;
		const barHeight = 20;

		//map values for healthbar + scale to current health
		const currentHealthWidth = map(this.health, 0, 20, 0, barWidth);

		rectMode(CENTER);
		//grey bg
		fill(200);
		rect(width / 2, 10, barWidth, barHeight);

		//red healthbar
		fill(255, 0, 0);
		rect(width / 2, 10, currentHealthWidth, barHeight);
		rectMode(NORMAL);

		stroke("black");
		strokeWeight(2);
		fill("white");
		textAlign(CENTER);
		textSize(20);
		text("Obama, the guy", width / 2, 14);

	}


	leaving() {
		//target exit position
		let leaveX = width / 2;
		let leaveY = -100;

		playerClass.mic.mic.position.set(-1000, -1000); //move mic offscreen so it doesnt float

		//move x axis
		if (this.x < leaveX) {
			this.x += 3;
		}

		else if (this.x > leaveX) {
			this.x -= 3;
		}

		//make sure we dont skip over leaveX
		if (Math.abs(this.x - leaveX) <= 3) {
			this.x = leaveX;
		}

		//move y axis
		if (this.x === leaveX) {
			this.y -= 3;
		}

		if (this.y <= leaveY) {
			this.y = leaveY;
			canMove = true;
			bossObamaEvent = false;
		}
	}

	checkCollision() {
		if (collideRectRect(
			this.player.x - this.player.width / 2, this.player.y - this.player.height / 2,
			this.player.width, this.player.height,
			this.obama.x - this.obama.width / 2, this.obama.y - this.obama.height / 2,
			this.obama.width, this.obama.height)) {

			//player hasnt been hit already
			if (!playerClass.playerHit) {
				playerClass.playerHit = true;

				if (canMove) { //player can move → not a cutscene
					playerHurt.play(); //sfx
					playerClass.health -= 1;
				}
			}
		}

		else { //reset
			playerClass.playerHit = false;
		}
	}

	update() {
		//events via state
		if (this.state === "entering") {
			this.player.changeAnimation("playerIdleUp");
			this.enter();
		}

		if (this.state === "dialogue") {
			this.dialogue();
		}

		if (this.state === "attack") {
			canMove = true;
			this.drawHealthBar(); //draw health
			this.chargeAttack();
			this.checkCollision();

			if (this.health <= 0) {
				canMove = false;
				this.state = "leaving";
			}
		}

		if (this.state === "leaving") {
			//set anim + direction before leaving
			this.player.changeAnimation("playerIdleUp");
			lastDir = "Up";
			this.leaving();
		}

		//set position
		this.obama.position.set(this.x, this.y);
	}
}