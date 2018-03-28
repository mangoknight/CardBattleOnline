var sqlcmd = require('./sqlcmd');
function userinfo(username,callback){
    var str = new sqlcmd.Select('user').Where({ user_name: username }).query;
    sqlcmd.Doit(str, (a, b) => {
        callback(b[0]) ;
    })
}
module.exports.userinfo = userinfo;