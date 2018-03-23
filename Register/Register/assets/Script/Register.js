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
        emailText: {
            default: null,
            type: cc.EditBox
        },
        TphoneText: {
            default: null,
            type: cc.EditBox
        },
        idcardText: {
            default: null,
            type: cc.EditBox
        },
        showLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },
 
    buttonClicked: function() {
        // var xhr = new XMLHttpRequest();
        var time = this.CurentTime();
        // var iii=this;
        // console.log(time);
        
        // xhr.open("POST", "http://localhost:3253/JMUser/PassLogin", true);
        // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
        var abc = "phone="+this.userText.string+"&password="+this.pwText.string+ "&time="+time;
        console.log(abc);
        // xhr.send(abc);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && (xhr.status >= 0 && xhr.status < 400)) {
        //         var response = xhr.responseText;
        //         console.log(response);
        //         var result = JSON.parse(response);
        //         if(a.status === 0){
        //             iii.showLabel.string = "登录成功";
        //         }else{
                    
        //             iii.showLabel.string = a.msg.error;
        //         }
        //     }
        // }
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
