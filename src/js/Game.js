
var oGame = new Game();

oGame.timer = null;
oGame.score = 0;
oGame.interval = 400;

oGame.init = function(){
    oG.init();
    oSnake.init(oG);
    createFood(oG);

    // next hit delay -----> 避免时间间隔导致的错误 -----> 节流
    // 绑定键盘事件
    // 37:left 38:up 39:right 40:down
    bindEvent();
};

function bindEvent(){

    var debunceDir = debunce(changeDirection);

    document.onkeydown = function(e){
        if(e.which == 37 && oSnake.direction != DIRECTION.RIGHT){
            oSnake.direction = DIRECTION.LEFT;
            // debunceDir(DIRECTION.LEFT);
        }else if(e.which == 38 && oSnake.direction != DIRECTION.DOWN){
            oSnake.direction = DIRECTION.UP;
            // debunceDir(DIRECTION.UP);
        }else if(e.which == 39 && oSnake.direction != DIRECTION.LEFT){
            oSnake.direction = DIRECTION.RIGHT;
            // debunceDir(DIRECTION.RIGHT);
        }else if(e.which == 40 && oSnake.direction != DIRECTION.UP){
            oSnake.direction = DIRECTION.DOWN;
            // debunceDir(DIRECTION.DOWN);
        }
    }
};

function changeDirection(dir){
    oSnake.direction = dir;
}

// 防抖函数
function debunce(func, delay = 5, immediate = true){
    var timer = null;
    console.log('enter')
    return function(args){
        var that = this;
        if(timer){
            clearTimeout(timer);
        }
        if(immediate){
            if(!timer){
                func.call(that, args);
                console.log('1')
                timer = setTimeout(function(){
                    timer = null;
                }, delay);
            }else{
                console.log('2', timer)
            }
        }else{
            timer = setTimeout(function(){
                func.call(that, args);
            }, delay);
        }
    }
}

// 节流函数
function throttle(func, delay = 500){
    var lastTime = 0;
    var timer = null;
    return function(args){
        var nowTime = Date.now();
        var remainingTime = delay - (nowTime - lastTime);
        var that = this;
        clearTimeout(timer);
        if(remainingTime <= 0){
            func.apply(that, args);
            lastTime = Date.now();
        }else{
            timer = setTimeout(func, remainingTime);
        }
    }
}

oGame.start = function(){
    clearInterval(oGame.timer);
    oGame.timer = setInterval(function(){
        oSnake.move(oG);
    }, oGame.interval);
};

oGame.over = function(){
    clearInterval(oGame.timer);
}

oGame.init();

function createFood(oGround){
    var x = null, y = null;
    var flag = true;
    while(flag){
        x = 1 + Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        var ok = true;
        for(var node = oSnake.head; node; node = node.next){
            if(x == node.x && y == node.y){
                ok = false;
                break;
            }
        }
        if(ok){
            flag = false;
        }
    }

    var food = SquareFactory.create('Food', x, y, 'green');
    oGround.remove(food.x, food.y);
    oGround.append(food);
}

oGame.start();

