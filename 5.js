      //选择符API
//querySelector()--接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有则返回null
var body=document.querySelector("body");
var myDiv=document.querySelector("#myDiv");  //取得ID为myDiv的元素
var selected=document.querySelector(".selected"); //取得类为selected的第一个元素

//querySelectorAll()--接收css选择符，返回所有匹配的元素，返回的也是一个NodeList实例
var ems=document.getElementById("myDiv").querySelectorAll("em");//取得myDiv中所有的<em>元素
var selecteds=document.querySelectorAll(".selected");//取得类为".selected"的所有元素
var strongs=document.querySelectorAll("p strong");//取得所有<p>元素中的所有<strong>
//返回的NodeList对象可以使用item(),或者方括号

//matchesSelector()--接收css选择符，如果调用元素与该选择符匹配，返回true，否则false
if(document.body.matchesSelector("body.page1")){
	//true
}

function matchesSelector(element,selector){
	if(element.matchesSelector){
		return element.matchesSelector(selector);
	}else if(element.msMatchesSelector){
		return element.msMatchesSelector(selector);
	}else if(element.mozMatchesSelector){
		return element.mozMatchesSelector(selector);
	}else if(element.webkitMatchesSelector){
		return element.webkitMatchesSelector(selector);
	}else {
		throw new Error("Not supported.");
	}
}


      //元素遍历
childElementCount:返回子元素的个数，不包括文本和注释
firstElementChild:指向第一个子元素;firstChild的元素版
lastElementChild:指向最后一个子元素;lastChild的元素版
previousElementSibling:指向前一个同辈元素
nextElementSibling:指向后一个同辈元素


//getElementsByClassName()--接收包含一个或多个类名的字符串，返回带有指定类的所有元素的NodeList，传入类名的先后顺序不重要
var allCurrentUsernames=document.getElementsByClassName("username curren");//取得所有类中包含"username"和"current"的元素
//classList属性：用于添加、删除、和替换类名,,除非是要完全重写class属性才会使用className属性，其他情况都可以使用classList0
// add(value):将给定的字符串值添加到列表中，如果已经存在就不添加
// contains(value):表示列表中是否存在给定值，存在返回true，否则false
// remove(value):从列表中删除给定值
// toggle(value):=如果列表中存在给定值就删除，不存在就添加，起反转作用
div.classList.remove("user");
div.classList.add("current");
div.classList.toggle("user");


    //焦点管理
//document.activeElement属性：这个属性始终会引用DOM中当前获得焦点的元素,文档刚加载完成的时候会保存document.body的引用
//可以使用focus()方法获得焦点
var button=document.getElementById("myButton");
button.focus();
alert(document.activeElement==button);  //true

//document.hasFocus()--这个方法用于确定文档是否获得了焦点
var button=document.getElementById("myButton");
button.focus();
alert(document.hasFocus());  //true

//readyState属性：有两个可能值： loading--正在加载文档，，，complete--已经加载完文档
if(document.readyState=="complete"){
	//执行操作
}


//IE为document添加了一个名为compatMode的属性，检测浏览器兼容模式
document.compatMode=CSS1Compat   //标准模式
document.compatMode=BackCompat   //混杂模式


//head属性：只有chrome和safari实现
document.head


//字符串属性：charset属性表示文档中实际使用的字符集，另一个属性是defaultCharset属性，表示默认的字符集
document.charset

    //自定义数据属性
//一般自定义的属性前面要加data-前缀，dataset属性的值是DOMStringMap的一个实例，也就是一个名值对儿的映射，在这个映射中，每个data-name形式的属性都会有一个对应的属性，只不过属性名没有data-前缀(例如：自定义属性是data-myname，那映射中对应的属性就是myname)
var div=document.getElementById("myDiv");
//取得自定义的值
var appId=div.dataset.appId;    
var myname=div.dataset.myname;   


//innerHTML属性：返回与调用元素的所有子节点对应的HTML标记
//outerHTML属性：返回调用它的元素及所有子节点的HTML标签
//insertAdjacentHTML()--接收两个参数，插入位置和要插入的HTML
//beforebegin:在当前元素之前插入一个紧邻的同辈元素
//afterbegin:在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素
//beforeend:在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入一个新的子元素
//afterend: 在当前元素之后插入一个紧邻的同辈元素
element.insertAdjacentHTML("beforebegin","<p>Hello World</p>");


//scrollIntoView()--可以在所有元素上调用，通过滚动窗口或者某个容器使调用元素出现在视口中
//children 属性：只包含元素
//contains() --IE率先引入调用方法的是祖先节点，传入的参数是要检测的后代节点，如果被检测的节点是后代返回true
alert(document.documentElement.contains(document.body));  //true

//compareDocumentPosition()--这个方法用于确定两个节点的关系，返回一个表示该关系的位掩码

       //通用的contain函数
	function contains(refNode,otherNode){
		if(typeof refNode.contains=="function"&&(!client.engine.webkit||client.engine.webkit>=522)){
			return refNode.contains(otherNode);
		}else if(typeof refNode.compareDocumentPosition=="function"){
			return !!(refNode.compareDocumentPosition(otherNode) & 16);
		}else{
			var node=otherNode.parentNode;
			do{
				if(node==refNode){
					return true;
				}else{
					node=node.parentNode;
				}
			}while (node!=null)
			return false;
		}
	}


//innerText属性：操作元素中包含的所有文本内容   Firefox支持的是textContent
    //通用函数
    function getInnerText(element){
    	return (typeof element.textContent=="string")?
    		element.textContent:element.innerText;
    }

    function setInnerText(element,text){
    	if(typeof element.textContent=="string"){
    		element.textContent==text;
    	}else{
    		element.innerText=text;
    	}
    }

//outerText属性：不只是替换调用它的元素的子节点，而是会替换整个元素



   //滚动
// scrollIntoViewIfNeeded(alignCenter):只在当前元素在视口不可见的情况下，才滚动窗口或者容器，如果传入参数true，则表示尽量将元素显示在视口中部
// scrollByLines(lineCount):将元素的内容滚动指定的行高，lineCount可以是正或负数
// scrollByLines(pageCount):将元素的内容滚动指定的页面高度
// scrollIntoView() 和 scrollIntoViewIfNeeded()的作用对象是元素的容器，，scrollByLines() 和 scrollByLines()影响的则是元素自身