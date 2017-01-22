       //Node类型
//nodeType属性：用于表明节点类型
	if(someNode.nodeType==1){           //适用于所有浏览器
		alert(Node is an element);   
	}

//nodeName 和 nodeValue 属性：对应标签名字，属性值
//每个节点都有一个ChildNodes属性，保存着NodeList对象(动态，有生命)
	function convertToArray(nodes){
		var array=null;
		try{
			array=Array.prototype.slice.call(nodes,0);//针对非IE浏览器
		} catch(ex){
			array=new Array();
			for(var i=0,len=nodes.length;i<len;i++){
				array.push(nodes[i]);
			}
		}
		return array;
	}

//parentNode属性：指向父节点
//previousSibling 和 nextSibling 分别访问前一个和后一个节点
//firshChild ,,lastChild
//hasChildNodes()，，节点包含一个或者多个子节点的时候返回true
//ownerDocument  指向表示整个文档的文档节点
//appendChild(),,在最后加入子节点，如果已经存在于文档中则移动位置
//insertBefore(),接收两个参数要插入的节点和参照节点
//replaceChild(),接收两个参数要插入的节点和要替换的节点
//removeChild(),接收一个参数，要移除的节点
//cloneNode(),用于创建调用这个方法的节点的一个完全相同的副本，接收一个布尔值，true表示深复制，false表示浅复制
//normalize(),删除空文本节点，合并相邻文本节点


     //Document类型
//documentElement属性：指向html元素
	document.documentElement
//body，title，URL，domain，referrer属性:作为HTMLDocument实例才有
	document.body
	document.title
	document.URL      //页面URL
	document.domain  //域名
	document.referrer  //来源页面的URL
//doctype属性:指向文档类型
	document.doctype

//getElementById()  
//getElementsByTagName()   //返回HTMLCollection对象，可以用方括号或者item()访问每一项
//HTMLCollection对象还有一个namedItem()，通过名字访问项
	<img src="myimage.gif" name="myimage">
	var myimage=images.namedIitem("myimage");
	var myimage=images["myimage"];
//getElementsByName();   作为HTMLDocument类型才有
//特殊集合
	document.anchors   //文档中带有name特性的<a>集合才有
	document.forms     //所有<form>
	document.images    //所有<img>
	document.links     //所有才有href特性的<a>元素

//document.implementation.hasFeature()  检测功能，输入参数为名称
	//文档写入
	document.write();
	document.writeln();
	document.open();
	document.cloes();


//Element类型   nodeName属性=tagName属性
//id,title,lang,dir,className属性
//getAttribute(),setAttribute(),removeAttribute()

//attributes属性---包含一个NamedNodeMap集合
	getNamedItem(name):返回nodeName属性等于name的节点
	removeNamedItem(name):移除name节点
	setNamedItem(name):添加name节点
	item(pos):返回pos位置节点
//createElement()  创建元素

     //Text类型
     appendData(text):将text添加到节点末尾
     deleteData(offset,count):从offset指定位置开始删除count个字符
     insertData(offset,text):在offset指定位置插入text
     replaceData(offset,count,text):用text替换指定位置开始到offset+count为止的文本
     splitText(offset):从offset指定位置将当前文本节点分成两个文本
     substringData(offset,count):提取offset指定位置开始到offset+count为止的字符串
//文本都有一个length属性保存着节点中字符的数目
//createTextNode()创建文本节点，传入节点内容


     //Comment类型     
     //CDATASection类型     
     //DocumentType类型     
     //DocumentFragment类型     
     //Attr类型:有三个属性：name, value,specified--表示是指定的还是默认的
    var attr=document.createAttribute("align");
    attr.value="left";
    element.setAttributeNode(attr);  //把新创建的特性添加到元素中
    alert(element.attributes["align"].value);    //left
    alert(element.getAttributeNode("align").value);   //left
    alert(element.getAttribute("align"));    //left

    //动态脚本
    //方法1：
    function loadScript(url){
    	var script=document.createElement("script");
    	script.type="text/javascript";
    	script.src=url;
    	document.body.appendChild(script);
    }


    //方法2：
    function loadScriptString(code){
    	var script=document.createElement("script");
    	script.type="text/javascript";
    	try{
    		script.appendChild(document.createTextNode(code));
    	}catch(ex){
    		script.text=code;
    	}
    	document.body.appendChild(script);
    }


    //动态样式
    //方法1：
    function loadStyle(url){
    	var link=document.createElement("link");
    	link.rel="stylesheet";
    	link.type="text/css";
    	link.href=url;
    	var head=document.getElementsByTagName("head")[0];
    	head.appendChild(link);
    }

    //方法2：
    function loadStyleString(css){
    	var style=document.createElement("style");
    	style.type="text/css";
    	try{
    		style.appendChild(document.createTextNode(css));
    	}catch(ex){
    		style.stylesheet.cssText=css;
    	}
    	var head=document.getElementsByTagName("head")[0];
    	head.appendChild(style);
    }










	