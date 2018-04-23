var borderFlag = false;
var upInterval;
var downInterval;
var arrowArrayY = Array(310);
var arrowArrayLength = 200;
var player;

var ondownShortFlag = false;
var resetFlag = true;
var change = 0;
var ondownFlag = false;
var backgroundX = 0;
var draw1 = true;
var draw2 = false;
var gFlag = false;
var blackFlag = false;
var notHorizon = true;
var canDead = true;
var deadCount = 0;
var doubleFlag = false;
var topLen;
var background = new Image();
background.src = "/img/game/background5.png";
var background2 = new Image();
background2.src = "/img/game/background6.png";
var playerImg = new Image();
playerImg.src = "/img/game/xiaofangkuai.png";
var heici = new Image();
heici.src = "/img/game/heici.png";
var heidaoci = new Image();
heidaoci.src = "/img/game/heidaoci.png";
var heifangkuai = new Image();
heifangkuai.src = "/img/game/heifangkuai.png"
var yuanquan = new Image();
yuanquan.src = "/img/game/yuanquan.png"


var blackPlayerImg = new Image();
blackPlayerImg.src = "/img/game/wanjiaheibai.png";


var baisefangkuai = new Image();
baisefangkuai.src = "/img/game/baisefangkuai.png";
var baiseci = new Image();
baiseci.src = "/img/game/baiseci.png";
var baisedaoci = new Image();
baisedaoci.src = "/img/game/baisedaoci.png";

var X;
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
  this.squareJump = true;
  this.circleIsJump = true;
  this.arrowMoveUp = false;
  this.arrowSpeed = false;
  this.snakeMoveUp = false;
  this.circleJump = true;
  this.flameLength = 20;
  this.squareAngle = 0;
  this.big = false;
  this.scaleCount = 0;
  this.scaleBigX = 0;
  this.scaleBigY = 0;
  this.moveTurn = false;
};


var windowHeight = window.innerHeight;
$("gameCanvas").css("height", windowHeight);
player = new Player(200, windowHeight / 2);

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
  var uiTestPlay = $("#gameTestPlay");
  var uiDoublePlay = $("#gameDoublePlay");
  var soundBackground = $("#gameSoundBackground").get(0);

  var audio1 = document.getElementById("gameSoundBackground");



  var canvas = $("#gameCanvas");
  var context = canvas.get(0).getContext("2d");



  var canvasWidth = canvas.width();
  var canvasHeight = canvas.height();


  var conW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var conH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  // transform: rotate(90deg); width: 667px; height: 375px;transform-origin:28% 50%;  
  //var iosTopHe = 0;//若有其他样式判断，写于此  
  if (notHorizon) {
    $("body").css({
      "transform": "rotate(90deg) translate(" + ((conH - conW) / 2) + "px," + ((conH - conW) / 2) + "px)",
      "width": conH + "px",
      "height": conW + "px",
      //"margin-top":iosTopHe+"px",  
      // "border-left":iosTopHe+"px solid #000",  
      "transform-origin": "center center",
      "-webkit-transform-origin": "center center"
    });
  }
  //  $("#game").css("height", uiHeight).css("width", uiWidth);
  // ui.css("height", uiHeight).css("width", uiWidth);
  // $("#gameCanvas").css("height", uiHeight+"px").css("width",uiWidth+"px");

  var dead = function() {

    $("#deadd").hide();
    $("#dead").show();
    deadCount++;

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
    e.preventDefault();
    uiComplete.hide();
    clearTimeout(scoreTimeout);
    clearInterval(upInterval);
    clearInterval(downInterval);
    blocks = new Array();
    blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1]);
    blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
    blocks.unshift([2, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0]);
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



  // 游戏设置
  var playGame;
  var asteroids;
  var numAsteroids;
  var block;
  var score;
  var scoreTimeout;
  // var arrowDown = 40;
  function gravity() {

  }

  function move() {

    player.vY += player.aY;
    player.y += player.vY;

  }
  // 判断是否到边界或者上下有方块
  function Border(player, blocks) {
    borderFlag = false;

    if (player.y - player.halfHeight <= 29) {
      borderFlag = true;
      player.y = 30 + player.halfHeight;
    } else if (player.y + player.halfHeight >= canvasHeight - 20) {
      player.y = canvasHeight - 21 - player.halfHeight;
      borderFlag = true;
    }


    if (playGame) {
      for (var k = 0; k < blocks.length; k++) {
        for (var m = 0; m < blocks[0].length; m++) {
          if (blocks[k][m] === 1 || blocks[k][m] === 7) {
            if (!gFlag) {
              if (player.vY >= 0 && (Math.abs((blockY1 - (k + 1) * blockHeight) - (player.y + player.halfHeight)) <= 15) && player.x + player.halfWidth * 1.1 >= blockX1 + m * blockWidth && player.x - player.halfWidth * 1.1 <= blockX1 + (m + 1) * blockWidth) {
                player.y = blockY1 - (k + 1) * blockHeight - player.halfHeight;
                // player.circleJump = true;
                borderFlag = true;
              }
            } else {
              if (player.vY <= 0 && (Math.abs((blockY1 - k * blockHeight) - (player.y - player.halfHeight)) <= 15) && player.x + player.halfWidth * 1.1 >= blockX1 + m * blockWidth && player.x - player.halfWidth * 1.1 <= blockX1 + (m + 1) * blockWidth) {
                player.y = blockY1 - k * blockHeight + player.halfHeight;
                // player.circleJump = true;
                borderFlag = true;
              }
            }
          }
        }
      }
    }


    if (borderFlag)
      player.squareJump = false;

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
  trBlocks = new Array();
  var blockWidth = 44;
  var blockHeight = 44;
  var blockX1 = canvasWidth;
  var blockY1 = canvasHeight - 20;
  var blockVx1 = -8;
  var blockVy1 = 0;

  context.lineWidth = 3;
  context.strokeStyle = "white";
  blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1]);
  blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
  blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0]);
  blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  blocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
  blocks.unshift([2, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0]);

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
      setTimeout(function() {
        ondownShortFlag = false
      }, 130);
      // if (!player.squareJump) {
      //   player.vY = -14;
      //   player.squareJump = true;
      // }

    };
    var onup = function downArray(e) {
      e.preventDefault();
      ondownFlag = false;
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
        if (score % 6 == 0) {
          numAsteroids += 1;
        }
        timer();
      }, 1000);
    }
  }


  function scaleContext(ctx, x, y, proportion, scaleNum) {
    ctx.translate(x, y);
    player.scaleCount += scaleNum;
    context.scale(proportion, proportion);
    if (player.scaleCount === 15) {
      player.big = true;
    } else if (player.scaleCount === 0) {
      player.big = false;
    }
  }

  function animate() {

    context.clearRect(0, 0, canvasWidth + 100, canvasHeight + 100);
    context.fillStyle = "#003366";
    if (draw1)
      context.drawImage(background, backgroundX, 0, 32660, 500);
    else if (draw2)
      context.drawImage(background2, backgroundX, 0, 32660, 500);
    if (!blackFlag) {
      context.fillRect(0, canvasHeight - 20, canvasWidth, 20);
      context.fillRect(0, 0, canvasWidth, 29.2);
    } else {
      context.moveTo(0, 29.2);
      context.lineTo(canvasWidth, 29.2);
      context.moveTo(0, canvasHeight - 20);
      context.lineTo(canvasWidth, canvasHeight - 20);
      context.stroke();
    }
    backgroundX -= 1.5;
    if (backgroundX <= -2150)
      backgroundX = 0;
    context.fillStyle = "rgb(255, 255, 255)";
    // block

    blockX1 += blockVx1;
    blockY1 += blockVy1;
    for (var k = 0; k < blocks.length; k++) {
      for (var m = 0; m < blocks[0].length; m++) {
        var block = blocks[k][m];
        if (blockX1 + m * blockWidth <= canvasWidth && blockX1 + m * blockWidth >= 0) {

          if (block > 0) {
            //方块
            if (block === 1) {
              var hitXYdead = (player.x + player.halfWidth * 0.5 >= blockX1 + m * blockWidth && player.x - player.halfWidth * 0.5 <= blockX1 + (m + 1) * blockWidth) && ((player.y + player.halfHeight * 0.5 - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight * 0.5 - (blockY1 - k * blockHeight) < -15);
              if (doubleFlag) {
                var hitXYdead2 = (player.x + player.halfWidth * 0.5 >= blockX1 + m * blockWidth && player.x - player.halfWidth * 0.5 <= blockX1 + (m + 1) * blockWidth) && ((player.y + player.halfHeight * 0.5 - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight * 0.5 - (blockY1 - k * blockHeight) < -15);

              }
              if (!blackFlag) {
                context.drawImage(baisefangkuai, blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, blockHeight);
              } else {
                context.drawImage(heifangkuai, blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, blockHeight);
              }
              if ((hitXYdead2 || hitXYdead) && canDead) {
                dead();
              }

            }
            //地上的三角
            if (block === 2) {
              if (!blackFlag) {
                context.drawImage(baiseci, blockX1 + (m + 0.2) * blockWidth, blockY1 - (k + 0.6) * blockHeight, 0.6 * blockWidth, 0.6 * blockHeight);

              } else
                // context.stroke();
                context.drawImage(heici, blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, blockHeight);


              var hitXYdead = (player.x + player.halfWidth * 0.4 >= blockX1 + (m + 0.4) * blockWidth && player.x - player.halfWidth * 0.4 <= blockX1 + (m + 0.6) * blockWidth) && ((player.y + player.halfHeight * 0.4 - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight * 0.4 - (blockY1 - k * blockHeight) < -15);

              if (hitXYdead && canDead) {
                dead();
              }
            }

            // 挂着的三角
            if (block === 3) {

              if (!blackFlag) {
                context.drawImage(baisedaoci, blockX1 + (m + 0.2) * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth * 0.6, 0.6 * blockHeight);

              } else {
                // context.stroke();
                context.drawImage(heidaoci, blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, blockHeight);

              }

              var hitXYdead = (player.x + player.halfWidth * 0.4 >= blockX1 + (m + 0.4) * blockWidth && player.x - player.halfWidth * 0.4 <= blockX1 + (m + 0.6) * blockWidth) && ((player.y + player.halfHeight * 0.4 - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight * 0.4 - (blockY1 - k * blockHeight) < -15);

              if (hitXYdead && canDead) {
                dead();
              }
            }

            //地上弹簧
            if (block === 4) {
              if (!blackFlag) {
                context.fillStyle = "yellow";
                context.fillRect(blockX1 + m * blockWidth, blockY1 - (k + 0.3) * blockHeight, blockWidth, 0.3 * blockHeight);
                context.fillStyle = "white";
              } else {
                context.drawImage(heifangkuai, blockX1 + m * blockWidth, blockY1 - (k + 0.3) * blockHeight, blockWidth, 0.3 * blockHeight);

                // context.rect(blockX1 + m * blockWidth, blockY1 - (k + 0.3) * blockHeight, blockWidth, 0.3 * blockHeight);
                // context.stroke();
              }
              var hitXYjumpLand = (player.x + player.halfWidth >= blockX1 + m * blockWidth && player.x - player.halfWidth <= blockX1 + (m + 1) * blockWidth) && ((player.y + player.halfHeight * 0.5 - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight * 0.5 - (blockY1 - k * blockHeight) < -15);

              if (hitXYjumpLand) {
                player.vY = -19;
                player.squareJump = true;
              }

            }
            // 地上半三角
            if (block === 5) {
              // context.beginPath();

              // context.moveTo(blockX1 + (m + 0.5) * blockWidth, blockY1 - (k + 0.4) * blockHeight);
              // context.lineTo(blockX1 + (m + 0.2) * blockWidth, blockY1 - k * blockHeight);
              // context.lineTo(blockX1 + (m + 0.8) * blockWidth, blockY1 - k * blockHeight);

              // context.closePath();
              if (!blackFlag) {
                context.drawImage(baiseci, blockX1 + (m + 0.2) * blockWidth, blockY1 - (k + 0.4) * blockHeight, 0.6 * blockWidth, 0.4 * blockHeight);

              } else
                context.drawImage(heici, blockX1 + m * blockWidth, blockY1 - (k + 0.5) * blockHeight, blockWidth, 0.5 * blockHeight);


              var hitXYdead = (player.x + player.halfWidth * 0.4 >= blockX1 + m * blockWidth && player.x - player.halfWidth * 0.4 <= blockX1 + (m + 1) * blockWidth) && ((player.y + player.halfHeight * 0.4 - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight * 0.4 - (blockY1 - k * blockHeight) < -15);

              if (hitXYdead && canDead) {
                dead();
              }
            }

            // 二段跳
            if (block === 6) {
              var hitXYjumpVoid = (player.x + player.halfWidth >= blockX1 + m * blockWidth && player.x - player.halfWidth <= blockX1 + (m + 1) * blockWidth) && ((player.y + player.halfHeight - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight - (blockY1 - k * blockHeight) < -15);

              if (ondownFlag && hitXYjumpVoid) {
                if (!gFlag)
                  player.vY = -12;
                else
                  player.vY = 12;
              }

              if (!blackFlag) {
                context.beginPath();
                context.arc(blockX1 + (m + 0.5) * blockWidth, blockY1 - (k + 0.5) * blockHeight, blockWidth / 2, 0, Math.PI * 2, true);
                context.closePath();
                context.fillStyle = "yellow";
                context.fill();
                context.fillStyle = "white";
              } else
                context.drawImage(yuanquan, blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, blockHeight);

            }
            // 半方块
            if (block === 7) {
              if (!blackFlag)
                context.drawImage(baisefangkuai, blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, 0.5 * blockHeight);


              else {
                context.drawImage(heifangkuai, blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, 0.5 * blockHeight);
              }
              var hitXYdead = (player.x + player.halfWidth * 0.5 >= blockX1 + m * blockWidth && player.x - player.halfWidth * 0.5 <= blockX1 + (m + 1) * blockWidth) && ((player.y + player.halfHeight * 0.5 - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight * 0.5 - (blockY1 - k * blockHeight) < -15);

              if (hitXYdead && canDead) {
                dead();
              }
            }

            // 重力
            if (block === 8) {
              var hitXYjumpLand = (player.x + player.halfWidth >= blockX1 + m * blockWidth && player.x - player.halfWidth * 0.5 <= blockX1 + (m + 1) * blockWidth);

              if (hitXYjumpLand) {
                blocks[k][m] = 0;
                gFlag = !gFlag;
                if (!blackFlag) {
                  draw1 = !draw1;
                  draw2 = !draw2;
                }
              }
            }
            //反重力弹簧
            if (block === 9) {
              if (!blackFlag) {
                context.fillStyle = "yellow";
                context.fillRect(blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, 0.3 * blockHeight);

                context.fillStyle = "white";
              } else {
                context.drawImage(heifangkuai, blockX1 + m * blockWidth, blockY1 - (k + 1) * blockHeight, blockWidth, 0.3 * blockHeight);

              }
              var hitXYjumpLand = (player.x + player.halfWidth >= blockX1 + m * blockWidth && player.x - player.halfWidth * 0.5 <= blockX1 + (m + 1) * blockWidth) && ((player.y + player.halfHeight * 0.5 - (blockY1 - (k + 1) * blockHeight)) > 15 && player.y - player.halfHeight * 0.5 - (blockY1 - k * blockHeight) < -15);

              if (hitXYjumpLand) {
                player.vY = 19;
                player.squareJump = true;
              }

            }
            if (block === 10) {
              var hitXYjumpLand = (player.x + player.halfWidth >= blockX1 + m * blockWidth && player.x - player.halfWidth * 0.5 <= blockX1 + (m + 1) * blockWidth);

              if (hitXYjumpLand) {
                blocks[k][m] = 0;
                draw1 = false;
                draw2 = false;
                blackFlag = true;
              }


            }
            //变黑
            if (block === 11) {
              var hitXYjumpLand = (player.x + player.halfWidth >= blockX1 + m * blockWidth && player.x - player.halfWidth * 0.5 <= blockX1 + (m + 1) * blockWidth);

              if (hitXYjumpLand) {

                blocks[k][m] = 0;
                draw1 = !draw1;
                draw2 = !draw2;
              }
            }
            // 音乐
            if (block === 12) {
              var hitXYjumpLand = (player.x + player.halfWidth >= blockX1 + m * blockWidth && player.x - player.halfWidth * 0.5 <= blockX1 + (m + 1) * blockWidth);

              if (hitXYjumpLand) {
                blocks[k][m] = 0;
                soundBackground.currentTime = 36;
                // soundBackground.pause();
                // soundBackground2.currentTime = 0;
                // soundBackground2.play();
              }
            }


          } else if (block < 0) {
            if (block === -1) {
              blocks[k][m] = 0;

              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              // 注意第一个0是代表删除0个元素
              blocks[9].splice(len + 1, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -11);
              blocks[8].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[3].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[2].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0);
              blocks[0].splice(len + 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0);
            }
            if (block === -11) {
              blocks[k][m] = 0;

              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              // 注意第一个0是代表删除0个元素
              blocks[9].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2);
              blocks[8].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[3].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 7, 7, 1, 0, 0, 0, 1, 7, 7);
              blocks[2].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0);
              blocks[0].splice(len + 1, 0, 0, 0, 0, 0, 0, 4, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 4, 2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0);
            }
            if (block === -2) {
              blocks[k][m] = 0;

              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              // 注意第一个0是代表删除0个元素
              blocks[9].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 8, -12);
              blocks[8].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[3].splice(len + 1, 0, 7, 7, 7, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[2].splice(len + 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[0].splice(len + 1, 0, 0, 0, 0, 1, 5, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

            }
            if (block === -12) {
              blocks[k][m] = 0;

              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              // 注意第一个0是代表删除0个元素
              blocks[9].splice(len + 1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -3);
              blocks[8].splice(len + 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[7].splice(len + 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[3].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7);
              blocks[2].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 1, 7, 7, 7, 7, 1, 0, 1, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0);
              blocks[0].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0);

            }
            if (block === -3) {
              blocks[k][m] = 0;

              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              // 注意第一个0是代表删除0个元素
              blocks[9].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -4);
              blocks[8].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0);
              blocks[3].splice(len + 1, 0, 7, 7, 7, 7, 7, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0);
              blocks[2].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 7, 7, 7, 7, 7, 7, 7, 1, 7, 7, 7, 7, 7, 7, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[0].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 4, 4, 5, 5, 5, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);

            }
            if (block === -4) {
              blocks[k][m] = 0;
              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;

              // 注意第一个0是代表删除0个元素

              blocks[9].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 9, 3, 3, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 3, 3, 3, 3, 3, -5);
              blocks[8].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 8, 0);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[6].splice(len + 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0);
              blocks[3].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[2].splice(len + 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[0].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
            }

            if (block === -5) {
              blocks[k][m] = 0;
              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              // 注意第一个0是代表删除0个元素
              topLen = blocks[9].length;

              blocks[9].splice(len + 1, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 0, 0, 1, 0, 0, 1, 3, 3, 3, 3, 3, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 3, 3, 3, 9, 9, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 8, 0, 0, 0);
              blocks[8].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, -6);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 9, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0);
              blocks[3].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 7, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[2].splice(len + 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[0].splice(len + 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            }
            if (block === -6) {
              blocks[k][m] = 0;
              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              // 注意第一个0是代表删除0个元素
              blocks[9].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -7);
              blocks[8].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0);
              blocks[3].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0);
              blocks[2].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 6, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[0].splice(len + 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 1, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
            }
            if (block === -7) {
              blocks[k][m] = 0;
              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              // 注意第一个0是代表删除0个元素
              blocks[9].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8);
              blocks[8].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4);
              blocks[3].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 1);
              blocks[2].splice(len + 1, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[0].splice(len + 1, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
            }
            if (block === -8) {
              blocks[k][m] = 0;
              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              topLen = blocks[9].length;
              // 注意第一个0是代表删除0个元素
              // blocks.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
              // blocks.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);



              blocks[9].splice(len + 1, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3);
              blocks[8].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -9);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[3].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[2].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[0].splice(len + 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            }
            if (block === -9) {
              blocks[k][m] = 0;
              var len = blocks[0].length;
              for (var i = 0; i < blocks.length; i++) {
                blocks[i].splice(0, len - 22);
              }
              blockX1 = blockX1 + (len - 22) * blockWidth;
              len = blocks[0].length;
              // 注意第一个0是代表删除0个元素
              topLen = blocks[9].length;

              blocks[9].splice(len + 1, 0, 0, 3, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, -10);
              blocks[8].splice(len + 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
              blocks[7].splice(len + 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1);
              blocks[6].splice(len + 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);
              blocks[5].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0);
              blocks[4].splice(len + 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1);
              blocks[3].splice(len + 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1);
              blocks[2].splice(len + 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
              blocks[1].splice(len + 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              blocks[0].splice(len + 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            }
          }
        }
      }

    }
    if (ondownFlag) {

      if (!gFlag) {
        if (!player.squareJump) {
          player.vY = -14;
          player.squareJump = true;
        }

      } else if (gFlag) {
        if (!player.squareJump) {

          player.vY = 14;
          player.squareJump = true;
        }

      }
    }


    if (!Border(player, blocks))
      player.squareJump = true;


    if (player.squareJump) {
      if (!gFlag) {
        player.aY = 1;

      } else if (gFlag) {

        player.aY = -1;
      }
    }
    move();

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
    } else if (player.squareAngle % 90 >= 60) {

      player.squareAngle = (Math.floor(player.squareAngle / 90) + 1) * 90;
    } else {
      player.squareAngle = Math.floor(player.squareAngle / 90) * 90;

    }
    context.rotate(player.squareAngle * Math.PI / 180);

    // context.fillRect(-player.halfWidth, -player.halfWidth, player.width, player.width);
    if (!blackFlag)
      context.drawImage(playerImg, -player.halfWidth, -player.halfWidth, player.width, player.width);
    else {
      context.drawImage(blackPlayerImg, -player.halfWidth, -player.halfWidth, player.width, player.width);
      context.drawImage(blackPlayerImg, -player.halfWidth + 9, -player.halfWidth + 9, player.width - 18, player.width - 18);

    }
    context.restore();

    if (playGame) {
      // Run the animation loop again in 33 milliseconds
      setTimeout(animate, 16);
    }
  }

  init();
});