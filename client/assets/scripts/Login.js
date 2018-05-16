var socket;
cc.Class({
    extends: cc.Component,

    properties: {
        userText: {
            default: null,
            type: cc.EditBox
        },
        pwText: {
            default: null,
            type: cc.EditBox
        },
        
        showError:cc.Node,
		error:{
            default: null,
            type: cc.Label
        }
    },

      // use this for initialization
    onLoad: function () {
        
        
        
    },
 
    login: function() {
        var address = JSON.parse(cc.sys.localStorage.getItem("address"));
        socket = window.io.connect(address);
        var username =this.userText.string;
		var pwd =this.pwText.string;
		
		var map={name:username,password:pwd};
		console.log(username);
		if(username.length<2||username.length>16){
			this.error.string="用户名长度不正确！";	
			this.showError.active=true;
		}
		else if(pwd.length<2||pwd.length>16){
			this.error.string="密码应该在2-16之间！";	
			this.showError.active=true;
		}else{
            socket.emit('login',map);
            socket.on('loginBack'+username,(msg)=>{
				
					console.log(msg);
				if(msg.status){
					cc.sys.localStorage.setItem("userInfo",JSON.stringify(msg.user));	
					cc.director.loadScene('home');
				}else{
					this.error.string = msg.content;
					this.showError.active=true;
				}

			});	
			
		}

    }, 
	register: function(){
		cc.director.loadScene('Register');
		
	},
    CurentTime :function(){
        var now = new Date();

        var year = now.getFullYear();
        //年
        var month = now.getMonth() + 1;
        //月
        var day = now.getDate();
        //日
        var hh = now.getHours();
        //时
        var mm = now.getMinutes();
        //分
        var ss = now.getSeconds();
        var clock = year + "";

        if (month < 10)
            clock += "0";

        clock += month + "";

        if (day < 10)
            clock += "0";

        clock += day + "";

        if (hh < 10)
            clock += "0";

        clock += hh + "";
        if (mm < 10)
            clock += '0';
        clock += mm + "";
        if (ss < 10)
            clock += '0';
        clock += ss ;
        return (clock);
    },
    
    // httpConnection: function(){
    //     var xhr = new XMLHttpRequest();
    //     var time = this.CurentTime();

    //     console.log(time);
        
    //     xhr.open("POST", "http://localhost:3253/JMUser/PassLogin", true);
    //     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    //     var abc = "phone="+this.userText.string+"&password="+this.pwText.string+ "&time="+time;
    //     xhr.send(abc);
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4 && (xhr.status >= 0 && xhr.status < 400)) {
    //             var response = xhr.responseText;
    //             console.log(response);
    //             var result = JSON.parse(response);
    //             return result.status;
    //         }

    //     }
    // }

});