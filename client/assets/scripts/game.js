var socket;
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
		enCardPrefab: {
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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    rate: function(win , lose){
		return win/(win+lose);
	},
	
    onLoad: function () {
       var self=this;
		var address = JSON.parse(cc.sys.localStorage.getItem("address"));
        socket = window.io.connect(address);
        var room = JSON.parse(cc.sys.localStorage.getItem("roomInfo"));
		var me = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
		var my =  JSON.parse(cc.sys.localStorage.getItem("meInfo"));
		var en =  JSON.parse(cc.sys.localStorage.getItem("meInfo"));
		//对战双方名字、等级、胜场、败场、胜率
		console.log(my);

	
		if(me.user== room.user1.user_name){
			this.meName.string = room.user1.user_name;
			this.melevel.string = room.user1.level;
			this.mewin.string = room.user1.win;
			this.melose.string = room.user1.lose;
			this.meRate.string = self.rate(room.user1.win,room.user1.lose);

			this.enName.string = room.user2.user_name;
			this.enlevel.string = room.user2.level;
			this.enwin.string = room.user2.win;
			this.enlose.string = room.user2.lose;
			this.enRate.string = self.rate(room.user2.win,room.user2.lose);
			//初始化回合
			socket.emit('round0',{room: room});
			this.user= 1;
		}else{
		
			this.meName.string = room.user2.user_name;
			this.melevel.string = room.user2.level;
			this.mewin.string = room.user2.win;
			this.melose.string = room.user2.lose;
			this.meRate.string = self.rate(room.user2.win,room.user2.lose);

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
		this.meZhaomu1.string = my.zhaomu1;
		this.meZhaomu2.string = my.zhaomu2;
		//en
		this.enBlood.string = en.HP;
		this.enMoney.string = en.money;
		this.enMoneyAdd.string = en.moneyAdd;
		this.enPeople.string = en.people;
		this.enPeopleAdd.string = en.peopleAdd;
		this.enDefense.string = en.defence;
		this.enCityLevel.string = en.cityLevel;
		this.enJunshiLevel.string = en.junshiLevel;
		this.enZhaomu1.string = en.zhaomu1;
		this.enZhaomu2.string = en.zhaomu2;
        
		//初始化每人三张卡牌
		socket.on('card'+room.id+me.user_name,(msg)=>{
			console.log("收到三张牌");

			for(var i=0;i<3;i++){
				this.cards[i] = msg.i;
			}
			console.log(this.cards);
			var c1;
            var c2;
			var c3;
            c1=Cards.Card.fromId(this.cards[0] );
            c2=Cards.Card.fromId(this.cards[1] );
			c3=Cards.Card.fromId(this.cards[2] );

            console.log(c1);
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            this.meCard1.addChild(newCard1.node);
            this.meCard2.addChild(newCard2.node);
			this.meCard3.addChild(newCard3.node);
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            this.meCard1.active=true;
            this.meCard2.active=true;
			this.meCard3.active=true;
			roundUp(1);
		});
		//更新每回合双方信息
		socket.on('updateProperty'+room.id,(msg)=>{
			if(this.user== 1){
			this.meBlood.string = msg.user1.HP;
			this.meMoney.string = msg.user1.money;
			this.meMoneyAdd.string = msg.user1.moneyAdd;
			this.mePeople.string = msg.user1.people;
			this.mePeopleAdd.string = msg.user1.peopleAdd;
			this.meDefense.string = msg.user1.defence;
			this.meCityLevel.string = msg.user1.cityLevel;
			this.meJunshiLevel.string = msg.user1.junshiLevel;
			this.meZhaomu1.string = msg.user1.zhaomu1;
			this.meZhaomu2.string = msg.user1.zhaomu2;

		
			this.enBlood.string = msg.user2.HP;
			this.enMoney.string = msg.user2.money;
			this.enMoneyAdd.string = msg.user2.moneyAdd;
			this.enPeople.string = msg.user2.people;
			this.enPeopleAdd.string = msg.user2.peopleAdd;
			this.enDefense.string = msg.user2.defence;
			this.enCityLevel.string = msg.user2.cityLevel;
			this.enJunshiLevel.string = msg.user2.junshiLevel;
			this.enZhaomu1.string = msg.user2.zhaomu1;
			this.enZhaomu2.string = msg.user2.zhaomu2;
		}else{
			this.meBlood.string = msg.user2.HP;
			this.meMoney.string = msg.user2.money;
			this.meMoneyAdd.string = msg.user2.moneyAdd;
			this.mePeople.string = msg.user2.people;
			this.mePeopleAdd.string = msg.user2.peopleAdd;
			this.meDefense.string = msg.user2.defence;
			this.meCityLevel.string = msg.user2.cityLevel;
			this.meJunshiLevel.string = msg.user2.junshiLevel;
			this.meZhaomu1.string = msg.user2.zhaomu1;
			this.meZhaomu2.string = msg.user2.zhaomu2;
			
			this.enBlood.string = msg.user1.HP;
			this.enMoney.string = msg.user1.money;
			this.enMoneyAdd.string = msg.user1.moneyAdd;
			this.enPeople.string = msg.user1.people;
			this.enPeopleAdd.string = msg.user1.peopleAdd;
			this.enDefense.string = msg.user1.defence;
			this.enCityLevel.string = msg.user1.cityLevel;
			this.enJunshiLevel.string = msg.user1.junshiLevel;
			this.enZhaomu1.string = msg.user1.zhaomu1;
			this.enZhaomu2.string = msg.user1.zhaomu2;
		}
		});
		//判断对方牌的数量 ,并显示对方卡牌数
		socket.on("addCard"+room.id,(msg)=>{
			if(msg.user!=me.user){
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
		socket.on("OneCardBack"+me.user,(msg)=>{
			cards.push(msg);
			var c4;
			c4=Cards.Card.fromId(msg);
			var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			
			if(cards.length==1){
				this.meCard1.addChild(newCard4.node);
				newCard4.init(c4);
				this.meCard1.active=true;
			}
			else if(cards.length==2){
				this.meCard2.addChild(newCard4.node);
				newCard4.init(c4);
				this.meCard2.active=true;
			}
			else if(cards.length==3){
				this.meCard3.addChild(newCard4.node);
				newCard4.init(c4);
				this.meCard3.active=true;
			}
			else if(cards.length==4){
				this.meCard4.addChild(newCard4.node);
				newCard4.init(c4);
				this.meCard4.active=true;
			}
			else if(cards.length==5){
				this.meCard5.addChild(newCard4.node);
				newCard4.init(c4);
				this.meCard5.active=true;
			}
		});
		// 监听服务端计算牌生效后的结果 并在界面上展示
		socket.on("endpai",(msg)=>{
			this.qipaiBtn.active=false;
			this.chupaiBtn.active=false;
		});
		//监听服务端有弃牌的 无论双方谁弃牌都在战斗界面中间显示 弃牌 
		socket.on("endqipai",(msg)=>{
			this.qipaiBtn.active=false;
			this.chupaiBtn.active=false;
		});
		// 监听服务端发回的 牌因为资源人口不足	没有生效 并显示错误原因。
		socket.on("cardFail",(msg)=>{
			
		});
		//游戏结束
        socket.on("gameover",(msg)=>{
			
		});
    },
	//选中要出的牌
	clickedCard: function(event){
		var actionBy = cc.moveTo(2, cc.p(event.target.x,event.target.y+100));
		event.target.runAction(actionBy);
		
		this.selectCard=event.target.children[0].id;
		console.log(this.selectCard);
		this.selectCardNode = event.target;
	},
	//出牌
	chupai: function(){
		socket.emit('chupai',{room: room.id,enemy: en.name,user: my.name,cardid: this.selectCard});
		
		var actionBy = cc.moveTo(2, cc.p(-210, -25));
		this.selectCardNode.runAction(actionBy);
		
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
		cc.director.loadScene('Surface');
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
		//告诉服务端 回合开始 发送roundUp 请求发1牌
		this.round=i;
		if(i%2==1){
			if(this.user==1){
			
				socket.emit('roundUp',{round: this.round,user1:room.user1.user_name,user2:room.user2.user_name,roomid: room.id});
				socket.emit('fapai',{room: room.id,user: me.user});
			}
			
		}else{
			if(this.user==2){
			
				socket.emit('roundUp',{round: this.round,user1:room.user1.user_name,user2:room.user2.user_name,roomid: room.id});
			}
		}
		
		
		/*socket.on('updateProperty'+room.roomid,(msg)=>{
		
		});*/
	
	},
    // update (dt) {},
});
