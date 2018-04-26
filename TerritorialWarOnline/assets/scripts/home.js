
var socket;
cc.Class({
    extends: cc.Component,

    properties: {
        myData: cc.Node,
    },

    onLoad: function () {
			var info = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
			socket = window.io.connect('http://127.0.0.1:7777');
			socket.on('joinOk'+info.user_name,(msg)=>{
				cc.sys.localStorage.setItem("roomInfo",JSON.stringify(msg.room));
				cc.sys.localStorage.setItem("meInfo",JSON.stringify(msg.status));
				cc.director.loadScene('game');
			});
			socket.on('wait'+info.user_name,(msg)=>{
				console.log(msg);
			})
	},
	start () {

    },
	startGame: function(){
			var info = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
			socket.emit('startGame',{user:info});
			
	},
	//查看我的信息
    myselfData: function(){
		this.myData.active=true;
	},
	//关闭我的信息
	guanbi: function(){
		this.myData.active=false;
	},
	//查看卡牌图鉴
	chakanCards: function(){
		cc.director.loadScene('Collection');
	},
	//退出游戏至登录
	exit: function(){
		cc.director.loadScene('login');
	},
    // update (dt) {},
});
