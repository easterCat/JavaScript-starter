## 类
```
graph LR
类-->构造函数
类-->prototype对象
类-->instanceof运算符
类-->constructor属性
类-->isPrototypeOf方法
类-->hasOwnProperty方法
类-->__proto__属性
类-->toString方法
类-->对象
```

#### 对象

###### 一切引用类型都是对象
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

>判断值类型的用typeof，判断引用类型的用instanceof

###### 对象就是一些属性集合
```
var obj = {
    a:10,
    b:function (){},
    c:function (){}
}
```
对象里面一切都是属性，方法也是属性，以键值对的形式表现出来

###### 函数定义属性
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

###### 对象都是通过函数创建的
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

>对象是函数创建的，函数是一种对象

#### 函数和对象的关系

###### 函数就是对象的一种
```
var func = function (){};
console.log(func instanceof Object); // true
```
###### 对象都是通过函数进行创建的
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

#### new干了什么事：
1. this=new Object()
2. 该对象继承constructor的prototype
3. return this

#### 构造函数与原型prototype
构造函数对于每一个实例对象，属性和方法都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，多占用一些内存。这样既不环保，也缺乏效率让属性和方法在内存中只生成一次，然后所有实例都指向那个内存地址，这时候就要使用
prototype——原型  模子,里面放了公用的方法 
>（Javascript规定，每一个构造函数都有一个prototype属性，指向原型对象。这个对象的所有属性和方法，都会被构造函数的实例继承）
#### prototype原型
- 函数是一种对象，每一个函数都自动拥有有prototype属性
- prototype属性是一个对象(==属性的集合==)，默认有一个不可枚举的constructor属性，指向函数本身


```
graph TB
func-->|每一个函数都有prototype属性| func.prototype
func.prototype-->|默认有constructor| func.prototype.constructor
func.prototype.constructor-->|构造函数指向函数本身| func
```

###### isPrototypeOf判断一个对象象是否为一个实例的原型
```
  console.log(a.prototype.isPrototypeOf(b));
  console.log(b.prototype.isPrototypeOf(b));
```

###### hasOwnProperty判断对象是否有某个特定的自有属性
```
console.log(a.hasOwnProperty('name'));//true
console.log(b.hasOwnProperty('name'));//true
console.log(a.hasOwnProperty('alertA'));//false
console.log(b.hasOwnProperty('alertB'));//false
```

###### propertyIsEnumerable方法返回一个布尔值，表明指定的属性名是否是当前对象可枚举的自身属性
```
for(var key in obj) {
    f(obj.propertyIsEnumerable(key) {
        <!--do somethings-->
    };
};
```
>- 判断给定的属性是否可以用 for...in 语句进行枚举同时也是对象的自有属性。
>- for ... in 枚举是包含原型链上的属性的，propertyIsEnumerable作用于原型方法上时，始终是返回false的
>- for...in可以枚举对象本身的属性和原型上的属性，而propertyIsEnumerable只能判断本身的属性是否可以枚举
>- 预定义的属性不是可列举的，而用户定义的属性总是可列举的。所以如果你只想遍历对象本身的属性

#### 原型链
- 访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。
- 当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，如果没有找到，就到其原型对象上找，如果还没有找到，就一直上溯到Object.prototype对象，最后，如果还没有找到，就只能返回undefined。


#### 隐式原型__proto__

###### 每个对象都已一个__proto__,指向创建这个对象的函数的prototype
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
- Object.prototype对象的__proto__指向的是null，特例
- xxx.prototype是一个对象
- Function和Object是由Function创建的,__proto__指向Fcuntion.prototype
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
- Function.prototype/Phone.prototype/obj/Array.prototype原型对象都是由function Object创建的，所以指向Object的原型对象
- Phone,Function和Object是由function Function创建的，所以指向Function的原型对象
- Object是由Fucntion创建,而Function的原型对象是由Object创建

### constructor属性
- constructor属性的值是一个函数对象
- 任意函数的fuc.prototype.constructor === fuc
- 原型的constructor指向构造函数，实例constructor同样指向构造函数
##### 方法1
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
>上面的方法相当于重写Ba.prototype对象,新定义的原型对象不包含constructor,因此构造函数指向的function Object(){},需要显式的给原型添加构造函数

>虽然实例对象的constructor和构造函数原型的constructor都指向构造函数，但是实例对象并不具有constructor这个属性，是继承至Ba.prototype
```
console.log(ba.hasOwnProperty('constructor')); //false
console.log(Ba.prototype.hasOwnProperty('constructor')); //true
```


```
graph LR
instance_b.constructor-->|实例的构造函数| Ba
Ba.prototype.constructor-->|原型对象的构造函数| Ba
```




###### 修改
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
##### 方法2,直接在预定义的原型对象上扩展
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
- 检测对象是否属性某个类 A instanceof B（验证原型对象与实例对象之间的关系	判断具体类型）
- Instanceof的判断队则是：沿着A的__proto__这条线来找，同时沿着B的**prototype**这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。
- instanceof表示的就是一种继承关系，或者原型链的结构
- instanceof不光能找直接的父级，能找父级的父级的...constructor	只能找直接的父级
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

//b得prototype对象指向一个c的实例，那么所有的b的实例就能继承c

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

#### 继承：父级有的，子级也有——给父级加东西，子级也有
- 第一种方法也是最简单的方法，使用call或apply方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行
```
 Animal.apply(this, arguments);
                   Animal.call(this, arguments);
```
- 第二种方法更常见，使用prototype属性。如果"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了。
```
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
```




#### EcmaScript6的扩展
[JavaScript也有了类（class）的概念](http://mp.weixin.qq.com/s?__biz=MzA3MDg1NzQyNA==&mid=2649654128&idx=1&sn=8db43d5df6ca2a55617160efee1774a4&scene=23&srcid=0804QTI712N1AF32lQ2Eu2jq#rd)


[ES6为对象做了哪些扩展](http://mp.weixin.qq.com/s?__biz=MzA3MDg1NzQyNA==&mid=2649654084&idx=1&sn=e56effc319f448f5744970e767997461&scene=21#wechat_redirect)


[面向对象的讲解](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)

##### call方法
- 调用call的对象必须是个函数
- 语法：call([thisObj[,arg1[, arg2[,   [,.argN]]]]]) 
- 定义：一个对象的一个方法调用call，以call方法的第一个参数替换当前对象。 
- 说明：call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。 
如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj

##### apply方法
- 语法：apply([thisObj[,argArray]]) 
- 定义：应用某一对象的一个方法，用另一个对象替换当前对象。 
- 说明：如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。 
如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。

>实现继承除了用call和apply还可以使用原型链实现

###### 案例一
```
function add(a+b){
    alert(a+b);
}
function sub(a,b){
    alert(a-b);
}
add.call(sub,3,1);

//个人理解call和apply的作用就是切换函数的对象上下文

解：用括号的第一个参数来代替this的指向，将add的执行的上下文由window切换为sub，相当于this指向由window换成sub，add.call(sub,3,1) == add(3,1),结果为alert(4);
注意 : js中的函数是对象，函数名是对Function对象的引用 
```
###### 案例二
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

###### 案例三：实现继承
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

注意：Animal.call(this);是使用Animal对象代替this对象，
this指向Animal，Cat就有了Animal对象中的方法和属性，Cat对
象就可以直接调用Animal对象的方法和属性
call第二个参数开始会映射到Animal相应的参数位置
```

###### 案例四：多重继承
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
call和apply这两个方法差不多，区别在于call的第二个参数是任意类型，而apply的第二个参数必须是数组，也可以是arguments
```

#### 实现func.call(this,arg1,arg2...)
```
Function.prototype.call2 = function(context) {
    console.log(arguments);
    // 如果传入的为null，则指向window
    context = context || window;
    // 函数调用的时候，this指向调用的函数
    context.fn = this;
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    // 解析字符串，执行其中的js代码
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

#### 实现func.apply(this,[])
1. 修改func函数的this指向
2. 执行func函数
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

#### this指向
写程序的一个错误，this丢失原先的对象，将对象的方法进行赋值之后再执行，于是变成window.new_showA(),this指向全局对象window，
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
所以此时需要修改this指向
#### Function.prototype.bind
```
var new_showA = obj.showA.bind(this);

new_showA(); //1
```

#### 实现一个bind => newBind
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

#### new运算符的简易实现
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
        // 将伪数组arguments从头部删除一个，并将其其返回,此处是为了获取传入的构造函数
        var Constructor = Array.prototype.shift.call(arguments);
        // obj.__proto__指向创建obj的函数的原型,也就是function Object(){}的原型,obj是一个实例对象，没有prototype属性
        var obj = Object.create(Constructor.prototype);
        var result = Constructor.apply(obj, arguments);
        // 如果构造函数有返回值，做一下处理，如果返回的是对象，就返回对象，否则该是什么就是什么
        return typeof result === 'object' ? result : obj;
    }
```
#### new干了什么
1. 获取构造函数
2. 通过Object.create生成新对象
```
<!--Object.create类似于-->
function Func(){};
Func.prototype = Constructor.prototype;
return new Func();
```
3. 将this修改为新对象obj，执行构造函数
4. 将新对象返回

## Docs

[JavaScript中创建对象的7种模式详解](https://www.javascriptcn.com/read-1887.html)
[冴羽的博客](https://github.com/mqyqingfeng/Blog)