/**
 * Created by Administrator on 2017/1/7.
 */
function bind(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else{
    var tmp=function(){
    fn.call(ele)
    };
     tmp.name=fn;
        if(!ele[type+'aEvent']){
            ele[type+'aEvent']=[];
        }
        var a=ele[type+'aEvent'];
        for (var i = 0; i < a.length; i++) {
            if(a[i].name==fn){
                return
            }
            a.push(tmp)
        }
        ele.attachEvent('on'+type,tmp)
    }
}
function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        var a=ele[type+'aEvent'];//�õ�����
        //���������
        if(a.length){
            for(var i=0; i<a.length; i++){
            //Ԥ���������ݵ�˼·1��
                if(a[i].name===fn){
                    ele.detachEvent('on'+type,a[i]);
                    a.splice(i,1);//�������ݵ����⣻--ɾ�������Զ����¼��أ�
                }
            }
        }
    }
}
function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else{
        if(!ele[type+'onEvent']){
            ele[type+'onEvent']=[];
        }
        var a=ele[type+'onEvent'];
        for (var i = 0; i < a.length; i++) {
            if(a[i]===fn) return;
        }
        a.push(fn);
        bind(ele,type,run);
    }
}




