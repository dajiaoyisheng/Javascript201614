/**
 * Created by 39753 on 2017/1/8.
 */
~function(){
    var oDiv=document.getElementById('div');
    on(oDiv,'mousedown',down);
    //改变函数的中的this指向：存在两个不确定的元素：函数不确定，this指向也不确定
    function processThis(fn,context){
        return function (e){
            fn.call(context,e)
        }
    }
    function down(e){
        this.x=e.clientX;
        this.y=e.clientY;
        this.l=this.offsetLeft;
        this.t=this.offsetTop;
        if(this.setCapture){
            this.setCapture();
            on(this,'mousemove',move);
            on(this,'mouseup',up);
        }else{//标准
            this.MOVE=processThis(move,this);
            this.UP=processThis(up,this);
            on(document,'mousemove',this.MOVE);
            on(document,'mouseup',this.UP);
            e.preventDefault();//阻止默认事件，防止其他元素被选中
        }
        clearTimeout(this.flyTimer)
    }
    function move(e){
        this.style.left=e.clientX-this.x+this.l+'px';
        this.style.top=e.clientY-this.y+this.t+'px';
        if(!this.preSpeed){
            this.preSpeed=e.clientX;
        }else{
            //就用当前坐标-上一次的坐标，求出距离，把距离作为速度；
            this.speedX=this.e.clientX-this.preSpeed;
            this.preSpeed=e.clientX;
        }
    }
    function up(){
        if(this.releaseCapture){
            this.releaseCapture();
            off(this,'mousemove',move);
            off(this,'mouseup',up);
        }else{
            off(document,'mousemove',this.MOVE);
            off(document,'mouseup',this.UP);
        }
        fly.call(this)
    }
    function fly(){
        clearTimeout(this.flyTimer);
        this.speedX*=.93;
        var l=this.offsetLeft+this.speedX;
        var maxL=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
        if(l>=maxL){
            l=maxL;
            this.speedX*=-1;
        }else if(l<=0){
            l=0;
            this.speedX*=-1;
        }
        this.style.left=l+'px';
        if(Math.abs(this.speedX)>=0.5){
            this.flyTimer=setTimeout(processThis(fly,this),10);
        }
    }
}();