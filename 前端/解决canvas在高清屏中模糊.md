## 关于屏幕的一些基础知识

- 物理像素（DP）物理像素也称设备像素，我们常听到的手机的分辨率及为物理像素，比如 iPhone 7 的物理分辨率为 750 \* 1334。屏幕是由像素点组成的，也就是说屏幕的水平方向有 750 的像素点，垂直方向上有 1334 个像素点
- 设备独立像素（DIP）也称为逻辑像素，比如 Iphone4 和 Iphone3GS 的尺寸都是 3.5 寸，iphone4 的物理分辨率是 640 _ 980，而 3gs 只有 320 _ 480，假如我们按照真实布局取绘制一个 320px 宽度的图像时，在 iphone4 上只有一半有内容，剩下的一半则是一片空白，为了避免这种问题，我们引入了逻辑像素，将两种手机的逻辑像素都设置为 320px，方便绘制
- 设备像素比（DPR）上面的设备独立像素说到底是为了方便计算，我们统一了设备的逻辑像素，但是每个逻辑像素所代表的物理像素却不是确定的，为了确定在未缩放情况下，物理像素和逻辑像素的关系，我们引入了设备像素比(DPR)这个概念

```
设备像素比 = 设备像素 / 逻辑像素
DPR = DP / DIP
```

使用 canvas 绘制图片或者是文字在 Retina 屏中会非常模糊。如图：

![](/newimg88/2018/05/98CB56B8-7983-427E-AFCE-15043A6D8F63.png)

因为 canvas 不是矢量图，而是像图片一样是位图模式的。高 dpi 显示设备意味着每平方英寸有更多的像素。也就是说二倍屏，浏览器就会以 2 个像素点的宽度来渲染一个像素，该 canvas 在 Retina 屏幕下相当于占据了 2 倍的空间，相当于图片被放大了一倍，因此绘制出来的图片文字等会变模糊。

因此，要做 Retina 屏适配，关键是知道当前屏幕的设备像素比，然后将 canvas 放大到该设备像素比来绘制，然后将 canvas 压缩到一倍来展示。

## 解决思路

在浏览器的 `window` 对象中有一个 `devicePixelRatio` 的属性，该属性表示了屏幕的设备像素比，即用几个（通常是 2 个）像素点宽度来渲染 1 个像素。

举例来说，假设 `devicePixelRatio` 的值为 `2` ，一张 100×100 像素大小的图片，在 Retina 屏幕下，会用 2 个像素点的宽度去渲染图片的 1 个像素点，因此该图片在 Retina 屏幕上实际会占据 200×200 像素的空间，相当于图片被放大了一倍，因此图片会变得模糊。

类似的，在 canvas `context` 中也存在一个 `backingStorePixelRatio` 的属性，该属性的值决定了浏览器在渲染 canvas 之前会用几个像素来来存储画布信息。 `backingStorePixelRatio` 属性在各浏览器厂商的获取方式不一样，所以需要加上浏览器前缀来实现兼容。

## 解决问题

1.首先一样，获取 Canvas 对象：

```js
var myCanvas = document.getElementById("my_canvas");
var context = myCanvas.getContext("2d");
```

2.获取像素比，将 Canvas 宽高进行放大，放大比例为：`devicePixelRatio / webkitBackingStorePixelRatio` , 我们写了一个兼容的方法。

```js
var getPixelRatio = function(context) {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};
var ratio = getPixelRatio(context);
```

3.按实际渲染倍率来缩放 canvas。

注意基础知识点：

- 要设置 canvas 的画布大小，使用的是 `canvas.width` 和 `canvas.height`；
- 要设置画布的实际渲染大小，使用的 `style` 属性或`CSS`设置的 `width` 和`height`，只是简单的对画布进行缩放。

2 倍屏幕下示例代码：

```HTML
<canvas width="640" height="800" style="width:320px; height:400px"></canvas>
```

canvas 的实际大小的 640px × 800px，但是实际渲染到页面的大小是 320px × 400px，相当于缩小一倍来显示。

那么在 3 倍屏幕下就是：

```HTML
<canvas width="960" height="1200" style="width:320px; height:400px"></canvas>
```

```js
myCanvas.style.width = myCanvas.width + "px";
myCanvas.style.height = myCanvas.height + "px";

myCanvas.width = myCanvas.width * ratio;
myCanvas.height = myCanvas.height * ratio;
```

因此，要使 canvas 适配高倍屏，就是要将 canvas 放大到设备像素比来绘制，最后将 canvas 压缩成一倍的物理大小来展示。如下：

4.绘制

由于 Canvas 放大后，相应的绘制图片时也要放大，有两种方式：

第一种方法：每一个绘制相应的放大，比如我们绘制文字

```js
ontext.font = "36px Georgia"; //一倍屏下18px字体
context.fillStyle = "#999";
context.fillText("我是清晰的文字", 50 * ratio, 50 * ratio); // 坐标位置乘以像素比
```

相对来说这个方法非常繁琐麻烦。

第二种方法：直接使用 `scale` 方法:

```js
// 放大倍数
context.scale(ratio, ratio);

context.font = "18px Georgia";
context.fillStyle = "#999";
context.fillText("我是清晰的文字", 50, 50);
```

这样就可以解决 canvas 在高清屏中绘制模糊的问题

## doc

- [深入了解 canvas 在移动端绘制模糊的问题](https://juejin.im/post/5cbdda7bf265da036504fb46)
