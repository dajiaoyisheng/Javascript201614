/**
 * Created by Administrator on 2017/1/7.
 */
animate=function(opt){
    //如果没有传ID的话，阻断程序运行；
    if(!opt.id) return;
    //设置默认值；
    var defaultOpt={
        duration:1000,
        effect:'Linear'
    };
    //如果传了的话，按照传的来；没传，按照默认值来；
    //for(var attr in opt){
    //    defaultOpt[attr]=opt[attr];
    //}

    Object.assign(defaultOpt,opt)
    //运动形式
    var tmpEffect=zhufengEffect[defaultOpt.effect];
    var effect=defaultOpt.effect;
    var ary = ["Linear", "Elastic-easeOut", "Back-easeOut", "Bounce-easeOut", "Expo-easeIn"];
    if(typeof effect==='number'){
        var str=ary[effect%ary.length];
        ary=str.split('-');
        tmpEffect=ary.length>=2?zhufengEffect[ary[0]][ary[1]]:zhufengEffect[ary[0]];
    }else if(typeof effect=='object'){
        tmpEffect=effect.length>=2?zhufengEffect[effect[0]][effect[1]]:zhufengEffect[effect[0]];
    }
    //为公式的参数做准备；
    var begin={},change={};
    var target=defaultOpt.target;
    var curEle=defaultOpt.id;
    for(var attr in target){
        begin[attr]=utils.getCss(curEle,attr);
        change[attr]=target[attr]-begin[attr];
    }
    var duration=defaultOpt.duration;
    var time=null;
    //开启定时器，不断累加时间，通过公式求出最新位置，并设置最新位置；
    clearInterval(timer);
    var timer=setInterval(function(){
        time+=10;
        //边界判断
        if(time>=duration){
            utils.css(curEle,target);
            clearInterval(timer);
            defaultOpt.cb && defaultOpt.cb.call(curEle);
            return;
        }
        //通过公式分别求出最新位置，并分别设置
        for(var attr in begin){
            var curPos=tmpEffect(time,begin[attr],change[attr],duration);
            utils.css(curEle,attr,curPos);
        }
    },10)
}