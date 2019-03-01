function SquareFactory(){

}

SquareFactory.create = function(type, x, y, color){
    if(typeof SquareFactory.prototype[type] == 'undefined'){
        throw 'no this type';
    };
    if(SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype){
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }

    var newSquare = new SquareFactory.prototype[type](x, y, color);
    return newSquare;
}

SquareFactory.prototype.init = function(square, color, ms){
    square.viewContent.style.width = square.w + 'px';
    square.viewContent.style.height = square.h + 'px';
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * square.w + 'px';
    square.viewContent.style.top = square.y * square.h + 'px';
    square.viewContent.style.backgroundColor = color;
    square.touch = function(){
        return ms;
    }
}

SquareFactory.prototype.Stone = function(x, y, color){
    var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(stone, color, STRATEGYNUM.die);
    return stone;
}

SquareFactory.prototype.Floor = function(x, y, color){
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(floor, color, STRATEGYNUM.move);
    return floor;
}

SquareFactory.prototype.Food = function(x, y, color){
    var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(food, color, STRATEGYNUM.eat);
    food.upDate(x, y);
    return food;
}

SquareFactory.prototype.SnakeHead = function(x, y, color){
    var snakehead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(snakehead, color, STRATEGYNUM.die);
    snakehead.upDate(x, y);
    return snakehead;
}

SquareFactory.prototype.SnakeBody = function(x, y, color){
    var snakebody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(snakebody, color, STRATEGYNUM.die);
    return snakebody;
}

// var sf = SquareFactory.create('Stone', 10, 20, '#fff');

// SquareFactory.create('Stone', 10, 20, 'black')