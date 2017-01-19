/**
 * Created by 39753 on 2017/1/8.
 */
//给某个元素的某个行为，绑定一系列的方法；
//任务：解决IE浏览器下：1）this 2）重复绑定问题 3）顺序问题
function bind(ele,type,fn){
    //1.标准浏览器下，通过addEventListener--type; IE下attachEvent--'on'+type
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{//IE浏览器
        var tmp=function(){
            fn.call(ele);//为了解决this问题；
        };
        tmp.name=fn;//fn1, fn2,fn3
        //如果没有数组的话，给元素自定义属性上添加一个数组；注意：1）数组只能被创建一次；
        if(!ele['aEvent']){
            ele['aEvent']=[];
        }
        var a=ele['aEvent'];
        //去重判断，如果重复了，直接阻断程序的执行；
        for(var i = 0; i<a.length; i++){
            if(a[i].name==fn) return;
        }
        a.push(tmp);//[tmp,tmp,tmp,tmp]
        //问题1：绑定的是个匿名函数-》无法解除事件绑定；
        ele.attachEvent('on'+type,tmp);
    }
}
//解除某个元素的某个行为下的某个方法:1)拿到公有的数组 2）循环遍历数组，找到要解除的进行解除；--注意：一定要让系统事件池和自定义事件池同步；
function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{//IE浏览器
        var a=ele['aEvent'];//拿到数组
        //遍历解除；
        if(a.length){
            for(var i=0; i<a.length; i++){
                //预防数组塌陷的思路1：
                if(a[i].name===fn){
                    ele.detachEvent('on'+type,a[i]);
                    a.splice(i,1);//数组塌陷的问题；--删除的是自定义事件池；
                }
                /*//预防数组塌陷的思路2：
                var  n=a[i];//n存的是地址；
                if(n.name===fn){
                    a.splice(i,1);//
                    ele.detachEvent('on'+type,n);
                }*/
            }
        }
    }
}