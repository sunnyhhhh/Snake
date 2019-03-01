var tool = {
    inherit: function(target, origin){
        // 原型  （圣杯：永生 ---》 闭包）
        var temp = function(){};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    extends: function(origin){
        // 原型  私有属性
        var result = function(){
            origin.apply(this, arguments);
        };
        this.inherit(result, origin);
        return result;
    },
    single: function(origin){
        // 要返回的子类
        var singleResult = (function(){
            var instance;
            return function(){
                // this = {}
                if(typeof instance == 'object'){
                    return instance;
                }
                instance = this;
                origin && origin.apply(this, arguments);
                return instance;
            }
        })();
        origin && this.inherit(singleResult, origin);
        return singleResult;
    }
}



// tool.inherit(Food, Square);

// extends 参数是父类 返回子类  子类继承父类的原型属性和私有属性
// var Food = tool.single(Square);
// var oF1 = new Food(10, 20);
// var oF2 = new Food(20, 30);
