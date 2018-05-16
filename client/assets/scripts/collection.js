var CreateCards = require('createCard');
var Cards = require('cards');

cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
		card1:cc.Node,
		card2:cc.Node,
		card3:cc.Node,
		card4:cc.Node,
		card5:cc.Node,
		card6:cc.Node,
		card7:cc.Node,
		card8:cc.Node,
		card9:cc.Node,
		card10:cc.Node,
		page:1,
		left:cc.Node,
		right:cc.Node,
		pagevalue:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function (){
			//fromid,根据id生成card对象
            var c1=Cards.Card.fromId(0);
            var c2=Cards.Card.fromId(1);
			var c3=Cards.Card.fromId(2);
            var c4=Cards.Card.fromId(3);
			var c5=Cards.Card.fromId(4);
            var c6=Cards.Card.fromId(5);
			var c7=Cards.Card.fromId(6);
            var c8=Cards.Card.fromId(7);
			var c9=Cards.Card.fromId(8);
            var c10=Cards.Card.fromId(9);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
			this.card10.active=true;
			
	},
	prev:function(){

		
		if(this.page==2){
			this.page=1;
			this.pagevalue.string=1;

			var c1=Cards.Card.fromId(0);
            var c2=Cards.Card.fromId(1);
			var c3=Cards.Card.fromId(2);
            var c4=Cards.Card.fromId(3);
			var c5=Cards.Card.fromId(4);
            var c6=Cards.Card.fromId(5);
			var c7=Cards.Card.fromId(6);
            var c8=Cards.Card.fromId(7);
			var c9=Cards.Card.fromId(8);
            var c10=Cards.Card.fromId(9);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
			this.card10.active=true;
			this.left.active=false;
		}
		else if(this.page==3){
			this.page=2;
			this.pagevalue.string=2;

			var c1=Cards.Card.fromId(10);
            var c2=Cards.Card.fromId(11);
			var c3=Cards.Card.fromId(12);
            var c4=Cards.Card.fromId(13);
			var c5=Cards.Card.fromId(14);
            var c6=Cards.Card.fromId(15);
			var c7=Cards.Card.fromId(16);
            var c8=Cards.Card.fromId(17);
			var c9=Cards.Card.fromId(18);
            var c10=Cards.Card.fromId(19);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
			this.card10.active=true;
		}
		else if(this.page==4){
			this.page=3;
			this.pagevalue.string=3;

			var c1=Cards.Card.fromId(20);
            var c2=Cards.Card.fromId(21);
			var c3=Cards.Card.fromId(22);
            var c4=Cards.Card.fromId(23);
			var c5=Cards.Card.fromId(24);
            var c6=Cards.Card.fromId(25);
			var c7=Cards.Card.fromId(26);
            var c8=Cards.Card.fromId(27);
			var c9=Cards.Card.fromId(28);
            var c10=Cards.Card.fromId(29);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
			this.card10.active=true;
		}
		else if(this.page==5){
			this.page=4;
			this.pagevalue.string=4;

			var c1=Cards.Card.fromId(30);
            var c2=Cards.Card.fromId(31);
			var c3=Cards.Card.fromId(32);
            var c4=Cards.Card.fromId(33);
			var c5=Cards.Card.fromId(34);
            var c6=Cards.Card.fromId(35);
			var c7=Cards.Card.fromId(36);
            var c8=Cards.Card.fromId(37);
			var c9=Cards.Card.fromId(38);
            var c10=Cards.Card.fromId(39);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
			this.card10.active=true;
		}
		else {
			this.page=5;
			this.pagevalue.string=5;
			var c1=Cards.Card.fromId(40);
            var c2=Cards.Card.fromId(41);
			var c3=Cards.Card.fromId(42);
            var c4=Cards.Card.fromId(43);
			var c5=Cards.Card.fromId(44);
            var c6=Cards.Card.fromId(45);
			var c7=Cards.Card.fromId(46);
            var c8=Cards.Card.fromId(47);
			var c9=Cards.Card.fromId(48);
            var c10=Cards.Card.fromId(49);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
			this.card10.active=true;
			this.right.active=true;
		};
	},
	next:function(){
		if(this.page==1){
			this.page=2;
			this.pagevalue.string=2;

			var c1=Cards.Card.fromId(10);
            var c2=Cards.Card.fromId(11);
			var c3=Cards.Card.fromId(12);
            var c4=Cards.Card.fromId(13);
			var c5=Cards.Card.fromId(14);
            var c6=Cards.Card.fromId(15);
			var c7=Cards.Card.fromId(16);
            var c8=Cards.Card.fromId(17);
			var c9=Cards.Card.fromId(18);
            var c10=Cards.Card.fromId(19);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
            this.card10.active=true;
			this.left.active=true;
		}
		else if(this.page==2){
			this.page=3;
			this.pagevalue.string=3;

			var c1=Cards.Card.fromId(20);
            var c2=Cards.Card.fromId(21);
			var c3=Cards.Card.fromId(22);
            var c4=Cards.Card.fromId(23);
			var c5=Cards.Card.fromId(24);
            var c6=Cards.Card.fromId(25);
			var c7=Cards.Card.fromId(26);
            var c8=Cards.Card.fromId(27);
			var c9=Cards.Card.fromId(28);
            var c10=Cards.Card.fromId(29);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
            this.card10.active=true;
			
		}
		else if(this.page==3){
			this.page=4;
			this.pagevalue.string=4;

			var c1=Cards.Card.fromId(30);
            var c2=Cards.Card.fromId(31);
			var c3=Cards.Card.fromId(32);
            var c4=Cards.Card.fromId(33);
			var c5=Cards.Card.fromId(34);
            var c6=Cards.Card.fromId(35);
			var c7=Cards.Card.fromId(36);
            var c8=Cards.Card.fromId(37);
			var c9=Cards.Card.fromId(38);
            var c10=Cards.Card.fromId(39);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
            this.card10.active=true;
		
		}
		else if(this.page==4){
			this.page=5;
			this.pagevalue.string=5;
			var c1=Cards.Card.fromId(40);
            var c2=Cards.Card.fromId(41);
			var c3=Cards.Card.fromId(42);
            var c4=Cards.Card.fromId(43);
			var c5=Cards.Card.fromId(44);
            var c6=Cards.Card.fromId(45);
			var c7=Cards.Card.fromId(46);
            var c8=Cards.Card.fromId(47);
			var c9=Cards.Card.fromId(48);
            var c10=Cards.Card.fromId(49);
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard5 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard6 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard7 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard8 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard9 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard10 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			this.card5.addChild(newCard5.node);
            this.card6.addChild(newCard6.node);
			this.card7.addChild(newCard7.node);
            this.card8.addChild(newCard8.node);
			this.card9.addChild(newCard9.node);
            this.card10.addChild(newCard10.node);
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			newCard5.init(c5);
            newCard6.init(c6);
			newCard7.init(c7);
            newCard8.init(c8);
			newCard9.init(c9);
            newCard10.init(c10);
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
            this.card4.active=true;
			this.card5.active=true;
            this.card6.active=true;
			this.card7.active=true;
            this.card8.active=true;
			this.card9.active=true;
            this.card10.active=true;
		
		}else {
			this.page=6;
			this.pagevalue.string=6;
			var c1=Cards.Card.fromId(50);
            var c2=Cards.Card.fromId(51);
			var c3=Cards.Card.fromId(52);
            var c4=Cards.Card.fromId(53);
			
			//根据预制资源组件生成新节点
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			var newCard3 = cc.instantiate(this.cardPrefab).getComponent('createCard');
            var newCard4 = cc.instantiate(this.cardPrefab).getComponent('createCard');
			
			//在绑定的节点上添加子节点
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
			this.card3.addChild(newCard3.node);
            this.card4.addChild(newCard4.node);
			
			//在节点上调用card类里面的初始化init方法
            newCard1.init(c1);
            newCard2.init(c2);
			newCard3.init(c3);
            newCard4.init(c4);
			
			//使绑定的节点为显示状态
            this.card1.active=true;
            this.card2.active=true;
			this.card3.active=true;
			this.card4.active=true;
			this.card5.active=false;
			this.card6.active=false;
			this.card7.active=false;
            this.card8.active=false;
			this.card9.active=false;
			this.card10.active=false;
			this.right.active=false;
		
		}
	},

	
    // update (dt) {},
});