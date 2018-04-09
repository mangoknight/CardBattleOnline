import { calculateBouns } from './card';

var sqlcmd = require('./sqlcmd');
var config = require('./config');
// var clisent = require("redis")
// , redis = clisent.createClient(config.redis.port, config.redis.host, config.redis.opts);
//查询用户信息
function userinfo(username,callback){
    var str = new sqlcmd.Select('user').Where({ user_name: username }).query;
    sqlcmd.Doit(str, (a, b) => {
        callback(b[0]) ;
    })
}
//判断是否有人死亡返回true Alive or false die+name
function dieOrAlive(myself,enemy){
    var info ;
    if(myself.HP <=0){
        info = {result:false,name:myself.name};
    }else if(enemy.HP){
        info = {result:false,name:enemy.name};
    }else{
        info = {result:true,name:""};
    }
    return info;
}
//对局结束，记录胜场到数据库
function gameOver(win,lose){
    var count,lcount=0;
    var str = new sqlcmd.Select('user').Where({user_name: win}).query;
    sqlcmd.Doit(str, (a, b)=>{
        count = b[0].user_win;
        count++;
    }); 
    var up = sqlcmd.Update({user_win:count},"user",{user_name:win});
    sqlcmd.Doit(up, (a, b)=>{
        console.log(a);
    }); 
    var str1 = new sqlcmd.Select('user').Where({user_name: lose}).query;
    sqlcmd.Doit(str1, (a, b)=>{
        lcount = b[0].user_lose;
        lcount++;
    }); 
    var up1 = sqlcmd.Update({user_lose:lcount},"user",{user_name:lose});
    sqlcmd.Doit(up1, (a, b)=>{
        console.log(a);
    });
}
module.exports.dieOrAlive=dieOrAlive;
module.exports.userinfo = userinfo;