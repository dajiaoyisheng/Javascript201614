/**
 * Created by ltleelong on 2017/1/8.
 */
function bind(ele,type,fn){
    //1.标准浏览器下通过addEventListener--type,IE下attachEvent---'on'+type
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else{//IE浏览器下
        var tem=function(){
            fn.call(ele);//解决this问题,把方法都放到函数中
        };
        tem.name=fn;//保存每个函数的名
        if(!ele[type+'aEvent']){//半盘是否存在数组,不存在创建.
            ele[type+'aEvent']=[];
        }
        var a=ele[type+'aEvent'];//把数组赋值给a
        for(var i=0;i<a.length;i++){//遍历数组,看是否重复,重复直接返回,不重复放到数组内
            if(a[i].name==fn) return;
        }
        a.push(tem);
        ele.attachEvent('on'+type,tem);//
    }
}
function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false)
    }else{
        var a=ele[type+'aEvent'];
        if(a.length){
            for(var i=0;i<a.length;i++){
                if(a[i].name===fn){
                    ele.detachEvent('on'+type,a[i]);
                    a.splice(i,1);
                }
            }
        }
        //ele.detachEvent('on'+type,fn)
    }
}