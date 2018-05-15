cc.Class({
    extends: cc.Component,

    properties: {
       
        // nodes
        cardname: cc.Label,
        img: cc.Sprite,
		effect: cc.Label,
        border: cc.Sprite,
		cardId: cc.Label,
        // resources
        cardBackBG: cc.SpriteFrame,
        cardBorder: {
            default: [],
            type: cc.SpriteFrame
        },
        cardImg: {
            default: [],
            type: cc.SpriteFrame
        },
		cardMoney:cc.Label,
		cardPeople:cc.Label,
		cardType:cc.Label,
    },
  
    //初始化
    init: function (card) {
		this.cardId.string=card.id;
        this.cardname.string = card.name;
		this.effect.string = card.effect;
		this.img.spriteFrame = this.cardImg[card.id];
		this.border.spriteFrame = this.cardBorder[0];
		this.cardMoney.string = card.money;
		this.cardPeople.string = card.people;
		this.cardType.string = card.type;
        
    },
	//翻牌
    //reveal: function (isFaceUp) {
     //   this.cardname.node.active = isFaceUp;
    //    this.effect.node.active = isFaceUp;
    //    this.img.node.active = isFaceUp;
    //    this.border.spriteFrame = isFaceUp ? this.border : this.cardBackBG;
    //},
});


