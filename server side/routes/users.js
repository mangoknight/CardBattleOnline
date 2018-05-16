var express = require('express');
var router = express.Router();
var config = require('../model/config');
var sqlcmd = require('../model/sqlcmd');
var uu = require('../model/encrypt');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('{"status":"success"}');
});

router.get('/login', function (req, res) {
  var name = req.query.name;
  var passwd = uu.enc(req.query.passwd);

  var returnmsg = { status: 0, msg: { user_name: "", user_pwd: "", user_win: "", user_lose: ""} };
  //先判断验证码

  var sqlstr = new sqlcmd.Select('user').Where({ user_name: name, user_pwd: passwd }).query;
  sqlcmd.Doit(sqlstr, function (qerr, vals, filed) {
    console.log(vals);
    if (vals.length == 0) {
      returnmsg.status = 1;
      returnmsg.msg.desc = "用户名和密码不匹配";
      res.send(JSON.stringify(returnmsg));
    }
    else {
      returnmsg.msg.user_name = vals[0].user_name;
      returnmsg.msg.user_pwd = vals[0].user_pwd;
      returnmsg.msg.user_win =  vals[0].user_win;
      returnmsg.msg.user_lose = vals[0].user_lose;
      res.send(JSON.stringify(returnmsg));
      
    }
  });
});
module.exports = router;
