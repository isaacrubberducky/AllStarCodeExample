//just a useful function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//get the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero images
var heroReady = new Array();
var heroImages = new Array();
for(var i =0; i<12;i++){
	heroImages[i] = new Image();
	heroReady[i] = false;
}
heroImages[0].onload = function () {
	heroReady[0] = true;
};
heroImages[1].onload = function () {
	heroReady[1] = true;
};
heroImages[2].onload = function () {
	heroReady[2] = true;
};
heroImages[3].onload = function () {
	heroReady[3] = true;
};
heroImages[4].onload = function () {
	heroReady[4] = true;
};
heroImages[5].onload = function () {
	heroReady[5] = true;
};
heroImages[6].onload = function () {
	heroReady[6] = true;
};
heroImages[7].onload = function () {
	heroReady[7] = true;
};
heroImages[8].onload = function () {
	heroReady[8] = true;
};
heroImages[9].onload = function () {
	heroReady[9] = true;
};
heroImages[10].onload = function () {
	heroReady[10] = true;
};
heroImages[11].onload = function () {
	heroReady[11] = true;
};
heroImages[0].src = "images/link_walking/back1.png";
heroImages[1].src = "images/link_walking/back2.png";
heroImages[2].src = "images/link_walking/front1.png";
heroImages[3].src = "images/link_walking/front2.png";
heroImages[4].src = "images/link_walking/left1.png";
heroImages[5].src = "images/link_walking/left2.png";
heroImages[6].src = "images/link_walking/right1.png";
heroImages[7].src = "images/link_walking/right2.png";
heroImages[8].src = "images/link_sword/sword_down.png";
heroImages[9].src = "images/link_sword/sword_up.png";
heroImages[10].src = "images/link_sword/sword_left.png";
heroImages[11].src = "images/link_sword/sword_right.png";

var heroReady = function (){
	var ready = true;
	for(var i =0; i<heroReady.length;i++){
		if(heroReady[i]==false){
			return false;
		}
	}
	return true;
}

//snorlax images
var snorlaxReady = new Array();
var snorlaxImages = new Array();
for(var i =0; i<12;i++){
	snorlaxImages[i] = new Image();
	snorlaxReady[i] = false;
}
snorlaxImages[0].onload = function () {
	snorlaxReady[0] = true;
};
snorlaxImages[1].onload = function () {
	snorlaxReady[1] = true;
};
snorlaxImages[2].onload = function () {
	snorlaxReady[2] = true;
};
snorlaxImages[3].onload = function () {
	snorlaxReady[3] = true;
};
snorlaxImages[4].onload = function () {
	snorlaxReady[4] = true;
};
snorlaxImages[5].onload = function () {
	snorlaxReady[5] = true;
};
snorlaxImages[6].onload = function () {
	snorlaxReady[6] = true;
};
snorlaxImages[7].onload = function () {
	snorlaxReady[7] = true;
};
snorlaxImages[8].onload = function () {
	snorlaxReady[8] = true;
};
snorlaxImages[9].onload = function () {
	snorlaxReady[9] = true;
};
snorlaxImages[10].onload = function () {
	snorlaxReady[10] = true;
};
snorlaxImages[11].onload = function () {
	snorlaxReady[11] = true;
};
snorlaxImages[0].src = "images/snorlax/back1.png";
snorlaxImages[1].src = "images/snorlax/back2.png";
snorlaxImages[2].src = "images/snorlax/back3.png";
snorlaxImages[3].src = "images/snorlax/down1.png";
snorlaxImages[4].src = "images/snorlax/down2.png";
snorlaxImages[5].src = "images/snorlax/down3.png";
snorlaxImages[6].src = "images/snorlax/left1.png";
snorlaxImages[7].src = "images/snorlax/left2.png";
snorlaxImages[8].src = "images/snorlax/left3.png";
snorlaxImages[9].src = "images/snorlax/right1.png";
snorlaxImages[10].src = "images/snorlax/right2.png";
snorlaxImages[11].src = "images/snorlax/right3.png";

var snorlaxReady = function() {
	var ready = true;
	for(var i =0; i<snorlaxReady.length;i++){
		if(snorlaxReady[i]==false){
			return false;
		}
	}
	return true;
}

// Game objects
var hero = {
	speed: 100, // movement in pixels per second
	x: canvas.width/2,
	y: canvas.height/2,
	health: 3,
	img: heroImages[2],
	step: 0,
	stepMax: 40,
	attacking: -1,
	direction: 1,
	attackingMax: 10
};
var snorlax = {
	speed: getRandomInt(128)+64,
	img: snorlaxImages[4],
	x: 32 + (Math.random() * (canvas.width - 90)),
	y: 32 + (Math.random() * (canvas.height - 100)),
	step: 0,
	stepMax: 30,
	direction: 2,
	directionCount: 0
};
var score = 0;
var highScore = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	if(e.keyCode == 65 && hero.attacking<0){
		hero.attacking = hero.attackingMax;
	}
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a snorlax
var reset = function () {
	// Throw the snorlax somewhere on the screen randomly
	snorlax.x = 32 + (Math.random() * (canvas.width - 90));
	snorlax.y = 32 + (Math.random() * (canvas.height - 100));
	snorlax.speed = getRandomInt(128)+64;
	snorlax.img = snorlaxImages[4];
};


// Update game objects
var update = function (modifier) {
	//adjust location and image of the hero based on input
	if (38 in keysDown) { // Player holding up
		if(hero.y>32){
			hero.y -= hero.speed * modifier;
		}
		hero.direction = 0;
		if(hero.step <= hero.stepMax/2){
			hero.img = heroImages[0];
		}
		else{
			hero.img = heroImages[1];
		}
	}
	if (40 in keysDown) { // Player holding down
		if(hero.y<canvas.height-52){
			hero.y += hero.speed * modifier;
		}
		hero.direction = 1;
		if(hero.step <= hero.stepMax/2){
			hero.img = heroImages[2];
		}
		else{
			hero.img = heroImages[3];
		}
	}
	if (37 in keysDown) { // Player holding left
		if(hero.x>32){
			hero.x -= hero.speed * modifier;
		}
		hero.direction = 2;
		if(hero.step <= hero.stepMax/2){
			hero.img = heroImages[4];
		}
		else{
			hero.img = heroImages[5];
		}
	}
	if (39 in keysDown) { // Player holding right
		if(hero.x<canvas.width-48){
			hero.x += hero.speed * modifier;
		}
		hero.direction = 3;
		if(hero.step <= hero.stepMax/2){
			hero.img = heroImages[6];
		}
		else{
			hero.img = heroImages[7];
		}
	}
	hero.step++;
	if(hero.step >= hero.stepMax){
		hero.step = 0;
	}
	//attacking animation (up, down, left, right)
	//if you are attacking left or up, the sprite has to be adjusted
	//to account for the fact that you draw from the top left
	//once the attack is over it is moved back so link
	//never changes location
	if(hero.attacking>0){
		if(hero.direction==0){
			hero.img = heroImages[9];
			if(hero.attacking == hero.attackingMax){
				hero.y -= 16;
			}
			//attack check for up
			if (
				hero.x <= (snorlax.x + 20)
				&& snorlax.x <= (hero.x + 10)
				&& hero.y <= (snorlax.y + 27)
				&& snorlax.y <= (hero.y)
			) {
				score++;
				reset();
			}
		}else if(hero.direction==1){
			hero.img = heroImages[8];
			//attack check for down
			if (
				hero.x <= (snorlax.x + 20)
				&& snorlax.x <= (hero.x + 10)
				&& hero.y <= (snorlax.y + 27)
				&& snorlax.y <= (hero.y + 28)
			) {
				score++;
				reset();
			}
		}else if(hero.direction==2){
			hero.img = heroImages[10];
			if(hero.attacking == hero.attackingMax){
				hero.x -= 16;
			}
			//attack check for left
			if (
				hero.x-5 <= (snorlax.x + 20)
				&& snorlax.x <= (hero.x + 10)
				&& hero.y <= (snorlax.y + 27)
				&& snorlax.y <= (hero.y + 15)
			) {
				score++;
				reset();
			}
		}else if(hero.direction==3){
			hero.img = heroImages[11];
			//attack check for right
			if (
				hero.x <= (snorlax.x + 20)
				&& snorlax.x <= (hero.x + 30)
				&& hero.y <= (snorlax.y + 27)
				&& snorlax.y <= (hero.y + 15)
			) {
				score++;
				reset();
			}
		}
	}else if(hero.attacking==0 && hero.direction==0){
		hero.img = heroImages[0];
		hero.y += 16;
	}else if(hero.attacking==0 && hero.direction==1){
		hero.img = heroImages[2];
	}else if(hero.attacking==0 && hero.direction==2){
		hero.img = heroImages[4];
		hero.x += 16;
	}else if(hero.attacking==0 && hero.direction==3){
		hero.img = heroImages[6];
		
	}





	//stop at -1 because 0 triggers stuff
	if(hero.attacking>=0){
		hero.attacking--;
	}


	// Are they touching?
	if (
		hero.x <= (snorlax.x + 20)
		&& snorlax.x <= (hero.x + 10)
		&& hero.y <= (snorlax.y + 27)
		&& snorlax.y <= (hero.y + 15)
	) {
		--hero.health;
		reset();
	}

	//is hero dead
	if(hero.health <= 0){
		hero.health = 3;
		if(score > highScore){
			highScore = score;
		}
		score = 0;
		hero.x = canvas.width/2;
		hero.y = canvas.height/2;

		reset();

		

	}


	var x = snorlax.x-hero.x;
	var y = snorlax.y-hero.y;
	if(snorlax.directionCount <= 0 ){
		snorlax.directionCount = 30;
		if(Math.abs(x)>=Math.abs(y)){
			if(x>0){
				snorlax.direction = 2;
			}else{
				snorlax.direction = 3;
			}
		}else{
			if(y>0){
				snorlax.direction = 0;
			}else{
				snorlax.direction = 1;
			}
		}
	}
	snorlax.directionCount--;



	//move the snorlax, up,down,left,right
	if(snorlax.direction==0){
		snorlax.y -= snorlax.speed * modifier;
		if(snorlax.step <= snorlax.stepMax/3){
			snorlax.img = snorlaxImages[0];
		}else if(snorlax.step <= (snorlax.stepMax/3)*2){
			snorlax.img = snorlaxImages[1];
		}else if(snorlax.step <= snorlax.stepMax){
			snorlax.img = snorlaxImages[2];
		}
		if(snorlax.y<32){
			snorlax.direction = 1;
		}
	}
	else if(snorlax.direction==1){
		snorlax.y += snorlax.speed * modifier;
		if(snorlax.step <= snorlax.stepMax/3){
			snorlax.img = snorlaxImages[3];
		}else if(snorlax.step <= (snorlax.stepMax/3)*2){
			snorlax.img = snorlaxImages[4];
		}else if(snorlax.step <= snorlax.stepMax){
			snorlax.img = snorlaxImages[5];
		}
		if(snorlax.y>canvas.height-64){
			snorlax.direction = 0;
		}
	}
	else if(snorlax.direction==2){
		snorlax.x -= snorlax.speed * modifier;
		if(snorlax.step <= snorlax.stepMax/3){
			snorlax.img = snorlaxImages[6];
		}else if(snorlax.step <= (snorlax.stepMax/3)*2){
			snorlax.img = snorlaxImages[7];
		}else if(snorlax.step <= snorlax.stepMax){
			snorlax.img = snorlaxImages[8];
		}
		if(snorlax.x<32){
			snorlax.direction = 3;
		}
	}
	else if(snorlax.direction==3){
		snorlax.x += snorlax.speed * modifier;
		if(snorlax.step <= snorlax.stepMax/3){
			snorlax.img = snorlaxImages[9];
		}else if(snorlax.step <= (snorlax.stepMax/3)*2){
			snorlax.img = snorlaxImages[10];
		}else if(snorlax.step <= snorlax.stepMax){
			snorlax.img = snorlaxImages[11];
		}
		if(snorlax.x>canvas.width-64){
			snorlax.direction = 2;
		}
	}
	snorlax.step++;
	if(snorlax.step>snorlax.stepMax){
		snorlax.step = 0;
	}

};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(hero.img, hero.x, hero.y);
	}

	if (snorlaxReady) {
		ctx.drawImage(snorlax.img, snorlax.x, snorlax.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + score, 32, 32);
	ctx.fillText("Highscore: " + highScore, canvas.width-180, canvas.height-64);
	ctx.fillStyle = "rgb(200, 0, 0)";
	ctx.fillText("Health: " + hero.health, 32, 64);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};


// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();