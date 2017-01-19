/**
 * Created by 39753 on 2016/12/25.
 */
/*
 (function(){
 /!*var utils={
 }
 window.utils=utils;*!/
 /!*window.utils={
 }*!/
 utils={
 }
 })();*/
var utils=(function(){
    var flg='getComputedStyle' in window;
    function makeArray(args){
        if(flg){
            return Array.prototype.slice.call(args);
        }else{
            var ary=[];
            for(var i=0; i<args.length; i++){
                ary.push(args[i]);
            }
            return ary;
        }
    }
    function jsonParse(jsonStr){
        return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')')
    }
    function rnd(n,m){
        n=Number(n);
        m=Number(m);
        if(isNaN(n) || isNaN(m)){
            return Math.random();//����0-1֮�����С�������δ���
        }
        if(n>m){
            var tmp=m;
            m=n;
            n=tmp;
        }
        return Math.round(Math.random()*(m-n)+n);
    }
    function win(attr,value){
        if(value===undefined){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=document.body[attr]=value;
    }
    function offset(curEle){
        var par=curEle.offsetParent;
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        while(par){
            if(window.navigator.userAgent.indexOf('MSIE 8')===-1){
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par=par.offsetParent;
        }
        return {left:l,top:t};
    }
    function getByClass(strClass,context){
        context=context||document;
        if(flg){
            return this.makeArray(context.getElementsByClassName(strClass))
        }else{//����IE6-8
            //1.�ַ���ת����
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            //2.��ȡ��ǰ�����µ�����Ԫ��
            var nodeList=context.getElementsByTagName('*');
            var ary=[];
            //3.���У��ÿ��Ԫ�ص�class��
            for(var i=0; i<nodeList.length; i++){
                var cur=nodeList[i];
                var bOk=true;
                for(var j=0; j<aryClass.length; j++){
                    var reg=new RegExp('(^| +)'+aryClass[j]+'( +|$)','g');
                    if(!reg.test(cur.className)){
                        bOk=false;
                        break;
                    }
                }
                if(bOk){
                    ary.push(cur);
                }
            }
            return ary;
        }
    }
    function hasClass(curEle,cName){
        var reg=new RegExp('(^| +)'+cName+'( +|$)','g');
        return reg.test(curEle.className);
    }
    function addClass(curEle,strClass){
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        //��֤Ԫ�����ϣ����û��ĳ��class����������ӣ����ʱһ��Ҫע��ո�
        for(var i=0; i<aryClass.length; i++){
            if(!this.hasClass(curEle,aryClass[i])){
                curEle.className+=' '+aryClass[i];
            }
        }
    }
    function removeClass(curEle,strClass){
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0; i<aryClass.length; i++){
            var reg=new RegExp('(^| +)'+aryClass[i]+'( +|$)','g');
            if(reg.test(curEle.className)){
                curEle.className=curEle.className.replace(reg,' ').replace(/(^ +)|( +$)/g,'').replace(/\s+/g,' ');
            }
        }
    }
    function getCss(curEle,attr){
        var val,reg;
        if(flg){
            val=getComputedStyle(curEle,false)[attr];
        }else{
            if(attr==='opacity'){
                val=curEle.currentStyle.filter;
                reg=/^alpha\(opacity[:=](\d+)\)$/g;
                return reg.test(val)?RegExp.$1/100:1;
            }else{
                val=curEle.currentStyle[attr];
            }
        }
        //����λ��
        reg=/^[+-]?(\d+(\.\d+)?)(px|pt|rem|em)?$/gi;
        return reg.test(val)?parseFloat(val):val;
    }
    function setCss(curEle,attr,value){
        //������
        if(attr==='float'){
            //IE
            curEle.style.styleFloat=value;
            //Firefox��chrome��safari
            curEle.style.cssFloat=value;
            return;
        }
        //����͸����
        if(attr==='opacity'){
            curEle.style.opacity=value;
            curEle.style.filter='alpha(opacity='+value*100+')';
            return;
        }
        //����λ��width,height,left,top,right,bottom,margin,marginLeft,padding,paddingLeft
        var reg=/^(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))$/i;
        //toString��ת���ַ���������ʵ�������ԭ���ϵ�toString()
        if(reg.test(attr) && value.toString().indexOf('%')===-1){
            value=parseInt(value)+'px';
        }
        curEle.style[attr]=value;
    }
    function setGroupCss(curEle,opt){
        //toString��Object.prototype�ϵģ������������ͼ��ģ����ܣ����Դ�ӡ��this���������ϸ��Ϣ��
        if({}.toString()!=='[object Object]') {
            console.log('opt���Ƕ���');
            return;
        };
        for(var attr in opt){
            this.setCss(curEle,attr,opt[attr])
        }
    }
    function css(curEle){
        var argTwo=arguments[1];
        //����ڶ��������Ǹ��ַ����Ļ�����ȡ ��  ����һ��
        if(typeof argTwo==='string'){
            var argThree=arguments[2];
            //��ȡ
            if(typeof argThree==='undefined'){
                return this.getCss(curEle,argTwo)
            }else{
                //����һ��
                this.setCss(curEle,argTwo,argThree);
            }

        }
        //����ڶ��������Ǹ�����Ļ�������һ��
        if(argTwo.toString()==='[object Object]'){
            this.setGroupCss(curEle,argTwo)
        }
    }
    function getChildren(curEle,tagName){
        //��ȡ���е��ӽڵ�
        var nodeList=curEle.childNodes;
        var ary=[];
        //�����֤ÿ���ӽڵ��Ƿ�ΪԪ�ؽڵ�
        for(var i=0; i<nodeList.length; i++){
            var cur=nodeList[i];
            if(cur && cur.nodeType===1){
                //�ڶ������������ڣ�û�й��˵Ĺ���
                if(tagName===undefined){
                    ary.push(cur);
                }else{
                    //˵���ڶ����������ڣ��й��˵Ĺ��ܣ�
                    if(cur.tagName.toLowerCase()===tagName.toLowerCase()){
                        ary.push(cur);
                    }
                }
            }
        }
        return ary;
    }
    function prev(curEle){
        if(flg){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while(pre && pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    }
    function next(curEle){
        if(flg){
            return curEle.nextElementSibling;
        }
        var nex=curEle.nextSibling;
        while(nex && nex.nodeType!==1){
            nex=nex.nextSibling;
        }
        return nex;
    }
    function sibling(curEle){
        var ary=[];
        var prev=this.prev(curEle);
        var next=this.next(curEle);
        if(prev) ary.push(prev);
        if(next) ary.push(next);
        return ary;
    }
    function prevAll(curEle){
        var ary=[];
        var pre=this.prev(curEle);
        while(pre){
            ary.push(pre);
            pre=this.prev(pre);
        }
        return ary;
    }
    function nextAll(curEle){
        var ary=[];
        var next=this.next(curEle);
        while(next){
            ary.push(next);
            next=this.next(next);
        }
        return ary;
    }
    function siblings(curEle){
        var prevAll=this.prevAll(curEle);
        var nextAll=this.nextAll(curEle);
        return prevAll.concat(nextAll);
    }
    function index(curEle){
        return this.prevAll(curEle).length;
    }
    function firstChild(curEle){
        var aChild=this.getChildren(curEle);
        return aChild[0];
    }
    function lastChild(curEle){
        var aChild=this.getChildren(curEle);
        return aChild[aChild.length-1];
    }
    function appendChild(curEle,parent){
        parent.appendChild(curEle);
    }
    function prependChild(curEle,parent){
        var first=this.firstChild(parent);
        //���firstΪ�棬˵���е�һ����Ԫ��
        if(first){
            parent.insertBefore(curEle,first);
        }else{
            //˵����������û��Ԫ��
            parent.appendChild(curEle);
        }
    }
    function insertBefore(curEle,oldEle){
        oldEle.parentNode.insertBefore(curEle,oldEle);
    }
    function insertAfter(curEle,oldEle){
        //ԭ���ѵ�ǰԪ�ز��뵽��Ԫ�صĵܵ�Ԫ�ص�ǰ��
        var next=this.next(oldEle);
        if(next){
            //����Ԫ���еܵ�Ԫ�ص�ʱ�򣬰���Ԫ�ز��뵽�ܵ�Ԫ�ص�ǰ�棻
            oldEle.parentNode.insertBefore(curEle,next);
        }else{
            //����Ԫ��û�еܵ�Ԫ�ص�ʱ�򣬰���Ԫ�ز��뵽������ĩβ��
            oldEle.parentNode.appendChild(curEle)
        }
    }
    return {
        //makeArray:������ת����
        makeArray:makeArray,
        //jsonParse:��JSON��ʽ�ַ���ת��JSON��ʽ�����ݣ������ʽ��
        jsonParse:jsonParse,
        //rnd:��ȡһ����Χ���������
        rnd:rnd,
        //win�����������ģ�ͼ��ݴ�����ȡ������
        win:win,
        //offset:��ȡԪ�ص�ƫ������
        offset:offset,
        //getByClass:�޶���Χ��ͨ��class����ȡԪ��
        getByClass:getByClass,
        //hasClass:�ж�Ԫ�������Ƿ���ĳ��class��
        hasClass:hasClass,
        //addClass:��Ԫ���������ĳ��class��
        addClass:addClass,
        //removeClass:Ԫ�����������ĳ��class�����滻Ϊ�ո�
        removeClass:removeClass,
        //getCss:��ȡԪ�ص�ĳ����ʽ��
        getCss:getCss,
        //setCss:��Ԫ�ص�ĳ�����������һ������ֵ
        setCss:setCss,
        //setGroupCss:��Ԫ������һ����ʽ
        setGroupCss:setGroupCss,
        //css:����ȡ������һ��������һ��Ϊһ�壻
        css:css,
        //getChildren:��ȡ��ǰԪ�������е���Ԫ�أ����ҿ����й��˵Ĺ���
        getChildren:getChildren,
        //prev: ��ȡ��ǰԪ�ص���һ�����Ԫ��
        prev:prev,
        //next:��ȡ��ǰԪ�ص���һ���ܵ�Ԫ��
        next:next,
        //siblings:��ȡ��ǰԪ�ص�����Ԫ��
        sibling:sibling,
        //prevAll:��ȡ��ǰԪ�����еĸ��Ԫ��
        prevAll:prevAll,
        //nextAll:��ȡ��ǰԪ�����еĵܵ�Ԫ��
        nextAll:nextAll,
        //siblings:��ȡ��ǰԪ�����е��ֵ�Ԫ��
        siblings:siblings,
        //index:��ȡ��ǰԪ�ص�����:�м�����磬�������Ǽ���
        index:index,
        //firstChild:��ǰ�����£���һ����Ԫ�أ�
        firstChild:firstChild,
        //lastChild:��ǰ�����£����һ����Ԫ��
        lastChild:lastChild,
        //appendChild:�ѵ�ǰԪ�ز��뵽��������ĩβ
        appendChild:appendChild,
        //prependChild:���뵽�������ʼ��
        prependChild:prependChild,
        //insertBefore:�ѵ�ǰԪ�ز��뵽ָ��Ԫ�ص�ǰ�棻
        insertBefore:insertBefore,
        //insertAfter:�ѵ�ǰԪ�ز��뵽ָ��Ԫ�صĺ���
        insertAfter:insertAfter
    }
})();
