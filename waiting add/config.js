var address;
cc.Class({
    extends: cc.Component,

    properties: {
		ipText: {
            default: null,
            type: cc.EditBox
        },
		
    },

      // use this for initialization
    onLoad: function () {
       
        
        address = 'http://127.0.0.1:7777';
        cc.sys.localStorage.setItem("address",JSON.stringify(address));	
    },
 
    change: function() {
		var newadd = this.ipText.string;
		address = newadd;
		cc.sys.localStorage.setItem("address",JSON.stringify(address));	
    }, 
	//
});
