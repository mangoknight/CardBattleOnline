


cc.Class({
    extends: cc.Component,
    
    socket: function(){
      return  window.io.connect('http://localhost:7777');
    //   return window.io.connect('http://192.168.2.155:7777');
    }
       
});
