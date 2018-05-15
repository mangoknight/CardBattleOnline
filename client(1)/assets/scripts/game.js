var socket;
var CreateCards = require('createCard');
var Cards = require('cards');
cc.Class({
    extends: cc.Component,

    properties: {
		meName: cc.Label,
        meBlood: cc.Label,
		meMoney: cc.Label,
		meMoneyAdd: cc.Label,
		mePeople: cc.Label,
		mePeopleAdd: cc.Label,
		meDefense: cc.Label,
		meCityLevel: cc.Label,
		meJunshiLevel: cc.Label,
		meZhaomu1: cc.Label,
		meZhaomu2: cc.Label,
		melevel: cc.Label,
		mewin: cc.Label,
		melose: cc.Label,
		meRate: cc.Label,
		enName: cc.Label,
		enBlood: cc.Label,
		enMoney: cc.Label,
		enMoneyAdd: cc.Label,
		enPeople: cc.Label,
		enPeopleAdd: cc.Label,
		enDefense: cc.Label,
		enCityLevel: cc.Label,
		enJunshiLevel: cc.Label,
		enZhaomu1: cc.Label,
		enZhaomu2: cc.Label,
		enlevel: cc.Label,
		enwin: cc.Label,
		enlose: cc.Label,
		enRate: cc.Label,
		meCard1: cc.Node,
		meCard2: cc.Node,
		meCard3: cc.Node,
		meCard4: cc.Node,
		meCard5: cc.Node,
		enCard1: cc.Node,
		enCard2: cc.Node,
		enCard3: cc.Node,
		enCard4: cc.Node,
		enCard5: cc.Node,
		meCardPrefab: {
            default: null,
            type: cc.Prefab
        },
		round:0,
		user: 1,
		cards: [],
		selectCard: 0,
		selectCardNode: cc.Node,
		confirmTuichu: cc.Node,
		meData: cc.Node,
		enData: cc.Node,
		qipaiBtn: cc.Node,
		chupaiBtn: cc.Node,
		flag: 0,
		cs: [],
		roundLabel: cc.Label,
		roundNode: cc.Node,
		centerCard: cc.Node,
		endRound: cc.Node,
		cardFailDetialNode: cc.Node,
		cardFailDetial: cc.Label,
		GameoverNode: cc.Node,
		loseGame: cc.Node,
		winGame: cc.Node,
		cardCount: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
	zhaomu:function(name){
		if(name=="mengjiang"){
			return "猛将";
		}
		if(name=="moushi"){
			return "谋士";
		}
		if(name=="zhijiang"){
			return "智将";
		}
		if(name=="waijiaoguan"){
			return "使节";
		}
		if(name=="dajisi"){
			return "祭司";
		}
		if(name=="wu"){
			return "巫";
		}
		if(name=="daoshi"){
			return "道士";
		}
		if(name=="daru"){
			return "大儒";
		}
	},
    rate: function(win , lose){
		return win/(win+lose);
	},
	
    onLoad: function () {
		var self=this;
		this.cs=[0,0,0,0,0];
		var address = JSON.parse(cc.sys.localStorage.getItem("address"));
        socket = window.io.connect(address);
        var room = JSON.parse(cc.sys.localStorage.getItem("roomInfo"));
		var my =JSON.parse(cc.sys.localStorage.getItem("meInfo"));
		var en =JSON.parse(cc.sys.localStorage.getItem("meInfo"));
		var me = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
		//对战双方名字、等级、胜场、败场、胜率
		console.log(me);
		if(me.user_name== room.user1.user_name){
			console.log("我是第一个");
			this.meName.string = room.user1.user_name;
			this.melevel.string = room.user1.level;
			this.mewin.string = room.user1.win;
			this.melose.string = room.user1.lose;
			this.meRate.string = this.rate(room.user1.win,room.user1.lose);

			this.enName.string = room.user2.user_name;
			this.enlevel.string = room.user2.level;
			this.enwin.string = room.user2.win;
			this.enlose.string = room.user2.lose;
			this.enRate.string = this.rate(room.user2.win,room.user2.lose);
			//初始化回合
			socket.emit('round0',{room: room});
			
			this.user= 1;
		}else{
		
			this.meName.string = room.user2.user_name;
			this.melevel.string = room.user2.level;
			this.mewin.string = room.user2.win;
			this.melose.string = room.user2.lose;
			this.meRate.string = this.rate(room.user2.win,room.user2.lose);

			this.enName.string = room.user1.user_name;
			this.enlevel.string = room.user1.level;
			this.enwin.string = room.user1.win;
			this.enlose.string = room.user1.lose;
			this.enRate.string = self.rate(room.user1.win,room.user1.lose);
			
			this.user= 2;
		}
		//双方血量、金钱、每回合金钱增加量、人口、每回合人口增加量、防御、城市规模、军事规模、招募1、招募2
		this.meBlood.string = my.HP;
		this.meMoney.string = my.money;
		this.meMoneyAdd.string = my.moneyAdd;
		this.mePeople.string = my.people;
		this.mePeopleAdd.string = my.peopleAdd;
		this.meDefense.string = my.defence;
		this.meCityLevel.string = my.cityLevel;
		this.meJunshiLevel.string = my.junshiLevel;
		if(my.zhaomu1==0){
				this.meZhaomu1.string='';
		}else{
				this.meZhaomu1.string = this.zhaomu(my.zhaomu1.name);
		}
		if(my.zhaomu2==0){
				this.meZhaomu2.string='';
		}else{
				this.meZhaomu2.string = this.zhaomu(my.zhaomu2.name);
		}
		//en
		this.enBlood.string = en.HP;
		this.enMoney.string = en.money;
		this.enMoneyAdd.string = en.moneyAdd;
		this.enPeople.string = en.people;
		this.enPeopleAdd.string = en.peopleAdd;
		this.enDefense.string = en.defence;
		this.enCityLevel.string = en.cityLevel;
		this.enJunshiLevel.string = en.junshiLevel;
		if(en.zhaomu1==0){
				this.meZhaomu1.string='';
			}else{
				this.meZhaomu1.string = this.zhaomu(en.zhaomu1.name);
			}
			if(en.zhaomu2==0){
				this.enZhaomu2.string='';
			}else{
				this.enZhaomu2.string =this.zhaomu(en.zhaomu2.name);
			}
        
		//初始化每人三张卡牌
		socket.on('card'+room.id+me.user_name,(msg)=>{
			
			for(var i=0;i<3;i++){
				this.cards[i] = msg[i];
			}
			console.log(this.cards);
			var c1;
            var c2;
			var c3;
            c1=Cards.Card.fromId(this.cards[0] );
            c2=Cards.Card.fromId(this.cards[1] );
			c3=Cards.Card.fromId(this.cards[2] );

            console.log(c1);
            var newCard1 = cc.instantiate(this.meCardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.meCardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.meCardPrefab).getComponent('createCard');
            this.meCard1.addChild(newCard1.node);
            this.meCard2.addChild(newCard2.node);
			this.meCard3.addChild(newCard3.node);
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            this.meCard1.active=true;
            this.meCard2.active=true;
			this.meCard3.active=true;
			this.roundUp(1);
			this.cs[0]=1;
			this.cs[1]=1;
			this.cs[2]=1;
			this.cardCount=3;
			console.log(this.cs);
		});
		//更新每回合user1的信息
		socket.on('updateProperty'+room.user1.user_name,(msg)=>{
			this.round=msg.round;
			this.roundLabel.string="Round"+msg.round;
			this.roundNode.active=true;
			console.log(msg);
			if(this.user== 1){
			this.meBlood.string = msg.user1.HP;
			this.meMoney.string = msg.user1.money;
			this.meMoneyAdd.string = msg.user1.moneyAdd;
			this.mePeople.string = msg.user1.people;
			this.mePeopleAdd.string = msg.user1.peopleAdd;
			this.meDefense.string = msg.user1.defence;
			this.meCityLevel.string = msg.user1.cityLevel;
			this.meJunshiLevel.string = msg.user1.junshiLevel;
			if(msg.user1.zhaomu1==0){
				this.meZhaomu1.string='';
			}else{
				this.meZhaomu1.string = this.zhaomu(msg.user1.zhaomu1.name);
			}
			if(msg.user1.zhaomu2==0){
				this.meZhaomu2.string='';
			}else{
				this.meZhaomu2.string = this.zhaomu(msg.user1.zhaomu2.name);
			}

			if(msg.round%2==1){
				this.qipaiBtn.active = true;
				this.chupaiBtn.active = true;
				this.endRound.active = true;
			}
		}else{
			this.enBlood.string = msg.user1.HP; 
			this.enMoney.string = msg.user1.money;
			this.enMoneyAdd.string = msg.user1.moneyAdd;
			this.enPeople.string = msg.user1.people;
			this.enPeopleAdd.string = msg.user1.peopleAdd;
			this.enDefense.string = msg.user1.defence;
			this.enCityLevel.string = msg.user1.cityLevel;
			this.enJunshiLevel.string = msg.user1.junshiLevel;
			if(msg.user1.zhaomu1==0){
				this.enZhaomu1.string='';
			}else{
				this.enZhaomu1.string = this.zhaomu(msg.user1.zhaomu1.name);
			}
			if(msg.user1.zhaomu2==0){
				this.enZhaomu2.string='';
			}else{
				this.enZhaomu2.string = this.zhaomu(msg.user1.zhaomu2.name);
			}
		}
		});
		//更新每回合user2的信息
		socket.on('updateProperty'+room.user2.user_name,(msg)=>{
			this.round=msg.round;
			console.log(msg);
			if(this.user== 2){
			this.meBlood.string = msg.user1.HP;
			this.meMoney.string = msg.user1.money;
			this.meMoneyAdd.string = msg.user1.moneyAdd;
			this.mePeople.string = msg.user1.people;
			this.mePeopleAdd.string = msg.user1.peopleAdd;
			this.meDefense.string = msg.user1.defence;
			this.meCityLevel.string = msg.user1.cityLevel;
			this.meJunshiLevel.string = msg.user1.junshiLevel;
			if(msg.user1.zhaomu1==0){
				this.meZhaomu1.string='';
			}else{
				this.meZhaomu1.string = this.zhaomu(msg.user1.zhaomu1.name);
			}
			if(msg.user1.zhaomu2==0){
				this.meZhaomu2.string='';
			}else{
				this.meZhaomu2.string = this.zhaomu(msg.user1.zhaomu2.name);
			}
			if(msg.round%2==0){
				this.qipaiBtn.active = true;
				this.chupaiBtn.active = true;
				this.endRound.active = true;
			}
			}else{
			this.enBlood.string = msg.user1.HP;
			this.enMoney.string = msg.user1.money;
			this.enMoneyAdd.string = msg.user1.moneyAdd;
			this.enPeople.string = msg.user1.people;
			this.enPeopleAdd.string = msg.user1.peopleAdd;
			this.enDefense.string = msg.user1.defence;
			this.enCityLevel.string = msg.user1.cityLevel;
			this.enJunshiLevel.string = msg.user1.junshiLevel;
			if(msg.user1.zhaomu1==0){
				this.enZhaomu1.string='';
			}else{
				this.enZhaomu1.string = this.zhaomu(msg.user1.zhaomu1.name);
			}
			if(msg.user1.zhaomu2==0){
				this.enZhaomu2.string='';
			}else{
				this.enZhaomu2.string = this.zhaomu(msg.user1.zhaomu2.name);
			}
			}
		});
		//判断对方牌的数量 ,并显示对方卡牌数
		socket.on("addCard"+room.id,(msg)=>{
			console.log(msg);
			if(msg.user!=me.user_name){
				if(msg.len==1){
					this.enCard1.active=true;
					this.enCard2.active=false;
					this.enCard3.active=false;
					this.enCard4.active=false;
					this.enCard5.active=false;
				}
				else if(msg.len==2){
					this.enCard1.active=true;
					this.enCard2.active=true;
					this.enCard3.active=false;
					this.enCard4.active=false;
					this.enCard5.active=false;
				}else if(msg.len==3){
					this.enCard1.active=true;
					this.enCard2.active=true;
					this.enCard3.active=true;
					this.enCard4.active=false;
					this.enCard5.active=false;
				}else if(msg.len==4){
					this.enCard1.active=true;
					this.enCard2.active=true;
					this.enCard3.active=true;
					this.enCard4.active=true;
					this.enCard5.active=false;
				}else{
					this.enCard1.active=true;
					this.enCard2.active=true;
					this.enCard3.active=true;
					this.enCard4.active=true;
					this.enCard5.active=true;
				}
				
			}
		});
		//每回合抽一张卡牌
		socket.on("OneCardBack"+me.user_name,(msg)=>{
			console.log("收到一张牌："+msg);
			this.cards.push(msg);
			for(var i=0;i<5;i++){
				if(this.cs[i]==0){
					var c4;
					c4=Cards.Card.fromId(msg);
					var newCard4 = cc.instantiate(this.meCardPrefab).getComponent('createCard');
					if(i==0){
						this.meCard1.addChild(newCard4.node);
						newCard4.init(c4);
						this.cs[i]=1;
						this.meCard1.active=true;
					}else if(i==1){
						this.meCard2.addChild(newCard4.node);
						newCard4.init(c4);
						this.meCard2.active=true;
						this.cs[i]=1;
					}else if(i==2){
						this.meCard3.addChild(newCard4.node);
						newCard4.init(c4);
						this.meCard3.active=true;
						this.cs[i]=1;
					}
					else if(i==3){
						this.meCard4.addChild(newCard4.node);
						newCard4.init(c4);
						this.meCard4.active=true;
						this.cs[i]=1;
					}else if(i==4){
						this.meCard5.addChild(newCard4.node);
						newCard4.init(c4);
						this.meCard5.active=true;
						this.cs[i]=1;
					}	
					break;
				}
			}
			this.cardCount +=1;
			console.log("现在"+this.cardCount+"张牌");
			socket.emit("cardLen",{room:room.id,user:me.user_name,len:this.cardCount});
				console.log(this.cs);
		});
		// 监听服务端计算牌生效后的结果 并在界面上展示
		socket.on("endpai"+room.id,(msg)=>{
			console.log(msg);
			if(msg.host==me.user_name){
				this.cardCount -=1;
				console.log("现在"+this.cardCount+"张牌");
				socket.emit("cardLen",{room:room.id,user:me.user_name,len:this.cardCount});
				this.meBlood.string = msg.myself.HP;
				this.meMoney.string = msg.myself.money;
				this.meMoneyAdd.string = msg.myself.moneyAdd;
				this.mePeople.string = msg.myself.people;
				this.mePeopleAdd.string = msg.myself.peopleAdd;
				this.meDefense.string = msg.myself.defence;
				this.meCityLevel.string = msg.myself.cityLevel;
				this.meJunshiLevel.string = msg.myself.junshiLevel;
				if(msg.myself.zhaomu1!=0){
					this.meZhaomu1.string = this.zhaomu(msg.myself.zhaomu1.name);
				}
				if(msg.myself.zhaomu2!=0){
					this.meZhaomu2.string = this.zhaomu(msg.myself.zhaomu2.name);			
				}
				this.enBlood.string = msg.enemy.HP;
				this.enMoney.string = msg.enemy.money;
				this.enMoneyAdd.string = msg.enemy.moneyAdd;
				this.enPeople.string = msg.enemy.people;
				this.enPeopleAdd.string = msg.enemy.peopleAdd;
				this.enDefense.string = msg.enemy.defence;
				this.enCityLevel.string = msg.enemy.cityLevel;
				this.enJunshiLevel.string = msg.enemy.junshiLevel;
				if(msg.enemy.zhaomu1!=0){
					this.enZhaomu1.string = this.zhaomu(msg.enemy.zhaomu1.name);
				}
				if(msg.enemy.zhaomu2!=0){
					this.enZhaomu2.string = this.zhaomu(msg.enemy.zhaomu2.name);			
				}
				this.selectCardNode.active=false;	
				this.qipaiBtn.active=false;
				this.chupaiBtn.active=false;
				this.endRound.active=false;
				this.selectCardNode.removeAllChildren();
				if(this.selectCardNode.name=="meCard1"){
				this.cs[0] = 0; 
				}else if(this.selectCardNode.name=="meCard2"){
				this.cs[1] = 0; 
				}else if(this.selectCardNode.name=="meCard3"){
				this.cs[2] = 0; 
				}else if(this.selectCardNode.name=="meCard4"){
				this.cs[3] = 0; 
				}else if(this.selectCardNode.name=="meCard5"){
				this.cs[4] = 0; 
				}
			console.log(this.cs);
			}else{
				this.enBlood.string = msg.myself.HP;
				this.enMoney.string = msg.myself.money;
				this.enMoneyAdd.string = msg.myself.moneyAdd;
				this.enPeople.string = msg.myself.people;
				this.enPeopleAdd.string = msg.myself.peopleAdd;
				this.enDefense.string = msg.myself.defence;
				this.enCityLevel.string = msg.myself.cityLevel;
				this.enJunshiLevel.string = msg.myself.junshiLevel;
				if(msg.myself.zhaomu1!=0){
					this.enZhaomu1.string = this.zhaomu(msg.myself.zhaomu1.name);
				}
				if(msg.myself.zhaomu2!=0){
					this.enZhaomu2.string = this.zhaomu(msg.myself.zhaomu2.name);			
				}		
				this.meBlood.string = msg.enemy.HP;
				this.meMoney.string = msg.enemy.money;
				this.meMoneyAdd.string = msg.enemy.moneyAdd;
				this.mePeople.string = msg.enemy.people;
				this.mePeopleAdd.string = msg.enemy.peopleAdd;
				this.meDefense.string = msg.enemy.defence;
				this.meCityLevel.string = msg.enemy.cityLevel;
				this.meJunshiLevel.string = msg.enemy.junshiLevel;
				if(msg.enemy.zhaomu1!=0){
					this.meZhaomu1.string = this.zhaomu(msg.enemy.zhaomu1.name);
				}
				if(msg.enemy.zhaomu2!=0){
					this.meZhaomu2.string = this.zhaomu(msg.enemy.zhaomu2.name);			
				}
			}
			//在中间显示出的牌
			var c5;
            c5=Cards.Card.fromId(msg.card);
			var newCard5 = cc.instantiate(this.meCardPrefab).getComponent('createCard');
            this.centerCard.addChild(newCard5.node);
			newCard5.init(c5);
			this.centerCard.active=true;
			var hide = function(){
				this.centerCard.active=false;
			}
			this.schedule(hide,2,0,2);
			//进入下一回合
            this.roundUp(this.round+1);
		});
		//监听服务端有弃牌的 无论双方谁弃牌都在战斗界面中间显示 弃牌 
		socket.on("endqipai",(msg)=>{
			this.qipaiBtn.active=false;
			this.chupaiBtn.active=false;
			this.endRound.active=false;
		});
		// 监听服务端发回的 牌因为资源人口不足	没有生效 并显示错误原因。
		socket.on('cardFail'+me.user_name,(msg)=>{
			this.cardFailDetialNode.active=true;
			this.cardFailDetial.string=msg.info;
			var cardFail = function(){
				this.cardFailDetialNode.active=false;
			}
			this.schedule(cardFail,2,0,2);
		});
		//游戏结束
        socket.on("GameOver"+room.id,(msg)=>{
			var me = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
			this.GameoverNode.active=true;
			if(this.user==msg.lost){
				this.meBlood.string=0;
				this.meRate.string = this.rate(this.mewin.string,this.melose.string);
				this.loseGame.active=true;
				socket.emit("record",{name:me.user_name,win:0});
			}else{
				this.enBlood.string=0;
				this.meRate.string = this.rate(this.mewin.string,this.melose.string);
				this.winGame.active=true;
				socket.emit("record",{name:me.user_name,win:1});
			}
		});


    },
	//选中要出的牌
	clickedCard: function(event){
		if(this.selectCard==0){
		if(this.flag==0){
		var actionBy = cc.moveTo(1, cc.p(event.target.x,event.target.y+100));
		event.target.runAction(actionBy);
		this.selectCard=event.target.children[0].children[0]._components[0].string;
		console.log("选中"+this.selectCard);
		this.flag=1;
		}else{
			var actionBy = cc.moveTo(1, cc.p(event.target.x,event.target.y-100));
			event.target.runAction(actionBy);
			this.selectCard=0;
			this.flag=0;
		}
		this.selectCardNode = event.target;	
		}else{
			var actionBy = cc.moveTo(1, cc.p(this.selectCardNode.x,this.selectCardNode.y-100));
			this.selectCardNode.runAction(actionBy);
			this.selectCard=0;
			this.flag=0;
			actionBy = cc.moveTo(1, cc.p(event.target.x,event.target.y+100));
			event.target.runAction(actionBy);
			this.selectCard=event.target.children[0].children[0]._components[0].string;
			console.log("选中"+this.selectCard);
			this.flag=1;
			this.selectCardNode=event.target;	
		}
	},
	//出牌
	chupai: function(){
		var room = JSON.parse(cc.sys.localStorage.getItem("roomInfo"));
		if(this.user==1){
			socket.emit('chupai',{room: room.id,enemy: room.user2.user_name,user:room.user1.user_name,cardid: this.selectCard});
		}else{
			socket.emit('chupai',{room: room.id,enemy: room.user1.user_name,user:room.user2.user_name,cardid: this.selectCard});

		}
		if(this.flag==1){
		var actionBy = cc.moveTo(1, cc.p(this.selectCardNode.x,this.selectCardNode.y-100));
		this.selectCardNode.runAction(actionBy);
		this.selectCard=0;
		this.flag=0;
		}

	},
	//弃牌
	qipai: function(){
		this.selectCardNode.active=false;
	},
	//退出房间
	tuichu: function(){
		this.confirmTuichu.active=true;
	},
	//确认退出
	confirmtuichu: function(){
		cc.director.loadScene('home');
		socket.emit('quit',{room: room,which: user});
	},
	//取消
	quxiao: function(){
		this.confirmTuichu.active=false;
	},
	//显示自己信息
	meNameData: function(){
		this.meData.active=true;
	},
	//对方信息显示
	enNameData: function(){
		this.enData.active=true;
	},
	//关闭对方信息
	guanbi: function(){
		this.enData.active=false;
		this.meData.active=false;
	},
	//每回合更新对战信息
	roundUp :function(i){
		var room = JSON.parse(cc.sys.localStorage.getItem("roomInfo"));
		var me = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
		console.log("第"+i+"回合");
		//告诉服务端 回合开始 发送roundUp 请求发1牌
		this.round=i;
		if(i%2==1){
			if(this.user==1){
				console.log("第一个人请求发牌");
				socket.emit('roundUp',{round: this.round,user1:room.user1.user_name,user2:room.user2.user_name,roomid: room.id});
				socket.emit('fapai',{room: room.id,user: me.user_name});
			}
			
		}else{
			if(this.user==2){
				console.log("第2个人请求发牌");
				socket.emit('roundUp',{round: this.round,user1:room.user1.user_name,user2:room.user2.user_name,roomid: room.id});
				socket.emit('fapai',{room: room.id,user: me.user_name});
			}
		}
	
	},
	endRoundTo: function(){
		var room = JSON.parse(cc.sys.localStorage.getItem("roomInfo"));
		this.round +=1;
		socket.emit('roundUp',{round: this.round,user1:room.user1.user_name,user2:room.user2.user_name,roomid: room.id});
		console.log("回合结束求发牌"+this.enName.string);
		socket.emit('fapai',{room: room.id,user: this.enName.string});
		this.qipaiBtn.active=false;
		this.chupaiBtn.active=false;
		this.endRound.active=false;
		if(this.flag==1){
			var actionBy = cc.moveTo(1, cc.p(this.selectCardNode.x,this.selectCardNode.y-100));
			this.selectCardNode.runAction(actionBy);
			this.selectCard=0;
			this.flag=0;
		}
	},
    tuifang:function(){
		cc.director.loadScene('home');
	},
});
