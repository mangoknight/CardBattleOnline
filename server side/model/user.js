var sqlcmd = require('./sqlcmd');
var config = require('./config');
// var clisent = require("redis")
// , redis = clisent.createClient(config.redis.port, config.redis.host, config.redis.opts);

function userinfo(username,callback){
    var str = new sqlcmd.Select('user').Where({ user_name: username }).query;
    sqlcmd.Doit(str, (a, b) => {
        callback(b[0]) ;
    })
}
function testRedis(callback){
    redis.set("aaa",123);
    callback(true);
}
module.exports.testRedis = testRedis;
module.exports.userinfo = userinfo;