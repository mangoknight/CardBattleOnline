
var socket;
cc.Class({
    extends: cc.Component,

    properties: {
        myData: cc.Node,
		rankData: cc.Node,
		load: cc.Node,
		point: cc.Label,
		loadLabel: cc.Label,
		pointN: cc.Node,
    },

    onLoad: function () {
			var info = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
			console.log(info);
			var address = JSON.parse(cc.sys.localStorage.getItem("address"));
			socket = window.io.connect(address);
			socket.on('joinOk'+info.user_name,(msg)=>{
				this.loadLabel.string = "匹配成功";
				this.pointN.active = false;
				cc.sys.localStorage.setItem("roomInfo",JSON.stringify(msg.room));
				cc.sys.localStorage.setItem("meInfo",JSON.stringify(msg.status));
				console.log(msg.status);
				cc.director.loadScene('game');
			});
			//socket.on('wait'+info.user_name,(msg)=>{
			//	console.log(msg);
			//})
	},
	start () {

    },
	startGame: function(){
			this.load.active = true;
			var x= 0;
			var onePoint = function () {
				if(x>=3){
					x=0;
					this.point.string = ""; 
				}else{
					x+=1;
					this.point.string += "。"; 
				}				
                
            }
            this.schedule(onePoint,1, 20, 2);
			
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
	rank: function(){
		socket.emit('rank',info.user_name);
		cc.director.loadScene('rankData');
	},
    // update (dt) {},
});
