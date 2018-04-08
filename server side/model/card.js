//效果
var obj = {
    1: function(myself,enemy) {//民兵
        if(myself.people>0){
            myself.people -= 1;
            enemy.blood -= 1;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    },
    2 : function(myself,enemy) {
        return ;
    },
    3 : function(myself,enemy) {
        return ;
    } 
};
//总调用
var calculateBouns =function(level,myself,enemy) {
    return obj[level](myself,enemy);
};
var getOne = function(){
    return Math.random() * 54 | 0;
}
module.exports.calculateBouns = calculateBouns;
module.exports.getOne=getOne;