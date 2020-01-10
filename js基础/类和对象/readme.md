## 对象

#### 一切引用类型都是对象

```
console.log(typeof x);    // undefined
console.log(typeof 10);   // number
console.log(typeof 'abc'); // string
console.log(typeof true);  // boolean
console.log(typeof function () {});  //function
console.log(typeof [1, 'a', true]);  //object
console.log(typeof { a: 10, b: 20 });  //object
console.log(typeof null);  //object
console.log(typeof new Number(10));  //object
```

- undefined、number、string、boolean 是值类型
- 函数、对象、数组、null

> 判断值类型的用 typeof,判断引用类型的用 instanceof

#### 对象就是一些属性集合

```
var obj = {
    a:10,
    b:function (){},
    c:function (){}
}
```

对象里面一切都是属性,方法也是属性,以键值对的形式表现出来

#### 函数定义属性

```
var func = function () {

}
func.a = 10;
func.b = function () {
    console.log('hello world');
}
func.c = {
    name:'123',
    year:1988
}
```

#### 对象都是通过函数创建的

```
function Func(){
    this.name = 'lili';
    this.year = 1988;
}
var fn1 = new Func();
```

```
var obj = {a:20,b:30};
var arr = [1,2,3];

<!--等同于-->
var obj = new Object();
obj.a = 20;
obj.b = 30;
var arr = new Array();
arr[0] = 1;
arr[1] = 2;
arr[2] = 3;
```

> 对象是函数创建的,函数是一种对象

## 函数和构造函数

[Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 构造函数创建一个新的 Function 对象.直接调用此构造函数可用动态创建函数,但会遭遇来自 eval 的安全问题和相对较小的性能问题.然而,与 eval 不同的是,Function 构造函数只在全局作用域中运行.每个 JavaScript 函数实际上都是一个 Function 对象 => `(function(){}).constructor === Function`

- 每一个函数都有 prototype 属性 => func.prototype
- func.prototype 默认有 constructor,func.prototype.constructor
- 函数的 constructor 指向函数本身,func.prototype.constructor===func
- constructor 是对函数的一种引用,函数也是对象,可以定义属性,可以通过 instance.constuctor.method 来获取属性

```
function putong(){}
putong.realname = '普普通通'
console.log(putong.prototype.constructor.realname)
console.log(putong.prototype.constructor === putong) //true
let p = new putong()
console.log(p.constructor === putong) //rue
console.log(p.constructor === putong.prototype.constructor) // true
```

**构造函数和函数怎么区分?**

使用 new 关键字生成实例的就是构造函数,不然就是普通函数.

```
function putong(){}
let p = new putong()
console.log(p.constructor===putong)

function Gouzhao(){}
let g = new Gouzhao()
console.log(g.constructor===Gouzhao)
```

## 实例

引用类型的值（对象）是引用类型的一个实例，也可以说对象是某个特定引用类型的实例。

- 实例是通过构造函数和 new 运算符进行创建的
- hasOwnProperty()方法是用来确定一个实例是否拥有自己的某个属性
- 实例有且只有一个`__proto__`的属性,指向 构造函数.prototype

```
function Jay(){}
let j = new Jay()
console.log(j) // Jay
console.log(j.prototype) // undefined
console.log(j.constructor) // f Jay => 通过原型链向上访问的
console.log(j.__proto__) // Jay.protytype
console.log(j.__proto__ === Jay.prototype) // true
```

**实例也是一个对象,每一个实例之间是独立的**

```
function Jay(){}
let j = new Jay()
let a = new Jay()
j.num = 1
a.num = 2
console.log(a.num)
```

## 函数和对象的关系

#### 函数就是对象的一种

```
var func = function (){};
console.log(func instanceof Object); // true
```

#### 对象都是通过函数进行创建的

```
//var obj = { a: 10, b: 20 };
//var arr = [5, 'x', true];

<!--以上代码的本质-->
var obj = new Object();
obj.a = 10;
obj.b = 20;

var arr = new Array();
arr[0] = 5;
arr[1] = 'x';
arr[2] = true;
```

#### isPrototypeOf 判断一个对象象是否为一个实例的原型

```
  console.log(a.prototype.isPrototypeOf(b));
  console.log(b.prototype.isPrototypeOf(b));
```

#### propertyIsEnumerable 方法返回一个布尔值,表明指定的属性名是否是当前对象可枚举的自身属性

```
for(var key in obj) {
    f(obj.propertyIsEnumerable(key) {
        <!--do somethings-->
    };
};
```

> - 判断给定的属性是否可以用 for...in 语句进行枚举同时也是对象的自有属性.
> - for ... in 枚举是包含原型链上的属性的,propertyIsEnumerable 作用于原型方法上时,始终是返回 false 的
> - for...in 可以枚举对象本身的属性和原型上的属性,而 propertyIsEnumerable 只能判断本身的属性是否可以枚举
> - 预定义的属性不是可列举的,而用户定义的属性总是可列举的.所以如果你只想遍历对象本身的属性

## js 类与原型

通过原型这种机制,JavaScript 中的对象从其他对象继承功能特性；这种继承机制与经典的面向对象编程语言的继承机制不同.

JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象,对象以其原型为模板、从原型继承方法和属性.原型对象也可能拥有原型,并从中继承方法和属性,一层一层、以此类推.这种关系常被称为原型链 (prototype chain),它解释了为何一个对象会拥有定义在其他对象中的属性和方法.

准确地说,这些属性和方法定义在 Object 的构造器函数(constructor functions)之上的 prototype 属性上,而非对象实例本身.

在传统的 OOP 中,首先定义“类”,此后创建对象实例时,类中定义的所有属性和方法都被复制到实例中.在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是**proto**属性,是从构造函数的 prototype 属性派生的）,之后通过上溯原型链,在构造器中找到这些属性和方法.

> 理解对象的原型（可以通过 Object.getPrototypeOf(obj)或者已被弃用的**proto**属性获得）与构造函数的 prototype 属性之间的区别是很重要的.前者是每个实例上都有的属性,后者是构造函数的属性.也就是说,Object.getPrototypeOf(new Foobar())和 Foobar.prototype 指向着同一个对象.

函数可以有属性, 每个函数都有一个特殊的属性叫作原型（prototype）.

测试一下

```
function pro(){}
pro.inner = "pro-inner"
pro.prototype.out = "out function"
console.log(pro)

var pro2 = function(){}
pro2.inner = "pro2-inner"
pro2.prototype.out = "var varible"
console.log(pro2.prototype)
```

> 构造函数普遍使用首字母大写的命名方式,这不是 js 这个语言强制规定的,而是人们在使用的过程中一种约定成俗

控制台打印出来的对象

```
out: "var varible"
constructor: ƒ ()
	inner: "pro2-inner"
	length: 0
	name: "pro2"
	arguments: null
	caller: null
	prototype: {out: "var varible", constructor: ƒ}
	__proto__: ƒ ()
	[[FunctionLocation]]: pen.js:7
	[[Scopes]]: Scopes[1]
__proto__:
	constructor: ƒ Object()
	__defineGetter__: ƒ __defineGetter__()
	__defineSetter__: ƒ __defineSetter__()
	hasOwnProperty: ƒ hasOwnProperty()
	__lookupGetter__: ƒ __lookupGetter__()
	__lookupSetter__: ƒ __lookupSetter__()
	isPrototypeOf: ƒ isPrototypeOf()
	propertyIsEnumerable: ƒ propertyIsEnumerable()
	toString: ƒ toString()
	valueOf: ƒ valueOf()
	toLocaleString: ƒ toLocaleString()
	get __proto__: ƒ __proto__()
	set __proto__: ƒ __proto__()
```

使用 new 运算符来在现在的这个原型基础之上,创建一个 proIns 实例.使用 new 运算符的方法就是在正常调用函数时,在函数名的前面加上一个 new 前缀. 通过这种方法,在调用函数前加一个 new ,它就会返回一个这个函数的实例化对象.

```
var pro2 = function(){}
pro2.inner = "pro2-inner"
pro2.prototype.out = "var varible"
var proIns = new pro2()
proIns.prop = "add prop"
console.log(proIns)
console.log(proIns.prototype)
console.log(pro2.prototype)
```

控制台输出的内容

```
prop: "add prop"
__proto__:
	out: "var varible"
	constructor: ƒ ()
	__proto__: Object
```

proIns 的 **proto** 属性就是 pro2.prototype,而 pro2.prototype 的**proto**就是 Object,当需要访问 proIns 的某个属性或者方法的时候,浏览器就会沿着原型链一直向上进行查找是否有该属性/方法.

执行路径:

```
var Pro = function(){}
Pro.prototype.inner="i am pro"
var proIns = new Pro()
console.log(proIns.__proto__)
console.log(proIns.__proto__.__proto__)
console.log(proIns.__proto__.__proto__.__proto__)
```

- 浏览器首先查找 proIns 自身是否有这个属性
- 如果 proIns 没有这个属性, 然后浏览器就会在 proIns 的 `__proto__` 也就是中查找这个属性**(Pro.prototype)**
- 如果 proIns 的 `__proto__` 没有这个属性, 浏览器就会去查找 proIns 的 `__proto__` 的 `__proto__` 的属性**(Object.prototype)**
- 最终查找`proIns.__proto__.__proto__.__proto__`为空,浏览器判断原型链上不存在该属性,该属性获取 undefined

#### 测试案例

定义一个构造器函数 Person

```
function Person(name, age, work) {
  this.name = name;
  this.age = age;
  this.work = work;
  this.study = function() {
    console.log(this.name + "学习了" + this.work);
  };
}

Person.prototype.eat = function() {
  console.log(this.name + "依旧需要吃饭");
};

var programmer = new Person("称序员", 42, "coding");

programmer.study();
programmer.eat();
console.log(programmer.toString())
```

此时输出 programer 在控制台上

```
Person {name: "称序员", age: 42, work: "coding", study: ƒ}
name: "称序员"
age: 42
work: "coding"
study: ƒ ()
__proto__:
	eat: ƒ ()
	constructor: ƒ Person(name, age, work)
	__proto__:
		constructor: ƒ Object()
		__defineGetter__: ƒ __defineGetter__()
		__defineSetter__: ƒ __defineSetter__()
		hasOwnProperty: ƒ hasOwnProperty()
		__lookupGetter__: ƒ __lookupGetter__()
		__lookupSetter__: ƒ __lookupSetter__()
		isPrototypeOf: ƒ isPrototypeOf()
		propertyIsEnumerable: ƒ propertyIsEnumerable()
		toString: ƒ toString()
		valueOf: ƒ valueOf()
		toLocaleString: ƒ toLocaleString()
		get __proto__: ƒ __proto__()
		set __proto__: ƒ __proto__()
```

该案例总共调用了三个方法.过程如下：

- 首先执行 study,programmer 具有该方法,就直接调用执行,输出内容
- 然后向下执行,执行 eat 方法,浏览器查找 programmer 上是否拥有该方法,浏览器没有在 programmer 上查找到 eat 方法
- 浏览器检查 programmer 的原型对象（即 Person 构造函数的 prototype 属性所指向的对象）是否具有可用的 eat() 方法,浏览器找到并执行该方法
- 继续向下执行,执行 toString 方法
- 浏览器会先查找 programmer 然后查找 Person 构造器的 prototype,都没有查找到该方法
- 由于原型也是对象,构造属性 constructor 指向 Object,所以此时浏览器会查找 Person() 构造函数的 prototype 属性所指向的对象的原型对象（即 Object 构造函数的 prototype 属性所指向的对象）是否具有可用的 toString() 方法.浏览器查找到 toString 方法,执行.

> 原型链中的方法和属性没有被复制到其他对象——它们被访问需要通过前面所说的“原型链”的方式.上面的执行也是先查找 programmer,之后查找`programmer.__proto__`,最后查找`programmer.__proto__.__proto__`

没有官方的方法用于直接访问一个对象的原型对象=>原型链中的“连接”被定义在一个内部属性中,在 JavaScript 语言标准中用 [[prototype]] 表示（参见 [ECMAScript](https://developer.mozilla.org/en-US/docs/Glossary/ECMAScript)）.然而,大多数现代浏览器还是提供了一个名为 `__proto__` （前后各有 2 个下划线）的属性,其包含了对象的原型.

#### prototype 属性

programmer 继承的属性和方法是定义在 prototype 属性之上的（你可以称之为子命名空间 (sub namespace) ）——那些以 Object.prototype. 开头的属性,而非仅仅以 Object. 开头的属性.prototype 属性的值是一个对象,我们希望被原型链下游的对象继承的属性和方法,都被储存在其中.

- 函数是一种对象,每一个函数都自动拥有 prototype 属性
- prototype 属性是一个对象,默认有一个不可枚举的 constructor 属性,指向函数本身

于是 Object.prototype.watch()、Object.prototype.valueOf() 等等成员,适用于任何继承自 Object() 的对象类型,包括使用构造器创建的新的对象实例.

Object.is()、Object.keys(),以及其他不在 prototype 对象内的成员,不会被“对象实例”或“继承自 Object() 的对象类型”所继承.这些方法/属性仅能被 Object() 构造器自身使用.

例如

```
const str = 'today is sunshine';
console.log(str.indexOf(1));
```

str 就相当于通过 new String()拥有了一些有用的方法

我们经常使用的`var obj = {}`,通过 Object.create 表示:

```
var obj = {};
// 以字面量方式创建的空对象就相当于:
var obj = Object.create(Object.prototype);
```

> 定义在 prototype 上的方法,必须在实例调用之前进行声明.

#### 为什么需要 prototype

用构造函数创建每一个实例对象,有些属性和方法都是一模一样的内容,每一次生成一个实例,都必须为重复的内容.这样会消耗更多内存,也缺乏效率.使用
prototype 让共用属性和方法在内存中只生成一次,然后所有实例都指向那个内存地址.

> Javascript 规定,每一个构造函数都有一个 prototype 属性,指向原型对象.这个对象的所有属性和方法,都会被构造函数的实例继承

#### Object.create()

```
......
var singer = Object.create(programmer)

......
console.log(programmer)
console.log(singer.__proto__)
console.log(singer.__proto__ === programmer)
```

`singer.__proto__ === programmer`得到的结果为 true,实际[Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)方法创建一个新对象,使用现有的对象来提供新创建的对象的**proto**.

#### constructor 属性

每个实例对象都从原型中继承了一个 constructor 属性,该属性指向了用于构造此实例对象的构造函数.

```
console.log(programmer.constructor)
console.log(singer.constructor)
```

测试都将返回 Person() 构造器,因为该构造器包含这些实例的原始定义.

构造器是一个函数,故可以通过圆括号调用；只需在前面添加 new 关键字,便能将此函数作为构造器使用.

```
var loser = new programmer.constructor("落魄者",108,"快饿死了")
loser.eat() // 落魄者依旧需要吃饭
```

## 原型链

- 访问一个对象的属性时,先在基本属性中查找,如果没有,再沿着**proto**这条链向上找,这就是原型链.
- 当我们用 obj.xxx 访问一个对象的属性时,JavaScript 引擎先在当前对象上查找该属性,如果没有找到,就到其原型对象上找,如果还没有找到,就一直上溯到 Object.prototype 对象,最后,如果还没有找到,就只能返回 undefined.

原型链的经典图:

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/1.jpg)

每个实例对象（ object ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（prototype ）.该原型对象也有一个自己的原型对象( `__proto__`) ,层层向上直到一个对象的原型对象为 null.根据定义,null 没有原型,并作为这个原型链中的最后一个环节.

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例.

#### 每个对象都已一个**proto**,指向创建这个对象的函数的 prototype

```
function Phone() {

}

var mi = new Phone();

console.log(mi instanceof Object); //true
console.log(mi instanceof Array); //false
console.log(mi instanceof Function); //false
console.log(mi instanceof Phone); //true

// 实例对象的隐式原型链
console.log('实例对象指向Phone.prototype:',mi.__proto__);
console.log('Phone.prototype指向Object.prototype:',mi.__proto__.__proto__);
console.log('Objec.prototype指向null:',mi.__proto__.__proto__.__proto__);

// 构造函数的隐式原型链
console.log('Phone.__proto__指向Function.prototype',Phone.__proto__);
console.log('Function.prototype指向Object.prototype',Phone.__proto__.__proto__);
console.log('Object.prototype指向null',Phone.__proto__.__proto__.__proto__);
```

```
var obj = new Object();
// 一般创建对象的原型链
console.log('创建对象的__proto__',obj.__proto__);
console.log('Object.prototype指向null',obj.__proto__.__proto__);

function Object(){

}
console.log('指向Function.prototype',Object.__proto__);
console.log('Object.prototype',Object.__proto__.__proto__);
function Function(){

}
console.log(Function.__proto__);
 console.log('Object.prototype',Function.__proto__.__proto__);
```

上面例子可以知道

- Object.prototype 对象的**proto**指向的是 null,特例
- xxx.prototype 是一个对象
- Function 和 Object 是由 Function 创建的,**proto**指向 Fcuntion.prototype

```
graph BT
Object.prototype-->|__proto__| null
Function.prototype-->|__proto__| Object.prototype
Phone.prototype-->|__proto__| Object.prototype
mi-->|__proto__| Phone.prototype
Phone-->|__proto__| Function.prototype
obj-->|__proto__| Object.prototype
Function-->|__proto__| Function.prototype
Object-->|__proto__| Function.prototype
arr-->|__proto__| Array.prototype
Array.prototype-->|__proto__| Object.prototype
```

- Function.prototype/Phone.prototype/obj/Array.prototype 原型对象都是由 function Object 创建的,所以指向 Object 的原型对象
- Phone,Function 和 Object 是由 function Function 创建的,所以指向 Function 的原型对象
- Object 是由 Fucntion 创建,而 Function 的原型对象是由 Object 创建

#### 继承

JavaScript 对象有一个指向一个原型对象的链.当试图访问一个对象的属性时,它不仅仅在该对象上搜寻,还会搜寻该对象的原型,以及该对象的原型的原型,依次层层向上搜索,直到找到一个名字匹配的属性或到达原型链的末尾.

遵循 ECMAScript 标准,someObject.[[Prototype]] 符号是用于指向 someObject 的原型.从 ECMAScript 6 开始,[[Prototype]] 可以通过 Object.getPrototypeOf() 和 Object.setPrototypeOf() 访问器来访问.这个等同于 JavaScript 的非标准但许多浏览器实现的属性 `__proto__`.

它不应该与构造函数 func 的 prototype 属性相混淆.被构造函数创建的实例对象的 [[prototype]] 指向 func 的 prototype 属性.Object.prototype 属性表示 Object 的原型对象.

```
function Person(name, age, work) {
  this.name = name;
  this.age = age;
  this.work = work;
  this.study = function() {
    console.log(this.name + "学习了" + this.work);
  };
}

Person.prototype.name = "Person";
Person.prototype.type= "地球人";
Person.prototype.eat = function() {
  console.log(this.name + "依旧需要吃饭");
};

var programmer = new Person("称序员", 42, "coding");
programmer.study();
programmer.eat();
console.log(programmer)
console.log(programmer.__proto__)
console.log(programmer.constructor.prototype)
```

根据经典图可以追溯 programmer 的原型

- `programmer.__proto__`指向 Person.prototype
- `programmer.__proto__.__proto__`指向 Object.prototype
- `programmer.__proto__.__proto__.__proto__`指向 null

#### 属性和方法的优先级

在实例上有一个属性,在原型上也有属性,优先执行近的,javascript 中的两大链式 => 原型链和作用域链都是'就近原则'

```
function Person(name, age, work) {
  this.name = name;
  this.age = age;
  this.work = work;
  this.study = function() {
    console.log(this.name + "学习了" + this.work);
  };
}

var programmer = new Person("称序员", 42, "coding");
programmer.eat = function(){
  console.log("干掉了Person的eat方法")
}
programmer.type="外星人"

Person.prototype.name = "Person";
Person.prototype.type= "地球人";
Person.prototype.eat = function() {
  console.log(this.name + "依旧需要吃饭");
};

programmer.eat() // 干掉了Person的eat方法
console.log(programmer.type) // 外星人
```

> 上面特别更改了赋值的顺序,依旧是执行实例上的方法和属性,这种情况被称为"属性遮蔽 (property shadowing)",java 语言中这就是方法重写.

#### 使用语法结构创建的对象

```
var o = {a: 1};

// o 这个对象继承了 Object.prototype 上面的所有属性
// o 自身没有名为 hasOwnProperty 的属性
// hasOwnProperty 是 Object.prototype 的属性
// 因此 o 继承了 Object.prototype 的 hasOwnProperty
// Object.prototype 的原型为 null
// 原型链如下:
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];

// 数组都继承于 Array.prototype
// (Array.prototype 中包含 indexOf, forEach 等方法)
// 原型链如下:
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
  return 2;
}

// 函数都继承于 Function.prototype
// (Function.prototype 中包含 call, bind等方法)
// 原型链如下:
// f ---> Function.prototype ---> Object.prototype ---> null
```

#### 使用构造器创建的对象

在 JavaScript 中,构造器其实就是一个普通的函数.当使用 new 操作符 来作用这个函数时,它就可以被称为构造方法（构造函数）.

```
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function(v){
    this.vertices.push(v);
  }
};

var g = new Graph();
// g 是生成的对象,他的自身属性有 'vertices' 和 'edges'.
// 在 g 被实例化时,g.[[Prototype]] 指向了 Graph.prototype.
```

#### 使用 Object.create 创建的对象

ECMAScript 5 中引入了一个新方法：Object.create().可以调用这个方法来创建一个新对象.新对象的原型就是调用 create 方法时传入的第一个参数：

```
var a = {a: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype
```

#### 使用 class 关键字创建的对象

ECMAScript6 引入了一套新的关键字用来实现 class.使用基于类语言的开发人员会对这些结构感到熟悉,但它们是不同的.JavaScript 仍然基于原型.这些新的关键字包括 class, constructor,static,extends 和 super.

```
"use strict";

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
```

#### 查找原型链的性能

在原型链上查找属性比较耗时,对性能有副作用,这在性能要求苛刻的情况下很重要.另外,试图访问不存在的属性时会遍历整个原型链.

遍历对象的属性时,原型链上的每个可枚举属性都会被枚举出来.要检查对象是否具有自己定义的属性,而不是其原型链上的某个属性,则必须使用所有对象从 Object.prototype 继承的 hasOwnProperty 方法.

hasOwnProperty 和 Object.keys() 是 JavaScript 中处理属性并且不会遍历原型链的方法.

> 检查属性是否为 undefined 是不能够检查其是否存在的.该属性可能已存在,但其值恰好被设置成了 undefined.

## 4 个用于拓展原型链的方法

- New-initialization
- Object.create
- Object.setPrototypeOf
- \_proto\_\_

#### prototype 和 Object.getPrototypeOf

prototype 是用于类的,而 Object.getPrototypeOf() 是用于实例的（instances）,两者功能一致.

## constructor 属性

- constructor 属性的值是一个函数对象
- 任意函数的 fuc.prototype.constructor === fuc
- 原型的 constructor 指向构造函数,实例 constructor 同样指向构造函数

##### 方法 1

```
function Ba(str) {
    this.name = str ? str : 'baobo';
    this.sayHello = function() {
        alert('hello');
    }
}

Ba.prototype = {
    alertA:function (){
    	alert(this.name+'-A');
    },
    alertB: function() {
        alert(this.name+'');
    },
}

var instance_b = new Ba('haha');

// constructor
console.log('原型的构造函数', Ba.prototype.constructor); //function Object(){}
console.log('实例的构造函数', instance_b.constructor); //function Object(){}

// 新定义的原型对象,并不具有constructor属性
console.log(Ba.prototype.hasOwnProperty('constructor')); //false
```

> 上面的方法相当于重写 Ba.prototype 对象,新定义的原型对象不包含 constructor,因此构造函数指向的 function Object(){},需要显式的给原型添加构造函数

> 虽然实例对象的 constructor 和构造函数原型的 constructor 都指向构造函数,但是实例对象并不具有 constructor 这个属性,是继承至 Ba.prototype

```
console.log(ba.hasOwnProperty('constructor')); //false
console.log(Ba.prototype.hasOwnProperty('constructor')); //true
```

```
graph LR
instance_b.constructor-->|实例的构造函数| Ba
Ba.prototype.constructor-->|原型对象的构造函数| Ba
```

#### 修改

```
Ba.prototype = {
    constructor: Ba,
    alertA: function() {
        alert(this.name + '-A');
    },
    alertB: function() {
        alert(this.name + '');
    },
}
<!--这样就可正确指向构造函数Ba了-->
```

#### 方法 2,直接在预定义的原型对象上扩展

```
function Ba(str) {
    this.name = str ? str : 'baobo';
    this.sayHello = function() {
        alert('hello');
    }
}

Ba.prototype.alertA = function() {
    alert(this.name + '-A');
}

Ba.prototype.alertB = function() {
    alert(this.name + 'B');
}

var instance_b = new Ba('haha');

// constructor
console.log('原型的构造函数', Ba.prototype.constructor); //f Ba(){}
console.log('实例的构造函数', instance_b.constructor); //f Ba(){}
```

```
graph TB
声明构造函数Ba-->构造函数有prototype对象
构造函数有prototype对象-->prototype对象自动有constructor属性
prototype对象自动有constructor属性-->创建实例对象instance_b
创建实例对象instance_b-->继承prototype,有instance_b.constructor
继承prototype,有instance_b.constructor-->instance_b.constructor指向Ba
instance_b.constructor指向Ba-->对象有__proto__
对象有__proto__-->instance_b指向Ba.prototype
```

#### instanceof

- 检测对象是否属性某个类 A instanceof B（验证原型对象与实例对象之间的关系 判断具体类型）
- Instanceof 的判断队则是：沿着 A 的**proto**这条线来找,同时沿着 B 的**prototype**这条线来找,如果两条线能找到同一个引用,即同一个对象,那么就返回 true.如果找到终点还未重合,则返回 false.
- instanceof 表示的就是一种继承关系,或者原型链的结构
- instanceof 不光能找直接的父级,能找父级的父级的...constructor 只能找直接的父级

```
function a() {
    this.name = 'alisy';
}

a.prototype.alertA = function () {
    alert(this.name);
}
function b() {
    this.name = 'baobo';
}

b.prototype.alertB = function () {
    alert(this.name);
}
function c() {
    this.name = 'cmen'
}
c.prototype = a.prototype;

//b得prototype对象指向一个c的实例,那么所有的b的实例就能继承c

b.prototype = new c();

b.prototype.constructor = b;

var newb = new b();

var newc = new c();

newb.alertA(); //执行baobo

newc.alertA(); //执行cmen
//instanceof

console.log(b instanceof a);

console.log(b instanceof b);
```

#### 继承：父级有的,子级也有——给父级加东西,子级也有

- 第一种方法也是最简单的方法,使用 call 或 apply 方法,将父对象的构造函数绑定在子对象上,即在子对象构造函数中加一行

```
 Animal.apply(this, arguments);
                   Animal.call(this, arguments);
```

- 第二种方法更常见,使用 prototype 属性.如果"猫"的 prototype 对象,指向一个 Animal 的实例,那么所有"猫"的实例,就能继承 Animal 了.

```
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
```

#### call 方法

- 调用 call 的对象必须是个函数
- 语法：call([thisObj[,arg1[, arg2[, [,.argN]]]]])
- 定义：一个对象的一个方法调用 call,以 call 方法的第一个参数替换当前对象.
- 说明：call 方法可以用来代替另一个对象调用一个方法.call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象.
  如果没有提供 thisObj 参数,那么 Global 对象被用作 thisObj

#### apply 方法

- 语法：apply([thisObj[,argArray]])
- 定义：应用某一对象的一个方法,用另一个对象替换当前对象.
- 说明：如果 argArray 不是一个有效的数组或者不是 arguments 对象,那么将导致一个 TypeError.
  如果没有提供 argArray 和 thisObj 任何一个参数,那么 Global 对象将被用作 thisObj, 并且无法被传递任何参数.

> 实现继承除了用 call 和 apply 还可以使用原型链实现

##### 案例一

```
function add(a+b){
    alert(a+b);
}
function sub(a,b){
    alert(a-b);
}
add.call(sub,3,1);

//个人理解call和apply的作用就是切换函数的对象上下文

解：用括号的第一个参数来代替this的指向,将add的执行的上下文由window切换为sub,相当于this指向由window换成sub,add.call(sub,3,1) == add(3,1),结果为alert(4);
注意 : js中的函数是对象,函数名是对Function对象的引用
```

##### 案例二

```
function Animal(){
    this.name = "animal";
    this.showName = function(){
        alert(this.name);
    }
}
function Cat(){
    this.name = "cat";
}
var animal = new Animal();
var cat = new Cat();

//通过call()和apply(),将原本属于Animal对象的方法showName交给Cat对象使用了,也就是将this指向Animal动态更改为Cat
//输出的结果是cat
animal.showName.call(cat,"","");
//animal.showName.apply(cat,[]);
```

##### 案例三：实现继承

```
function Animal(name) {
    this.name = name;
    this.showName = function(name, a, b) {
        console.log('this是：' + this.name + '\na是：' + a + '\nb是：' + b);
    }
}

function Cat(name) {
    Animal.call(this, name);
    this.showLog = function() {
        console.log('hello');
    }
}

Cat.prototype.showAge = function() {
    console.log('world');
}

var cat = new Cat('hello world');

cat.showName('abc', 12, 5); //可以直接调用showName()方法

注意：Animal.call(this);是使用Animal对象代替this对象,
this指向Animal,Cat就有了Animal对象中的方法和属性,Cat对
象就可以直接调用Animal对象的方法和属性
call第二个参数开始会映射到Animal相应的参数位置
```

##### 案例四：多重继承

```
function Animal() {
    this.showSub = function(a, b) {
        console.log(a - b);
    }
}

function Cat() {
    this.showAdd = function(a, b) {
        console.log(a + b);
    }
}

function Dog() {
    Animal.call(this);
    Cat.call(this);
}

var a = new Dog();
a.showSub(5,3);//2
a.showAdd(5,3);//8

使用两个或者更多的call实现多重继承
call和apply这两个方法差不多,区别在于call的第二个参数是任意类型,而apply的第二个参数必须是数组,也可以是arguments
```

## 实现 call(this,arg1,arg2...)

```
Function.prototype.call2 = function(context) {
    console.log(arguments);
    // 如果传入的为null,则指向window
    context = context || window;
    // 函数调用的时候,this指向调用的函数
    context.fn = this;
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    // 解析字符串,执行其中的js代码
    // 获取返回值
    var result = eval('context.fn(' + args + ')');
    // 执行完后将添加的属性删除
    delete context.fn;
    return result;
};


var heo = 'hello world';

var foo = {
    name: 'lili'
}

function func(age, sex) {
    console.log(age);
    console.log(sex);
    console.log(this.name);
    return {
        name: this.name,
        age: age,
        sex: sex,
    }
}
func.call2(null);
console.log(func.call2(foo, 23, '男'))
```

## 实现 apply(this,[])

1. 修改 func 函数的 this 指向
2. 执行 func 函数

```
Function.prototype.newApply = function(context, arr) {
    var result, i, len;
    context = context || window;
    context.fn = this;

    if (!arr) {
        result = context.fn;
    } else {
        var args = [];
        for (i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')');
    }

    delete context.fn;
    return result;
}

var obj = {
    name: 'alice'
}

function func(age, sex) {
    console.log(age);
    console.log(sex);
    console.log(this.name);
    return {
        name: this.name
    }
}

console.log(func.newApply(obj, [23, '女']));
```

## 实现一个 bind => newBind

写程序的一个错误,this 丢失原先的对象,将对象的方法进行赋值之后再执行,于是变成 window.new_showA(),this 指向全局对象 window,

```
    var a = 1;
    var obj = {
        a: 11,
        showA: function () {
            console.log(this.a);
        }
    };
    obj.showA();
    var new_showA = obj.showA;

    new_showA(); //1
```

所以此时需要修改 this 指向

```
var new_showA = obj.showA.bind(this);

new_showA(); //1
```

实现 bind 方法

```
    Function.prototype.newBind = function (context) {
        //this是该函数的调用者
        var self = this;
        //arguments.slice(1),从1开始截取数组
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            // 第二个arguments是返回的函数的参数
            var bindargs = Array.prototype.slice.call(arguments);
            return self.apply(context, args.concat(bindargs));
        }
    };

    var a = 9;

    var obj = {
        a: 99,
        showA: function (name, age) {
            console.log(this.a);
            console.log(name);
            console.log(age);
        }
    };
    obj.showA('alice', 12);
    var new_showA = obj.showA.newBind(obj, 'lilith');

    new_showA(23); //相当于执行obj.showA.apply(obj);
```

## new 运算符

创建新实例，必须使用 new 操作符。

#### new 干了什么

1. 获取构造函数
2. 通过 Object.create 生成新对象
3. 将 this 修改为新对象 obj,执行构造函数
4. 将新对象返回

```
<!--Object.create类似于-->
function Func(){};
Func.prototype = Constructor.prototype;
return new Func();
```

#### new 运算符的简易实现

```
    function Animal(name, age) {
        this.name = name;
        this.age = age;
        this.voice = 'miao';
    }

    Animal.prototype.type = 'mao';

    Animal.prototype.saying = function () {
        console.log(this.voice);
    };

    var cat = _new(Animal, 'mimi', 10);

    console.log('instance =>', cat);
    console.log({
        name: cat.name,
        age: cat.age,
        type: cat.type
    });

    cat.saying();


    function _new() {
        // 将伪数组arguments从头部删除一个,并将其其返回,此处是为了获取传入的构造函数
        var Constructor = Array.prototype.shift.call(arguments);
        // obj.__proto__指向创建obj的函数的原型,也就是function Object(){}的原型,obj是一个实例对象,没有prototype属性
        var obj = Object.create(Constructor.prototype);
        var result = Constructor.apply(obj, arguments);
        // 如果构造函数有返回值,做一下处理,如果返回的是对象,就返回对象,否则该是什么就是什么
        return typeof result === 'object' ? result : obj;
    }
```

## Docs

- [mdn - 继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [mdn-对象原型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)
- [Object.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
- [JavaScript 中创建对象的 7 种模式详解](https://www.javascriptcn.com/read-1887.html)
- [冴羽的博客](https://github.com/mqyqingfeng/Blog)
- [JavaScript 也有了类（class）的概念](http://mp.weixin.qq.com/s?__biz=MzA3MDg1NzQyNA==&mid=2649654128&idx=1&sn=8db43d5df6ca2a55617160efee1774a4&scene=23&srcid=0804QTI712N1AF32lQ2Eu2jq#rd)
- [ES6 为对象做了哪些扩展](http://mp.weixin.qq.com/s?__biz=MzA3MDg1NzQyNA==&mid=2649654084&idx=1&sn=e56effc319f448f5744970e767997461&scene=21#wechat_redirect)
- [面向对象的讲解](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)
- [深入理解 javascript 原型和闭包系列](https://www.cnblogs.com/wangfupeng1988/p/4001284.html)
- [JavaScript 面向对象框架 ease.js](https://www.oschina.net/p/ease-js)
- [easejs 官网](https://www.gnu.org/software/easejs/)
