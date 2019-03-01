// 初始化所有可能的变量

// 场景坐标
var BASE_X_POINT = 200;
var BASE_Y_POINT = 200;

// 场景宽高系数
var XLEN = 30;
var YLEN = 30;

// 方块宽度
var SQUAREWIDTH = 20;

// 基类
function Square(x, y, w, h, dom){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.viewContent = dom || document.createElement('div');
}

Square.prototype.upDate = function(x, y){
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
}

Square.prototype.touch = function(){
    console.log('touch');
}

// 地板方块
var Floor = tool.extends(Square);
// 障碍物
var Stone = tool.extends(Square);
// 食物  单例
var Food = tool.single(Square);
// 蛇头   单例
var SnakeHead = tool.single(Square);
// 蛇身 非单例
var SnakeBody = tool.extends(Square);

// 广场
var Ground = tool.single(Square);

// 都是单例 但不必继承
var Snake = tool.single();
var Game = tool.single();


// 蛇前行方向
var DIRECTION = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    }
};

// 返回对应的信息
var STRATEGYNUM = {
    move: 'MOVE',
    eat: 'EAT',
    die: 'DIE'
};