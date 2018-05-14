var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sqlcmd = require('./model/sqlcmd');
var index = require('./routes/index');
var users = require('./routes/users');
var user = require('./model/user');
var room = require('./model/room');
var test = require('./routes/test');
var encrypt = require('./model/encrypt');
var app = express();
var config = require('./model/config');
var clisent = require("redis")
, redis = clisent.createClient(config.redis.port, config.redis.host, config.redis.opts);
var ccc= require("./model/card");
//连接错误处理
redis.on("error", function (error) {
    console.log(error);
});
 

var http = require('http').Server(app).listen(7777);
var io = require("socket.io")(http);
//var epwd = encrypt.enc('1111');

io.on('connection', function (socket) {
  //这是socket.io 即时通讯

  //登录
  socket.on('login', (msg) => {
    var str = new sqlcmd.Select('user', ['user_pwd']).Where({ user_name: msg.name }).query;
    sqlcmd.Doit(str, (a, b) => {
      console.log(a);
      console.log(b.length);
      if (a === null && b.length !== 0) {
        var pass = b[0].user_pwd;
        var p = encrypt.enc(msg.password);
        if (pass == p) {
          user.userinfo(msg.name, (info) => {
            io.emit('loginBack' + msg.name, { status: true, content: ' ', user: info });
          })

        } else {
          io.emit('loginBack' + msg.name, { status: false, content: '密码不正确', user: msg.name });
        }
      } else {
        io.emit('loginBack' + msg.name, { status: false, content: '请注册！', user: msg.name });
      }
    });
  });
  //注册
  socket.on('regist', (msg) => {
    var select = new sqlcmd.Select('user', ['user_name']).Where({ user_name: msg.name }).query;
    sqlcmd.Doit(select, (a, b) => {
      console.log(a);
      console.log(b);
      if (b[0] != null) {

        io.emit('fail' + msg.name, { status: false, content: '账户已存在.', user: msg.name });
      } else {
        var p = encrypt.enc(msg.pwd);//md5加密
        var insert = sqlcmd.Insert({ user_name: msg.name, user_pwd: p }, 'user');
        sqlcmd.Doit(insert, (a, b) => {
          console.log(a);
          console.log(b);

          if (a == null) {//插入成功
            //   socket.emit('update', { gengxin: 'ture' });
            io.emit('success' + msg.name, { status: true, content: '注册成功!.', user: msg.name });
          }
          else {
            io.emit('fail' + msg.name, { status: false, content: '注册失败!.', user: msg.name });
          }
        });
      }
    });
  });
  //开始战斗
  socket.on('startGame', (msg) => {
    var rrr = room.findWaitRoom();
    if (rrr.status==1) {
      console.log('joinroom');//有房间加入房间
      room.joinRoom(rrr.room.id, msg.user, (back) => {
        console.log(back);//初始化个人属性
        var zhuangtai = {name:msg.user.name,room:back.id,cityLevel:0,
          junshiLevel:0,HP:10,defence:10,people:10,peopleAdd:1,money:0,moneyAdd:2,zhaomu1:0,zhaomu2:0};
        redis.set("info"+msg.user.user_name+back.id,JSON.stringify(zhuangtai));
        // (error, res) => {
        //           if (error) {
        //               console.log(error);
        //           } else {
        console.log(back.user1.user_name);              
        io.emit('joinOk'+back.user1.user_name,{room:back,status:zhuangtai});
        socket.emit('joinOk'+back.user2.user_name,{room:back,status:zhuangtai});
        //           }
        });
      
    } else {
      console.log('newroom');
      room.newRoom(msg.user, (back1) => {
        console.log(back1);
        var zhuangtai = {name:msg.user.name,room:back1.id,cityLevel:0,
          junshiLevel:0,HP:10,defence:10,people:10,peopleAdd:1,money:0,moneyAdd:2,zhaomu1:0,zhaomu2:0};
        redis.set("info"+msg.user.user_name+back1.id,JSON.stringify(zhuangtai));
        // (error, res) => {
        //           if (error) {
        //               console.log(error);
        //           } else {
                      
                    socket.emit('wait'+msg.user.user_name,{room:back1,status:zhuangtai});
        //           }
        // });
        
      })
    }
  });
  socket.on('round0',(msg)=>{
    console.log('第一回合发三张牌');
    var a1 ={};
    for(var i= 0;i<3;i++){
      a1[i]=ccc.getOne();
    }
    
    console.log(a1);
    redis.set("card"+msg.room.id+msg.room.user1.user_name,JSON.stringify(a1));
    socket.emit("card"+msg.room.id+msg.room.user1.user_name,a1);
    var a2 = {};
    for(var i= 0;i<3;i++){
      a2[i]=ccc.getOne();
    }
    console.log(a2);
    redis.set("card"+msg.room.id+msg.room.user2.user_name,JSON.stringify(a2));
    io.emit("card"+msg.room.id+msg.room.user2.user_name,a2);
  });
  //出牌对战
  socket.on('chupai',(msg)=>{
    console.log(msg);
    var enemy,myself;
    //msg : roomid enemy(name) user(name)  card.id  
    redis.get("info"+msg.user+msg.room,(e,r)=>{
      myself=JSON.parse(r);
      redis.get("info"+msg.enemy+msg.room,(e1,r1)=>{
        enemy=JSON.parse(r1);
        var cards;
        redis.get("card"+msg.room+msg.user,(e2,r2)=>{
          cards=JSON.parse(r2);
          var result = ccc.calculateBouns(msg.cardid,myself,enemy);
         
              if(result.status){
                var car = ccc.removeByValue(cards, msg.cardid);
                var len = Object.keys(car).length;
                redis.set("card"+msg.room+msg.user,JSON.stringify(car));
                //判断有没有猛将 再多减一点伤害
                
                //判断有没有死的
                var die = user.dieOrAlive(myself,enemy);
                console.log(die);
                if(die.result){//如果没死的，游戏继续，更新redis，发回客户端
                  redis.set("info"+msg.user+msg.room,JSON.stringify(result.myself));
                  redis.set("info"+msg.enemy+msg.room,JSON.stringify(result.enemy));
                  console.log(msg.user);
                  io.emit("endpai"+msg.room,{myself:result.myself,enemy:result.enemy,host:msg.user,card:msg.cardid});
                  io.emit("addCard"+msg.room,{user:msg.user,len:len}) 
                }else{//如果有死的，清除redis，给失败的发送失败消息，胜利的接收胜利消息 ，
                  redis.del("info"+msg.user+msg.room);
                  redis.del("info"+msg.enemy+msg.room);
                  redis.del("card"+msg.room+msg.user);
                  redis.del("card"+msg.room+msg.enemy);
                  socket.emit("GameOver"+msg.room,{room:msg.room,lost:die.name});
                  
                }
               
              }else{
                console.log(result);
                socket.emit("cardFail"+msg.user,result);
              }
        });
      });
    });
    
    
   

  });
  //退房
  socket.on("quit",(msg)=>{
    //房间信息，which 1 or 2 ，{room：room，which 1 2}
    if(msg.which == 1){
      //退房间输场+1 对手胜场+1 弹出胜利
      // var qu = sqlcmd.Select('user', ['user_name']).Where({ user_name: msg.name }).query;
      // var update = sqlcmd.Update();
      socket.emit("GameOver"+msg.room.id,{room:msg.roomid,lost:msg.room.user1.user_name});
      //游戏结束 清除redis
      //
    }else{
      socket.emit("GameOver"+msg.room.id,{room:msg.roomid,lost:msg.room.user2.user_name});
    }
  });
  socket.on("qipai",(msg)=>{
    //room id ,user , cardid 
    var cards = redis.get("card"+msg.roomid+msg.user);

  })
  //升级属性
  socket.on("roundUp",(msg)=>{
    console.log("第"+msg.round+"回合");
   
    //回合数，房间信息
    redis.get("info"+msg.user1+msg.roomid,(e1,r1)=>{
      r1 = JSON.parse(r1);
      r1.money+=r1.moneyAdd;
      r1.people+=r1.peopleAdd;
      
       console.log(r1);
      redis.set("info"+msg.user1+msg.roomid,JSON.stringify(r1));
      io.emit("updateProperty"+msg.user1,{round:msg.round,user1:r1});
    });

    redis.get("info"+msg.user2+msg.roomid,(e2,r2)=>{
      r2 = JSON.parse(r2);
      r2.money+=r2.moneyAdd;
      r2.people+=r2.peopleAdd;
       u2 = r2;
      redis.set("info"+msg.user2+msg.roomid,JSON.stringify(r2));
      io.emit("updateProperty"+msg.user2,{round:msg.round,user1:r2});
    });
    
    //判断智将卡 每次防御+1
    //user1.moneyAdd +=1;
    //user1.peopleAdd+=1;
    // user2.moneyAdd +=1;
    // user2.peopleAdd+=1;
   
    //
    
    
  });
  //发牌
  socket.on("fapai",(msg)=>{
    console.log(msg);
    var card1 = ccc.getOne();
    console.log("抽一张新牌给"+msg.user+"----"+card1);
    io.emit("OneCardBack"+msg.user,card1);
    redis.get("card"+msg.room+msg.user,(e,r)=>{
      r=JSON.parse(r);
      
      r[Object.keys(r).length+1]=card1;
      
      console.log(r);
      //cards
      redis.set("card"+msg.room+msg.user,JSON.stringify(r));
      var len = Object.keys(r).length;
      
      io.emit('addCard'+msg.room,{user:msg.user,len:len});
    });
   
    // cards = JSON.parse(cards); 
  
    // cards.push(card1);
    // redis.set("card"+msg.roomid+msg.user,cards);
    
  });
  //主界面聊天
  socket.on('chat',(msg)=>{
    //发送方，接收方，内容。
    socket.emit('chatBack'+msg.receive,msg);
  });
  //排行榜
  socket.on('rank',(msg)=>{
    console.log(msg);
    var select = new sqlcmd.Select('user', ['user_name','user_win','user_lose']).OrderBy({user_win:false}).query;
    sqlcmd.Doit(select, (a, b) => {
      console.log(b);
      socket.emit('rankBack',b);
    });
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', index);
app.use('/users', users);
app.use('/test', test);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
