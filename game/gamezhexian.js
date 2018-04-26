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
var currentMiddleDownY = 245;
var currentMiddleUpY = 245;
var draw1 = true;
var draw2 = false;
var gFlag = false;
var blackFlag = false;
var notHorizon = false;
var canDead = true;
var deadCount = 0;
var doubleFlag = false;
var topLen;
var nextMiddleY = 245;

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

  var baifangkuaiCanvas = document.getElementById("baifangkuaiCanvas");
  var offctx = baifangkuaiCanvas.getContext("2d");


  var canvasWidth = canvas.width();
  var canvasHeight = canvas.height();


  var conW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var conH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

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

    if (player.y - player.halfHeight <= 29) {
      borderFlag = true;
      player.y = 30 + player.halfHeight;

    } else if (player.y + player.halfHeight >= canvasHeight - 20) {
      player.y = canvasHeight - 21 - player.halfHeight;
      borderFlag = true;
    }

    return borderFlag;
  }



  // 游戏UI
  var upupLines = new Array();
  var downLines = new Array();
  var middleUpupLines = new Array();
  // var middleDownLines = new Array();

  upupLines.push(
    7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, // 20
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 6, 7, 6, 5, 5, 5, 5, 5, 6, 7, 6, 5, 5, 5, 6, 6,
    6, 6, 6, 6, 7, 7, 7, 6, 5, 5, 6, 7, 7, 7, 7, 7, 6, 7, 7, 7,

    6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 6, 5, 4, 4,
    4, 5, 6, 7, 6, 5, 4, 4, 4, 4, 4, 5, 6, 7, 6, 5, 4, 5, 6, 7,
    6, 5, 4, 5, 6, 7, 6, 5, 4, 5, 6, 7, 6, 5, 4, 5, 6, 7, 6, 5,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,

    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 6, 7, 6, 7, 7, 7, 7, 7, 7, 7, 7, 6.8, 6.6, 6.4, 5.4, 5, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,

    5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 5, 7, 5, 5, 7
  );

  downLines.push(
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2,

    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0,
    0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3,
    2, 1, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1,
    1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8, 3.2,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 1, 2, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
    0);
  middleUpupLines.push(
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   -1, 3.5, 2.5, 3.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,


    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   -1, 3.5, 3, 2.5, 3, 3.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, -1, 3.5, 2.5, 3.5, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, -1, 3.5, 2.5, 3.5, 2.5, 3.5, 2.5, 3.5,0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -1, 3.5, 3, 2.5, 2.5, 2.5, 2.5, 2.5, 3, 3.5, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -1, 3.5, 2.5, 1.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

  )


  // blocks = new Array();

  // var blockWidth = 44;
  // var blockHeight = 44;
  var blockX1 = canvasWidth;
  var blockY1 = canvasHeight - 20;
  var blockVx1 = -9;
  var blockVy1 = 0;

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
      setTimeout(function() {
        ondownShortFlag = false
      }, 130);


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
        timer();
      }, 1000);
    }
  }

  function animate() {
    currentDownY = 490;
    currentUpY = 0;
    currentMiddleDownY = 245;
    currentMiddleUpY = 245;
    nextMiddleY = 245;

    animateCount++;

    var i = Math.floor(animateCount / 7) - 16;
    var i18 = i + 18;
    context.clearRect(0, 0, canvasWidth + 100, canvasHeight + 100);
    context.fillStyle = "white";

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

    // 颜色

    // block

    blockX1 += blockVx1;
    blockY1 += blockVy1;
    if (i < 0)
      i = 0
    var j = i;
    var k = i - 10;
    // 上
    context.beginPath();
    context.moveTo(-20, 0);
    for (; i < i18; i++) {
      var cX = i * 63 + blockX1;
      cUpY = blockY1 - upupLines[i] * 63;
      context.lineTo(cX, cUpY);

      if (cX < 350 && cX + 63 > 350) {
        currentUpY = cUpY + (blockY1 - upupLines[i + 1] * 63 - cUpY) / 63 * (350 - cX);
      }

    }
    context.lineTo(1200, 0);
    context.closePath();
    context.fill();

    // 下
    context.beginPath();
    context.moveTo(-20, 490);
    for (; j < i18; j++) {
      var cX = j * 63 + blockX1;
      cDownY = blockY1 - downLines[j] * 63;
      context.lineTo(cX, cDownY);
      if (cX <= 350 && cX + 63 >= 350) {
        currentDownY = cDownY + (blockY1 - downLines[j + 1] * 63 - cDownY) / 63 * (350 - cX);
      }

    }
    context.lineTo(1200, 490);
    context.closePath();
    context.fill();

    // 中
    for (; k < i18; k++) {
      if (middleUpupLines[k] === 0)
        continue;
      if (middleUpupLines[k] === -1)
        {
        context.beginPath();}
        else{
      // if(middleUpupLines[k] === -2){
      //   context.closePath();
      //   context.fill();}
      var cX = k * 63 + blockX1;
      cMiddleY = blockY1 - middleUpupLines[k] * 63;
      if(middleUpupLines[k+1] === 0) {
        nextMiddleY = 245;
      } else 
      nextMiddleY = blockY1 - middleUpupLines[k + 1] * 63;

      if (middleUpupLines[k] > 0 && middleUpupLines[k - 1] === 0)
        context.moveTo(cX, cMiddleY);
      else
        context.lineTo(cX, cMiddleY);
      if (cX <= 350 && cX + 63 >= 350) {
        currentMiddleDownY = cMiddleY + (nextMiddleY - cMiddleY) / 63 * (350 - cX);
      }
}
    }
    // console.log((middleUpupLines[k + 1] * 63 - cMiddleY) / 63);
    console.log(currentMiddleDownY);
    for (; k > i18-25; k--) {
      if (middleUpupLines[k] === 0)
        continue;
      if (middleUpupLines[k] === -1) {
        context.closePath();
        context.fill();
        break;
      }
      // if(middleUpupLines[k] === -2){
      //   context.closePath();
      //   context.fill();}
      var cX = k * 63 + blockX1;
      cMiddleY = blockY1 - (7 - middleUpupLines[k]) * 63;

        context.lineTo(cX, cMiddleY);
    }

        currentMiddleUpY = 490 - currentMiddleDownY;


    if (player.y < currentUpY || player.y > currentDownY || (player.y<currentMiddleDownY)&&(player.y>currentMiddleUpY))
      dead();



    if (player.arrowMoveUp) {
      player.vY = -9;
    } else {
      player.vY = 9;
    }

    player.y += player.vY;


    var w = player.width * 0.26;
    context.fillStyle = "white";
    context.beginPath();
    if (Border(player)) {
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

    context.strokeStyle = "white";
    context.lineWidth = 5 + 10 * Math.random();
    context.stroke();


    if(soundBackground.currentTime - 6.8<=0.1&&soundBackground.currentTime - 6.8>=-0.1){
      canvas.removeClass('bgm0');
      canvas.addClass('bgm1')
    }
    console.log(soundBackground.currentTime);
    if (playGame) {
      // Run the animation loop again in 33 milliseconds
      setTimeout(animate, 16);
    }
  }

  init();
});