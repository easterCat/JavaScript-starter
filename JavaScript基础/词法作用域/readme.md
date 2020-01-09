## 引擎/编译器/作用域

• 引擎,从头到尾负责整个 JavaScript 程序的编译及执行过程。
• 编译器,引擎的好朋友之一，负责语法分析及代码生成等脏活累活(详见前一节的内容)。
• 作用域,引擎的另一位好朋友，负责收集并维护由所有声明的标识符(变量)组成的一系列查 询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

## 作用域

通常来说,一段程序代码中所用到的名字并不总是有效/可用的,而限定这个名字的可用性的代码范围就是这个名字的作用域.

作用域的使用提高了程序逻辑的局部性,增强程序的可靠性,减少名字冲突

## 词法作用域

考虑如下情况：

```
var name = "Chromium";
function init() {
    var name = "Mozilla"; // name 是一个被 init 创建的局部变量
    function displayName() {
    // displayName() 是内部函数,一个闭包
    alert(name); // 使用了父函数中声明的变量
    }
    displayName();
}
init(); // 弹出Mozilla
```

以及

```
var name = "Chromium";
function init() {
    var name = "Mozilla"; // name 是一个被 init 创建的局部变量
    function displayName() {
    // displayName() 是内部函数,一个闭包
     alert(name); // 使用了父函数中声明的变量
    }
    return displayName;
}
init()(); // 弹出Mozilla
```

运行代码可以发现 displayName() 内的 alert() 语句成功的显示了在其父函数中声明的 name 变量的值,js 引擎在预解析阶段就已经把变量对象/作用域链接/this 值解析过了.词法作用域中使用的域,是变量在代码中声明的位置所决定的,遇到既不是形参也不是函数内部定义的局部变量的变量时,去函数声明时的作用域链查询.嵌套的函数可以访问在其外部声明的变量.

我们可以看出这两段代码中 displayName 函数内部并没有定义局部变量,函数内部访问的变量是从作用域链上取值,作用域链是这样的: global scope => init function scope => display function scope,从作用域链上取值最明显的特点就是"就近原则",
Mozilla 离得近,所以取值就是 Mozilla

## 动态作用域

动态作用域不关心它本身是怎样在哪里声明的,只关心它在哪里调用的,动态作用域的域链基于调用栈,而不是代码中的嵌套关系.动态域的函数中遇到既不是形参也不是函数内部定义的局部变量的变量时,到函数调用时的环境中查.

如果处于动态作用域中,下面代码执行输出就是 Chromium

```
var name = "Chromium";
function init() {
    var name = "Mozilla"; // name 是一个被 init 创建的局部变量
    function displayName() {
    // displayName() 是内部函数,一个闭包
    alert(name); // 使用了父函数中声明的变量
    }
    return displayName;
}
init()(); // Chromium
```

首先 init()调用,获取 displayName,然后执行 displayName(),这个时候 dispalyName 是在全局作用域中执行的,内部的 name 变量会在调用的环境中去找,全局作用域下的 name 就是 Chromium.

> 词法作用域关心的是函数在哪里声明的,动态作用域的概念和 js 中的 this 相同,this 也关心函数在哪里调用的.

> eval 和 with 可以产生动态作用域的效果

## 总结

> - 词法作用域：函数在定义的时候决定了函数的作用域,JavaScript 采用词法作用域(静态作用域).静态作用域关心函数在何处被声明.
> - 动态作用域：函数在调用的时候决定函数的作用域,目前只有部分语言支持.动态作用域关心函数在何处被调用.

## Doc

- [You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/scope%20%26%20closures/ch2.md)
- [MDN - Closures](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
- [浅谈静态作用域和动态作用域](https://www.cnblogs.com/lienhua34/archive/2012/03/10/2388872.html)
- [细说 JavaScript 词法作用域与动态作用域](https://www.imooc.com/article/17985)
- [动态作用域和词法域的区别是什么？](https://www.zhihu.com/question/20032419)
- [JavaScript 夯实基础系列（一）：词法作用域](https://www.cnblogs.com/lidengfeng/p/9117408.html)
