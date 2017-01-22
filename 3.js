     //函数表达式
//name属性(非标准)
	function ff(){}
	alert(ff.name);          //ff
//匿名函数
	var functionName=function(a,b,c){};  //function关键字后面没有标识符，这样的函数是匿名函数，匿名函数的name属性是空字符串
	alert(functionName.name);     //空字符串
//不可以将函数声明写在选择语句里，应该使用函数表达式，匿名函数可以赋值给其他函数，也可以作为返回值

//递归:在严格模式模式下，arguments.callee属性会导致错误，可以采用下面函数表达式方法
	var factorial=(function f(num){
		if(num<=1){
			return 1;
		}else{
			return num*f(num -1);
		}
	});
	alert(factorial(5));     //120
	alert(f(5));            //不能这么调用，会出错

//闭包：是指有权访问另一个函数作用域中的变量的函数，常见方式是在一个函数内部创建另一个函数
//当函数被调用时，会创建一个执行环境及相应的作用域链，然后使用arguments和其他命名参数的值来初始化函数的活动对象，在作用域中，外部的函数依次排在后面
	function compare(value1,value2){
		if(value1<value2){
			return -1;
		}else if(value1>value2){
			return 1;
		}else{
			return 0;
		}
	}
	var result=compare(5,10); //调用函数compare会先创建包含arguments,value1,value2的活动对象，全局执行环境的变量对象(包含result，compare在作用域链中排第二)
//后台的每个执行环境都有一个表示变量的对象--变量对象，全局环境的变量对象始终存在，而像compare()函数这样的局部环境的变量对象只在执行的过程存在
//在创建compare()函数时，会创建一个预先包含全局变量对象的作用域链，保存在内部的[[Scope]]属性中，当调用函数时，会为函数创建一个执行环境，然后通过复制[[Scope]]属性中
//的对象构建起执行环境的作用域链，此后，又有一个活动对象被创建并被推入执行环境作用域链的前端，这个例子中作用域链中包含两个变量对象：本地活动对象和全局变量对象
//一般来说函数执行完毕后，局部活动对象就会被销毁，内存中仅会保存全局作用域(全局执行环境的变量对象)，但是闭包有所不同
//在一个函数内部定义的函数会把外部函数的活动对象添加到它的作用域链中
//函数在执行完毕后，其作用域链会被销毁，但是其活动对象还是被内部返回函数所引用会一直保存在内存中，直至匿名函数被销毁，其活动对象才会被销毁
	var ss=null;   //通过解除匿名函数的引用来释放内存


//闭包和变量：闭包只能取得包含函数中任何变量的最后一个值，其保存的是整个变量对象，不是某个特殊值
	function createFunctions(){
		var result=new Array();
		for(var i=0;i<10;i++){
			result[i]=function(){
				return i;
			};
		}
		return result;
	}
	ss=createFunctions();
	alert(ss[3]());          //10

	//每个函数都会返回10，因为每个函数的作用域链中都保存着createFunctions函数的活动对象，他们引用的是同一个变量i


	function createFunctions(){
		var result=new Array();
		for(var i=0;i<10;i++){
			result[i]=function(num){
				return function(){
					return num;
				};
			}(i);
		}
		return result;
	}
	ss=createFunctions();
	alert(ss[3]());     //3


//this对象：匿名函数的执行环境具有全局性，因此其this对象通常指向window-----important
	var name="The window";
	var object={
		name:"My object",
		getName:function(){
			return function(){
				return this.name;
			};
		}
	};
	alert(object.getName()());     //The window

//每个函数调用时候都会自动获得两个特殊变量：this,arguments,内部函数在搜索这个两个变量时，只会搜索到其活动对象为止，所以不可能直接访问外部函数中的这个两个变量
//可以把外部的this保存在一个闭包可以访问的变量里
	var name="The window";
	var object={
		name:"My object",
		getName:function(){
			var that=this;
			return function(){
				return that.name;
			};
		}
	}; 
	alert(object.getName()());   //My object


//内存泄漏
	function ass(){
		var element=document.getElementById("id");
		element.onclick=function(){
			alert(element.id);
		};
	}  //由于匿名函数会保存ass()的活动对象，所以无法减少对element的引用数，只要匿名函数存在，element的引用至少有1次，无法被回收

	function ass(){
		var element=document.getElementById("id");
		var id=element.id;
		element.onclick=function(){
			alert(id);
		};
		element=null;
	}  //把element.id的副本保存在一个变量，通过引用变量来消除循环引用，但是闭包会引用函数的整个活动对象---important，其中就包含element，即使不直接引用element
	   //包含函数的活动对象也会保存一个引用，所有有必要在后面把element设置为null，释放内存


//模仿块级作用域：JavaScript没有块级作用域概念，所以变量都是包含在函数中而非语句中
	function out(){
		for(var i=0;i<10;i++){

		}
		alert(i);   //  10    还是可以输出
		var i=3;     //重新声明变量，javascript不会告诉你是否多次声明同意变量，一般会忽略后续声明，但是会执行后续声明中的变量初始化
		alert(i);   //3
	}


//块级作用域的匿名函数语法
	(function(){
		//这里是块级作用域
	})();          //这里定义并立即调用，函数声明放在括号里实际上是函数表达式

	var some=function(){
		//这里是块级作用域
	};
	some();  //这里先定义了一个函数(创建一个匿名函数)，并把匿名函数赋值给了一个变量，然后立即调用它

	ss=function(){}();   //正确，函数表达式
	(function(){})();    //正确，函数表达式
	function(){}(); 	//错误，function作为关键字当作函数声明开始后面不能加圆括号


	function out(count){
		(function(){
			for(var i=0;i<count;i++){
				alert(i);
			}
		})();
		alert(i);     //出错，i在私有作用域中，在执行结束后就会被销毁,由于这个匿名函数是闭包所以可以访问包含作用域中的所有变量如count
	}
//这种技术经常在全局作用域中被用在函数外部，从而限定向全局作用域中添加过多的变量和函数

//私有变量：任何在函数中定义的变量都是私有变量，因为不能在函数外部访问这些变量，私有变量包括参数，局部变量，函数内部定义的其他函数等等
//把有权访问私有变量和私有函数的共有方法称为特权方法
	function MyObject(){
		var private=10;
		function privateFunction(){
			return false;
		}
		this.publicMethod=function(){
			private++;
			return privateFunction();
		};
	}
	var s=new MyObject();
	alert(s.publicMethod()); //false
//每个实例都不相同，每次都会调用构造函数创建方法，这是一个缺点

//静态私有变量：通过在私有作用域中定义私有变量或函数，同样可以创建特权方法
	(function(){
		var p=10;
		function pp(){
			return false;
		}
		MyObject=function(){};             //MyObject是全局变量，能在私有作用域外被访问
		MyObject.prototype.publicMethod=function(){
			p++;
			return pp();
		};
	})();
	//这个模式创建了私有作用域，并在其中封装了一个构造函数和方法，首先定义了私有变量和函数，然后定义了构造函数及共有方法
	//这里定义构造函数没有用函数声明而是用了函数表达式，因为函数声明只能创建局部函数，同时我们也就没有使用var关键字，所以MyObject是一个全局变量，能够在私有作用域外被访问
//这个模式与构造函数中定义特权方法的区别，在于私有变量和函数是实例共享的，由于是在原型上面定的特权，因此所有实例都使用同一个特权函数，而这个特权函数作为闭包总是保存着包含作用域的引用
	(function(){
		var name="";
		Person=function(value){
			name=value;
		};
		Person.prototype.getName=function(){
			return name;
		};
		Person.prototype.setName=function(value){
			name=value;
		};
	})();
	var person1=new Person();
	var person2=new Person();
	person1.setName("Greg");
	alert(person1.getName());   //Greg
	alert(person2.getName());   //Greg  name变成了静态共享属性


//模块模式：专为单例创建私有变量和特权方法
	var singleton=function(){
		var p=10;
		function pp(){
			return false;
		}
		return {
			publicProperty:true,
			publicMethod:function(){
				p++;
				return pp();
			}
		};

	}();
	//这个模块模式使用了一个返回对象的匿名函数，这个匿名函数内部首先定义了私有变量和函数，然后将一个对象作为函数的值返回，返回的对象字面量只包含公开属性和方法
	//这个字面量定义的是单例的公共接口，这种模式在需要对单例进行初始化，同时又要维护其私有变量时非常有用

//增强的模块模式：在返回对象前加入增强代码，可以对单例的类型进行设置，同时添加属性和方法
	var singleton=function(){
		var p=10;
		function pp=function(){
			return false;
		}
		var object=new Custom();           //指定返回的单例类型为Custom
		object.publicProperty:true;
		object.publicMethod=function(){
			p++;
			return pp();
		};
		return object;
	}();


  

