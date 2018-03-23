var CreateCards = require('createcard');
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
    },

    // LIFE-CYCLE CALLBACKS:

    sendCard :function() {
			var c1 ;
            var c2;
            c1=Cards.Card.fromId(0);
            c2=Cards.Card.fromId(1);
            console.log(c1);
            var newCard1 = cc.instantiate(this.cardPrefab).getComponent('createcard');
            var newCard2 = cc.instantiate(this.cardPrefab).getComponent('createcard');
            this.card1.addChild(newCard1.node);
            this.card2.addChild(newCard2.node);
            newCard1.init(c1);
            newCard2.init(c2);
            this.card1.active=true;
            this.card2.active=true;
	},

	

    // update (dt) {},
});
