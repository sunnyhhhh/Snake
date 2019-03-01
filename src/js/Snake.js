
var oSnake = new Snake();

oSnake.head = null;
oSnake.tail = null;

oSnake.init = function(oGround){
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'blue');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'blue');

    // 蛇身链表
    snakeHead.next = snakeBody1;
    snakeHead.prev = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.prev = snakeHead;

    snakeBody2.next = null;
    snakeBody2.prev = snakeBody1;

    // render
    oGround.remove(snakeHead.x, snakeHead.y);
    oGround.append(snakeHead);

    oGround.remove(snakeBody1.x, snakeBody1.y);
    oGround.append(snakeBody1);

    oGround.remove(snakeBody2.x, snakeBody2.y);
    oGround.append(snakeBody2);

    this.head = snakeHead;
    this.tail = snakeBody2;

    // 默认方向
    this.direction = DIRECTION.RIGHT;
};

oSnake.strategies = {
    MOVE: function(snake, square, ground, fromEat){
        console.log('move');
        // 创建新身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'blue');
        newBody.next = snake.head.next;
        newBody.prev = null;
        newBody.next.prev = newBody;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 新建蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
        newHead.next = newBody;
        newHead.prev = null;
        newBody.prev = newHead;

        ground.remove(square.x, square.y);
        ground.append(newHead);
        snake.head = newHead;

        if(!fromEat){
            // 避免删除蛇尾后露出地板
            var floor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(floor);
            snake.tail = snake.tail.prev;
            return;
        }


    },
    EAT: function(snake, square, ground){
        console.log('eat');
        this.MOVE(snake, square, ground, true);
        oGame.score++;
        createFood(ground);
    },
    DIE: function(){
        console.log('die');
        oGame.over();
        alert(oGame.score);
    }
}

oSnake.move = function(oGround){
    var square = oGround.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    
    if(typeof square.touch == 'function'){
        this.strategies[square.touch()](this, square, oGround);
    }
}


// oSnake.init(oG);
// oSnake.move(oG);