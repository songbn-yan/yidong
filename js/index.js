//banner部分双下标轮播
$(function(){
	var box=$(".banner-middle")[0]
	var img=$(".banner-img")
	var lis=$(".yd-1")
	var left=$(".middle-left")[0]
	var right=$(".middle-right")[0]
	var width=parseInt(getStyle(box,'width'));
	var now=0;    //当前图片
	var next=0;    //下一张
	var flag=true;    //开关
	var t=setInterval(move,2000);  //时间函数(函数指针,指定时间)
	function move(){	
		next++;  //next=now+1
		if(next>=img.length){
			next=0;
		}
		img[next].style.left=width+"px";
		animate(img[now],{left:-width},600);
		animate(img[next],{left:0},600,function(){
			flag=true;
		});
		lis[now].style.background="#c0c3c5";//先是原来原点的颜色
		lis[next].style.background="#d91981";//图片播放时出现相对应的原点并变色
		now=next;
	}
	//鼠标移入盒子时图片暂停，移出时继续播放。
	box.onmouseover=function(){
		clearInterval(t);
	}
	box.onmouseout=function(){
		t=setInterval(move,2000);
	}
	//给每个圆点加点击效果
	//点击圆点和前一个或后一个圆点比较，图片向左或向右移动
	for(i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			if (flag) {
				flag=false;
				if(this.index>now){
					img[this.index].style.left=width+"px";
					animate(img[now],{left:-width},600);
					animate(img[this.index],{left:0},600,function(){
						flag=true;
					});
					lis[now].style.background="#c0c3c5";
					lis[this.index].style.background="#d91981";
				}else if(this.index<now){
					img[this.index].style.left=-width+"px"
					animate(img[now],{left:width},600);
					animate(img[this.index],{left:0},600,function(){
						flag=true;
					});
					lis[now].style.background="#c0c3c5";
					lis[this.index].style.background="#d91981";				
				}else if(this.index==now){
					return
				}
				now=this.index;
				next=this.index;
			};
		}
	}
	// 点击左图向右播放，点击右图像左播放
	right.onclick=function(){
		clearInterval(t);
		if (flag) {
			flag=false;
			move()
		};
	}
	left.onclick=function(){
		clearInterval(t);
		if (flag) {
			flag=false;
			next--;   //next=now-1
			if(next<0){
				next=img.length-1;
			}
			img[next].style.left=-width+'px';
			animate(img[now],{left:width},600);
			animate(img[next],{left:0},600,function(){
				flag=true;
			});
			lis[now].style.background="#c0c3c5";
			lis[next].style.background="#d91981";
			now=next;
		};	
	}



//节点轮播部分
	var lunbo=$("#lunbotu"); //最外面的大盒子
	var zuo=$(".lunbo-left")[0];
	var you=$(".lunbo-right")[0];
	var imgBox=$("#img-box");//获取图片的父元素
	var kg=true;
	var widths=parseInt(getStyle($(".img-lis")[0],"width"));//获取轮播的width   
	console.log(lunbo,zuo,you,imgBox)
	var ti=setInterval(movee,1500);//时间函数
	function movee(){
		if(!kg){
			return;
		}
		kg=false;
		animate(imgBox,{left:-widths},1000,function(){//图片盒子向左动
				var imgFirst=getFirst(imgBox);//获取第一张图片
				imgBox.appendChild(imgFirst);//第一张图片放在最后	

			imgBox.style.left="0px";//盒子瞬间拉回来
			kg=true;
		});
	}
	lunbo.onmouseover=function(){
		clearInterval(ti);
	}
	lunbo.onmouseout=function(){
		ti=setInterval(movee,1500);
	}
	zuo.onclick=function(){
		if(!kg){
			return;
		}
		kg=false;
		var Last=getLast(imgBox);//获取最后一张放在第一张的前面
		var First=getFirst(imgBox);
		insertBefore(Last,First);//最后一张放在第一张的前面
		imgBox.style.left=-widths+"px";//图片盒子瞬间拉回来
		animate(imgBox,{left:0},1000,function(){
			kg=true;
		});
	}
	you.onclick=function(){
		movee();
	}

	// 登录和手机营业厅下拉选项
	var Xlk=function(jj,ewm){

		 var mean=jj;
		 var ewm=ewm;
		 for (var i=0; i<mean.length;i++){
		 	mean[i].index=i;
		 	mean[i].onmouseover=function(){
		 		for(var i=0;i<ewm.length;i++){
		 			ewm[i].style.display="none";
		 		};
		 		ewm[this.index].style.display="block";
		 		this.style.background="#fff";
		 	}
		 	mean[i].onmouseout=function(){
		 		for(var i=0;i<ewm.length;i++){
		 			ewm[i].style.display="none";
		 		};
		 		this.style.background="#F6F6F6";
		 	}
		 
		}



	}

		 var mean=$(".mean");
		 var ewm=$(".Ewm");

		 Xlk(mean,ewm);

		 var mean=$(".dlsy");
		 var ewm=$(".DLsy");

		 Xlk(mean,ewm);






// 导航栏

 var anvSy=$(".wz");
	 var datails=$(".datails")
	 for (var i=0; i<anvSy.length;i++){
	 	anvSy[i].index=i;
	 	anvSy[i].onmouseover=function(){
	 		for(var i=0;i<datails.length;i++){
	 			datails[i].style.display="none";
	 		};
	 		datails[this.index].style.display="block";
	 		this.style.background="#f3f3f3";

	 	}
	 	anvSy[i].onmouseout=function(){
	 		for(var i=0;i<datails.length;i++){
	 			datails[i].style.display="none";
	 		};
	 		this.style.background="#e4e4e4";
	 	}
	 
	}


// 在线客服

	var zxzx=$(".zxzx")[0];
	var cjwt=$('.cjwt')[0];
	var tsjy=$(".tsjy")[0];
	hover(zxzx,function(){
		animate(zxzx,{right:30},400)
	},function(){
		animate(zxzx,{right:-26},400)
	})
	hover(cjwt,function(){
		animate(cjwt,{right:30},400)
	},function(){
		animate(cjwt,{right:-26},400)
	})
	hover(tsjy,function(){
		animate(tsjy,{right:30},400)
	},function(){
		animate(tsjy,{right:-26},400)
	})




})

// 4G专区-买手机-业务推荐图片的懒加载
var a=jQuery.noConflict();
a(document).ready(function(){
	a("img.lazy").lazyload({

	});
})