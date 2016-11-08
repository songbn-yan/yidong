//1.获取类名的兼容性函数
//功能 要实现IE低版本里面适配getClass
//集合 类数组 数组形式访问和操作
//classname: 所要找的类名
//obj: 通过父元素来找这个类名
function getClass(classname,obj){  //(val,obj)
	var obj=obj||document;//"或"运算,获取默认值,参数初始化
	// IE里面
	// w3c规范里面 FF(火狐) chrome(谷歌)
	if(obj.getElementsByClassName){ //检测浏览器类型
		return obj.getElementsByClassName(classname);// FF(火狐),chrome(谷歌)
	}else{   //IE浏览器
		var arr=[];//新建数组
		var doms=obj.getElementsByTagName("*")//获得所有标签
		for(var i=0;i<doms.length;i++){  //遍历所有标签
			if(checkclass[i].className==classname){ //if语句引入判断类名函数
				arr.push(doms[i])  //将标签赋值给数组
			}
		}
		return arr; //返回数组内标签
	}
}


function checkClass(obj,classname){     //(obj,val)
	var classStr=obj;
	// 获取box one two 其中的一个
	var classArr=classStr.split(" ") //将标签多类名拆分成数组
	for(var i=0;i<classArr.length;i++){
		if(classname==classArr[i]){ //遍历数组元素与类名比较
			return true;     //返回为真
		}  

	}
	return false;  //返回为假
}




//2.获取内容兼容函数(获取)
// innerText textcontent兼容性，获取内容
function getText(obj){  //get获取
	if (obj.innerText) {
		return obj.innerText
	}else{
		return obj.textContent
	}
}
// 获取内容和设置内兼容函数(获取与设置) 
//obj:对象
//val: 要设置的内容(纯文字) 
function operateText(obj,val){  //operate操作
	if(val!=undefined){
		if (obj.innerText) {
		 obj.innerText=val;
	  }else{
		 obj.textContent=val;
	  }
	}else{
		if (obj.innerText) {
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}
}





//3. 获取对象的属性样式的兼容函数
// cureentStyle getcomputedstyle兼容性获取样式
//obj: 对象
//c: 属性
 function getStyle(obj,c){
 	if(obj.cureentStyle){
 		return parseInt(obj.cureentStyle[c])
 		      //[c]适用于对象的属性名中有引号出现
      		 //parseInt转换成数字,方便运算
 	}else{
 		return parseInt(getComputedStyle(obj,null)[c])
 	}
 }






//4.$("#one") $(".one") $("div") $获取元素的兼容函数
//val:表示选择器，与css的选择器一样
//obj: 父容器
function $(val,obj){
	if(typeof val=="string"){ //判断属性是属为字符型
		var obj=obj||document;
	//(/^\s|\s*$/g;" ")用来匹配字符串中前和后的空格
	val=val.replace(/^\s*|\s*$/g,"")
	if(val.charAt(0)=="#"){   //ID名
		return document.getElementById(val.slice(1));
	}else if(val.charAt(0)=="."){ // 类名
		return getClass(val.slice(1),obj) //截取
	// /^[a-zA-Z][a-zA-Z0-9]{0,10}$/用来判断符不符合标签
	// /^$表示从开头到结尾匹配,[]表示或,{}表示长度,test表示检测方法
	}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}$/.test(val)) { //标签名
		return obj.getElementsByTagName(val)
	}else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>$/.test(val)){
		return document.createElement(val.slice(1,-1))//创建元素
	}
}else if(typeof val=="function"){
	window.onload=function(){
		val();
	}
 }
}



//5.获取节点中的子节点
//obj表示父节点
//type "no" 子节点（只有元素节点）
//type "yes" 子节点（元素节点和非空的文本节点）
function getChilds(obj,type){
	var type=type||"no";    //初始化
	var kids=obj.childNodes;   //获取子节点的集合
	var arr=[];
	for(var i=0;i<kids.length;i++){ //当集合中的第i个小于集合长度时
		if(type=="no"){			
			if(kids[i].nodeType=="1"){ //第i个第节点类型是元素节点时
				arr.push(kids[i]);  //数组的末尾添加第i个
			}
		}else if(type=="yes"){  //元素节点||文本节点&&
			if(kids[i].nodeType=="1"||kids[i].nodeType=="3"&&kids[i].
				nodevalue.replace(/^\s*|\s*$/g,"")){//替换前后空格
				arr.push(kids[i]);
			}
		}
	}
	return arr;
}
//6.获取第一个子节点
function getFirst(obj,type){
	var type=type||"no";
	return getChilds(obj)[0];
}
//7.获取最后一个子节点
function getLast(obj,type){
	var type=type||"no";
	var Childs=getChilds(obj,type);
	return Childs[Childs.length-1];
}
//8.获取第n个子节点
function getNub(obj,n,type){
	var type=type||"no";
	var Childs=getChilds(obj,type);
	if(n>=Childs.length||n<1){
		return  false;
	}
	return Childs[n-1];
}
//9.获取下一个兄弟节点
function getNext(obj,type){
	var type=type||"no";
	var next=obj.nextSibling; //获取下一个
	if(next==null){//没有下一个兄弟节点
		return false;   //返回不执行
	}
	if(type=="no"){
		while(next.nodeType==3||next.nodeType==8){//文本节点和注释节点
			next=next.nextSibling; //当前的给下一个
			if(next==null){ //没有下一个兄弟节点
				return false;  //返回不执行
			}
		}
		return next;//返回
	}else if(type=="yes"){
		while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){//文本，并且不是空格，注释
			next=next.nextSibling; //当前的给下一个
			if(next==null){
				return false; 
			}
		}
		return next;//
	}
}
//10获取上一个兄弟节点
function getprevious(obj,type){
	var type=type||"no";
	var previous=obj.previousSibling; //获取下一个
	if(previous==null){//没有下一个兄弟节点
		return false;   //返回不执行
	}
	if(type=="no"){
		while(previous.nodeType==3||previous.nodeType==8){//文本节点和注释节点
			previous=previous.previousSibling; //当前的给下一个
			if(previous==null){
				return false; 
			}
		}
		return previous;//返回
	}else if(type=="yes"){
		while(previous.nodeType==3&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){//文本，并且不是空格，注释
			previous=previous.nextSibling; //当前的给下一个
			if(previous==null){
				return false; 
			}
		}
		return previous;//
	}
}

//11在某个元素前或后插入
function insertBefore(obj,beforeObj){ //插入到某个元素之前
	var parent=beforeObj.parentNode;
	parent.insertBefore(obj,beforeObj)
	
}
function inserAfter(obj,afterObj){  //插入到某个元素之后
	var parent=beforeObj.parentNode;
	var next=getNext(afterObj,"yes");
	if(!next){
		after.appendChild(obj);
	}else {
		parent.inserAfter(obj,next)
	}
}
//12.//IE和FF鼠标绑定事件兼容性函数
function addEvent(obj,event,fun) {
	if(obj.attachEvent){
		obj.attachEvent("on"+event,fun);
	}else if(obj.addEventListener){
		obj.addEventListener(event,fun,false)
	}
}
function removeEvent(obj,event,fun) {
	if(obj.removeEvent){
		obj.detachEvent("on"+event,fun);
	}else if(obj.removeEventListener){
		obj.removeEventListener(event,fun,false)
	}
}
//13.鼠标滚轮事件 谷歌和IE、火狐的兼容性
//谷歌和IE上滑动120下滑-120，火狐上滑动-3下滑动3。
function mouseWheel(obj,down,up){//(对象，)
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scroolFun)
	}else{
		obj.addEventListener("mousewheel",scrollFun,false);
		obj.addEventListener("DOMMouseScroll",scrollFun,false);
	}
	function scrollFun(e){
		var e=e||window.event;
		//去除浏览器的默认样式
		if(e.preventDefault){ //e.preventDefault是对象
			e.preventDefault();
		}else{
			e.returnValue=false;//e.returnValue是属性
		}
		var nub=e.wheelDelta||e.detail;
		if(nub==-120||nub==-3){
			//改变this指针，让this指向obj
			down.call(obj);
		}else if(nub==120||nub==3){
			up.call(obj);
		}
	}
}

//14.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }


  
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
 