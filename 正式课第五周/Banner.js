/**
 * Created by 39753 on 2017/1/3.
 */
class Banner{
    constructor(opt){
        this.el=opt.el;
        this.url=opt.url;
        this.interval=opt.interval;
        this.$box=$(this.el);
        this.$boxInner=this.$box.find('.boxInner');
        this.$aDiv=null;
        this.$aImg=null;
        this.$ul=this.$box.find('ul');
        this.$aLi=null;
        this.$left=this.$box.find('.left');
        this.$right=this.$box.find('.right');
        this.data=null;
        this.timer=null;
        this.n=0;
        this.init();
    }
    init(){
        this.getData();
        this.bind();
        this.lazyImg();
        clearInterval(this.timer);
        this.timer=setInterval(()=>{
            this.autoMove();
        },this.interval)
        this.overout();
        this.handleChange();
        this.leftRight();
    }
    getData(){
        $.ajax({
            type:'GET',
            url:this.url,
            dataType:'json',
            async:false,
            success:(val)=>{
                this.data=val;
            }
        })
    }
    bind(){
        let strDiv='';
        let strLi='';
        for(let i=0; i<this.data.length; i++){
            strDiv+=`<div><img src="" realImg="${this.data[i].imgSrc}" alt=""></div>`;
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        this.$boxInner.html(strDiv).next().html(strLi);
        this.$aDiv=this.$boxInner.find('div');
        this.$aImg=this.$boxInner.find('img');
        this.$aLi=this.$ul.children('li');
    }
    lazyImg(){
        for(let i=0; i<this.$aImg.length; i++){
            let cur=this.$aImg[i];
            let tmpImg=new Image();
            tmpImg.src=cur.getAttribute('realImg');
            tmpImg.onload=()=>{
                cur.src=tmpImg.src;
                tmpImg=null;
                this.$aDiv.first().fadeIn();
            }
        }
    }
    autoMove(){
        if(this.n>=this.$aDiv.length-1){
            this.n=-1;
        }
        this.n++;
        this.setBanner();
    }
    setBanner(){
        this.$aDiv.eq(this.n).fadeIn().siblings('div').fadeOut();
        this.bannerTip();
    }
    bannerTip(){
        this.$aLi.eq(this.n).addClass('on').siblings('li').removeClass('on')
    }
    overout(){
        this.$box.mouseover(()=>{
            clearInterval(this.timer);
            this.$left.show().next().show();
        }).mouseout(()=>{
            this.timer=setInterval(()=>{
                this.autoMove();
            },this.interval)
            this.$left.hide().next().hide();
        })
    }
    handleChange(){
        /*var _this=this;
        this.$aLi.click(function(){
            _this.n=$(this).index();
            _this.setBanner();
        })*/
        for(let i=0; i<this.$aLi.length; i++){
            this.$aLi.eq(i).click(()=>{
                this.n=i;
                this.setBanner();
            });
        }
    }
    leftRight(){
        this.$right.click(()=>{
            this.autoMove();
        }).prev().click(()=>{
            if(this.n<=0){
                this.n=this.$aDiv.length;
            }
            this.n--;
            this.setBanner();
        })
    }
}