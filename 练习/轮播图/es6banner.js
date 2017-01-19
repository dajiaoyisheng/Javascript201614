/**
 * Created by Administrator on 2017/1/7.
 */
class Banner{
    constructor (opt){
    if(!opt.el) return;
        //如果没传就按默认的来
        this.config={
            url:'data1.txt',
            interval:2000
        }
        Object.assign(this.config,opt);
        //简写
        this.url=this.config.url;
        this.interval=this.config.interval;
        this.el=this.config.el;
        //获取元素
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
        //n决定让第几张图片显示
        this.n=0;
        this.init();
}
    init(){
        //获取数据
        this.getData();
        //绑定数据
        this.blind();
        //延迟加载
        this.lazyImg();
        //定时器及图片自动轮播
        clearInterval(this.timer);
        this.timer=setInterval(()=>{
            this.autoMove();
        },this.interval);
        //移入停止移出继续
        this.overout();
        //点击焦点，进行切换
        this.handleChange();
        //点击左右按钮，进行切换
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
    blind(){
        let strDiv='';
        let strLi='';
        for (let i = 0; i < this.data.length; i++) {
            strDiv+=`<div><img src="" realImg="${this.data[i].imgSrc}" alt=""></div>`;
            //{"imgSrc":"img/banner1.jpg"} img/banner2.jpg  ${this.data[i].imgSrc}
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        this.$boxInner.html(strDiv).next().html(strLi);
        this.$aDiv=this.$boxInner.find('div');
        this.$aImg=this.$boxInner.find('img');
        this.$aLi=this.$ul.children('li');
    }
    lazyImg(){
        for (let i = 0; i < this.$aImg.length; i++) {
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
            },this.interval);
            this.$left.hide().next().hide();
        })
    }
    handleChange(){
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
};