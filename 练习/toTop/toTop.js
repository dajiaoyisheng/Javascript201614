/**
 * Created by Administrator on 2017/1/3.
 */
let $btn=$('#btn');
$btn.click(()=>{
    let target=$(window).scrollTop();
    let duration=1000;
    let interval=30;
    let step=target/duration*interval;
    $btn.hide();
    let timer=null;
    timer=setInterval(()=>{
        let cur=$(window).scrollTop();
        if(cur-step<0){
            $(window).scrollTop(0)
            timer=null;
        }
        cur-=step;
        $(window).scrollTop(cur);
    },interval)
})