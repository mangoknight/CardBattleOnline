// name:
// room:
// cityLevel:
// junshiLevel:
// HP:
// defence:
// people:
// money:
// zhaomu1:
// zhaomu2:
// moneyAdd:
// peopleAdd
//效果
var obj = {
    1: function(myself,enemy) {//民兵
        if(myself.people>0){
            myself.people -= 1;
            var result=Calculation1(1,0,enemy.defence,enemy.HP,enemy.money);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    },
    2 : function(myself,enemy) {//步兵
        if(myself.people>1){
            myself.people -= 2;
            var result=Calculation1(2,0,enemy.defence,enemy.HP,enemy.money);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    },
    3 : function(myself,enemy) {//骑兵
        if(myself.people>3){
            myself.people -= 4;
            var result=Calculation1(3,2,enemy.defence,enemy.HP,enemy.money);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            enemy.money -= result.money;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    4 : function(myself,enemy) {//重步兵
        if(myself.people>2){
            myself.people -= 3;
            var result=Calculation1(3,0,enemy.defence,enemy.HP,enemy.money);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    5 : function(myself,enemy) {//重骑兵
        if(myself.people>4){
            myself.people -= 5;
            var result=Calculation1(4,3,enemy.defence,enemy.HP,enemy.money);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            enemy.money =result.money;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    6 : function(myself,enemy) {//雇佣兵
        if(myself.money>2){
            myself.money -= 3;
            var result=Calculation1(1,0,enemy.defence,enemy.HP,enemy.money);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    7 : function(myself,enemy) {//骁勇骑
        if(myself.people>6){
            myself.people -= 7;
            var result=Calculation1(6,5,enemy.defence,enemy.HP,enemy.money);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            enemy.money = result.money;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    8 : function(myself,enemy) {//猎人
        if(myself.people>1){
            myself.people -= 2;
            var result=Calculation2(2,0,enemy.HP,enemy.people);
            enemy.HP = result.HP;
            enemy.people = result.people;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    9 : function(myself,enemy) {//弓手
        if(myself.people>0){
            myself.people -= 1;
            var result=Calculation2(1,0,enemy.HP,enemy.people);
            enemy.HP = result.HP;
            enemy.people = result.people;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    10 : function(myself,enemy) {//弩手
        if(myself.people>2){
            myself.people -= 3;
            var result=Calculation2(3,0,enemy.HP,enemy.people);
            enemy.HP = result.HP;
            enemy.people = result.people;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    11: function(myself,enemy) {//重弩手
        if(myself.people>4){
            myself.people -= 5;
            var result=Calculation2(4,0,enemy.HP,enemy.people);
            enemy.HP = result.HP;
            enemy.people = result.people;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    12 : function(myself,enemy) {//骑兵射手
        if(myself.people>3){
            myself.people -= 4;
            var result=Calculation2(2,1,enemy.HP,enemy.people);
            enemy.HP = result.HP;
            enemy.people = result.people;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    13 : function(myself,enemy) {//精锐骑兵射手
        if(myself.people>5){
            myself.people -= 6;
            var result=Calculation2(4,2,enemy.HP,enemy.people);
            enemy.HP = result.HP;
            enemy.people = result.people;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    14 : function(myself,enemy) {//枪兵
        if(myself.people>1){
            myself.people -= 2;
            var result=Calculation3(1,enemy.defence,enemy.HP);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    15 : function(myself,enemy) {//长枪兵
        if(myself.people>2){
            myself.people -= 3;
            var result=Calculation3(2,enemy.defence,enemy.HP);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    16 : function(myself,enemy) {//精锐长枪兵
        if(myself.people>4){
            myself.people -= 5;
            var result=Calculation3(3,enemy.defence,enemy.HP);
            enemy.defence = result.defence;
            enemy.HP = result.HP;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    17 : function(myself,enemy) {//攻城车
        if(myself.people>7&&myself.money>9){
            myself.people -= 8;
            myself.money -= 10;
            enemy.defence = defenceCount(12,enemy.defence);
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币或人口不足"};
        }
    } ,
    18 : function(myself,enemy) {//投石车
        if(myself.people>6&&myself.money>11){
            myself.people -= 7;
            myself.money -= 12;
            var result = Calculation2(8,5,enemy.HP,enemy.people);
            enemy.HP = result.HP;
            enemy.people = result.people;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币或人口不足"};
        }
    } ,
    19 : function(myself,enemy) {//单臂弩车
        if(myself.people>4 && myself.money>9){
            myself.people -= 5;
            myself.money -=10;
            var result = Calculation2(7,0,enemy.HP,enemy.people);
            enemy.HP = result.HP;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币或人口不足"};
        }
    } ,
    20 : function(myself,enemy) {//刺客
        if(myself.people>0 && myself.money){
            myself.people -= 1;
            myself.money -=5;
            
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币或人口不足"};
        }
    } ,
    21 : function(myself,enemy) {//猛将
        if(myself.people>1 && myself.money>4){
            myself.people -= 2;
            myself.money -=5;
            var result1 = Recruit(0,myself.zhaomu1,myself.zhaomu2);
            var result2 = addPerson(result1,"mengjiang","injure1","mj",myself);
            return {status:true,myself:result2,enemy:enemy};
        }else{
            return {status:false,info:"金币或人口不足"};
        }
    } ,
    22 : function(myself,enemy) {//谋士
        if(myself.money>9){
            myself.money -= 10;
            var result1 = Recruit(0,myself.zhaomu1,myself.zhaomu2);
            var result2 = addPerson(result1,"moushi",null,"ms",myself);
            return {status:true,myself:result2,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    23 : function(myself,enemy) {//外交官
        if(myself.money>4){
            myself.money -= 5;
            var result1 = Recruit(0,myself.zhaomu1,myself.zhaomu2);
            var result2 = addPerson(result1,"waijiaoguan",null,"wj",myself);
            return {status:true,myself:result2,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    24 : function(myself,enemy) {//智将
        if(myself.people>1 && myself.money>4){
            myself.people -= 2;
            myself.money -=5;
            var result1 = Recruit(0,myself.zhaomu1,myself.zhaomu2);
            var result2 = addPerson(result1,"zhijiang","defence1","zj",myself);
            return {status:true,myself:result2,enemy:enemy};
        }else{
            return {status:false,info:"金币或人口不足"};
        }
    } ,
    25 : function(myself,enemy) {//大儒
        if(myself.money>9){
            myself.money -= 10;
			myself.moneyAdd += 2;
			myself.peopleAdd += 1;
            var result1 = Recruit(0,myself.zhaomu1,myself.zhaomu2);
            var result2 = addPerson(result1,"daru","addm2p1","dr",myself);
            return {status:true,myself:result2,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    26 : function(myself,enemy) {//大祭司
        if(myself.money>9){
            myself.money -= 10;
            var result1 = Recruit(0,myself.zhaomu1,myself.zhaomu2);
            var result2 = addPerson(result1,"dajisi",null,"djs",myself);
            return {status:true,myself:result2,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    27 : function(myself,enemy) {//巫
        if(myself.money>9){
            myself.money -= 10;
            var result1 = Recruit(0,myself.zhaomu1,myself.zhaomu2);
            var result2 = addPerson(result1,"wu",null,"wu",myself);
            return {status:true,myself:result2,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    28 : function(myself,enemy) {//道士
        if(myself.money>9){
            myself.money -= 10;
            var result1 = Recruit(0,myself.zhaomu1,myself.zhaomu2);
            var result2 = addPerson(result1,"daoshi",null,"ds",myself);
            return {status:true,myself:result2,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    29 : function(myself,enemy) {//城市升级
        if(myself.money>=10+5*myself.cityLevel&&myself.cityLevel<3){
            myself.money -= 10+5*myself.cityLevel;
            myself.cityLevel +=1;
            myself.defence +=5;
            myself.HP +=5;
            myself.moneyAdd +=1;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    30 : function(myself,enemy) {//军事升级
        if(myself.money>=10+5*myself.junshiLevel&&myself.junshiLevel<3){
            myself.money -= 10+5*myself.junshiLevel;
            myself.junshiLevel +=1;
            myself.people +=1;   
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    31 : function(myself,enemy) {//防御工事
        if(myself.money>4){
            myself.money -= 5;
            myself.defence += 3;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    32 : function(myself,enemy) {//增兵防守
        if(myself.people>1&&myself.money>1){
            myself.money -= 2;
            myself.people -=2;
            myself.defence += 3;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币或人口不足"};
        }
    } ,
    33 : function(myself,enemy) {//守城巨弩
        if(myself.money>11){
            myself.money -= 12;
            myself.defence +=7;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    34 : function(myself,enemy) {//修缮城墙
        if(myself.money>9){
            myself.money -=10;
            myself.defence += 5;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    35 : function(myself,enemy) {//募兵令
        if(myself.money>6){
            myself.money -= 7;
            myself.people +=3;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    36 : function(myself,enemy) {//广纳贤良
        if(myself.money>2){
            myself.money -= 3;
            
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    37 : function(myself,enemy) {//游闲神医
        if(myself.money>7){
            myself.money -= 8;
            myself.HP +=5;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    38 : function(myself,enemy) {//军医
        if(myself.money>3){
            myself.money -= 4;
            myself.HP += 2;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    39 : function(myself,enemy) {//募粮令
        if(myself.people>1){
            myself.people -= 2;
            myself.money += 5;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足"};
        }
    } ,
    40 : function(myself,enemy) {//征讨令
        if(myself.money>2){
            myself.money -= 3;
            var a1 = 1+Math.random()*19;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足"};
        }
    } ,
    41 : function(myself,enemy) {//袭营
        if(myself.people>1&&(myself.zhaomu1.type=="zj"||myself.zhaomu2.type=="zj")){
            myself.people -= 2;
            enemy.people = peopleCount(3,enemy.people);
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足或没招募智将"};
        }
    } ,
    42 : function(myself,enemy) {//斩将
        if(myself.people>1&&(myself.zhaomu1.type=="mj"||myself.zhaomu2.type=="mj")){
            myself.people -= 2;

            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足或没招募猛将"};
        }
    } ,
    43 : function(myself,enemy) {//冲阵
        if(myself.people>2&&(myself.zhaomu1.type=="mj"||myself.zhaomu2.type=="mj")){
            myself.people -= 3;
            
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足或没招募猛将"};
        }
    } ,
    44 : function(myself,enemy) {//火攻
        if(myself.money>7&&(myself.zhaomu1.type=="ms"||myself.zhaomu2.type=="ms")){
            myself.money -= 8;
            enemy.money = moneyCount(7,enemy.money);
            enemy.people = peopleCount(5,enemy.people);
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足或没招募谋士"};
        }
    } ,
    45 : function(myself,enemy) {//截获
        if(myself.people>2&&(myself.zhaomu1.type=="mj"||myself.zhaomu2.type=="mj")){
            myself.people -=3;
            enemy.money = moneyCount(7,enemy.money);
            myself.money +=4;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足或没招募猛将"};
        }
    } ,
    46 : function(myself,enemy) {//离间
        if(myself.money>9&&(myself.zhaomu1.type=="ms"||myself.zhaomu2.type=="ms")){
            myself.money -= 10;
            enemy.HP = hpCount(5,enemy.HP);
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足或没招募谋士"};
        }
    } ,
    47 : function(myself,enemy) {//举贤
        if(myself.zhaomu1.type=="dr"||myself.zhaomu2.type=="dr"){
            var a1 = 1+Math.random()*19;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"没招募大儒"};
        }
    } ,
    48 : function(myself,enemy) {//布阵
        if(myself.people>2&&(myself.zhaomu1.type=="zj"||myself.zhaomu2.type=="zj")){
            myself.people -= 3;
            myself.defence +=5;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足或没招募智将"};
        }
    } ,
    49 : function(myself,enemy) {//借兵
        if(myself.money>9&&(myself.zhaomu1.type=="wj"||myself.zhaomu2.type=="wj")){
            myself.money -= 10;
            myself.people +=5;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足或没招募外交官"};
        }
    } ,
    50 : function(myself,enemy) {//借粮
        if(myself.people>4&&(myself.zhaomu1.type=="wj"||myself.zhaomu2.type=="wj")){
            myself.people -= 5;
            myself.money +=10;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足或没招募外交官"};
        }
    } ,
    51 : function(myself,enemy) {//祈雨
        if(myself.money>4&&(myself.zhaomu1.type=="djs"||myself.zhaomu2.type=="djs")){
            myself.money += 5;
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足或没招募大祭司"};
        }
    } ,
    52 : function(myself,enemy) {//巫术
        if(myself.people>2&&(myself.zhaomu1.type=="ms"||myself.zhaomu2.type=="ms")){
            myself.people -= 3;
            enemy.people = peopleCount(5,enemy.people);
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"人口不足或没招募巫"};
        }
    } ,
    53 : function(myself,enemy) {//黄巾力士
        if(myself.people>1&&myself.money>4&&(myself.zhaomu1.type=="ds"||myself.zhaomu2.type=="ds")){
            myself.people -= 2;
            myself.money -=5;
            enemy.defence = defenceCount(5,enemy.defence);
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币人口不足或没招募道士"};
        }
    } ,
    54 : function(myself,enemy) {//雷公助阵
        if(myself.money>9&&(myself.zhaomu1.type=="ds"||myself.zhaomu2.type=="ds")){
            enemy.money = moneyCount(7,enemy.money);
            enemy.people = peopleCount(3,enemy.people);
            return {status:true,myself:myself,enemy:enemy};
        }else{
            return {status:false,info:"金币不足或没招募道士"};
        }
    } ,
};

//近战类伤害结果计算(防御血量伤害，金钱伤害，防御，血量，金钱)
function Calculation1(injure1,injure2,defence,HP,money){
    if(injure1<=defence){
        defence -=injure1;
    }else{
        injure1=injure1-defence;
        HP = hpCount(injure1,HP);
        defence=0;
    }
    money = moneyCount(injure2,money);
    return {defence :defence,HP: HP,money:money};
}
//远程战斗类（血量伤害，人口伤害，血量，人口）
function Calculation2(injure1,injure2,HP,people){
    HP = hpCount(injure1,HP);
    people = peopleCount(injure2,people);
    return {HP: HP,people: people};
}
//贯穿伤害类（伤害，防御，血量）
function Calculation3(injure,defence,HP){
    defence = defenceCount(injure,defence);
    HP = hpCount(injure,HP);
    return {defence: defence,HP: HP};
}
//招募位置判断
function Recruit(zhaomu,zhaomu1,zhaomu2){
    if(zhaomu1==null||zhaomu1==""){
        zhaomu = 1;
    }else{
        if(zhaomu2==null||zhaomu2==""){
            zhaomu = 2;
        }else{
            zhaomu = 3;
        }
    }
    return zhaomu;
}
//添加招募人物信息
function addPerson(zhaomu,name,skill,type,myself){
    switch(zhaomu){
        case 1:
            myself.zhaomu1={name: name, skill: skill,type: type};
            return myself;
        case 2:
			myself.zhaomu2={name: name, skill: skill,type: type};
            return myself;
        case 3:
			if(myself.zhaomu1.name=="daru"){
				myself.moneyAdd -= 2;
				myself.peopleAdd -= 1;
			}
            myself.zhaomu1=myself.zhaomu2;
            myself.zhaomu2={name: name, skill: skill,type: type};
            return myself;
        default: break;
   }
}
//计算对防御伤害是否溢出
function defenceCount(injure,defence){
    if(defence>injure){
        defence -=injure;
    }else{
        defence = 0;
    }
    return defence;
}
//计算对血量是否溢出
function hpCount(injure,HP){
    if(HP>injure){
        HP -=injure;
    }else{
        HP = 0;
    }
    return HP;
}
//计算对金币是否溢出
function moneyCount(injure,money){
    if(money>injure){
        money -=injure;
    }else{
        money = 0;
    }
    return money;
}
//计算对人口是否溢出
function peopleCount(injure,people){
    if(people>injure){
        people -=injure;
    }else{
        people = 0;
    }
    return people;
}
//总调用
var calculateBouns =function(level,myself,enemy) {
    
    return obj[level+1](myself,enemy);
};
var getOne = function(){
    return Math.random() * 54 | 0;
}
var removeByValue = function(cards,id){
    console.log(cards);
    console.log(id);
    for(var key in cards){
        if(cards[key]==id){
            delete cards[key];
            console.log(cards);
            break;
        }
    }
    return cards;
}
module.exports.calculateBouns = calculateBouns;
module.exports.getOne=getOne;
module.exports.removeByValue=removeByValue;