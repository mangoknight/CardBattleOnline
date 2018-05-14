var address;
cc.Class({
    extends: cc.Component,

    properties: {
		ipText: {
            default: null,
            type: cc.EditBox
        },
		enterBtn:cc.Node,
		iptext:cc.Node,
    },

      // use this for initialization
    onLoad: function () {
       
        
        //address = 'http://192.168.1.109:7777';
		 address = 'http://192.168.199.148:7777';
        cc.sys.localStorage.setItem("address",JSON.stringify(address));	
    },
 
    change: function() {
		var newadd = this.ipText.string;
		address = newadd;
		cc.sys.localStorage.setItem("address",JSON.stringify(address));	
		this.iptext.active=false;
		this.enterBtn.active=false;
    }, 
	show: function(){
		this.iptext.active=true;
		this.enterBtn.active=true;
	},
	//
});
