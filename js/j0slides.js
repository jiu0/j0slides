/*****
j0slides.js-20160310gz
Author: https://github.com/jiu0
*/








/* j0slides 函数运用 */
j0slides();


/* j0slides 函数机制 -0.05*/
function j0slides(){



/*1、基础函数*/

//索引值 纠偏
function j0idx(i,n) {
	i=parseFloat(i);
	if(i<0){i=n-1;}if(n<=i){i=0;}//纠偏  索引值 循环式
	return i;
}/*0.5*/

//索引值 加1
function j0addidx(i,n) {
	i=j0idx(i,n);
	i=i+1;
	return i;
}/*0.5*/

//索引值 减1
function j0cutidx(i,n) {
	i=j0idx(i,n);
	i=i-1;
	return i;
}/*0.5*/


//两组对象 同索引一对一 响应
function j0slide(os,ps,i,n){
	i=j0idx(i,n);
	
	var o=os.eq(i),ots=os.not(o);
	var p=ps.eq(i),pts=ps.not(p);
	
	o.addClass('now');
	ots.removeClass('now');
	
	p.fadeIn().addClass('curr');
	pts.css({'display':'none'}).removeClass('curr');
	
	return i;
}/*0.5*/

function j0slideprev(os,ps,i,n){
	i=j0cutidx(i,n);	
	j0slide(os,ps,i,n);
	return i;
}/*0.5*/

function j0slidenext(os,ps,i,n){
	i=j0addidx(i,n);	
	j0slide(os,ps,i,n);
	return i;
}/*0.5*/



/*2、思路逻辑 */

$(function(){

/** 全局函数定义1 **/
var jbox=$('.j0box');//范围

//var jas=jbox.find('.j0a');//激发组(翻页)

var jbs=jbox.find('.j0b');//响应组(换图)
var jnum=jbs.length;//响应组成员数量

var jprev=jbox.find('.j0prev');//上箭头
var jnext=jbox.find('.j0next');//下箭头

var jonff=jbox.find('.j0onff');//开关(暂停或继续)



var jidx= 0 //当前索引值 初始值

var jitv;//自动轮换ID //setInterval return

var jing=false;//正在自动轮换中
var jautostart=true;//初始自动轮换吗





//// 通过js生成激发组 1
var j0as=[];j0as.push('<p class="j0as">');
jbs.each(function(i,el){
j0as.push('<b class="j0a">'+(i+1)+'</b>');
});j0as.push('</p>');j0as=j0as.join("\n");
jbox.append(j0as);var jas=jbox.find('.j0a');//激发组(翻页)




////初始显示1
jidx=j0slide(jas,jbs,jidx,jnum);





////轮换初始1
var j0slide0=function(){
jidx=j0slidenext(jas,jbs,jidx,jnum);
};
if(jautostart){
jitv = window.setInterval(j0slide0,2000);jing=true;
}



////页码功能1

//鼠标点击某页码时2
jas.each(function(j,el) {
$(el).click(function(){
window.clearInterval(jitv);jing=false;
jidx=j0slide(jas,jbs,j,jnum);
});
});











////自动轮换的控制

//开关初始化2
if(jing){jonff.addClass('j0ing');}else{jonff.removeClass('j0ing');}
jvo=false;jvf=false;

//开关 暂停或继续 2
jonff.click(function(){
if(jing){
window.clearInterval(jitv);jing=false;jonff.removeClass('j0ing');jvf=true;
}else{
jitv = window.setInterval(j0slide0,2000);
jing=true;jonff.addClass('j0ing');jvo=true;
}
});


//鼠标悬停 暂停或继续 2,  仅PC端适应
jbox.mouseover(function(){
if(jing&&!jvo){//可以停吗,如果不是通过开关而继续的，就可以停
window.clearInterval(jitv);jing=false;jonff.removeClass('j0ing');jvf=false;
}
}).mouseout(function(){
if(!jing&&!jvf){//可以起吗,如果不是通过开关而停的，就可以起
jitv = window.setInterval(j0slide0,2000);
jing=true;jonff.addClass('j0ing');jvo=false;
}
});


////上下项箭头功能1
var j0seeprev=function(ev){
ev.preventDefault();
window.clearInterval(jitv);jing=false;jonff.removeClass('j0ing');
jidx=j0slideprev(jas,jbs,jidx,jnum);
};
var j0seenext=function(ev){
ev.preventDefault();
window.clearInterval(jitv);jing=false;jonff.removeClass('j0ing');
jidx=j0slidenext(jas,jbs,jidx,jnum);
};

//上箭头2
jprev.click(j0seeprev);
//下箭头2
jnext.click(j0seenext);

//如需捕捉手势, 需 第三方手势库 的支持,如 Hammer.js 此处仅仅适应
var jhamdom=window.document.getElementById('j0demo2')
if(jhamdom){
var jham1= new Hammer(jhamdom);
jham1.on('swiperight',j0seeprev);//手往右边滑动,想看左边的内容 == 上箭头2
jham1.on('swipeleft',j0seenext);//手往左边滑动,想看右边的内容 == 下箭头2
}

});//0


}//-0.05



/*****  jiu0-20160330gz *****/
