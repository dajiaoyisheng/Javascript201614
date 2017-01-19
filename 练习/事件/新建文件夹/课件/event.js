/**
 * Created by yuanss on 2017/1/8.
 */
function bind(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false)
    } else {
        var tmp = function () {
            fn.call(ele)
        }
        if (!ele[type + 'aEvent']) {
            ele[type + 'aEvent'] = []
        }
        var a = ele[type + 'aEvent'];
        for (var i = 0; i < a.length; i++) {
            if (a[i].name === fn) return
        }
        a.push(tmp);
        ele.attachEvent('on' + type, tmp)
    }
}
function upbind(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false)
    } else {
        var tmp = function () {
            fn.call(ele)
        }
        var a = ele[type + 'aEvent'];
        if (a.length) {
            for (var i = 0; i < a.length; i++) {
                ele.detachEvent(type, fn, false);
                a.splice(i, 1)
            }
        }

    }
}
function on(ele,type,fn) {
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else {
        var tmp=function () {
            fn.call(ele)
        }
        var a=ele[type+'aEvent'];
        for(var i=0;i<a.length;i++){
            if(a[i].name=fn) return
        }
        a.push(fn)
       bind(ele,type,run)
    }
}
function off(ele,type,fn) {
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false)
    }else {
        var a=ele[type+'aEvent'];
        if(a.length){
            for (var i=0;i<a.length;i++){
                if(a[i]===fn){
                    a[i]=null
                    break;
                }
            }
        }
    }
}
function run() {
    e=window.event
    var a=this[e.type+'aEvent'];
    if(a.length){
        for(var i=0;i<a.length;i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e)
            }else {
                a[i].splice(i,1)
                i--
            }
        }
    }
}
