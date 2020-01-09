#### 方法
```
graph LR
Array-->Array.prototype.indexOf
Array-->Array.prototype.reverse
Array-->Array.prototype.sort
Array-->|浅复制数组的一部分到同一数组中的另一个位置,并返回它|Array.prototype.copyWithin
Array-->|返回一个新的Array Iterator对象|Array.prototype.entries
Array-->|测试数组的所有元素是否通过了函数的测试|Array.prototype.every
Array-->|用一个值填充数组从始到终的全部元素|Array.prototype.fill
Array-->Array.prototype.filter
Array.prototype.filter-->返回一个通常测试的新数组
Array.prototype.filter-->不会改变原数组
Array.prototype.filter-->callback[,thisArg]
Array-->|返回满足测试函数的第一个元素的值|Array.prototype.find
Array-->|返回满足测试函数的第一个元素的索引|Array.prototype.findIndex
Array-->|对数组的每个元素执行一次提供的函数|Array.prototype.forEach
Array-->|判断一个数组是否包含一个指定的值|Array.prototype.includes
Array-->|将数组或类数组的元素连接到一个字符串|Array.prototype.join
Array-->|返回一个新的Array迭代器,它包含数组中每个索引的键|Array.prototype.keys
Array-->|返回指定元素在数组最后一个的索引|Array.prototype.lastIndexOf
Array-->|数组中的每个元素都调用函数后返回的结果|Array.prototype.map
Array-->|累加器和数组中的每个元素应用一个函数,将其减少为单个值|Array.prototype.reduce
Array-->|同reduce,区别是从右向左|Array.prototype.reduceRight
Array-->|测试数组中的某些元素是否函数测试|Array.prototype.some
Array-->|返回一个字符串表示数组中的元素|Array.prototype.toLocalString
Array-->Array.prototype.toSource
Array-->|返回一个字符串,表示指定的数组及其元素|Array.prototype.toString
Array-->Array.prototype.values
```

```
graph LR
Array-->|从类数组或可迭代对象中创建新的数组| Array.from
Array-->|确定传递的值是否是一个 Array| Array.isArray
Array-->|创建具有可变数量参数的新数组| Array.of
```

```
graph LR
Array-->Array.prototype.unshift
Array.prototype.unshift-->从头部添加一条或多条数据
Array.prototype.unshift-->unshift原数组修改
Array.prototype.unshift-->返回值是添加后的数组长度

Array-->Array.prototype.pop
Array.prototype.pop-->从尾部删除一条数据
Array.prototype.pop-->返回被删除的数据
Array.prototype.pop-->传入参数无效
Array.prototype.pop-->pop原数组修改

Array-->Array.prototype.shift
Array.prototype.shift-->从头部删除一条数据
Array.prototype.shift-->返回值是删除的数据
Array.prototype.shift-->原数组修改

Array-->Array.prototype.push
Array.prototype.push-->从尾部推入
Array.prototype.push-->push原数组修改
Array.prototype.push-->返回值是推入后的数组长度
Array.prototype.push-->可以同时推入多个数据
```

```
graph LR
Array-->|合并两个或多个数组,返回新数组|Array.prototype.concat
Array.prototype.concat-->数组+数组=string
Array.prototype.concat-->原数组不修改,返回新数组
Array.prototype.concat-->拼接的数据可以是数组/数字/字符

Array-->Array.prototype.splice
Array.prototype.splice--> splice返回一个新数组,值为删除的数据
Array.prototype.splice-->可以插入一个或多个数据,也可以不插入
Array.prototype.splice-->原数组会修改,一般数组删除可以用splice
Array.prototype.splice-->参数:起点,要删除的个数,要插入的数据
Array.prototype.splice-->可以模拟pop,push,shift,unshift

Array-->Array.prototype.slice
Array.prototype.slice-->返回截取数据的新数组
Array.prototype.slice-->参数可以为负值
Array.prototype.slice-->原数组不变
Array.prototype.slice-->最后的一位并不包括
```
#### 数组是引用类型
- 引用类型：值不保存在变量本地的数据类型：当赋值的时候会改变，一变全变
- 基本类型：赋值时候，相当于重新开辟了一个内存空间，因此改变值的时候并不对其他赋值对象有影响，只改变自己


#### 数组遍历
- for实现正序倒序遍历
```
//遍历数组
var arr = [15, 38, 27, 57];
for (var i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
}
//倒序(循环体中有删除数组元素操作一定要用倒序)
for (var j = arr.length - 1; j >= 0; j--) {
    console.log(arr[j]);
}

//for...in:拿出的是索引
for (var a in arr) {
    console.log(a + '==>' + arr[a]);
}

//forEach()
arr.forEach(function (value, key) {
    console.log(key + '==>' + value);
})

//map()
arr.map(function (item, index, own) {
    //own是数组本身
    console.log(index + '==>' + item)
})
```
#### 数组去重
- 1. 传统方法
- 2. 对象键值的方法(hash)
- 3. es6的Set和Map

#### 数组展开
- 1.传统遍历
- 2.toString转字符串
- 3.reduce
- 4.es6扩展运算符 ...

#### 数组创建
```
//var arr = new Array();一般不用
var arr = [12, 5, 'bmw'];
arr.length = 2;	//数组的长度是可以修改的，伪数组就不可以
for (var i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
}
console.log(arr[2]);
console.log(arr);
//伪数组也可以遍历，也获取index，也有length，但是没有方法，终究不是数组
```

#### 数组反转Array.prototype.reverse
```
var arr = ['i', 'love', 'you'];
var new_arr = arr.reverse();
console.log(arr);   // ["you", "love", "i"] 会修改原数组
console.log(new_arr);	//["you", "love", "i"]

//       用pop实现一下
var arr2 = ['i', 'love', 'you'];
var null_arr = [];
for (var i = 0, len = arr2.length; i < len; i++) {
    var a = arr2.pop();
    null_arr.push(a);
}
console.log(null_arr);//["you", "love", "i"]

//        用shift实现一下
var arr3 = ['i', 'love', 'you'];
var null_arr2 = [];
for (var i = 0, len = arr3.length; i < len; i++) {
    var a = arr3.shift();
    null_arr2.unshift(a);
}
console.log(null_arr2);//["you", "love", "i"]

//        for循环实现一下
var arr4 = ['i', 'love', 'you'];
var null_arr3 = [];
for (var i = arr4.length - 1; i >= 0; i--) {
    null_arr3.push(arr4[i]);
}
console.log(null_arr3);//["you", "love", "i"]
```
1. Array.reverse会修改原数组
2. 引用类型拷贝需要深拷贝


#### 数组排序Array.prototype.sort
```
var arr1 = ['width', 'height', 'alpha', 'opacity'];
var arr2 = [123, 563, 3511, 634, 455];
arr1.sort();
arr2.sort();
console.log(arr1);// ["alpha", "height", "opacity", "width"]
console.log(arr2); // [123,563,351,634,455]按照unicode编码的顺序进行排序

arr2.sort(function (a, b) {
    return a - b;
});
console.log(arr2);//[123, 455, 563, 634, 3511]

arr2.sort(function (a, b) {
    return b - a;
});
console.log(arr2);//[3511, 634, 563, 455, 123]
```
1. 默认的排序是按照字符编码的顺序进行排序

#### 字符串和数组
- split字符串转数组
- join数组转字符串
- toString数组转字符串

#### 复制数组
1. var newArr=arr.concat(); 拼接自己，起到复制的作用
2. ：var newArr=arr.slice(0)，slice是截取数组，从0开始截取相当于全部截取，也就是复制