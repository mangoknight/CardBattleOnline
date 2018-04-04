///用来封装整个网站的所有的数据配置文件

///封装数据库连接字段
var sql={
    //ip地址
    host: '47.93.255.225', 
    //用户名 
    user: 'root',  
    //连接密码
    password: '0229',
    //使用数据库名字  
    database: 'lingtu'
    //port: port  
};
var redis={
    host:'127.0.0.1',
    port:6379,
    opts:{},
    ///没有密码请填写空字符串
    password:''
  };

module.exports.redis=redis;
module.exports.sql=sql;

//redis.set("node_redis_key", JSON.stringify({ "name": "wolfy", age: 28 }), function (error, res) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(res);
//         };
//     });


// redis.get("r",  function (error, res) {
//       if (error) {
//           console.log(error);
//       } else {
//           console.log(res);
//       };
//       //操作完成，关闭redis连接
//       redis.end(true);

//   });