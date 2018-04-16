
var socket;
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    onLoad: function () {
			var info = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
			socket = window.io.connect('http://192.168.1.103:7777');
			socket.on('joinOk'+info.user_name,(msg)=>{
				cc.sys.localStorage.setItem("roomInfo",JSON.stringify(msg.room));
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
    

    // update (dt) {},
});
