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
var calculateBouns =function(myself,enemy) {
    return obj[level](myself,enemy);
};
module.exports.calculateBouns = calculateBouns;