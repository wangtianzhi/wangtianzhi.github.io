var borderFlag = false;
var upInterval;
var downInterval;
var arrowArrayY = Array(310);
var arrowArrayLength = 100;
var player;
var change = 0;
var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.width = 36;
	this.height = 36;
	this.halfWidth = this.width / 2;
	this.halfHeight = this.height / 2;
	this.vX = 6;
	this.vY = 0;
	this.aX = 0;
	this.aY = 0;
	this.shapeFlag = 4;
	this.squareJump = true;
	this.circleIsJump = true;
	this.arrowMoveUp = false;
	this.arrowSpeed = false;
	this.snakeMoveUp = false;
	this.circleJump = true;
	this.flameLength = 20;
	this.squareAngle = 0;
};


var windowHeight = window.innerHeight;
$("gameCanvas").css("height", windowHeight);
player = new Player(350, windowHeight / 2);

var vs = Math.sqrt(player.vY * player.vY * 2);

var arrowArrayUp = function(a, p) {

	if (a[0] < p.y) {
		a.shift();
		a.unshift(p.y);
	} else {
		a.unshift(p.y);
	}
	if (a.length > arrowArrayLength) {
		a.pop();
	}

}

var arrowArrayDown = function(a, p) {

	if (a[0] < p.y) {
		a.shift();
		a.unshift(p.y);
	} else {
		a.unshift(p.y);
	}
	if (a.length > arrowArrayLength) {
		a.pop();
	}
}

$(document).ready(function() {
	var ui = $("#gameUI");
	var uiIntro = $("#gameIntro");
	var uiStats = $("#gameStats");
	var uiComplete = $("#gameComplete");
	var uiPlay = $("#gamePlay");
	var uiReset = $(".gameReset"); // 所有重置
	var uiScore = $(".gameScore"); // 所有分数
	var soundBackground = $("#gameSoundBackground").get(0);
	var soundThrust = $("#gameSoundThrust").get(0);
	var soundDeath = $("#gameSoundDeath").get(0);
	var canvas = $("#gameCanvas");
	var uiHeight = document.body.clientHeight; // 获取高度
	var uiWidth = document.body.clientWidth;
	// 	$("#game").css("height", uiHeight).css("width", uiWidth);
	// ui.css("height", uiHeight).css("width", uiWidth);
	// $("#gameCanvas").css("height", uiHeight+"px").css("width",uiWidth+"px");

	var dead = function() {
		// Stop thrust sound
		soundThrust.pause();

		// Play death sound
		soundDeath.currentTime = 0;
		soundDeath.play();

		// Game over
		playGame = false;
		clearTimeout(scoreTimeout);
		uiStats.hide();
		uiComplete.show();
		document.getElementById("gameReset").ontouchstart = reset;
		// Reset sounds
		soundBackground.pause();
	}

	console.log(uiWidth);

	var reset = function(e) {
		e.preventDefault();
		uiComplete.hide();
		clearTimeout(scoreTimeout);
		clearInterval(upInterval);
		clearInterval(downInterval);
		player.shapeFlag = Math.ceil(Math.random() * 4);
		if (player.shapeFlag == 0) {
			player.shapeFlag = 4;
		}
		blockX1 = canvasWidth;
		blockY1 = canvasHeight - 20;
		startGame();
		for (var i = 0; i < arrowArrayY.length; i++) {
			arrowArrayY.pop();
		}
	}

	var canvas = $("#gameCanvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	console.log(canvasHeight);
	// 游戏设置
	var playGame;
	var asteroids;
	var numAsteroids;
	var block;
	var score;
	var scoreTimeout;
	// var arrowDown = 40;

	// 判断是否到边界或者上下有方块
	function Border(player, blocks) {
		borderFlag = false;

		if (player.y - player.halfHeight <= 20) {
			borderFlag = true;
			// if(player.shapeFlag === 2) {
			// 					player.circleJump = 2;

			// }
			player.y = 20 + player.halfHeight;
		} else if (player.y + player.halfHeight >=canvasHeight - 20) {
			player.y = canvasHeight - 20 - player.halfHeight;
			// if(player.shapeFlag === 2) {
			// 					player.circleJump = 1;

			// }

			borderFlag = true;
		}


		if (playGame) {
			for (var k = 0; k < blocks.length; k++) {
				for (var m = 0; m < blocks[0].length; m++) {
					if (blocks[k][m] === 1) {
						if ( player.vY >= 0 && (Math.abs((blockY1 - (k + 1) * blockHeight) - (player.y + player.halfHeight) )<= 15) &&  player.x + player.halfWidth >= blockX1 + m * blockWidth && player.x - player.halfWidth <= blockX1 + (m + 1) * blockWidth) {
							player.y = blockY1 - (k + 1) * blockHeight - player.halfHeight;
							// player.circleJump = true;

							borderFlag = true;
						}
					}
				}

			}
		}
			console.log(borderFlag);

		if (borderFlag && player.shapeFlag == 1)
			{player.squareJump = false;}
		if (borderFlag && player.shapeFlag == 2) 
			{					player.circleIsJump = false;}
		return borderFlag;
	}

	var Asteroid = function(x, y, radius, vX) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.vX = vX;
	};

	var Block = function(x, y, width, height, vX, vY) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.vX = vX;
		this.vY = vY;
	}

	// 游戏UI
	blocks = new Array();
	var blockWidth = 44;
	var blockHeight = 44;
	var blockX1 = canvasWidth;
	var blockY1 = canvasHeight - 20;
	var blockVx1 = -4;
	var blockVy1 = 0;
	blocks.push(
		[1,1,1,1,1,1,1,1,1], 
		[0,1,1,1,1,1,1,1,1], 
		[0,0,1,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,1,0],
		[0,0,0,1,1,1,1,1,0],
		[0,0,0,1,0,0,1,1,0],
		[0,0,0,1,0,0,1,1,0],
		[1,1,1,1,1,1,1,1,1,],
		[1,1,1,1,1,1,1,1,1,],
		[1,1,1,1,1,1,1,1,1,],
		[1,1,1,1,1,1,1,1,1,]

		);

	// 重置和启动游戏
	function startGame() {
		var canvas = $("#gameCanvas");
		var context = canvas.get(0).getContext("2d");

		// 画布尺寸
		var canvasWidth = canvas.width();
		var canvasHeight = canvas.height();
		// 重置游戏状态

		uiScore.html("0");
		uiStats.show();
		playGame = false;
		asteroids = new Array();
		numAsteroids = 5;
		score = 0;
		for (var i = 0; i < numAsteroids; i++) {
			var radius = 5 + (Math.random() * 4); // 5~15
			var x = canvasWidth + radius + Math.floor(Math.random() * canvasWidth);
			var y = Math.floor(Math.random() * canvasHeight);
			var vX = -3 - (Math.random() * 5);
			asteroids.push(new Asteroid(x, y, radius, vX));
		}


		var ondown = function upArray(e) {
			e.preventDefault();
			if (player.shapeFlag == 4) {
				player.arrowMoveUp = true;
				// 最后执行一遍计时器
				arrowArrayDown(arrowArrayY, player);
				// 执行完了
				clearInterval(downInterval);
				upInterval = setInterval(function() {

					if (arrowArrayY[0] < player.y) {
						arrowArrayY.shift();
						arrowArrayY.unshift(player.y);
					} else {
						arrowArrayY.unshift(player.y);
					}
					if (arrowArrayY.length > arrowArrayLength) {
						arrowArrayY.pop();
					}

				}, 32);

			} else if (player.shapeFlag == 1) {
				console.log(player.squareJump);
				if (!player.squareJump) {
					player.vY = -14;
					player.squareJump = true;
				}
			} else if (player.shapeFlag == 2) {
				console.log(player.circleIsJump);
				if (player.circleJump === true && player.circleIsJump === false) {
					player.circleJump = false;
					player.circleIsJump = true;
					player.vY = 14;
				}
				if (player.circleJump === false && player.circleIsJump === false) {
					player.circleJump = true;
					player.circleIsJump = true;
					player.vY = -14;

				}

			} else if (player.shapeFlag == 3) {
				player.snakeMoveUp = true;
				clearInterval(downInterval);
				upInterval = setInterval(function() {
					arrowArrayY.unshift(player.y);
					if (arrowArrayY.length > arrowArrayLength) {
						arrowArrayY.pop();
					}
				}, 5);
			}

		};
		var onup = function downArray(e) {
			e.preventDefault();
			if (player.shapeFlag == 4) {
				player.arrowMoveUp = false;
				arrowArrayUp(arrowArrayY, player);
				clearInterval(upInterval);

				downInterval = setInterval(function() {

					if (arrowArrayY[0] > player.y) {
						arrowArrayY.shift();
						arrowArrayY.unshift(player.y);
					} else {
						arrowArrayY.unshift(player.y);
					}
					if (arrowArrayY.length > arrowArrayLength) {
						arrowArrayY.pop();
					}
				}, 32);
			} else if (player.shapeFlag == 3) {
				player.snakeMoveUp = false;
				clearInterval(upInterval);
				downInterval = setInterval(function() {

					arrowArrayY.unshift(player.y);

					if (arrowArrayY.length > arrowArrayLength) {
						arrowArrayY.pop();
					}

				}, 5);

			}
		};
		document.getElementById("gameUI").onmousedown = ondown;
		document.getElementById("gameUI").ontouchstart = ondown;
		document.getElementById("gameUI").onmouseup = onup;
		document.getElementById("gameUI").ontouchend = onup;

		if (!playGame) {
			playGame = true;
			soundBackground.currentTime = 0;
			soundBackground.play();
			animate();
			timer();
			changetimer();
		}


	}

	// 初始化游戏环境
	function init() {
		uiStats.hide();
		uiComplete.hide();
		uiPlay.click(function(e) {
			e.preventDefault();
			uiIntro.hide();
			startGame();
		});


		uiReset.click(reset);
		uiReset.ontouchstart = reset;

	}

	function timer() {
		if (playGame) {
			scoreTimeout = setTimeout(function() {
				uiScore.html(++score);
				if (score % 6 == 0) {
					numAsteroids += 1;
				}
				timer();
			}, 1000);
		}
	}

	function changetimer() {
		if (playGame) {
			var changeTimeout = setTimeout(function() {
				change++;
				if (change % 4 == 0) {
					clearInterval(upInterval);
					clearInterval(downInterval);
					for (var i = 0; i < arrowArrayY.length; i++) {
						arrowArrayY.pop();
					}
					player.squareJump = true;
					// player.shapeFlag = Math.ceil(Math.random() * 4);
					if (player.shapeFlag == 0) {
						player.shapeFlag = 4;
					}
				}
				changetimer();
			}, 1000);
		}
	}

	function animate() {

		context.clearRect(0, 0, canvasWidth, canvasHeight);
		// Loop through every asteroid

		var asteroidsLength = asteroids.length;
		for (var i = 0; i < 1; i++) {
			var tmpAsteroid = asteroids[i];

			// Calculate new position
			tmpAsteroid.x += tmpAsteroid.vX;

			// Check to see if you need to reset the asteroid
			if (tmpAsteroid.x + tmpAsteroid.radius < 0) {
				tmpAsteroid.radius = 5 + (Math.random() * 10);
				tmpAsteroid.x = canvasWidth + tmpAsteroid.radius;
				tmpAsteroid.y = Math.floor(Math.random() * canvasHeight);
				tmpAsteroid.vX = -2 - (Math.random() * 2);
			}

			// Player to asteroid collision detection
			var dX = player.x - tmpAsteroid.x;
			var dY = player.y - tmpAsteroid.y;
			var distance = Math.sqrt((dX * dX) + (dY * dY));

			if (distance < player.halfWidth * 0.8 + tmpAsteroid.radius) {
				dead();
			}

			context.fillStyle = "rgb(255, 255, 255)";
			context.beginPath();
			context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();
		}

		// block
		context.fillStyle = "rgb(255, 255, 255)";
		blockX1 += blockVx1;
		blockY1 += blockVy1;
		for (var k = 0; k < blocks.length; k++) {
			for (var m = 0; m < blocks[0].length; m++) {
				if (blocks[k][m] === 1) {
					context.fillRect(blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, blockHeight);
					// if ((player.y + player.halfHeight) - (blockY1 - (k + 1) * blockHeight) <= 15) {
					// 	player.y = blockY1 - (k + 1) * blockHeight - player.halfHeight;
					// 	borderFlag = true;
					// }


					if ((player.x + player.halfWidth >= blockX1 + m * blockWidth && player.x - player.halfWidth <= blockX1 + (m + 1) * blockWidth) &&
						((player.y + player.halfHeight - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight - (blockY1 - k * blockHeight) < -15)) {
						dead();
					}

				}
			}

		}

		// for (var k = 0; k< blocks.length; k++) {
		// 	for (var m = 0; m< blocks[0,length]; m++) {
		// 		if(blocks[n][m] === 1) {
		// 			var blockDistance = 
		// 		}
		// 	}
		// }

		// Update player
		if (player.x - player.halfWidth < 20) {
			player.x = 20 + player.halfWidth;
		} else if (player.x + player.halfWidth > canvasWidth - 20) {
			player.x = canvasWidth - 20 - player.halfWidth;
		}


		if (player.shapeFlag == 1) {

			if (!Border(player, blocks))
				player.squareJump = true;


			if (player.squareJump) {
				player.aY = 0.7;
			}
			player.vY += player.aY;
			player.y += player.vY;

			if (Border(player, blocks)) {
				player.vY = 0;
				player.aY = 0;
				player.squareJump = false;
			}
			borderFlag = false;

			context.fillStyle = "white";
			// context.fillRect(player.x - player.halfWidth, player.y - player.halfWidth, player.width, player.width);
			// 旋转方形
			context.save();
			context.translate(player.x, player.y);
			if (player.squareJump || (player.squareAngle % 90 <= 60 && player.squareAngle % 90 >= 30)) {
				player.squareAngle += 9;
				if (player.squareAngle === 360) {
					player.squareAngle = 0;
				}
				context.rotate(player.squareAngle * Math.PI / 180);
			} else {
				player.squareAngle = 0;
			}
			context.fillRect(-player.halfWidth, -player.halfWidth, player.width, player.width);
			context.restore();

		} else if (player.shapeFlag == 2) {

			if (!Border(player, blocks))
				player.circleIsJump = true;


			if (player.circleIsJump) {

				if (player.circleJump == true ) {


					player.aY = -1;
				} else if (player.circleJump == false ) {
					
					player.aY = 1;
				}
			}
			player.vY += player.aY;
			player.y += player.vY;

			if (Border(player, blocks)) {
				player.vY = 0;
				player.aY = 0;
				player.circleIsJump = false;
			}

			// if (!Border(player, blocks)) {
			// 	console.log(player.vY);

			// 	if (player.circleJump == true ) {
			// 		if(player.vY === 0)
			// 		player.vY = -4;
			// 		player.aY = -1;
			// 	} else if (player.circleJump == false ) {

			// 		if (player.vY === 0) 
			// 			player.vY = 4;
					
			// 		player.aY = 1;
			// 	}

			// 	player.y += player.vY;


			// 	player.vY += player.aY;

			// } else {
			// 	player.vY = 0;
			// 	player.aY = 0;
			// 	player.circleIsJump = false;
			// }

			context.beginPath();
			context.arc(player.x, player.y, player.halfWidth, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();
		} else if (player.shapeFlag == 3) {

			if (player.snakeMoveUp) {
				player.aY = -0.08;
			} else {
				player.aY = 0.08;
			}
			player.vY += player.aY;
			player.y += player.vY;
			player.y += player.vY;


			if (Border(player, blocks)) {
				player.aY = 0;
				player.vY = 0;
			}
			borderFlag = false;
			context.beginPath();
			context.arc(player.x, player.y, player.halfWidth, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();
			var lineStartx = player.x - player.halfWidth;

			// 画曲线


			context.beginPath();
			context.moveTo(player.x, player.y);
			if (arrowArrayY.length > 4) {
				for (var i = 0; i < arrowArrayY.length; i++) {

					var distanceY;
					if (i == 0 && arrowArrayY[0] > 0) {
						distanceY = arrowArrayY[0] - player.y;
					} else {
						distanceY = arrowArrayY[i] - arrowArrayY[i - 1];
					}
					if (distanceY == 0) {
						distanceY = 5;
					}
					distanceY = Math.abs(distanceY);
					lineStartx = lineStartx - distanceY;

					context.lineTo(lineStartx, arrowArrayY[i]);

				}
				context.strokeStyle = "white";
				context.lineWidth = player.width;
				context.stroke();
			}

		}


		if (player.shapeFlag == 4) {
			player.vX = 0;
			player.vY = 0;
			if (player.arrowMoveUp) {
				player.vY = -10;
			} else {
				player.vY = 10;
			}
			// 437.5 / s
			//6
			player.y += player.vY;

			var w = player.width * 0.26;
			context.fillStyle = "white";
			context.beginPath();
			if (Border(player, blocks)) {
				context.moveTo(player.x + player.halfWidth, player.y);
				context.lineTo(player.x - player.halfWidth, player.y - player.halfHeight);
				context.lineTo(player.x - player.halfWidth, player.y + player.halfWidth);
			} else if (!player.arrowMoveUp) {
				context.moveTo(player.x + player.halfWidth / 1.414 - w, w + player.y + player.halfWidth / 1.411);
				context.lineTo(player.x - w, player.y - player.halfHeight * 1.3 + w);
				context.lineTo(player.x - player.halfWidth * 1.3 - w, player.y + w);
			} else {
				context.moveTo(player.x + player.halfWidth / 1.414 - w, player.y - player.halfWidth / 1.411 - w);
				context.lineTo(player.x - player.halfWidth * 1.3 - w, player.y - w);
				context.lineTo(player.x - w, player.y + player.halfWidth * 1.3 - w);
			}
			context.closePath();
			context.fill();
			// 画折线
			var lineStartx = player.x - player.halfWidth;
			context.beginPath();
			context.moveTo(player.x - player.halfWidth, player.y);

			var k = 0;


			if (arrowArrayY.length > 4) {
				for (var i = 0; i < arrowArrayY.length; i++) {
					var distanceY;
					if (i == 0 && arrowArrayY[0] > 0) {
						distanceY = arrowArrayY[0] - player.y;
					} else {
						distanceY = arrowArrayY[i] - arrowArrayY[i - 1];
					}
					if (distanceY == 0 && (arrowArrayY[i] <= player.height + 20 + 1 || arrowArrayY[i] >= canvasHeight - 20 - player.height - 1)) {
						distanceY = 20;

					}

					distanceY = Math.abs(distanceY);
					lineStartx = lineStartx - distanceY;

					context.lineTo(lineStartx, arrowArrayY[i]);
				}
			}
			context.strokeStyle = "white";
			context.lineWidth = 5 + 10 * Math.random();
			context.stroke();
			borderFlag = false;

		}


		// Add any new asteroids
		while (asteroids.length < numAsteroids) {
			var radius = 5 + (Math.random() * 10);
			var x = Math.floor(Math.random() * canvasWidth) + canvasWidth + radius;
			var y = Math.floor(Math.random() * canvasHeight);
			var vX = -5 - (Math.random() * 5);

			asteroids.push(new Asteroid(x, y, radius, vX));
		}

		if (playGame) {
			// Run the animation loop again in 33 milliseconds
			setTimeout(animate, 16);
		}
	}

	init();
});