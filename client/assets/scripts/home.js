
var socket;
cc.Class({
    extends: cc.Component,

    properties: {
        Uname: cc.Label,
		win: cc.Label,
		rate: cc.Label,
		load: cc.Node,
		point: cc.Label,
		loadLabel: cc.Label,
		pointN: cc.Node,
		count:cc.Label,
		chatN:cc.Node,
		rec :cc.EditBox,
		topic : cc.EditBox,
		contents :cc.EditBox,
		mail : cc.Node,
		mm:cc.Node,
		rt:cc.Label,
		rc:cc.Label,
		rn:cc.Label,
    },

    onLoad: function () {
			var address = JSON.parse(cc.sys.localStorage.getItem("address"));
			socket = window.io.connect(address);
			this.count.string = "在线人数：";
			var info = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
			this.Uname.string = info.user_name;
			this.win.string = info.user_win+"场";
			if(info.user_win+info.user_lose==0){
				this.rate.string = 0+"%";
			}else{
				this.rate.string =parseInt(info.user_win/(info.user_win+info.user_lose)*100)+"%";
			}
			socket.emit("plus",{name:info.user_name});
			socket.on("online",(msg)=>{
				this.count.string = "在线人数："+msg;
			 })
			console.log(info);
			
			socket.on('joinOk'+info.user_name,(msg)=>{
				this.loadLabel.string = "匹配成功";
				this.pointN.active = false;
				cc.sys.localStorage.setItem("roomInfo",JSON.stringify(msg.room));
				cc.sys.localStorage.setItem("meInfo",JSON.stringify(msg.status));
				console.log(msg.status);
				cc.director.loadScene('game');
			});
			socket.on("chatBack"+info.user_name,(msg)=>{
				this.mail.active = true;
				var message= msg;
				cc.sys.localStorage.setItem("mes",JSON.stringify(msg));
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
	openchat:function(){
		this.chatN.active=true;
	},
	send: function(){
		var message = {name:this.rec.string,topic:this.topic.string,contents:this.contents.string};
		socket.emit("chat",message);
		this.chatN.active = false;
	},
	closec: function(){
		this.chatN.active = false;
	},
	closem:function(){
		this.mm.active = false;
	},
	openmail: function(){
		this.mm.active = true;
		var mes = JSON.parse(cc.sys.localStorage.getItem("mes"));
		this.rn.string = mes.name;
		this.rt.string = mes.topic;
		this.rc.string = mes.contents;
	}
    // update (dt) {},
});
