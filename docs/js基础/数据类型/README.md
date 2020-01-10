## 数据类型

- 基础数据类型：数据存在栈中。
- 引用数据类型：数据存储堆中。

#### 基础数据类型(primitive type)

```
graph LR
基础数据类型-->undefined未定义
基础数据类型-->string字符
基础数据类型-->number数字
基础数据类型-->boolean布尔
基础数据类型-->null空
```

- 基础数据类型是按值访问，可以直接操作保存在变量中的值
- 基础数据类型是将值保存在变量对象之中
- 基础数据类型进行赋值的时候，实际上是赋的一个新值，两个变量互不干扰

#### 引用数据类型(object type)

```
graph LR
引用数据类型-->Object
引用数据类型-->Array
引用数据类型-->Function
引用数据类型-->Date
引用数据类型-->Error
```

- 引用数据类型的值是保存在堆内存的一个对象
- 堆内存并无法直接访问，操作对象的时候操作的是对象的引用
- 可以多个变量指向同一个地址，其中一个指向改变值，其他的指向都改变

## 判断变量的数据类型

#### typeof

- typeof 返回的类型都是字符串类型
- typeof 可以查看变量的数据类型
- typeof 在判断非 object 类型的变量时十分方便

#### instanceof

- instanceof 判断已知对象类型的方法
- instanceof 对类型的大小写敏感

#### contrucetor

- construcetor 是根据对象的 contructor 属性进行判断

#### prototype

- prototype 是一个通用方法,返回的值是一个字符,除了 null、undefined 之外任何值都有 toString()方法

```
window.onload = function () {
var a = 'abc';
var b = 10;
var c = true;
var d = undefined;
var e = null;
var f = new Object();
var g = function () { alert('123'); };
var h = new Error();
var i = new Date();
var j = [1,2,3];
//typeof
console.log("typeof进行类型判断！！！！");
console.log(typeof a);//string
console.log(typeof b);//number
console.log(typeof c);//boolean
console.log(typeof d);//undefined
console.log(typeof e);//object
console.log(typeof f);//object
console.log(typeof g);//function
console.log(typeof h);//object
console.log(typeof i);//object
console.log(typeof j);//object
console.log(typeof a === 'string');//true
//instanceof
console.log("instanceof进行类型判断！！！！");
console.log(e instanceof Object);//false???
console.log(f instanceof Object);//true
console.log(g instanceof Function);//true
console.log(h instanceof Error);//true
console.log(i instanceof Date);//true
console.log(j instanceof Array);//true
//contructor
console.log("construetor进行类型判断！！！！");
console.log(f.constructor === Object);//true
console.log(g.constructor === Function);//true
console.log(i.constructor === Date);//true
console.log(j.constructor === Array);//true
console.log(f.constructor);//function Object() {}
console.log(g.constructor);//function Function() {}
console.log(i.constructor);//function Date() {}
console.log(j.constructor);//function Array() {}
//prototype
console.log("prototype进行类型判断！！！！");
console.log(Object.prototype.toString.call(a) === '[object String]');//true
console.log(Object.prototype.toString.call(b));//[object Number]
console.log(Object.prototype.toString.call(c));//[object Boolean]
console.log(Object.prototype.toString.call(d));//[object Undefined]
console.log(Object.prototype.toString.call(e));//[object Null]
console.log(Object.prototype.toString.call(f));//[object Object]
console.log(Object.prototype.toString.call(g));//[object Function]
console.log(Object.prototype.toString.call(h));//[object Error]
console.log(Object.prototype.toString.call(i));//[object Date]
console.log(Object.prototype.toString.call(/a/g));//[object RegExp]
console.log(Object.prototype.toString.call(j));//[object Array]
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]
console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
};
```

## 数据类型转换

### 强制转换(显式转换)

#### parseInt 字符转整型

转整数，干掉小数
从左到右找能转的转
转换失败 返回 NaN
.忽略字符前导 0
.忽略字符前导空格
8 进制转 10

#### parseFloat 整型转字符

转小数
遇整数，转整数
从左到右找能转的转
转换失败 返回 NaN
忽略字符前导 0
忽略字符前导空格
8 进制转 10

#### Number

严格型转换： 先找不能转的情况，找到返回 NaN
其他特征同 parseFloat

### 隐式类型转换

- "+"运算符是拼接,字符拼接上任何数据都是字符 将 数字 -> 字符 200 + '3'
- " - ", " \* ", " / ", " % ", "++", " -- " 将 字符-> 数字 '200' - 3
- > < 数字的比较 、字符串的比较
- "!"将右边的数据类型转成布尔值并且取反
- "=="只要内容相等就相等 而 "==="内容相等并且数据类型要相等才算相等

```
window.onload = function () {
//强制转换
var a = '+100.5';
var b = true;
var c = ' ';
var d = [1];
var d2 = [1,2];
var e = null;
var f = 200;
var g = '12.34元';
var h = {};
var i = undefined;
var j = function() {alert("123");};
console.log((a+100));//'+100.5100' string
console.log(Number(a));//100.5 number
console.log(Number(b));//1
console.log(Number(c));//0
console.log(Number(d));//1
console.log(Number(d2));//NaN
console.log(Number(e));//0
console.log(Number(h));//NaN
console.log(Number(i));//NaN
console.log(Number(j));//NaN
console.log(parseInt(a));//100 number
console.log(parseFloat(a));//100.5 number
console.log(parseFloat(f));//200 number
console.log(parseFloat(g));//12.34 number
//隐式转换
console.log("开始隐式转换");
var a = '100';
var b = 50;
var c = '200';
var d = 100;
console.log(typeof (a+b));//string 10050
console.log(typeof (b-a));//number -50
console.log(typeof (b*a));//number 5000
console.log(typeof (b/a));//number 0.5
console.log(typeof (b%a));//number 50
console.log(typeof ++a);//number 101
console.log(a>b);
console.log(typeof !b);
console.log(typeof (a==b));
};
```
