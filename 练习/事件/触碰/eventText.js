/**
 * Created by Administrator on 2017/1/10.
 */
function on(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn,false);
        }else{
            if(!ele[type+'onEvent']){
                ele[type+'onEvent']=[];
                //只给系统事件池，绑定一个run方法；--把run方法，放在这里，是为了解决run被重复绑定的问题；
                ele.attachEvent('on'+type,function(){
                    run.call(ele);
                })
            }
            var a=ele[type+'onEvent'];
                for (var i = 0; i < a.length; i++) {
                    if(a[i]===fn){
                        return;
                    }
                a.push(fn)
            }
        }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false)
    }else{//IE浏览器；1：拿数组；2：循环匹配，找到赋值为null；
        var a=ele[type+'onEvent'];
        if(a&& a.length){
            for (var i = 0; i < a.length; i++) {
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }
}
function run(){
    //1)拿到数组 2）顺序调用：1-this问题  2-事件对象；
    var e=window.event;
    e.pageX= e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
    e.pageY= e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
    e.target=e.srcElement;
    e.preventDefault=function(){
        e.returnValie=false;
    };
    e.stopPropagation=function(){
        e.cancelBubble=true;
    };
    var a=this[e.type+'onEvent'];
    if(a&& a.length){
        for (var i = 0; i < a.length; i++) {
            if(typeof a[i]==='function'){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
