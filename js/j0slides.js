/*****
j0slides.js-20180101gz
Author: https://github.com/jiu0
*/








/* j0slides 函数运用 */
j0slides('.j0sbox');


/* j0slides 函数机制 -0.05*/
function j0slides(where){



/*1、基础函数*/

//索引值 纠偏
function j0idx(i,n) {
	i=parseFloat(i);
	if(i<0){i=n-1;}if(i>=n){i=0;}//纠偏  索引值 循环式
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
var j0boxes=$(where);//范围

j0boxes.each(function(j, el) {

var j0box=$(el);
//var j0as=j0box.find('.j0sa');//激发组(翻页)

var j0bs=j0box.find('.j0sb');//响应组(换图)
var j0num=j0bs.length;//响应组成员数量

var j0prev=j0box.find('.j0sprev');//上箭头
var j0next=j0box.find('.j0snext');//下箭头

var j0onff=j0box.find('.j0sonff');//开关(暂停或继续)



var j0idx= 0 //当前索引值 初始值

var j0itv;//自动轮换ID //setInterval return

var j0ing=false;//正在自动轮换中
var j0autostart=true;//初始自动轮换吗





//// 通过js生成激发组 1
var j0astr=[];j0astr.push('<p class="j0sas">');
j0bs.each(function(i,el){
j0astr.push('<b class="j0sa">'+(i+1)+'</b>');
});j0astr.push('</p>');j0astr=j0astr.join("\n");
j0box.append(j0astr);var j0as=j0box.find('.j0sa');//激发组(翻页)




////初始显示1
j0idx=j0slide(j0as,j0bs,j0idx,j0num);





////轮换初始1
var j0slide0=function(){
j0idx=j0slidenext(j0as,j0bs,j0idx,j0num);
};
if(j0autostart){
j0itv = window.setInterval(j0slide0,2000);j0ing=true;
}



////页码功能1

//鼠标点击某页码时2
j0as.each(function(j,el) {
$(el).click(function(){
window.clearInterval(j0itv);j0ing=false;
j0idx=j0slide(j0as,j0bs,j,j0num);
});
});


/* j0as.click(function(){
var j=j0as.index($(this));
window.clearInterval(j0itv);j0ing=false;
j0idx=j0slide(j0as,j0bs,j,j0num);
});
}); */








////自动轮换的控制

//开关初始化2
if(j0ing){j0onff.addClass('j0ing');}else{j0onff.removeClass('j0ing');}


j0on=false;//是否通过开关起的
j0ff=false;//是否通过开关停的

//开关 暂停或继续 2
j0onff.click(function(){
if(j0ing){
window.clearInterval(j0itv);j0ing=false;j0onff.removeClass('j0ing');j0ff=true;
}else{
j0itv = window.setInterval(j0slide0,2000);
j0ing=true;j0onff.addClass('j0ing');j0on=true;
}
});


//鼠标悬停 暂停或继续 2,  仅PC端适用
j0box.mouseover(function(){
if(j0ing&&!j0on){//可以停吗,如果不是通过开关而继续的，就可以停
window.clearInterval(j0itv);j0ing=false;j0onff.removeClass('j0ing');j0ff=false;
}
}).mouseout(function(){
if(!j0ing&&!j0ff){//可以起吗,如果不是通过开关而停的，就可以起
j0itv = window.setInterval(j0slide0,2000);
j0ing=true;j0onff.addClass('j0ing');j0on=false;
}
});


////上下项箭头功能1
var j0seeprev=function(ev){
ev.preventDefault();
window.clearInterval(j0itv);j0ing=false;j0onff.removeClass('j0ing');
j0idx=j0slideprev(j0as,j0bs,j0idx,j0num);
};
var j0seenext=function(ev){
ev.preventDefault();
window.clearInterval(j0itv);j0ing=false;j0onff.removeClass('j0ing');
j0idx=j0slidenext(j0as,j0bs,j0idx,j0num);
};

//上箭头2
j0prev.click(j0seeprev);
//下箭头2
j0next.click(j0seenext);

//如需捕捉手势, 需 第三方手势库 Hammer.js
var j0boxdom=j0box[0];
if(typeof Hammer !='undefined'){//是否已引入 Hammer.js
var j0boxham= new Hammer(j0boxdom);
j0boxham.on('swiperight',j0seeprev);//手往右边滑动,想看左边的内容 ~= 上箭头2
j0boxham.on('swipeleft',j0seenext);//手往左边滑动,想看右边的内容 ~= 下箭头2
}


});

});//0


}//-0.05



/*****  jiu0-20160330gz *****/
