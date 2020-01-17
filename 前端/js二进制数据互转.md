## 三种格式

- `Blob`是现代浏览器中提供的能够装载二进制流（文件）的容器对象。
- `ArrayBuffer`是能够装载`Blob`（二进制流）数据的原始缓冲区，`ArrayBuffer`不能直接通过 js 读写。
- `TypeArray`是`ArrayBuffer`的一种类数组的视图对象，可以将`ArrayBuffer`按不同字节数读取成类似数组形式的数据类型，从而可以向读写数组元素一样，实现对`ArrayBuffer`数据的读写。常见的`TypeArray`包括`Uint8Array`,`Uint16Array`,`Uint32Array`等。[点这里查看所有的 TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

所以我对三者的理解是： `Blob` &lt;-&gt; `ArrayBuffer` &lt;-&gt; `TypeArray` &lt;—-&gt; `Array`
由于`TypeArray`和`Array`有些相似，因此往往我会选择在`TypeArray`这层做处理。
下面是`TypeArray`、`ArrayBuffer`和`Blob`之间相互转换的方法。

## [](#websocket接收arrayBuffer "websocket接收arrayBuffer")websocket 接收 arrayBuffer

```js
/* websocket的情况下二进制流的获取 */
var svip = "ws://127.0.0.1:8080";
var ws = new WebSocket(svip);
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  var message = e.data;
};
```

## [](#blob轉arrayBuffer "blob轉arrayBuffer")blob 轉 arrayBuffer

```js
var bl = new Blob(); // bl是要转换的blob
var fr = new FileReader();
fr.onload = function() {
  var ab = this.result; // ab是转换后的结果
};
fr.readAsArrayBuffer(bl);
```

## [](#ArrayBuffer-to-Blob-（ArrayBuffer转Blob） "ArrayBuffer to Blob （ArrayBuffer转Blob）")ArrayBuffer to Blob （ArrayBuffer 转 Blob）

```js
var ab = new ArrayBuffer(32);
var blob = new Blob([ab]); // 注意必须包裹[]
```

## [](#ArrayBuffer-to-Uint8-（ArrayBuffer转Uint8数组） "ArrayBuffer to Uint8 （ArrayBuffer转Uint8数组）")ArrayBuffer to Uint8 （ArrayBuffer 转 Uint8 数组）

Uint8 数组可以直观的看到 ArrayBuffer 中每个字节（1 字节 == 8 位）的值。一般我们要将 ArrayBuffer 转成 Uint 类型数组后才能对其中的字节进行存取操作。

```js
var ab = arrayBuffer; // arrayBuffer为要转换的值
var u8 = new Uint8Array(ab);
```

## [](#Uint8-to-ArrayBuffer（Uint数组转ArrayBuffer） "Uint8 to ArrayBuffer（Uint数组转ArrayBuffer）")Uint8 to ArrayBuffer（Uint 数组转 ArrayBuffer）

我们 Uint8 数组可以直观的看到 ArrayBuffer 中每个字节（1 字节 == 8 位）的值。一般我们要将 ArrayBuffer 转成 Uint 类型数组后才能对其中的字节进行存取操作。

```js
var u8 = new Uint8Array();
var ab = u8.buffer; // ab即是u8对应的arrayBuffer
```

## [](#Array-to-ArrayBuffer（普通数组转ArrayBuffer） "Array to ArrayBuffer（普通数组转ArrayBuffer）")Array to ArrayBuffer（普通数组转 ArrayBuffer）

```js
var arr = [0x15, 0xff, 0x01, 0x00, 0x34, 0xab, 0x11];
var u8 = new Uint8Array(arr);
var ab = u8.buffer;
console.log(ab); // ab为要解析的ArrayBuffer
```

## [](#获取-设置ArrayBuffer对应的数值 "获取/设置ArrayBuffer对应的数值")获取/设置 ArrayBuffer 对应的数值

一串 ArrayBuffer 是可以被“理解”为很多个值的，以下面这个值为例，

按照服务端的协议，这串数据流的格式如下：
1 unsign byte (1 字节) + 1 unsign int (4 字节) + 1 unsign short (2 字节)

```js
var arr = [0x01, 0x02, 0x00, 0x00, 0x00, 0x00, 0x03];
var u8 = new Uint8Array(arr);
var ab = u8.buffer;
console.log(ab); // ab为要解析的ArrayBuffer
var u8 = new Uint8Array(ab, 0, 1); // (arraybuffer, 字节解析的起点, 解析的长度)
var val_byte = u8[0];
console.log(val_byte);
// 解析unsign int
// 由于Uint32Array的解析起点必须是4的整数倍，而在流中该数据的起点是1，所以选择先“裁剪”(slice)出要解析的流片段，再用Uint32去解析该片段
var u32buff = ab.slice(1, 5);
var u32 = new Uint32Array(u32buff);
var val_uint = u32[0];
console.log(val_uint);
// 解析unsign short
var u16buff = ab.slice(5, 7);
var u16 = new Uint16Array(u16buff);
var val_short = u16[0];
console.log(val_short);
```

## [](#TypeArray-to-Array "TypeArray to Array")TypeArray to Array

在上文中可以看到，普通数组可以轻松的转换成 TypeArray。
但 TypeArray 并不是 Array 的子集，所以它没有 Array 的许多方法，比如`push`
TypeArray 的方法参见：[TypedArray 的方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

```js
var arr = [0x01, 0x02, 0x00, 0x00, 0x00, 0x00, 0x03];
var u8 = new Uint8Array(arr);
console.log(typeof u8.push);
```

所以需要进行转换。
TypeArray to Array 的方法,在 ES6 中可以用 Array.form 实现 （[什么是 Array.form](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)）

也可以比较简单的封装一下。

```js
function Uint8Array2Array(u8a) {
  var arr = [];
  for (var i = 0; i < u8a.length; i++) {
    arr.push(u8a[i]);
  }
  return arr;
}
```

## doc

- [https://www.psvmc.cn/article/2019-09-17-blob-buffer-file.html](https://www.psvmc.cn/article/2019-09-17-blob-buffer-file.html)
