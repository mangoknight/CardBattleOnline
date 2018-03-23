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
        
        
		
        var username =this.userText.string;
		var pwd =this.pwText.string;
		var cfpwd =this.cfPwText.string;
		var map={name:username,pwd:pwd};
		if(pwd===cfpwd&&username!=null&&pwd!=null&&cfpwd!=null){
			socket.emit('regist',map);
			socket.on('success'+username,(msg)=>{
			cc.director.loadScene('login');
		});	
			socket.on('fail'+username,(msg)=>{
				this.error.string = msg.content;
				this.showError.active=true;
			});
		}else if(username==null){
			this.error.string="用户名不能为空！";	
			this.showError.active=true;
		}
		else if(pwd==null){
			this.error.string="密码不能为空！";	
			this.showError.active=true;
		}
		else if(cfpwd==null){
			this.error.string="确认密码不能为空！";	
			this.showError.active=true;
		}
		else{
			this.error.string="密码和确认密码不一致！";	
			this.showError.active=true;
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
