/**
 * Created by Administrator on 2017/1/7.
 */
animate=function(opt){
    //���û�д�ID�Ļ�����ϳ������У�
    if(!opt.id) return;
    //����Ĭ��ֵ��
    var defaultOpt={
        duration:1000,
        effect:'Linear'
    };
    //������˵Ļ������մ�������û��������Ĭ��ֵ����
    //for(var attr in opt){
    //    defaultOpt[attr]=opt[attr];
    //}

    Object.assign(defaultOpt,opt)
    //�˶���ʽ
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
    //Ϊ��ʽ�Ĳ�����׼����
    var begin={},change={};
    var target=defaultOpt.target;
    var curEle=defaultOpt.id;
    for(var attr in target){
        begin[attr]=utils.getCss(curEle,attr);
        change[attr]=target[attr]-begin[attr];
    }
    var duration=defaultOpt.duration;
    var time=null;
    //������ʱ���������ۼ�ʱ�䣬ͨ����ʽ�������λ�ã�����������λ�ã�
    clearInterval(timer);
    var timer=setInterval(function(){
        time+=10;
        //�߽��ж�
        if(time>=duration){
            utils.css(curEle,target);
            clearInterval(timer);
            defaultOpt.cb && defaultOpt.cb.call(curEle);
            return;
        }
        //ͨ����ʽ�ֱ��������λ�ã����ֱ�����
        for(var attr in begin){
            var curPos=tmpEffect(time,begin[attr],change[attr],duration);
            utils.css(curEle,attr,curPos);
        }
    },10)
}