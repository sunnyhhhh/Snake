

var oG = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);
console.log(oG);


oG.init = function(){
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.backgroundColor = '#ff0';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.w + 'px';
    this.viewContent.style.height = this.h + 'px';

    // 生成一个二维数组
    this.SquareTable = [];
    var times = 0;

    // i控制每一行
    var newSquare = null;
    for(var i = 0; i < YLEN; i++){
        this.SquareTable[i] = new Array(XLEN);
        for(var j = 0; j < XLEN; j++){
            if(j == 0 || i == 0 || j == XLEN - 1 || i == YLEN - 1){
                newSquare = SquareFactory.create('Stone', j, i, 'black');
            }else{
                newSquare = SquareFactory.create('Floor', j, i, 'orange');
            }
            this.SquareTable[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }

    document.body.appendChild(this.viewContent);
};

// oG.init();

oG.remove = function(x, y){
    var square = this.SquareTable[y][x];
    this.viewContent.removeChild(square.viewContent);
    this.SquareTable[y][x] = null;
}

oG.append = function(square){
    this.SquareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent);
}

// oG.remove(3, 1);

// var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
// oG.append(snakeHead);