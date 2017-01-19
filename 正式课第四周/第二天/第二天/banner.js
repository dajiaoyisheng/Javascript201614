/**
 * Created by 39753 on 2016/12/28.
 */
(function(){
    //获取元素
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var n=0;//决定让第几张图片显示
    var timer=null;
    //给boxInner中再追加一张跟第一张图片一模一样的，同时，需要改变boxInner的宽度
    oBoxInner.innerHTML+='<div><img src="img/banner1.jpg" alt=""></div>';
    oBoxInner.style.width=aDiv[0].offsetWidth*aDiv.length+'px';
    //1.让图片自动轮播
    clearInterval(timer);
    timer=setInterval(autoMove,2000);
    function autoMove(){
        if(n>=aDiv.length-1){
            n=0;
            //瞬间拉回为0
            utils.css(oBoxInner,{left:-n*1000})
        }
        n++;
        //一千一千的改变oBoxInner的left值；
       // utils.css(oBoxInner,{left:-n*1000})
        animate({
            id:oBoxInner,
            target:{
                left:-n*1000
            }
        })

    }
    //2.让焦点自动轮播

    //3.鼠标已导入停止自动播放；
    //4.点击焦点切换页面
    //5.点击左右按钮切换页面
})();