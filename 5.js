    //一：Object类型

//new +构造函数创建实例
    var person=new Object();
	  person.name="aa";
	  alert(person.name);

//字面量定义对象
    var  a = {
	  	 name:"ss",
	  	 5:true,
	  	 "first name":"ff"
	  }

	  alert(a.name);//或者alert(a["name"]);
	  var p="name";
	  alert(a[p]);//通过定义变量来访问属性，必须用[]
	  alert(a["5"]);//必须用[]
	  alert(a["first name"]);//属性有空格必须用[]

//字面量定义对象
	var a={};  //与new Object()相同
	a.name="sss";
	alert(a.name);

//字面量是用于传递大量可选参数的首选方式
		function displayInfo(args){
		var output="";
		if(typeof args.name=="string"){
			output+="Name: "+args.name+"\n";
		}
		if(typeof args.age=="number"){
			output+="Age: "+args.age+"\n";
		}
		alert(output);
	}
	displayInfo({name:"ss",age:12});
	displayInfo({name:"aa"});

    //Array 类型
//定义方式
	var colors=new Array();//构造函数方式
	var colors=new Array(20);//确定length为20
	var colors=Array(20);//省略new结果一样
	var colors=new Array("red");//创建包含一个的数组
//字面量定义方式
	var colors=[];
	var colors=["red","green"];

//length属性:不是只读，可以用来设定数组长度（移除或者添加）
	var colors=["red","blue","green"];
	colors.length=2;//删除了green
	alert(colors[2]);  //undefined
//数组尾部添加新项
	colors[colors.length]="新项";
//检测数组
	var ss=new Array();
	if(ss instanceof Array) alert("yes");//存在2个全局环境不适用
	if(Array.isArray(ss)) alert("yes");
//数组转换方法
	var colors=["red","blue","green"];
	alert(colors.toString());//red,blue,green   返回由数组每个值组成的字符串
	alert(colors.valueOf());//red,blue,green	返回数组
	alert(colors);//red,blue,green  alert()要接收字符串参数，所以会在后台调用toString（）方法
	alert(typeof colors.toString());//string
	alert(typeof colors.valueOf());//object
//使用join() 传递参数（任意字符） 连接数组
	var colors=["red","green","blue"];
	alert(colors.join(","));
	alert(colors.join("|"));
//栈方法——后进先出：push()接收任意数量参数添加到数组末尾，返回数组长度
//pop() 从末尾移除最后一项，返回移除的项
	var colors=["red","blue","green"];
	a=colors.push("black");
	alert(a);
	alert(colors);
	b=colors.pop();
	alert(b);
	alert(colors);
//队列方法——先进先出：shift()移除数组的第一项，并返回
//unshift()在前端添加任意项，并返回长度
	var colors=["red","green","blue"];
	a=colors.shift();
	alert(a);
	alert(colors);
	b=colors.unshift("orange","black"); //black先加进去
	alert(b);
	alert(colors);
//排序 reverse()反转数组顺序
//sort()升序排列数组，会调用每个数组项的toString()转型方法，然后比较字符串
	var values=[1,2,3,4,5];
	values.reverse();
	alert(values);//5,4,3,2,1
	var ss=[0,1,5,10,15];
	ss.sort();
	alert(ss);//按照字符串排列0,1,10,15,5

//sort()可以接收一个比较函数作为参数，比较函数接收两个参数，如果第一个位于第二个前返回负数，反之正数，相等返回0
//比较函数通过返回值来判断顺序
	function compare(value1,value2){
		if(value1<value2){
			return -1;
		}
		if(value1>value2){
			return 1;
		}else{
			return 0;
		}
	}
	var ss=[0,1,5,10,15];
	ss.sort(compare);
	alert(ss);

//对于数值类型或者其他valueOf()方法返回的对象类型
	function compare(value1,value2){
		return value2-value1;
	}

//操作方法：concat()基于当前数组创建副本，然后将接收到的参数添加到副本末尾，构建新数组
	var colors=["red","green","black"];
	var ss=colors.concat("blue",["orange","pink"]);
	alert(ss);
	alert(colors);

//slice()一个参数返回该参数到末尾的所有项；两个参数，返回起始和结束位置之间的项(不包括结束位置)
//如果参数出现负数，则加上数组长度：数组长5，slice(-2,-1)----slice(3,4)
	var colors=["red","green","blue","yellow","purple"];
	var a=colors.slice(1);
	var b=colors.slice(1,4);
	alert(a);
	alert(b);

//splice(起始位置，要删除的项数，要插入的项) 返回删除的项
	var colors=["red","green","blue"];
	var remove=colors.splice(0,1);
	alert(colors);
	alert(remove);
	var remove=colors.splice(1,0,"yellow","orange");
	alert(colors);
	alert(remove);
	var remove=colors.splice(1,1,"red","purple");
	alert(colors);
	alert(remove);

//位置方法 indexOf(),lastIndexOf() 第一个参数要查找的项，第二个可选查找起点位置(根据两种类型起始和末尾开始计算位置)
//返回查找的项的数组中的位置，不存在返回-1，查找过程采用全等(===)
	var number=[1,2,3,4,5,4,3,2,1];
	alert(number.indexOf(4));
	alert(number.lastIndexOf(4));
	alert(number.indexOf(4,4));
	alert(number.lastIndexOf(4,4));
	var person={name:"Nicholas"};
	var people=[{name:"Nicholas"}];
	var morePeople=[person];
	alert(people.indexOf(person));//-1   必须严格相等,如果people=[{name:"Nicholas"},person];返回1
	alert(morePeople.indexOf(person));//0

//迭代方法：每个方法接受两个参数，要运行的函数和运行函数的作用域对象(可选)
//每个函数接收三个参数：数组的值，位置，数组对象本身
//every()数组每一项运行给定函数，如果都返回true，则返回true
//filter()数组每一项运行给定函数，返回true的项组成的数组
//forEach()数组每一项运行给定函数，没有返回值
//map()数组每一项运行给定函数，返回每一个函数调用结果组成的数组
//some()数组每一项运行给定函数，有任一返回true，则返回true
	var numbers=[1,2,3,4,5,4,3,2,1];
	var a=numbers.every(function(item,index,array){
		return (item>2);
	});
	alert(a);
	var b=numbers.some(function(item,index,array){
		return (item>2);
	});
	alert(b);
/////////////////
	var numbers=[1,2,3,4,5,4,3,2,1];
	var a=numbers.filter(function(item,index,array){
		return (item>2);
	});
	alert(a);
//////////
	var numbers=[1,2,3,4,5,4,3,2,1];
	var s=numbers.map(function(item,index,array){
		return item*3;
	});
	alert(s);
////////////
	var numbers=[1,2,3,4,5,4,3,2,1];
	numbers.forEach(function(item,index,array){
		//执行操作
	});

//归并方法 reduce(),reduceRight() 这个两个方法都会迭代数组的所有项，然后构建一个最终返回值
//reduce()从第一项开始    reduceRight()从最后一项开始
//这两个方法都接收两个参数：一个在每一项上调用的函数，一个作为归并基础值(可选)
//函数接收4个参数：前一个值，当前值，项的索引，数组对象
	var values=[1,2,3,4,5];
	var sum=values.reduce(function(prev,cur,index,array){
		return prev+cur
	});
	alert(sum);//15
 

	var ss=values.reduceRight(function(prev,cur,index,array){
		return prev+cur
	});
	alert(ss);//15

     //Date类型
//创建对象
	var s=new Date();
//方法Date.parse()接收一个表示日期的字符串参数，然后根据这个字符串返回毫秒数
// Date.UTC() 也是根据字符串返回毫秒数，参数为(年份，月份(0-11),天(1-31),小时(0-23),分钟，秒，毫秒),用法一样
	var someDate=new Date(Date.parse("May 25,2004"));
	var ss=new Date("May 25,2004");//直接这样也会在后台调用Date.parse()
	alert(Date.parse("May 25,2004"));
	alert(someDate);

//ECMAScript5中添加了Date.now(),返回调用这个方法的日期和时间的毫秒数
//日期格式化方法
	toString()
	toLocaleString()
	toDateString()
	toTimeString()
	toLocaleDateString()
	toLocaleTimeString()
	toUTCString()//推荐


     //RegExp类型
//字面量定义
	var expression=/pattern/flags;
//构造函数定义
	var pattern=new RegExp("pattern","i");//构造函数模式的参数是字符串，有些情况对字符需要双重转义
// g:全局模式，应用于所有字符串，并非发现第一个匹配项就停止
// i:不区分大小写
// m:到达文本末尾还会继续查找下一行
//元字符必须转义：( [ { \ ^ $ | ) ? * + . ] }
//匹配字符串中所有“at”的实例
	var pattern1=/at/g;
//匹配第一个"bat" 或"cat"，不区分大小写
	var pattern2=/[bc]at/i;
//匹配所有“.at”结尾的三个字符的组合，不区分大小写
	var pattern3=/.at/gi;

//字面量始终共享一个RegExp实例，而使用构造函数创建的每一个新的RegExp实例都是一个新实例
	var re=/cat/g,i;
	for(i=0;i<10;i++){
		re.test("catastrophe");//第一次调用找到cat，第二次从索引3开始找不到,由于会测试到字符串末尾，所以下一次在调用又从头开始
	}
	for(i=0;i<10;i++){
		re=new RegExp("cat","g");
		re.test("catastrophe");//每次都创建新的实例，都返回true
	}

//RegExp实例属性
//global：布尔值，表示是否设置了g
//ignoreCase：布尔值，表示是否设置了i
//lastIndex：表示开始下一次匹配项的字符位置，从0算起
//multiline布尔值，表示是否设置了m
//source：正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串返回
	var pattern1=/\[bc\]at/i;
	alert(pattern1.global);
	alert(pattern1.ignoreCase);
	alert(pattern1.multiline);
	alert(pattern1.lastIndex);
	alert(pattern1.source);


//RegExp实例方法 exec() 接收一个参数即要应用模式的字符串，然后返回包含第一个匹配项信息的数组，在没有匹配的时候返回null
//返回数组是Array实例，但是多了2个额外的属性index(表示匹配的字符串的位置)，input(表示应用正则表达式的字符串)
//数组第一项是与整个模式匹配的字符串，其他项与模式中的捕获组匹配的字符串(没有捕获组数组只包含一项)
	var text="mom and dad and baby";
	var pattern=/mom (and dad (and baby)?)?/gi;//捕获组()前面要空格
	var matches=pattern.exec(text);
	alert(matches.index);
	alert(matches.input);
	alert(matches[0]);
	alert(matches[1]);
	alert(matches[2]);

//对于exec方法，即使在模式中设置了g，它每次也是只会返回一个匹配项，没有设置g，同一个字符串多次调用exec()始终返回第一个匹配项
	var text="cat, bat, sat, fat";
	var pattern=/.at/;
	var matches=pattern.exec(text);
	alert(matches.index);           //0
	alert(matches[0]);              //cat
	alert(pattern.lastIndex);       //0

	matches=pattern.exec(text);
	alert(matches.index);           //0
	alert(matches[0]);              //cat
	alert(pattern.lastIndex);       //0


	var pattern1=/.at/g;
	var matches=pattern1.exec(text);
	alert(matches.index);          //0
	alert(matches[0]);             //cat
	alert(pattern1.lastIndex);     //3

	matches=pattern1.exec(text);   
	alert(matches.index);         //5 
	alert(matches[0]);            //bat
	alert(pattern1.lastIndex);    //8


//test() 接收一个字符串参数，在模式中与该参数匹配的情况下返回true，否则false
	var text="000-00-0000";
	var pattern=/\d{3}-\d{2}-\d{4}/;
	if(pattern.test(text)){
		alert("The pattern was matched");
	}

//RegExp继承的toString()和toLocaleString()都返回正则表达式的字面量，与创建的方式无关;;valueOf()方法返回正则表达式本身
	var pattern=new RegExp("\\[bc\\]at","gi");
	alert(pattern.toString());
	alert(pattern.toLocaleString());
	alert(pattern.valueOf());


//RegExp 构造函数属性 这些属性适用于作用域中所有正则表达式，并且基于所执行的最后一次操作变化
	var text="this has been a short summer";
	var pattern=/(.)hort/g;
	if(pattern.test(text)){
		alert(RegExp.input);          //this has been a short summer  最近一次要匹配的字符串   $_
		alert(RegExp.leftContext);    //this has been a     ;;input字符串中lastMatch之前的文本 $`
		alert(RegExp.rightContext);   //summer  ;; input字符串中lastMatch之后的文本            $'
		alert(RegExp.lastMatch);      //short  ;;最近一次的匹配项                              $&
		alert(RegExp.lastParen);      //s     ;;最近一次的捕获组                               $+
		alert(RegExp.multiline);      //false   ;;布尔值 ，表示是否所有的表达式都使用多行模式  $*
	}


////////
 	var text="this has been a short summer";
 	var pattern=/(..)or(.)/g;
 	if(pattern.test(text)){
 		alert(RegExp.$1);              //sh      第一个捕获组
 		alert(RegExp.$2);              //t       第二个捕获组
 	}


       //Funcrion 类型
//声明定义
	function sum(num1,num2){
		return num1+num2;
	}
//函数表达式定义
	var sum=function(num1,num2){
		return num1+num2;
	};                               //分号
//构造函数定义 （不推荐）
	var sum=new Function("num1","num2","return num1+num2");    //函数是对象，函数名是指针

//函数没有重载
	function add(num){
		return num+100;
	}
	function add(num){
		return num+200;
	}                          //函数名是指针，第二个会覆盖第一个

//函数声明会率先被解析器读取，并使其在执行任何代码之前可用
	alert(sum(10,10));
	function sum(num1,num2){
		return num1+num2;
	}                            //尽管函数定义是在调用后面

    alert(sum(10,10));
    var sum=function(num1,num2){
    	return num1+num2;
    }                            //在调用函数前没有定义sum()，所以出错


 //函数名本身就是一个变量，所以可以作为值传递给其他函数
 	function call(someFunction,someArgument){
 		return someFunction(someArgument);
 	}

 	function add10(num){
 		return num+10;
 	}

 	var result=call(add10,10);
 	alert(result);                   //20

//函数返回函数
	function create(name){
		return function(obj1,obj2){
			var value1=obj1[name];
			var value2=obj2[name];
			if(value1<value2){
				return -1;
			}
			if(value1>value2){
				return 1;
			}else{
				return 0;
			}
		};
	}
	var data=[{name:"Zachary",age:28},{name:"Nicholas",age:29}];
	data.sort(create("name"));
	alert(data[0].name);                 //Nicholas
	data.sort(create("age"));
	alert(data[0].name);                 //Zachary

//函数内部属性：函数的两个特殊对象：arguments(类数组对象) 和 this
//arguments 对象有一个callee属性，是一个指针，指向拥有这个arguments对象的函数
 	function fac(num){
 		if(num<=1){
 			return 1;
 		}else{
 			return num*arguments.callee(num-1);         //阶乘
 		}
 	}

//this 对象，可能在执行代码的过程中引用不同的对象
	window.color="red";
	var o={
		color:"blue"
	};
	function saycolor(){
		alert(this.color);
	}
	saycolor();             //red
	o.saycolor=saycolor;
	o.saycolor();          //blue


//ECMAScript5 规范化了另一个函数对象属性caller，这个属性保存着调用当前函数的函数的引用;;如果是在全局作用域中调用的函数，，它的值为null
	function outer(){
		inner();
	}

	function inner(){
		alert(inner.caller);
	}
	outer();          //显示outer源代码


//函数的属性和方法：length(表示函数接收的参数的个数) 和 prototype(保存实力方法的真正所在，，例如toString，valueOf都是保存在prototype中)
//prototype属性适不能枚举的，所以不用for-in发现
 	function sum(num1,num2){
 		return num1+num2;
 	}
 	alert(sum.length);           //2

//方法  apply()和call()   都是在特定的作用域中调用函数，就是设置函数的this；apply接收第一个参数是运行的作用域，第二个是参数数组，可以是一个Array实例，也可以是
//arguments对象     call()第一个参数还是作用域，第二个参数必须一个个参数列举出来
	function sum(num1,num2){
		return num1+num2;
	}
	function apply1(num1,num2){
		return sum.apply(this,arguments);
	}
	function apply2(num1,num2){
		return sum.apply(this,[num1,num2]);
	}
	function call(num1,num2){
		return sum.call(this,num1,num2);
	}
	alert(apply1(10,10));   //20
	alert(apply2(10,10));  //20
	alert(call(10,10));   //20

//apply() 和 call() 主要作用是扩充函数赖以运行的作用域
	window.color="red";
	var o={color:"blue"}
	function saycolor(){
		alert(this.color);
	}  
	saycolor.call(this);        //red
	saycolor.call(window);      //red
	saycolor.call(o);             //blue

//bind()   会创建一个函数实例，其this值会被绑定到传给bind()函数的值
	window.color="red";
	var o={color:"blue"}
	function saycolor(){
		alert(this.color);
	} 
	var obj=saycolor.bind(o);
	obj();                      //blue

//基本包装类型：每当读取一个基本类型值的时候，就会在后台创建一个基本包装类型的对象
	var s1="some text";
	var s2=s1.substring(2);//(1)创建一个String实例(2)在实例上调用指定的方法(3)销毁这个实例
	                       //(1)var s1=new String("some text");
	                       //(2)var s2=s1.substring(2);
	                       //(3)s1=null;
//引用类型与基本包装类型主要区别就是对象的生存期，前者在执行流在离开当前作用域之前都保存在内存中，，后者只存在于运行代码的一瞬间
	var s1="some text";
	s1.color="red";
	alert(s1.color);    //undefined

//对基本包装类型的实例调用typeof返回“object”，，所有基本包装类型的对象在转化为布尔值时都是true
//Object构造函数，会根据传入值的实例返回相应的基本包装类型实例
	var obj=new Object("some text");
	alert(obj instanceof String);  //true


//Boolean 类型
	var booleanObject=new Boolean(true);
//Boolean类型的实例重写了valueOf，返回基本类型值，，toString返回字符串

//Number类型
	var numberObject=new Number(10);
//toString()传递一个表示基数的参数，返回几进制数值的字符串
	var num=10;
	alert(num.toString());     //"10"
	alert(num.toString(2));    //"1010"
	alert(num.toString(8));    //"12"
	alert(num.toString(10));   //"10"
	alert(num.toString(16));    //"a"

//toFixed() 返回指定小数位数的字符串
	var num=10; 
	alert(num.toFixed(2));   //"10.00"

//toExponential()  返回指数表示,,接收参数表示几位小数
	var num=100000;
	alert(num.toExponential(1));
//toPrecision()       根据数值调用toFixed()或者toExponential()

//String 类型
	var stringObject=new String("some text");
//继承的valueOf() ,toString(), toLocaleString()都返回对象表示的基本字符串值
//每个String类型的实例都有一个length属性
//字符串方法：  charAt()---返回给定位置字符       charCodeAt()---返回给定位置字符编码
	var s1="hello world";
	alert(s1.charAt(1));           //e
	alert(s1.charCodeAt(1));       //101
//字符串方法：concat() 连接多个字符串，返回新字符串      不过更多使用的是+号直接连接方便
	var s1="hello";
	var s2="world";
	var s3=s1.concat(s2);
	alert(s3);                    //helloworld

//slice()  substr()  substring()  都会返回被操作字符串的子字符串，而且也能接收一两个参数，第一个参数是开始位置，第二个结束位置
//slice()和substring()不包括结束位置,,,substr()第二个参数是返回的字符个数，，，，如果没有给这些方法传递第二个参数则一直到末尾
	var s="hello world";
	alert(s.slice(3));             //lo world
	alert(s.substring(3));         //lo world
	alert(s.substr(3));            //lo world
	alert(s.slice(3,7));           //lo w
	alert(s.substring(3,7));        //lo w
	alert(s.substr(3,7));          //lo worl
//slice会将负值加上字符串长度，，substr第一个参数加上字符串长度，第二个为0，，，，substring全部负数变为0
//这些方法都会把小的参数值作为开始位置，大的作为结束位置

//字符串位置查找：indexOf() 和 lastIndexOf()  从一个字符串中搜索给定子字符串,返回子字符串的位置,,第二个可选参数表示从字符串的第几个位置开始搜索,不存在返回-1
	var s="hello world";
	alert(s.indexOf("o"));       //4
	alert(s.lastIndexOf("o"));   //7
	alert(s.indexOf("o"，6));       //4
	alert(s.lastIndexOf("o",6));   //7

//trim() 创建一个字符串副本，删除前置及后缀的所有空格
	var s="    hello world    ";
	var a=s.trim();
	alert(s);
	alert(a);

//字符串大小写转换:toLowerCase(),toLocaleLowerCase(),toUpperCase(),toLocaleUpperCase()
//toLowerCase()---小写,toUpperCase()--大写
//toLocaleLowerCase(),toLocaleUpperCase()方法是针对特定地区的实现
	var s="hello world";
	alert(s.toLowerCase());       //hello world
	alert(s.toUpperCase());       //HELLO WORLD
	alert(s.toLocaleUpperCase());  //HELLO WORLD
	alert(s.toLocaleLowerCase());   //hello world
//在不知道自己代码将在什么语言环境运行的情况下，还是使用针对地区的方法稳妥

//字符串的匹配模式：match(),在字符串调用这个方法本质与调用RegExp的exec()方法相同，match只接受一个参数，要么是正则表达式，要么是一个RegExp对象
	var text="cat, bat, sat, fat";
	var pattern=/.at/;
	var matches=text.match(pattern);
	alert(matches.index);
	alert(matches[0]);
	alert(pattern.lastIndex);

//search()   参数与match()一样，，返回字符串中第一个匹配项的索引,如果没有返回-1
	var text="cat, bat, sat, fat";
	var pos=text.search(/at/);
	alert(pos);           //1

//replace()  替换子字符串，提供两个参数，第一个参数可以是一个RegExp对象或者一个字符串，，第二个参数是一个字符串或者函数
	var text="cat, bat, sat, fat";
	var s=text.replace("at","ond");
	alert(s);
	var ss=text.replace(/at/g,"ond");   //要替换所有子字符串，必须用正则表达式，且指定全局标志g
	alert(ss);

//可以用一些特殊的字符序列
	var text="cat, bat, sat, fat";
	var s=text.replace(/(.at)/g,"word($1)");
	alert(s);         //word(cat),word(bat),word(sat),word(fat)

//replace()方法的第二个参数还可以是一个函数，在只有一个匹配项的时候这个函数会传递三个参数；模式的匹配项，模式匹配项位置，原始字符串
//当定义了多个捕获组的时候，传递参数依次：模式的匹配项，第一个捕获组，第二个捕获组.....,最后两个还是位置和原始字符串
	function html(text){
		return text.replace(/[<>"&]/g,function(match,pos,originalText){
			switch (match) {
				case "<":
				return "&lt;";
				case ">":
				return "&gt;";
				case "&":
				return "&amp;";
				case "\"":
				return "&quot;";
			}
		});
	}
	alert(html("<p class=\"greeting\">Hello world!</p>"));//实现HTML代码对这个4个字符的转义

//split() 这个方法可以基于指定的分隔符将一个字符串分割成多个字符串，并将结果放在一个数组里，分隔符可以是字符串或者RegExp对象
//第二个可选参数是指定数组的大小
	var colors="red,blue,green,yellow";
	var colors1=colors.split(",");
	var colors2=colors.split(",",2);
	var colors2=colors.split("/[^\,]+/");   //取得包含逗号字符的数组

//localeCompare()  比较两个字符串  如果字符串在字母表中在字符串参数前面返回负数，相等返回0，否则为正数	
	var s="yellow";
	alert(s.localeCompare("brick"));    //1
	alert(s.localeCompare("yellow"));   //0
	alert(s.localeCompare("zoo"));      //-1

//fromCharCode()  接收一或多个字符编码，然后把它们转换成一个字符串
	alert(String.fromCharCode(104,101,108,108,111));  //hello

      //单体内置对象
//不依赖于宿主环境的对象，在ECMAScript程序执行之前就存在， 不需要显示地实例化内置对象，因为他们已经实例化了，例如Object，Array，String等
   //Global对象
//没有全局变量或全局函数，所有在全局作用域中定义的属性和函数都是Global对象的属性，例如isNaN(),isFinite(),parseInt(),parseFloat(),实际上都是它的方法
//encodeURI()--对整个URI编码,不会对本身属于URI的特殊字符编码      encodeURIComponent()--对于URI中的某一段编码，对发现的任何非标准字符编码
	var url="http://www.wrox.com/illagal value.html#start";
	alert(encodeURI(url));    //http://www.wrox.com/illagal%20value.html#start  (出来空格其他字符都没有变化)
	alert(encodeURIComponent(url));  //http%3A%2F%2Fwww.wrox.com%2Fillagal%20value.html%23start  (所有非字母数字字符都被替换)

//与上面两个方法对应的是decodeURI()和decodeURIComponent()  decodeURIComponent()可以解码由两种方式编码

//eval() 接收一个参数，，即要执行的字符串，通过该方法执行的代码被认为是包含该次调用的执行环境的一部分，因此具有与该执行环境相同的作用域，意味着可以引用包含环境中的变量
	var msg="hello";
	eval("alert(msg)");  //等价于这行代码 alert(msg);
	
	eval("function sayHi(){alert('hi');}");  //最终被替换成实际代码
	sayHi();        //因为有相同的作用域，所以可以调用
//在eval()中创建的变量或函数不会被提升，因此在解析代码的时候，他们包含在字符串中，所以只有eval()执行的时候才被创建

//Global对象属性：所有原生引用类型的构造函数例如Object和Funciton都是它的属性，还有undefined,NaN,Infinity等等

//window对象:在web浏览器中将Global这个全局对象作为window对象的一部分加以实现，所以在全局作用域中声明的所有变量和函数都成了window对象的属性
	var global=function(){
		return this;
	}();         //获取global对象

  
  //Math对象
 //属性：Math.E ,Math.LN10 ,Math.LN2  ,Math.LOG2E  ,,Math.LOG10E  ,Math.PI  ,Math.SQRT1_2  ,Math.SQRT2
 //方法：min() ,max()  获得一组数据的最小和最大值
 	var max=Math.max(3,54,32,16);  //54
 	var min=Math.min(3,54,32,16);   //3
 	alert(Math.ceil(25.9))      //向上舍入
 	alert(Math.round(25.9))     //标准舍入
 	alert(Math.floor(25.9))    //向下舍入
//random()  返回大于等于0小于1的一个随机数
	function selectFrom(lowerValue,upperValue){
			var choices=upperValue-lowerValue+1;
			return Math.floor(Math.random()*choices+lowerValue);
		}
		var num=selectFrom(2,10);
		alert(num);         //返回传入的两个数之间的数

//其他方法：Math.abs(),Math.exp(),Math.log(),Math.pow().....
