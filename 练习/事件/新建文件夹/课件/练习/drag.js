/**
 * Created by Administrator on 2017/1/9.
 */
(function(){
    var oDiv=document.getElementsByTagName('div')[0];
    on(oDiv,'mousedown',down);
    function down(e){
        e=e||window.event;
        this.x=e.clientX-this.offsetLeft;
        this.y=e.clientY-this.offsetTop;
        if(this.setCapture){
            this.setCapture();
            //this.onmousemove=move;
            //this.onmouseup=up;
            on(this,'mousedown',move);
            on(this,'mousedown',up);
        }else{
            var _this=this;
            //document.onmousemove=function(){
            //    move.call(_this)
            //};
            on(document,'mousedown',function(){
                    move.call(_this)
                });
            //document.onmouseup=function(){
            //    up.call(_this)
            //}
            on(document,'mousedown',function(){
                up.call(_this)
            });
            e.preventDefault();
        }
    }
    function move(e){
        this.style.left=e.clientX-this.x+'px';
        this.style.top=e.clientY-this.y+'px';
    }
    function up(){
        if(this.releaseCapture){
            this.releaseCapture();
            off(this,'onmousemove',move)
            //this.onmousemove=null;
            off(this,'onmousemove',up)
            //this.onmouseup=null;
        }else{
            var _this=this;
            off(document,'mousemove',function(){
                move.call(_this)
            });
            off(document,'mousemove',function(){
                up.call(_this)
            });
            //document.onmousemove=null;
            //document.onmouseup=null;
        }
    }
})();
