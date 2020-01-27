## Map

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

```
new Map([iterable])
```

> 参数 Iterable 可以是一个数组或者其他 iterable 对象，其元素为键值对(两个元素的数组，例如: [[ 1, 'one' ],[ 2, 'two' ]])。 每个键值对都会添加到新的 Map。null 会被当做 undefined。

一个 Map 对象在迭代时会根据对象中元素的插入顺序来进行 — 一个 for...of 循环在每次迭代后会返回一个形式为[key，value]的数组。

## 键的相等性

- 键的比较是基于 sameValueZero 算法：
- NaN 是与 NaN 相等的（虽然 NaN !== NaN），剩下所有其它的值是根据 === 运算符的结果判断是否相等。
- 在目前的 ECMAScript 规范中，-0 和+0 被认为是相等的，尽管这在早期的草案中并不是这样。有关详细信息，请参阅浏览器兼容性 表中的“Value equality for -0 and 0”。

## Objects 和 maps 的比较

Objects 和 Maps 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 Maps 使用。不过 Maps 和 Objects 有一些重要的区别，在下列情况里使用 Map 会是更好的选择：

- 一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值，包括函数、对象、基本类型。
- Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。
- 你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算。
- Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。
- Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。
- Map 在涉及频繁增删键值对的场景下会有些性能优势。

> 注意：虽然 ES5 开始可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。

> 注意：自 ECMAScript 2015 规范以来，对象确实保留了字符串和 Symbol 键的创建顺序； 因此，在只有字符串键的对象上进行迭代将按插入顺序产生键。

## 属性

- Map.length
  - 属性 length 的值为 0 。
  - 想要计算一个 Map 中的条目数量， 使用 Map.prototype.size.
- get Map[@@species]
  - 本构造函数用于创建派生对象。
- Map.prototype
  - 表示 Map 构造器的原型。 允许添加属性从而应用于所有的 Map 对象。

## Map 实例

所有的 Map 对象实例都会继承 Map.prototype。

#### 属性

- Map.prototype.constructor
  - 返回一个函数，它创建了实例的原型。默认是 Map 函数。
- Map.prototype.size
  - 返回 Map 对象的键/值对的数量。

#### 方法

- Map.prototype.clear()
  - 移除 Map 对象的所有键/值对 。
- Map.prototype.delete(key)
  - 如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false。随后调用 Map.prototype.has(key) 将返回 false 。
- Map.prototype.entries()
  - 返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的 [key, value] 数组。c
- Map.prototype.forEach(callbackFn[, thisArg])
  - 按插入顺序，为 Map 对象里的每一键值对调用一次 callbackFn 函数。如果为 forEach 提供了 thisArg，它将在每次回调中作为 this 值。
- Map.prototype.get(key)
  - 返回键对应的值，如果不存在，则返回 undefined。
- Map.prototype.has(key)
  - 返回一个布尔值，表示 Map 实例是否包含键对应的值。
- Map.prototype.keys()
  - 返回一个新的 Iterator 对象， 它按插入顺序包含了 Map 对象中每个元素的键 。
- Map.prototype.set(key, value)
  - 设置 Map 对象中键的值。返回该 Map 对象。
- Map.prototype.values()
  - 返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的值 。
- Map.prototype[@@iterator]()
  - 返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的 [key, value] 数组。

## Map 使用

#### 使用 Map 对象

```js
let myMap = new Map();

let keyObj = {};
let keyFunc = function() {};
let keyString = "a string";

// 添加键
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");

myMap.size; // 3

// 读取值
myMap.get(keyString); // "和键'a string'关联的值"
myMap.get(keyObj); // "和键keyObj关联的值"
myMap.get(keyFunc); // "和键keyFunc关联的值"

myMap.get("a string"); // "和键'a string'关联的值"
// 因为keyString === 'a string'
myMap.get({}); // undefined, 因为keyObj !== {}
myMap.get(function() {}); // undefined, 因为keyFunc !== function () {}
```

#### 将 NaN 作为 Map 的键

NaN 也可以作为 Map 对象的键。虽然 NaN 和任何值甚至和自己都不相等(NaN !== NaN 返回 true)，但下面的例子表明，NaN 作为 Map 的键来说是没有区别的:

```js
let myMap = new Map();
myMap.set(NaN, "not a number");

myMap.get(NaN); // "not a number"

let otherNaN = Number("foo");
myMap.get(otherNaN); // "not a number"
```

#### 使用 for..of 方法迭代 Map

Map 可以使用 for..of 循环来实现迭代：

```js
let myMap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");
for (let [key, value] of myMap) {
  console.log(key + " = " + value);
}
// 将会显示两个 log。一个是"0 = zero"另一个是"1 = one"

for (let key of myMap.keys()) {
  console.log(key);
}
// 将会显示两个 log。 一个是 "0" 另一个是 "1"

for (let value of myMap.values()) {
  console.log(value);
}
// 将会显示两个 log。 一个是 "zero" 另一个是 "one"

for (let [key, value] of myMap.entries()) {
  console.log(key + " = " + value);
}
// 将会显示两个 log。 一个是 "0 = zero" 另一个是 "1 = one"
```

#### 使用 forEach() 方法迭代 Map

Map 也可以通过 forEach()方法迭代：

```js
myMap.forEach(function(value, key) {
  console.log(key + " = " + value);
});
// 将会显示两个 logs。 一个是 "0 = zero" 另一个是 "1 = one"
```

#### Map 与数组的关系

```js
let kvArray = [
  ["key1", "value1"],
  ["key2", "value2"]
];

// 使用常规的 Map 构造函数可以将一个二维键值对数组转换成一个 Map 对象
let myMap = new Map(kvArray);

myMap.get("key1"); // 返回值为 "value1"

// 使用 Array.from 函数可以将一个 Map 对象转换成一个二维键值对数组
console.log(Array.from(myMap)); // 输出和 kvArray 相同的数组

// 更简洁的方法来做如上同样的事情，使用展开运算符
console.log([...myMap]);

// 或者在键或者值的迭代器上使用 Array.from，进而得到只含有键或者值的数组
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]
```

#### 复制或合并 Maps

Map 能像数组一样被复制：

```js
let original = new Map([[1, "one"]]);

let clone = new Map(original);

console.log(clone.get(1)); // one
console.log(original === clone); // false. 浅比较 不为同一个对象的引用
```

重要：请记住，数据本身未被克隆。

#### Map 对象间可以进行合并，但是会保持键的唯一性。

```js
let first = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"]
]);

let second = new Map([
  [1, "uno"],
  [2, "dos"]
]);

// 合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的。
// 展开运算符本质上是将 Map 对象转换成数组。
let merged = new Map([...first, ...second]);

console.log(merged.get(1)); // uno
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```

#### Map 对象也能与数组合并：

```js
let first = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"]
]);

let second = new Map([
  [1, "uno"],
  [2, "dos"]
]);

// Map 对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。
let merged = new Map([...first, ...second, [1, "eins"]]);

console.log(merged.get(1)); // eins
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```

## doc

- [Map - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
