/**
 * Created by Administrator on 2017/1/9.
 */
function on(ele,tyle,fn){
    if(ele.addEventListener) {
        ele.addEventListener(ele,type,false);
    }else{
        if(!ele[type+'onEvent']){
            ele[type+'onEvent']=[];
            //ֻ��ϵͳ�¼��أ���һ��run������--��run���������������Ϊ�˽��run���ظ��󶨵����⣻
            ele.attachEvent('on'+type,function(){
                run.call(ele);
            })
        }
        var a=ele[type+'onEvent'];
        for (var i = 0; i < a.length; i++) {
            if(a[i]===fn){
                return
            }
        }

        a.push(fn)
    }
}
function off(ele,tyle,fn){
if(ele.detachEvent){
    ele.detachEvent(ele,type,false)
}else{
    var a=ele[type+'onEvent'];
    if(a&&a.length){
        for (var i = 0; i < a.length; i++) {
            if(a[i]===fn){
                a[i]=null;
                break;
            }
        }
    }

}
}