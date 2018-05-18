var socket;

cc.Class({
    extends: cc.Component,

    properties: {
		name1: cc.Label,
		win1: cc.Label,
		lose1:	cc.Label,
		rate1: cc.Label,
		name2: cc.Label,
		win2: cc.Label,
		lose2:	cc.Label,
		rate2: cc.Label,
		name3: cc.Label,
		win3: cc.Label,
		lose3:	cc.Label,
		rate3: cc.Label,
		name4: cc.Label,
		win4: cc.Label,
		lose4:	cc.Label,
		rate4: cc.Label,
		name5: cc.Label,
		win5: cc.Label,
		lose5:	cc.Label,
		rate5: cc.Label,
		name6: cc.Label,
		win6: cc.Label,
		lose6:	cc.Label,
		rate6: cc.Label,
		name7: cc.Label,
		win7: cc.Label,
		lose7:	cc.Label,
		rate7: cc.Label,
		myRank: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
	rate : function(win , lose){
		if(win+lose==0){
			return 0+"%";
		}
		return parseInt(win/(win+lose)*100)+"%";
	},
    onLoad: function() {
		var info = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
		var address = JSON.parse(cc.sys.localStorage.getItem("address"));
		socket = window.io.connect(address);
		var myName;
		
		//接收人物
		myName=info.user_name;
		console.log(myName);
		socket.emit('rank',JSON.stringify({user:info}));
		//接收排完名次的数据内容
		socket.on('rankBack',(msg)=>{
			console.log(msg);
			this.name1.string=msg[0].user_name;
			this.win1.string=msg[0].user_win;
			this.lose1.string=msg[0].user_lose;
			this.rate1.string=this.rate(msg[0].user_win,msg[0].user_lose);
			this.name2.string=msg[1].user_name;
			this.win2.string=msg[1].user_win;
			this.lose2.string=msg[1].user_lose;
			this.rate2.string=this.rate(msg[1].user_win,msg[1].user_lose);
			this.name3.string=msg[2].user_name;
			this.win3.string=msg[2].user_win;
			this.lose3.string=msg[2].user_lose;
			this.rate3.string=this.rate(msg[2].user_win,msg[2].user_lose);
			this.name4.string=msg[3].user_name;
			this.win4.string=msg[3].user_win;
			this.lose4.string=msg[3].user_lose;
			this.rate4.string=this.rate(msg[3].user_win,msg[3].user_lose);
			this.name5.string=msg[4].user_name;
			this.win5.string=msg[4].user_win;
			this.lose5.string=msg[4].user_lose;
			this.rate5.string=this.rate(msg[4].user_win,msg[4].user_lose);
			this.name6.string=msg[5].user_name;
			this.win6.string=msg[5].user_win;
			this.lose6.string=msg[5].user_lose;
			this.rate6.string=this.rate(msg[5].user_win,msg[5].user_lose);
			this.name7.string=msg[6].user_name;
			this.win7.string=msg[6].user_win;
			this.lose7.string=msg[6].user_lose;
			this.rate7.string=this.rate(msg[6].user_win,msg[6].user_lose);
			
			//判断玩家是否进榜
			if(myName==this.name1.string){
			this.myRank.string="1";
			}else if(myName==this.name2.string){
			this.myRank.string="2";
			}else if(myName==this.name3.string){
			this.myRank.string="3";
			}else if(myName==this.name4.string){
			this.myRank.string="4";
			}else if(myName==this.name5.string){
			this.myRank.string="5";
			}else if(myName==this.name6.string){
			this.myRank.string="6";
			}else if(myName==this.name7.string){
			this.myRank.string="7";
			}else{
			this.myRank.string="未进榜";
			}
			console.log(this.myRank);
		});

	},
	backHome: function(){
		cc.director.loadScene('home');
	},

    start () {

    },

    // update (dt) {},
});
