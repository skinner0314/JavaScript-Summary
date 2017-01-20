//属性类型
//数据属性：[[Configurable]]:表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，，一般直接在对象中定义的属性，默认为true
//[[Enumerable]]表示能否通过for-in循环返回属性，一般默认true
//[[Writable]]表示能否修改属性的值，默认true
//[[Value]]包含这个属性的数据值，读取属性值的时候在这个位置读，写入属性值的时候把新值保存在这个位置。。默认为undefined
	var person={
		name:"Nicholas"
	};   // [[Value]]设置为指定的"Nicholas",,其它三个属性默认true

//要修改默认的属性，必须使用ECMAScript5的 Object.defineProperty()方法，接收三个参数：属性所在对象，属性名字，和一个描述符对象，描述符对象的属性必须是configurable
//enumerable,writable,value
	var person={};
	Object.defineProperty(person,"name",{
		writable:false,        //不能修改属性的值
		value:"Nicholas"
	});
	alert(person.name);  //Nicholas
	person.name="Greg";
	alert(person.name);  //Nicholas

	Object.defineProperty(person,"name",{
		Configurable:false,            //不能通过delete删除属性
		value:"Nicholas"
	});
	alert(person.name);    //Nicholas
	delete person.name;
	alert(person.name);    //Nicholas

//一旦把属性configurable定义为不可配置，就不能再把它变回可配置了，此时修改除了writable之外的特性都会导致错误
		var person={};
		Object.defineProperty(person,"name",{
		configurable:false,            //不能通过delete删除属性
		value:"Nicholas"
	});
		//抛出错误
		Object.defineProperty(person,"name",{
			configurable:true
		});
//在调用Object.defineProperty()方法创建一个新的属性时，如果不指定，configurable,enumerable,writable特性的默认值为false，对于已经定义的属性没有此限制

//访问器属性：[[Configurable]]表示能否通过delete删除属性从而重新定义，能否修改属性的特性，或者能否把属性修改为数据属性，，默认true
//[[Enumerable]]表示能否通过for-in循环返回属性，一般默认true
//[[Get]]在读取属性时调用的函数，默认undefined
//[[Set]]在写入属性时调用的函数,默认undefined
//访问器属性不能直接定义，必须使用Object.defineProperty()来定义
	var book={
		_year:2004,
		edition:1
	};
	Object.defineProperty(book,"year",{       
		get:function(){
			return this._year;
		},
		set:function(newValue){
			if(newValue>2004){
				this._year=newValue;
				this.edition+=newValue-2004;
			}
		}
	});
	book.year=2005;
	alert(book.edition);   //2
//在这个方法之前使用_defineGetter_()  _defineSetter_()
	book._defineGetter_("year",function(){
		return this._year;
	});
	book._defineSetter_("year",function(newValue){
		if(newValue>2004){
			this._year=newValue;
			this.edition+=newValue-2004;
		}
	});         //有些浏览器不能用


//定义多个属性：Object.defineProperties()
	var book={};
	Object.defineProperties(book,{           //定义了两个数据属性，和一个访问器属性
		_year:{
			writable:true,
			value:2004
		},
		edition:{
			writable:true,
			value:1
		},
		year:{
			get:function(){
			return this._year;},
		
			set:function(newValue){
				if(newValue>2004){
					this._year=newValue;
					this.edition+=newValue-2004;
				}
			}
		}
	});


//读取属性的特性
	//ECMAScript5的Object.getOwnPropertyDescriptor()可以取得给定属性的描述符，，接收两个参数：属性所在的对象，要读取其描述符的属性名称，返回一个对象
	var book={};
	Object.defineProperties(book,{
		_year:{
			value:2004
		},
		edition:{
			value:1
		},
			year:{
			get:function(){
			return this._year;},
		
			set:function(newValue){
				if(newValue>2004){
					this._year=newValue;
					this.edition+=newValue-2004;
				}
			}
		}
	});
	var des=Object.getOwnPropertyDescriptor(book,"_year");
	alert(des.value);             //2004
	alert(des.configurable);      //false
	alert(typeof des.get);        //undefined
	var d=Object.getOwnPropertyDescriptor(book,"year");
	alert(d.value);      //undefined
	alert(d.enumerable); //false
	alert(typeof d.get);  //function


//工厂模式:虽然解决了创建多个相似对象的问题，但是没有解决识别对象的问题
	function createPerson(name,age,job){
		var o=new Object();
		o.name=name;
		o.age=age;
		o.job=job;
		o.sayName=function(){
			alert(this.name);
		}
		return o;
	}
	var p=createPerson("Nicholas",29,"Enginner");
 
//构造函数模式：自定义构造函数，从而定义自定义对象类型的属性和方法,,通常构造函数都是大写字母开头，，以这种方式定义的构造函数是定义在Global对象中的(浏览器中为window)
	function Person(name,age,job){
		this.name=name;
		this.age=age;
		this.job=job;
		this.sayName=function(){
			alert(this.name);
		};
	}
	var p1=new Person("Nicholas",23,"Enginner");
	var p2=new Person("Greg",22,"Enginner");
	//创建Perosn实例必须使用new，以这种方式调用构造函数实际会经历步骤：
	// (1)创建一个新对象
	// (2)将构造函数的作用域赋给新对象
	// (3)执行构造函数中的代码
	// (4)返回新对象
	//上面的p1，p2保存着Person的不同实例，但是都有一个构造函数(constructor)属性指向Perosn
		alert(p1.constructor==Person);  //true  ,,constructor属性最初是用来标识对象的类型的，但是提到检测对象类型还是instanceof比较可靠
//在这里创建的Perosn对象既是Object实例又是Person实例,,
	alert(p1 instanceof Object); //true
	alert(p1 instanceof Person); //true

//任何函数使用了new来调用就作为构造函数，否则和普通函数没有区别
	var person=new Person("Nicholas",23,"Enginner");
	person.sayName();        //当作构造函数

	Person("Greg",21,"Doctor");
	window.sayName();       //当作普通函数

	var o=new Object();
	Person.call(o,"Bob",24,"Nurse");
	o.sayName();             //在另一个对象的作用域中调用

//使用构造函数的问题：每个方法都要在每个实例上重新创建一遍，可以采用在外部定义函数，那可能要多出很多全局函数，没有封装性可言

//原型模式：我们创建的每个函数都有一个prototype属性，这是一个指针，指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法
//字面理解，prototype就是通过调用构造函数而创建的那个对象实例的原型对象
	function Person(){

	}
	Person.prototype.name="Nicholas";
	Person.prototype.age=22;
	Person.prototype.job="Enginner";
	Person.prototype.sayName=function(){
		alert(this.name);
	};
 	var p=new Person();
 	p.sayName();

//理解原型对象：只要创建了函数就会创建一个prototype属性，这个属性指向函数的原型对象。默认下，这个原型对象会自动获得一个constructor(构造函数)属性，
//这个属性是一个指向prototype属性所在函数的指针，前面的 Person.prototype.constructor指向Person
//创建自定义构造函数后，原型对象只会获得constructor属性，其它方法都是从Object继承而来
//实例的[[Prototype]]属性连接的是与原型对象之间的关系，与构造函数没有关系
//虽然在所有的实现中都无法访问到[[prototype]]，但是可以通过原型对象的isPrototypeOf()方法来确定对象之间是否存在这种关系
	alert(Person.prototype.isPrototypeOf(p));  //true

//ECMAScript5 增加了一个新方法，Object.getPrototypeOf() 返回[[Prototype]]的值
	alert(Object.getPrototypeOf(p)==Person.prototype);  //true
	alert(Object.getPrototypeOf(p).name);   //Nicholas

//代码读取属性时，会先从实例本身开始，没有再去原型对象读
//如果在实例中添加了一个与原型对象同名的属性会覆盖原型对象，但是可以使用delete操作符删除实例属性，恢复原型对象的属性
//hasOwnProperty()方法可以检测一个属性是存在于实例中还是原型中，这个方法是从Object中继承来的，只在给定属性存在实例中时返回true
		function Person(){

	}
	Person.prototype.name="Nicholas";
	Person.prototype.age=22;
	Person.prototype.job="Enginner";
	Person.prototype.sayName=function(){
		alert(this.name);
	};
	var p=new Person();
	alert(p.hasOwnProperty("name")); //false
	p.name="bob";
	alert(p.hasOwnProperty("name")); //true


//Object.getOwnPropertyDescriptor()方法只能用于实例属性，要想获得原型属性，必须直接对原型对象调用这个方法
	function Person(){

	}
	Person.prototype.name="Nicholas";
	Person.prototype.age=22;
	Person.prototype.job="Enginner";
	Person.prototype.sayName=function(){
		alert(this.name);
	};
	var ss=Object.getOwnPropertyDescriptor(Person.prototype,"name");
	alert(ss.value);           //Nicholas

//原型与in操作符：单独使用时，in操作符会在通过对象能够访问给定属性时返回true，无论是在实例中还是原型中
	alert("name" in p); //true

	function hasPrototypeProperty(obj,name){
		return !obj.hasOwnProperty(name)&&(name in obj);
	}                                                 //同时使用两种方式确定属性存在哪里

//在使用for-in循环时，返回的是所有能够通过对象访问，可枚举属性，其中既包括实例属性，也包括原型属性。开发人员定义的属性都是可枚举的

//要取得对象所有可以枚举的实例属性，可以使用ECMAScript5的Object.keys()方法，接收对象参数，返回所有可以枚举属性的字符串数组
//Object.getOwnPropertyNames()返回所有实例属性(也是对象自有属性)，无论是否可以枚举
//constructor.prototype不可枚举
	function Person(){
	}
	Person.prototype.name="Nicholas";
	Person.prototype.age=22;
	Person.prototype.job="Enginner";	
	Person.prototype.sayName=function(){
		alert(this.name);
	};
	var k1=Object.keys(Person.prototype);
	alert(k1);                     //name,age,job,sayName   传入原型显示原型属性
	var p=new Person();
	p.name="bob";
	k2=Object.keys(p);
	alert(k2);                      //name      传入实例显示实例属性
	k3=Object.getOwnPropertyNames(Person.prototype);   
	alert(k3);                       //constructor,name,age,job,sayName 
	k4=Object.getOwnPropertyNames(p);
	alert(k4);                  //name

//字面量定义prototype ,本质上是重写了默认的prototype对象，因此constructor属性也会变成新的属性(指向Object构造函数)，但是可以在字面量定义里面重写constructor
//不过这样的写的constructor的[[Enumerable]]属性是true，与原生的constructor属性不可枚举不符合，但是可以通过Object.defineProperty()重新设置
	function Person(){}
	Person.prototype={
		constructor:Person,               //重新定义constructor
		name:"Nicholas",
		age:33,
		job:"Enginner",
		sayName:function(){
			alert(this.name);
		}
	};
	Object.defineProperty(Person.prototype,"constructor",{
		enumerable:false,               //重新设置属性使之不可枚举
		value:Person
	});


//原型的动态性：由于在原型中查找是一次搜索过程，因此在原型对象上的修改能立刻显示在实例上，即使是先创建了实例后修改的原型对象
	var f=new Person();
	Person.prototype.sayHi(){
		alert("hi");
	};
	f.sayHi();        //不会出错

//如果重写了原型，会影响之前的实例
	function Person(){}
	var f=new Person();
	Person.prototype={
		constructor:Person,
		name:"Nicholas",
		sayName:function(){
			alert(this.name);
		}
	};
	f.sayName();       //出错，并且不存在该函数

//原生对象的原型：所有原生的引用类型都是采用原型模式，它们的方法都是在原型上定义的，我们也可以修改原生对象的原型(添加或修改方法等等)，但是不推荐这么做

//原型对象的问题：对于共享的基本类型可以通过自己定义覆盖，但是原型对象中的引用类型，会一直被共享
	function Person(){}
	Person.prototype={
		constructor:Person,
		friends:["aa","bb"]
	};
	var p1=new Person();
	var p2=new Person();
	p1.friends.push("Van");
	alert(p2.friends);           //aa,bb,Van       实例p1对实例p2产生影响

//组合使用构造函数模式和原型模式：构造函数用于定义实例属性，原型模式用于定义共享方法和属性，这样每个实例都有自己的一份实例属性副本
	function Person(name,age,job){
		this.name=name;
		this.age=age;
		this.job=job;
		this.friends=["ss","dd"]
	}
	Person.prototype={
		constructor:Person,
		sayName:function(){
			alert(this.name);
		}
	};
	var p1=new Person();
	var p2=new Person();
	alert(p1.friends==p2.friends);      //false

//动态原型模式：通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型
	function Person(name,age,job){
		this.name=name;
		this.age=age;
		this.job=job;
		if(typeof this.sayName=="function"){
			Person.prototype.sayName=function(){    //修改后的原型会作用在所有的实例上
				alert(this.name);
			};
		}
	}

//寄生构造函数模式:除了使用new操作符并使用的包装函数叫构造函数以外，这个模式和工厂模式其实一样
	function Person(name,age,job){
		var o=new Object();
		o.name=name;
		o.age=age;
		o.job=job;
		o.sayName=function(){
			alert(this.name);
		};
		return o;
	}
	var p=new Person("Nicholas",22,"Enginner");
	p.sayName();
//该模式可以用来创建具有额外功能的对象，由于不能直接修改Object构造函数
//该模式返回的对象与构造函数或者构造函数的原型属性没有关系，因此不能使用instanceof来确定对象


//稳妥构造函数模式：与寄生模式类似，两点不同：一是新创建对象的实例方法不引用this，二是不使用new操作符调用构造函数
	function Person(name,age,job){
		var o=new Object();
		o.sayName=function(){
			alert(name);
		};
		return o;
	}
	var s=Person("Nicholas",22,"Enginner");
	s.sayName();     //除了调用sayName()方法，没有其它方法能访问数据成员



 
       //继承
//原型链：利用原型让一个引用类型继承另一个引用类型，实现方式有(让一个原型等于另一个类型的实例)，，所有引用类型都继承了Object，这也是通过原型链实现的
//所有函数默认原型都是Object的实例，因此默认原型都会包含内部指针指向Object.prototype，这也正是自定义类型都会继承toString，valueOf方法的原因
	function SuperType(){
		this.property=true;
	}
	SuperType.prototype.getSuperValue=function(){
		return this.property;
	};
	function SubType(){
		this.subproperty=false;
	}
	SubType.prototype=new SuperType();
	SubType.prototype.getSubValue=function(){
		return this.subproperty;
	};
	var instance=new SubType();
	alert(instance.getSuperValue());           //true
//instance指向SubType的原型，Subtype的原型指向SuperType的原型，instance.constructor指向SuperType，因为SubType.prototype被重写了
//搜索机制会沿着原型链搜索

//原型与实例的关系
	alert(instance instanceof Object);    //true
	alert(instance instanceof SuperType);  //true
	alert(instance instanceof SubType);    //true

//子类型需要添加某个方法或者覆盖原来的方法，一定要在原型替换语句之后，否则会被重写覆盖掉
//子类型可以重写覆盖原来的方法，但是通过超类型自己的实例调用的还是原来的方法，不会被覆盖
//在创建原型方法的时候不能使用字面量，会当作是在重写原型


//原型链的问题：在通过原型继承的实例中的实例属性(引用类型)会变成现在的原型属性
	function SuperType(){
		this.colors=["red","green","blue"];
	}
	function SubType(){}
	SubType.prototype=new SuperType();
	var instance1=new SubType();
	instance1.colors.push("black");
	var instance2=new SubType();
	alert(instance2.colors);       // red,green,blue,black    SubType所有实例都会引用这个colors

//还有一个问题是在创建子类型实例时，不能向超类型的构造函数传递参数

//借用构造函数：解决引用类型值带来的问题 ，，即在子类型构造函数的内部调用超类型的构造函数，通过使用apply(),call()方法
	function SuperType(){
		this.colors=["red","blue","green"];
	}
	function SubType(){
		SuperType.call(this);      //这样SubType的每个实例就都会有自己的colors属性的副本了
	}
	var instance1=new SubType();
	instance1.colors.push("black");
	var instance2=new SubType();
	alert(instance2.colors);         // red,blue,green


//借用构造函数可以在子类型构造函数中向超类型构造函数传递参数
	function SuperType(name){
		this.name=name;
	}
	function SubType(){
		SuperType.call(this,"Nicholas");
		this.age=28;
	}

	var instance=new SubType();
	alert(instance.name);
	alert(instance.age);

//组合继承：将原型链和借用构造函数组合，使用原型链实现对原型属性和方法的继承，借用构造函数实现对实例属性的继承
	function SuperType(name){
		this.name=name;
		this.colors=["red","blue","green"];
	}
	SuperType.prototype.sayName=function(){
		alert(this.name);
	};
	function SubType(name,age){
		SuperType.call(this,name);
		this.age=age;
	}
	SubType.prototype=new SuperType();
	SubType.prototype.constructor=SubType;
	SubType.prototype.sayAge=function(){
		alert(this.age);
	};
	var instance=new SubType("Nicholas",22);
	instance.sayName();
	instance.sayAge();


//原型式继承：借助原型可以基于已有的对象创建新对象，（原型寄生于对象）
	function object(o){
		function F(){}
		F.prototype=o;
		return new F();  
	}                   //本质上对传入的对象进行了浅复制
//该方式创建的对象共享o对象的属性
//ECMAScript5新增的Object.create()方法规范化了原型式继承，接收两个参数：作为新对象原型的对象，一个为新对象定义额外属性的对象(可选)
	var f=Object.create(o);    
//第二个参数与Object.defineProperties()方法的第二个参数格式一样，以这种方式定义的属性都会覆盖原型对象的属性
	var f=Object.create(o,{
		name:{
			value:"Greg"
		}
	});



//寄生式继承：对象寄生于对象
	function createAnother(original){
		var clone=object(original);          //调用object函数创建一个新对象，其实只要是一个新对象就可以，object不是必须的
		clone.sayHi=function(){
			alert("hi");
		};
		return clone;
	}                          //返回的对象基于原来对象，并且还有自己的方法

//寄生组合式继承：由于组合模式会调用两次超类型构造函数，所以会在实例和原型上面都创建了属性，尽管实例上的属性覆盖了原型属性，但还是有些不足
//其实就是不必为了指定子类型的原型而调用超类型的构造函数，直接采用寄生式继承来继承超类型的原型，然后在将结果指定给子类型的原型
	function inheritPrototype(subType,superType){
		var prototype=object(superType.prototype);     //创建对象
		prototype.constructor=subType;                //增加对象
		subType.prototype=prototype;                  //指定对象
	}


	function SuperType(name){
		this.name=name;
		this.colors=["red","blue","green"];
	}
	SuperType.prototype.sayName=function(){
		alert(this.name);
	};
	function SubType(name,age){
		SuperType.call(this,name);
		this.age=age;
	}
	inheritPrototype(SubType,SuperType);    //可以通过SubType.prototype=SuperType.prototype;直接继承
	SubType.prototype.sayAge=function(){
		alert(this.age);
	};
	var ss=new SubType("Nicholas",23);
	ss.sayAge();
	ss.sayName();