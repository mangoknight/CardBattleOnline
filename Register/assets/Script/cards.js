
var cardNames =new Array("龟仙人","便便");
var cardEffects =new Array("龟派气功龟派气功","气味攻击气味攻击");


/**
 * 牌类，只用来表示牌的基本属性，不包含游戏逻辑，所有属性只读，
 * 
 * @class Card
 * @constructor
 * @param {Number} id - 
 * 
 */
function Card (cid) {
    Object.defineProperties(this, {
		
        id: {
            value: cid,
            writable: false
        },
        //
        name: {
            get: function () {
                return cardNames[cid];
            }
        },
        effect: {
            get: function () {
                return cardEffects[cid];
            }
        },
    });
}
Card.prototype.toString = function () {
    return this.id + ' ' + this.name;
};
var newcards= new Array(cardNames.length);
// 初始化
(function createCards () {
        for (var p = 0; p < cardNames.length; p++) {
            var card = new Card(p);
			
            newcards[card.id] = card;
        }
    
})();
Card.fromId = function (id) {
	console.log(newcards[id]);
	
    return newcards[id];
    
};


module.exports = {
    Card: Card,
   
};
