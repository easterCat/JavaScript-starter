## let 和 const

#### let 是块级作用域

###### let 声明的变量只在其所在的作用域内生效

```
  <script>
    {
      var today = "周3";
      let yesterday = "周2";
    }
    console.log(today); //周3
    console.log(yesterday); //yesterday is not defined
  </script>
```

之前在做保存局部变量的时候，都是通过闭包将当前的变量保存到就近的作用域链中。而使用 let 就不用了，let 声明的变量只在比如

```
    for (var i = 0; i < 10; i++) {
      a[i].onclick = function() {
        console.log(i); //10
      };
    }
    console.log(i); //10
```

let 只在本次循环也就是块级作用域中有效

```
    for (let i = 0; i < 10; i++) {
      a[i].onclick = function() {
        console.log(i); //1,2,3,4,5....
      };
    }
    console.log(i); //i is not defined
```

> 在 for 循环中，设置变量 let i = xxx 是一个父级作用域，而内部执行代码是一个单独的子级作用域

###### let 没有变量提升

一般语言都是先声明后使用，如果没声明使用是错误的，但是 js 不同，即使没有声明一个变量，也可以直接使用，默认赋值是一个 undefined，这就是变量提升
而 let 修正了这一语法

```
    console.log(a); //undefined
    console.log(b); //b is not defined
    var a = 1;
    let b = 2;
```

> 函数上下文在初始化过程中，会创建变量对象，此时已经对变量进行声明，等到执行的时候，其实变量已经声明过了，=的时候并不是声明，而是一个赋值的过程`var a; ...code...; a = 1`

###### 暂时性死区

es6 中规定，当区块中存在 let 和 const 声明，则这一区块对 let 和 const 声明的变量一开始就形成了封闭的作用域，只要在声明之前调用，不管干什么都会报错。

```
    function abc() {
      a = 1; // ReferenceError: a is not defined
      typeof a; // ReferenceError: a is not defined
      let a = 2;
    }
    abc();
```

只要一进入当前作用域，所要使用的变量就已经存在，但是不可获取，只有在声明的一行语句出现之后，才可以使用该变量

###### 不允许重复声明变量

let 声明不允许在相同作用域内声明相同的变量

```
    function abc() {
      let a = 1;
      // var a = 1;
      // const a = 1;
      let a = 2; //SyntaxError: Identifier 'a' has already been declared
    }
    abc();
```

###### 块级作用域

1. 外部代码块不受内部代码块的影响（防止内部变量改变外部变量，或者内部变量泄露为全局变量）
2. 外部代码块无法读取内部代码块的变量
3. 内部代码块可以定义与外部代码块同名变量{let a = 1 { let a = 2}}

```
    {
      let a = 1;
      console.log(a);
      {
        let a = 2;
        console.log(a);
        {
          let a = 3;
          console.log(a);
        }
      }
    }
```

###### 块级作用域和函数声明

es6 中规定函数声明的行为类似于 let，在块级作用域之外不可引用,但是为了兼容之前的旧有的代码，浏览器环境先使用的是不同的规则

1. 允许在块级作用域声明函数
2. 函数声明类似于 var，函数声明会提升到全局作用域或函数作用域顶部
3. 同时函数声明还会提升到所在块级作用域的顶部

```
    function aaa() {
      console.log("out");
    }

    (function() {
      if (false) {
        function aaa() {
          console.log("inner");
        }
      }
      // aaa(); //Uncaught TypeError: aaa is not a function
    })();
    aaa(); //out
```

实际使用上就类似于 var 的行为了

###### const 声明常量

const 用来声明一个常量，常量的值一旦声明就不可改变。

```
    const a = 1;
    a = 3; //Uncaught TypeError: Assignment to constant variable.
```

const 声明常量，需要立即初始化，不能留到之后赋值

```const a;
    a = 1;//Uncaught SyntaxError: Missing initializer in const declaration
```

const 和 let 类似，只在声明的块级作用域之中有效。const 常量声明的变量也会存在暂时性死区。
同时，对简单数据类型来说，值保存在变量所指向的内存地址中，等同于常量。而对于引用类型比如数组，对象等，const 只能保证变量所指向指针是固定不变的，但是数据结构无法保证是否可变

```
    const ob = {};
    ob.name = "aaaa";
    console.log(ob); //Object {name: "aaaa"}

    const arr = [];
    arr.push("123123");
    console.log(arr); //["123123"]
```

> 使用 object.freeze()可以将对象冻结
> let,const,class 声明的全局变量不属于顶层对象（window，global）的属性

## 变量的结构赋值

解构就是按照一定模式从数组和对象中提取值，然后对变量进行赋值

###### 数组按照对应位置提取赋值

```
    let [a, b, c] = [1, 2, 3];
    console.log(c); //3

    //嵌套赋值
    let [a, [[b], c]] = [1, [[2], 3]];
    console.log(b);

    //其他类型
    let [, , c] = [1, 2, 3];
    let [a, , c] = [1, 2, 3];
    let [a, ...b] = [1, 2, 3, 4]; // b = [2,3,4]
```

###### 如果结构不成功，就会赋值 undefined

```
    let [a,b,...c] = [1];
    console.log(a) //1
    console.log(b) //undefined
    console.log(c) //[]
```

- 等号左边的只匹配一部分等号右边的，是不完全解构，可以成功
- 等号右边的只转为对象后不具有 Interator 接口或者本身不具备 Interator 接口，解构报错
- 只要数据结构具有 Interator 接口，就能使用数组形式的解构赋值

###### 解构赋值可设默认值

```
    let [a, b = 2] = [1];
    console.log(a);//1
    console.log(b);//2
    let [a, b = 2] = [1, undefined];
    console.log(a);//1
    console.log(b);//2
```

es6 内部使用===判断是否有值，如果一个成员不严格等于 undefined，默认值是不生效的
比如 null,null 不严格等于 undefined。默认值可以是一个表达式

###### 对象解构赋值

数组的解构赋值是按次序进行的，而对象的解构没有次序，要找到同名的属性才可得到值

```
    let { a, b } = { a: "123", b: "456" };
    console.log(a); //123
```

如果想要变量名和属性名不一样

```
    let { a: d, b } = { a: "123", b: "456" };
    console.log(d); //123
```

> a 相当于是匹配的模式，而 b 才是实际赋值的变量

###### 对象的嵌套赋值

```
    let {
      p,
      p: [x, { y }]
    } = { p: ["hello", { y: "world" }] };
    console.log(p);//["hello", Object]
    console.log(x);//hello
    console.log(y);//world
```

###### 对象也可以设置默认值

```
    let {a=3} = {}
    console.log(a)//3
    let { a = 3 } = { a: null };
    console.log(a); //null
```

> 默认值生效条件是，对象属性值严格等于 undefined。解构失败，变量的值为 undefined

###### 其他的解构赋值

```
    //字符串
    const [a, b, c ] = "hello";
    console.log(a); //h
    console.log(b); //e
    console.log(c);//l

    //数值和布尔
    let { toString: s } = 123;
    console.log(s === Number.prototype.toString); //true
```

> 解构的规则是，只要等号右边的值不是对象或者数组，就先将其转为对象，但是 undefined 和 null 无法转为对象，就无法解构赋值

###### 函数参数解构

```
function abc([a,b]) {}
abc([1,2])
```

###### 作用

1. 快速交换变量值
2. 从函数返回多个值
3. 函数参数快速定义
4. 提取 json 的数据
5. 函数参数设置默认是
6. 遍历 map 结构
7. 输入模块指定方法

## 字符串扩展

###### 字符的 Unicode 表示法

###### codePointAt()

###### String.fromCodePoint()

###### 遍历器接口可使用 for...of

###### at()

###### normalize()

###### include(),startsWith(),endsWith()

###### repeat

###### padStart(),padEnd()

###### 模板字符串

###### String.raw()

## 正则的扩展

###### RegExp 构造函数
###### 字符串的正则方法
###### u 修饰符
###### RegExp.prototype.unicode 属性
###### y 修饰符
###### RegExp.prototype.sticky 属性
###### RegExp.prototype.flags 属性
###### s 修饰符：dotAll 模式
###### 后行断言
###### Unicode 属性类
###### 具名组匹配
###### String.prototype.matchAll

## 数值的扩展

###### 二进制和八进制表示法
###### Number.isFinite(), Number.isNaN()
###### Number.parseInt(), Number.parseFloat()
###### Number.isInteger()
###### Number.EPSILON
###### 安全整数和 Number.isSafeInteger()
###### Math 对象的扩展
###### 指数运算符

## 函数的扩展

###### 函数参数的默认值
###### rest 参数
###### 严格模式
###### name 属性
###### 箭头函数
###### 双冒号运算符
###### 尾调用优化
###### 函数参数的尾逗号

## 数组的扩展

###### 扩展运算符
###### Array.from()
###### Array.of()
###### 数组实例的 copyWithin()
###### 数组实例的 find() 和 findIndex()
###### 数组实例的 fill()
###### 数组实例的 entries()，keys() 和 values()
###### 数组实例的 includes()
###### 数组实例的 flat()，flatMap()
###### 数组的空位

## 对象的扩展

###### 属性的简洁表示法
###### 属性名表达式
###### 方法的 name 属性
###### 属性的可枚举性和遍历
###### super 关键字
###### 对象的扩展运算符

###### Object.is()
###### Object.assign()
###### Object.getOwnPropertyDescriptors()
###### __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
###### Object.keys()，Object.values()，Object.entries()
###### Object.fromEntries()