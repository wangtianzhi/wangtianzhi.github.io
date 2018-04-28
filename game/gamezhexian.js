// 每秒9.92063个格子
// 218个到第一个点
var currentUpY = 0;
var currentDownY = 0;
var borderFlag = false;
var upInterval;
var downInterval;
var arrowArrayY = Array(310);
var arrowArrayLength = 200;
var player;
var color = 0x000000;
var animateCount = 0;
var ondownShortFlag = false;
var resetFlag = true;
var change = 0;
var ondownFlag = false;
var currentMiddleDownY;
var currentMiddleUpY;
var draw1 = true;
var draw2 = false;
var gFlag = false;
var blackFlag = false;
var notHorizon = false;
var canDead = true;
var deadCount = 0;
var doubleFlag = false;
var topLen;
var nextMiddleY;
var health = 255;
var t = false;
var tx = 4;
var ty = 4;


// 颜色渐变



var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 36;
  this.height = 36;
  this.halfWidth = this.width / 2;
  this.halfHeight = this.height / 2;
  this.vX = 6;
  this.vY = 0;
  this.arrowMoveUp = false;
  this.arrowSpeed = false;
  this.snakeMoveUp = false;
};


var windowHeight = window.innerHeight;
$("gameCanvas").css("height", windowHeight);
player = new Player(350, windowHeight / 2);



var arrowArrayUp = function(a, p) {
  if (a[0] < p.x) {
    a.shift();
    a.unshift(p.x);
  } else {
    a.unshift(p.x);
  }
  if (a.length > arrowArrayLength) {
    a.pop();
  }
}

var arrowArrayDown = function(a, p) {

  if (a[0] < p.x) {
    a.shift();
    a.unshift(p.x);
  } else {
    a.unshift(p.x);
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
  var uiTestPlay = $("#gameTestPlay");
  var uiDoublePlay = $("#gameDoublePlay");
  var soundBackground = $("#gameSoundBackground").get(0);
  var henguiPlay = $("#hgamePlay");
  var audio1 = document.getElementById("gameSoundBackground");



  var canvas = $("#gameCanvas");
  var context = canvas.get(0).getContext("2d");
  // context.
  var baifangkuaiCanvas = document.getElementById("baifangkuaiCanvas");
  var offctx = baifangkuaiCanvas.getContext("2d");


  var canvasWidth = canvas.width();
  var canvasHeight = canvas.height();
  if(!notHorizon){
  context.translate(canvasWidth/2,canvasHeight/2);
  context.scale(1, -1);
  context.translate(-canvasWidth/2, -canvasHeight/2);
}


  var conW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var conH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

//   if (notHorizon) {
//     $("body").css({
//       "transform": "rotate(90deg) translate(" + ((conH - conW) / 2) + "px," + ((conH - conW) / 2) + "px)",
//       "width": conH + "px",
//       "height": conW + "px",
//       //"margin-top":iosTopHe+"px",  
//       // "border-left":iosTopHe+"px solid #000",  
//       "transform-origin": "center center",
//       "-webkit-transform-origin": "center center"
//       // transform: scale(1,-1)
// // -moz-transform:scale(1，-1); 

//     });
//   }

  var dead = function() {

    $("#deadd").hide();
    $("#dead").show();
    deadCount++;
    health = 1;
    var scoreSay = $("#scoreSay");
    // Game over
    playGame = false;
    clearTimeout(scoreTimeout);
    uiStats.hide();
    $("#deadCount").html(deadCount);
    if (uiScore.html() <= 10) {
      scoreSay.html("是不是手滑了");
    } else if (uiScore.html() <= 20) {
      scoreSay.html("凑活吧");
    } else if (uiScore.html() <= 30) {
      scoreSay.html("还行");
    } else if (uiScore.html() <= 40) {
      scoreSay.html("可以啊");
    } else if (uiScore.html() <= 50) {
      scoreSay.html("有点厉害了");
    } else if (uiScore.html() <= 60) {
      scoreSay.html("一般是没人能看到这句话的，如果你看到了，使劲跟别人吹去吧");
    } else if (uiScore.html() > 60) {
      scoreSay.html("卧 了 个 槽 ！！！");
    }

    if (deadCount === 3) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("3次，没事，一开始都这样");
    }
    if (deadCount === 5) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("死五次不算什么，加油，你还能死更多次");
    }
    if (deadCount === 10) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("死十次了，这才刚开始");
    }
    if (deadCount === 15) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("十五次，你要再死更多，我要数不过来了");
    }
    if (deadCount === 20) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("二十次，我真的数不过来了，你自己数吧");
    }
    if (deadCount === 21) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("二十一次，算了还是我来吧，我怕你数不对");
    }
    if (deadCount === 30) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("你是在故意不停的死，然后看我会说什么话吗？");
    }
    if (deadCount === 40) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("你是不是不适合这游戏");
    }
    if (deadCount === 50) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("It's high noon");
    }
    if (deadCount === 60) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("玩到哪了？我猜你在背景变黑之后的那一段死了很多次");
    }
    if (deadCount === 70) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("不要再试了，你这样我可不会说别的话了");
    }
    if (deadCount === 80) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("真的别试了，该学习的学习，有对象的和对象聊聊天，现实是很美好的");
    }
    if (deadCount === 90) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("我猜你是想突破100次");
    }
    if (deadCount === 100) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("朋友，截个图发给我，我想认识认识你");
    }
    if (deadCount > 100) {
      $("#deadd").show();
      $("#dead").hide();
      $("#deadd").html("你就没有更重要的事可做吗");
    }
    uiComplete.show();
    document.getElementById("gameReset").ontouchstart = reset;
    // Reset sounds
    soundBackground.pause();
    // soundBackground2.pause();
  }

  var reset = function(e) {
    health = 255;
    doubleFlag = false;
    canvas.removeClass();
    canvas.addClass('bgm0');
    animateCount = 0;
    e.preventDefault();
    uiComplete.hide();
    clearTimeout(scoreTimeout);
    clearInterval(upInterval);
    clearInterval(downInterval);
    draw1 = true;
    draw2 = false;
    gFlag = false;
    blockX1 = canvasWidth;
    blockY1 = canvasHeight - 20;



    blackFlag = false;
    startGame();
    // resetFlag = true;
    for (var i = 0; i < arrowArrayY.length; i++) {
      arrowArrayY.pop();
    }
  }

  var canvas = $("#gameCanvas");
  var context = canvas.get(0).getContext("2d");
function hurt() {
  health-=8;
  if(health <= 10) {
    // health = 10
    dead();
  }
}


  // 游戏设置
  var playGame;
  var asteroids;
  var numAsteroids;
  var block;
  var score;
  var scoreTimeout;
  // var arrowDown = 40;


  // 判断是否到边界或者上下有方块
  function Border(player) {
    borderFlag = false;

    if (player.x - player.halfHeight <= 20) {
      borderFlag = true;
      player.x = 21 + player.halfHeight;

    } else if (player.x + player.halfHeight >= canvasWidth - 20) {
      player.x = canvasWidth - 21 - player.halfHeight;
      borderFlag = true;
    }

    return borderFlag;
  }



  // 游戏UI
  var upupLines = new Array();
  var downLines = new Array();
  var middleUpupLines = new Array();
//   // var middleDownLines = new Array();
  middleUpupLines.push(
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 3.5, 2.5, 3.5, 2.5, 3.5, 3, 2.5, 3, 3.5,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 3.5, 2.5, 3.5, 2.5, 3.5, 0, 0,

    );
  upupLines.push(
    7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, // 20
    7, 7, 7, 7, 7, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 5, 6, 5, 4, 4, 4, 4, 4, 5, 6, 5, 4, 4, 4, 5, 5,
    5, 5, 5, 5, 6, 6, 6, 5, 4, 4, 5, 6, 6, 6, 6, 6, 5, 6, 6, 6,

    5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6, 5, 4, 3, 3,
    3, 4, 5, 6, 5, 4, 3, 3, 3, 3, 3, 4, 5, 6, 6, 5, 4, 5, 6, 6,
    6, 5, 4, 5, 6, 6, 6, 5, 4, 5, 6, 6, 6, 5, 4, 5, 6, 6, 5, 4,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4.6, 5, 5.4, 5.8, 6.2, 6.6, 7, 6.6,
    6.2, 5.8, 5.4, 5, 4.6, 5, 5.2, 5, 4, 5.6, 5.8, 6, 6.2, 6.4, 6.6, 6.8, 7, 6, 5, 4, 3,

    2, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 6, 5, 4, 3, 2,
    1, 1, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 6.7, 6.4, 6.1, 5.8, 5.5, 5.2, 4.9,
    4.6, 4.3, 4, 3.7, 3.4, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 4, 4, 7, 7, 7, 7, 4, 4, 7, 7, 7, 7, 4, 4, 7, 7, 7,
    7, 7, 7, 4, 4, 7, 7, 7, 7, 4, 4, 7, 7, 7, 7, 4, 4, 7, 7, 7,

    7, 7, 6, 4, 4, 6, 7, 7, 6, 4, 4, 6, 7, 7, 6, 4, 4, 6, 7, 7,
    7, 3, 3, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 4, 4, 7, 7, 7, 5, 5,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 5, 7, 7,
    3, 7, 7, 7, 7, 7, 6, 7, 7, 7, 7, 7, 5, 7, 7, 4, 7, 7, 6, 7,
    6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7,

    6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7,
    6, 7, 6, 7, 6, 7, 6, 5, 5, 7, 7, 7, 7, 6, 7, 6, 7, 6, 7, 7, 
    7, 7, 7, 7, 7, 7, 7, 6, 7, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 
    7, 7, 7, 7, 7, 6, 7, 6, 7, 6, 7, 6, 5, 5, 7, 7, 7, 7, 6, 7, 
    6, 7, 6, 7, 7, 6.8, 6.6,6.4,6.2,6,5.8,5.6,5.4,5.2,5,5.2,5.4,5.6,5.8,6,
    6.2,6.4,6.6,6.8,7,6.8, 6.6,6.4,6.2,6,5.8,5.6,5.4,5.2,5,4.8,4.6,4.6,4.6,4.6,4.6,4.8,5, 5.2,5.4,5.6,5.8,6,
    6.2,6.4,6.6,6.8,7,

7

  );

  downLines.push(
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2,

    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 1,
    1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 1, 1, 1, 2, 3,
    2, 1, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1,
    1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1.4, 1.8, 2.2, 2.6, 3, 3.4, 3.8, 3.4,
    3.0, 2.6, 2.2, 1.8, 1.4, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 2, 1, 0, 0,

    0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 3.7, 3.3, 3.1, 2.8, 2.5, 2.2, 1.9, 1.6, 1.3,
    1, 0.7, 0.4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1,
    3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3,
    3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3,

    3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3,
    0, 0, 1, 1, 3, 3, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4,
    0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0,
    1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 4, 0,
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,

    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    1, 0, 1, 0, 1, 0, 1, 3, 3, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 3, 3, 0, 0, 0, 0, 1, 0, 
    1, 0, 1, 0, 0, 0.2,0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2,1.8,1.6,1.4,1.2,1,
    0.8,0.6,0.4,0.2,0,0.2,0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.4,2.4,2.4,2.4,2.2,2,  1.8,1.6,1.4,1.2,1,
    0.8,0.6,0.4,0.2,
    0);

  // blocks = new Array();
  // var blockWidth = 44;
  // var blockHeight = 44;
  var blockX1 = canvasWidth;
  var blockY1 = canvasHeight;
  var blockVx1 = 0;
  var blockVy1 = -9;

  // context.lineWidth = 3;
  // context.strokeStyle = "white";
  // blocks.unshift([0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1]);
  // blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0]);
  // blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
  // blocks.unshift([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0]);

  // 重置和启动游戏
  function startGame() {


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

    var ondown = function upArray(e) {
      ondownFlag = true;
      ondownShortFlag = true;
      e.preventDefault();



      player.arrowMoveUp = true;
      // 最后执行一遍计时器
      arrowArrayDown(arrowArrayY, player);
      // 执行完了
      clearInterval(downInterval);
      upInterval = setInterval(function() {

        if (arrowArrayY[0] < player.x) {
          arrowArrayY.shift();
          arrowArrayY.unshift(player.x);
        } else {
          arrowArrayY.unshift(player.x);
        }
        if (arrowArrayY.length > arrowArrayLength) {
          arrowArrayY.pop();
        }

      }, 32);


      // if (!player.squareJump) {
      //   player.vY = -14;
      //   player.squareJump = true;
      // }

    };
    var onup = function downArray(e) {
      e.preventDefault();
      ondownFlag = false;

      player.arrowMoveUp = false;
      arrowArrayUp(arrowArrayY, player);
      clearInterval(upInterval);

      downInterval = setInterval(function() {

        if (arrowArrayY[0] > player.x) {
          arrowArrayY.shift();
          arrowArrayY.unshift(player.x);
        } else {
          arrowArrayY.unshift(player.x);
        }
        if (arrowArrayY.length > arrowArrayLength) {
          arrowArrayY.pop();
        }
      }, 32);

    };
    document.onmousedown = ondown;
    document.ontouchstart = ondown;
    document.onmouseup = onup;
    document.ontouchend = onup;


    if (!playGame) {
      playGame = true;
      soundBackground.currentTime = 0;
      soundBackground.play();
      animate();
      timer();

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
        henguiPlay.click(function(e) {

      notHorizon = true;
      uiIntro.hide();
      startGame();
    });
    uiTestPlay.click(function(e) {
      e.preventDefault();
      uiIntro.hide();
      startGame();
      canDead = false;
    });

    uiReset.click(reset);
    uiReset.ontouchstart = reset;

  }

  function timer() {
    if (playGame) {
      scoreTimeout = setTimeout(function() {
        uiScore.html(++score);
        timer();
      }, 1000);
    }
  }

  function animate() {
    if(health<253)
    health += 1;
var oxNum=health.toString(16);

    currentDownY = blockX1;
    currentUpY = 0;
     currentMiddleDownY = blockX1/2;
    currentMiddleUpY = blockX1/2;
    nextMiddleY = blockX1/2;

    animateCount++;

    var i = Math.floor(animateCount / 7) - 16;
    var i18 = i + 18;
    context.clearRect(0, 0, canvasWidth + 100, canvasHeight + 100);

  
    // 颜色

    // block

    blockX1 += blockVx1;
    blockY1 += blockVy1;
    if (i < 0)
      i = 0
    var j = i;
    var k = i - 18;
    // 下
    context.fillStyle = "#CC0000"
    context.beginPath();
    context.moveTo(0, -20);
    for (; i < i18; i++) {
      var cX = i * 63 + blockY1;
      cUpY = blockX1 - upupLines[i] * 63;
      context.lineTo(cUpY, cX);

      if (cX < 350 && cX + 63 > 350) {
        currentUpY = cUpY + (blockX1 - upupLines[i + 1] * 63 - cUpY) / 63 * (350 - cX);
      }

    }
    context.lineTo(0, 1200);
    context.closePath();
    context.fill();

    // 下
    context.beginPath();
    context.moveTo(blockX1, -20);
    for (; j < i18; j++) {
      var cX = j * 63 + blockY1;
      cDownY = blockX1 - downLines[j] * 63;
      context.lineTo(cDownY, cX);
      if (cX <= 350 && cX + 63 >= 350) {
        currentDownY = cDownY + (blockX1 - downLines[j + 1] * 63 - cDownY) / 63 * (350 - cX);
      }
    }
    context.lineTo(blockX1, 1200);
    context.closePath();
    context.fill();

    // 中
    for (; k < i18; k++) {
      if (middleUpupLines[k] === 0)
        continue;
      if (middleUpupLines[k] === -1) {
        context.beginPath();
      } else {
        // if(middleUpupLines[k] === -2){
        //   context.closePath();
        //   context.fill();}
        var cX = k * 63 + blockY1;
        cMiddleY = blockX1 - middleUpupLines[k] * 63;
        if (middleUpupLines[k + 1] === 0) {
          nextMiddleY = 245;
        } else
          nextMiddleY = blockX1 - middleUpupLines[k + 1] * 63;

        if (middleUpupLines[k] > 0 && middleUpupLines[k - 1] === 0)
          context.moveTo(cMiddleY, cX);
        else
          context.lineTo(cMiddleY, cX);
        if (cX <= 350 && cX + 63 >= 350) {
          currentMiddleDownY = cMiddleY + (nextMiddleY - cMiddleY) / 63 * (350 - cX);
        }
      }
    }

    for (; k > i18 - 25; k--) {
      if (middleUpupLines[k] === 0)
        continue;
      if (middleUpupLines[k] === -1) {
        context.closePath();
        context.fill();
        break;
      }

      var cX = k * 63 + blockY1;
      cMiddleY = blockX1 - (7 - middleUpupLines[k]) * 63;

      context.lineTo(cMiddleY,cX);
    }

    currentMiddleUpY = blockX1 - currentMiddleDownY;

   

    if (player.arrowMoveUp) {
      player.vX = -9;
    } else {
      player.vX = 9;
    }

    player.y += player.vY;
    player.x += player.vX;


    var w = player.width * 0.26;
  context.fillStyle = "#FF"+oxNum+oxNum;

    context.beginPath();
    if (Border(player)) {

      context.moveTo(player.x + player.halfWidth, player.y - player.halfWidth);
      context.lineTo(player.x - player.halfWidth, player.y - player.halfHeight);
      context.lineTo(player.x, player.y + player.halfWidth);
    } else if (!player.arrowMoveUp) {
      context.moveTo(player.x + player.halfWidth/1.414 + w,  player.y + player.halfWidth/1.414 -w);
      context.lineTo(player.x - player.halfWidth * 1.3 + w, player.y  -w);
      context.lineTo(player.x + w, player.y - player.halfWidth * 1.3-w);
    } else {
      context.moveTo(player.x - player.halfWidth / 1.414 -w, player.y + player.halfWidth / 1.414 -w);
      context.lineTo(player.x -w, player.y - player.halfWidth*1.3 -w);
      context.lineTo(player.x - w+player.halfWidth*1.3 , player.y-w );
    }
    context.closePath();
    context.fill();

        context.restore();

    // 画折线
    var lineStarty = player.y - player.halfWidth;
    context.beginPath();
    context.moveTo(player.x , player.y- player.halfWidth);

    var k = 0;



    for (var i = 0; i < arrowArrayY.length; i++) {
      var distanceY;
      if (i == 0 && arrowArrayY[0] > 0) {
        distanceY = player.x - arrowArrayY[0];
      } else {
        distanceY = arrowArrayY[i] - arrowArrayY[i - 1];
      }
      if (distanceY == 0 && (arrowArrayY[i] <= player.height + 20 + 1 || arrowArrayY[i] >= canvasWidth - 20 - player.height - 1)) {
        distanceY = 12.726;
      }
      distanceY = Math.abs(distanceY);
      lineStarty = lineStarty - distanceY;
      context.lineTo(arrowArrayY[i], lineStarty);
    }


    if(doubleFlag)
    context.lineWidth = 5 + 20 * Math.random();
  else 
    context.lineWidth = 5 + 5 * Math.random();
    context.strokeStyle = "#FF"+oxNum+oxNum;
    context.stroke();
    context.stroke();


    // 另一条线
    if(doubleFlag){
    context.save();
    context.translate(blockX1, 0);
    context.scale(-1, 1);

    context.beginPath();
if (borderFlag) {
      context.moveTo(player.x + player.halfWidth, player.y - player.halfWidth);
      context.lineTo(player.x - player.halfWidth, player.y - player.halfHeight);
      context.lineTo(player.x, player.y + player.halfWidth);
    } else if (!player.arrowMoveUp) {
      context.moveTo(player.x + player.halfWidth/1.414 + w,  player.y + player.halfWidth/1.414 -w);
      context.lineTo(player.x - player.halfWidth * 1.3 + w, player.y  -w);
      context.lineTo(player.x + w, player.y - player.halfWidth * 1.3-w);
    } else {
      context.moveTo(player.x - player.halfWidth / 1.414 -w, player.y + player.halfWidth / 1.414 -w);
      context.lineTo(player.x -w, player.y - player.halfWidth*1.3 -w);
      context.lineTo(player.x - w+player.halfWidth*1.3 , player.y-w );
    }
    context.closePath();
    context.fill();

        

    // 画折线
    var lineStarty = player.y - player.halfWidth;
    context.beginPath();
    context.moveTo(player.x , player.y- player.halfWidth);

    var k = 0;



    for (var i = 0; i < arrowArrayY.length; i++) {
      var distanceY;
      if (i == 0 && arrowArrayY[0] > 0) {
        distanceY = player.x - arrowArrayY[0];
      } else {
        distanceY = arrowArrayY[i] - arrowArrayY[i - 1];
      }
      if (distanceY == 0 && (arrowArrayY[i] <= player.height + 20 + 1 || arrowArrayY[i] >= canvasWidth - 20 - player.height - 1)) {

        distanceY = 12.726;
      }
      distanceY = Math.abs(distanceY);
      lineStarty = lineStarty - distanceY;
      context.lineTo(arrowArrayY[i], lineStarty);
    }
    if(doubleFlag)
    context.lineWidth = 5 + 20 * Math.random();
  else 
    context.lineWidth = 5 + 5 * Math.random();
  context.strokeStyle = "#FF"+oxNum+oxNum;
    context.stroke();

    context.restore()

}
    if (soundBackground.currentTime - 6.8 <= 0.2 && soundBackground.currentTime - 6.8 >= -0.2) {
      canvas.removeClass('bgm0');
      canvas.addClass('bgm1');
    }
    if (soundBackground.currentTime - 21.4 <= 0.3 && soundBackground.currentTime - 21.4 >= -0.3) {

      canvas.removeClass('bgm1');
      canvas.addClass('bgm2');
    }
    if (soundBackground.currentTime - 39 <= 0.3 && soundBackground.currentTime - 39 >= -0.3) {
      canvas.removeClass('bgm2');
      canvas.addClass('bgm3');
    }
    if (soundBackground.currentTime - 52 <= 0.3 && soundBackground.currentTime - 52 >= -0.3) {
      canvas.removeClass('bgm3');
      canvas.addClass('bgm4');
      doubleFlag = true;
    }
    context.rect(10, 0, 100, 20);
    // context.strokeStyle = "red";
    // context.stroke();
    context.fillStyle="red";
    context.fillRect(10, 2, health, 25);
    context.fillStyle="white";
    context.strokeStyle="white";


      context.fillRect(0, 0, 20, canvasHeight);
      context.fillRect(canvasWidth-20, 0, 20, canvasHeight);
 if (player.x < currentUpY || player.x > currentDownY || (player.x<currentMiddleDownY)&&(player.x>currentMiddleUpY))
    {  hurt();
        
          // tx -= 2;
        // ty += 2;
        if(t)
          {context.translate(tx, ty);
            t = !t;
        }
        else {
          context.translate(-tx, -ty);
          t = !t;
        }
    }

    // console.log(soundBackground.currentTime);
    if (playGame) {
      // Run the animation loop again in 33 milliseconds
      setTimeout(animate, 16);
    }
 
  }

  init();
});