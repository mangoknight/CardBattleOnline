var config = require('./config');
// var clisent = require("redis")
// , redis = clisent.createClient(config.redis.port, config.redis.host, config.redis.opts);

var rooms = new Array();
var roomCount = 1;
//rooms[0]={id:1,status:0,user1:'11',user2:'22'};
//判断有没有新房间
function findWaitRoom(){
    var r={status: false, room: rooms.length};
    rooms.forEach(element => {
        if(element.status==1){
            //this.joinRoom(name,element.id);
            r={status: true, room : element};
            return r;
        }
    });
   return r;
}
//查询与id对应的数组下标
function findRoomEqualId(id){
    for(var i=0;i<rooms.length;i++){
        if(rooms[i].id==id){
            return i;
        }
    }

}
//加入房间
function joinRoom(id,user,callback){
    var x = findRoomEqualId(id);
    rooms[x].user2=user;
    rooms[x].status=0;
    callback(rooms[x]);
}
//新建房间
function newRoom(user,callback){
    var newR = {id:roomCount,status:1,user1: user,user2:''}
    roomCount++;
    rooms.push(newR);
    callback(newR);
}
module.exports.findWaitRoom=findWaitRoom;
module.exports.joinRoom=joinRoom;
module.exports.newRoom=newRoom;
