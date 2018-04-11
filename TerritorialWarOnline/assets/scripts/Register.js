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
        cfPwText: {
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
       
       socket = window.io.connect('http://localhost:7777');
        
        
    },
 
    buttonClicked: function() {
        // var xhr = new XMLHttpRequest();
        
        
		
        var username=this.userText.string;
		var pwd=this.pwText.string;
		var cfpwd =	this.cfPwText.string;
		var map={name:username,pwd:pwd};
		if(pwd!=cfpwd){
			this.error.string="密码和确认密码不一致！";	
			this.showError.active=true;
			
		}else if(username.length<2||username.length>16){
			
			this.error.string="用户名应该在2-16个字符之间！";	
			this.showError.active=true;
		}
		else if(pwd.length<2||pwd.length>16){
			
			this.error.string="密码应该在2-16位之间！";	
			this.showError.active=true;
		}
		else{
			socket.emit('regist',map);
			socket.on('success'+username,(msg)=>{
					this.error.string="注册成功！"
					this.showError.active=true;
				var timeCallback = function () {
						
                        cc.director.loadScene('login');   
                    }
                    this.schedule(timeCallback,2, 0, 2);
			
			
		});	
			socket.on('fail'+username,(msg)=>{
				this.error.string = msg.content;
				this.showError.active=true;
			});
		}
		
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
