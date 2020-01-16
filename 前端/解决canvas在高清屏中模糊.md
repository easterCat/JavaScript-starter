
## 关于屏幕的一些基础知识

- 物理像素（DP）物理像素也称设备像素，我们常听到的手机的分辨率及为物理像素，比如 iPhone 7的物理分辨率为750 * 1334。屏幕是由像素点组成的，也就是说屏幕的水平方向有750的像素点，垂直方向上有1334个像素点
- 设备独立像素（DIP）也称为逻辑像素，比如Iphone4和Iphone3GS的尺寸都是3.5寸，iphone4的物理分辨率是640 * 980，而3gs只有320 * 480，假如我们按照真实布局取绘制一个320px宽度的图像时，在iphone4上只有一半有内容，剩下的一半则是一片空白，为了避免这种问题，我们引入了逻辑像素，将两种手机的逻辑像素都设置为320px，方便绘制
- 设备像素比（DPR）上面的设备独立像素说到底是为了方便计算，我们统一了设备的逻辑像素，但是每个逻辑像素所代表的物理像素却不是确定的，为了确定在未缩放情况下，物理像素和逻辑像素的关系，我们引入了设备像素比(DPR)这个概念

```
设备像素比 = 设备像素 / 逻辑像素
DPR = DP / DIP
```

<article class="article-content" id="article-content">
<div class="thumbnail-image">
<div class="thumbnail-image-con">![](/newimg88/2018/05/v2-d2f8ac919aa348850f002ed86ff327de_1200x500.jpg)</div>
<div class="wechat-webfedev">![10年服务1亿前端开发工程师](/newimg88/2018/10/webfedev-qrcode.png)</div>
</div>

使用 canvas 绘制图片或者是文字在 Retina 屏中会非常模糊。如图：

![](/newimg88/2018/05/98CB56B8-7983-427E-AFCE-15043A6D8F63.png)

因为 canvas 不是矢量图，而是像图片一样是位图模式的。高 dpi 显示设备意味着每平方英寸有更多的像素。也就是说二倍屏，浏览器就会以2个像素点的宽度来渲染一个像素，该 canvas 在 Retina 屏幕下相当于占据了2倍的空间，相当于图片被放大了一倍，因此绘制出来的图片文字等会变模糊。

因此，要做 Retina 屏适配，关键是知道当前屏幕的设备像素比，然后将 canvas 放大到该设备像素比来绘制，然后将 canvas 压缩到一倍来展示。

## 解决思路

在浏览器的 `window` 对象中有一个 `devicePixelRatio` 的属性，该属性表示了屏幕的设备像素比，即用几个（通常是2个）像素点宽度来渲染1个像素。

举例来说，假设 `devicePixelRatio` 的值为 `2` ，一张 100×100 像素大小的图片，在 Retina 屏幕下，会用 2 个像素点的宽度去渲染图片的 1 个像素点，因此该图片在 Retina 屏幕上实际会占据 200×200 像素的空间，相当于图片被放大了一倍，因此图片会变得模糊。

类似的，在 canvas `context` 中也存在一个 `backingStorePixelRatio` 的属性，该属性的值决定了浏览器在渲染canvas之前会用几个像素来来存储画布信息。 `backingStorePixelRatio` 属性在各浏览器厂商的获取方式不一样，所以需要加上浏览器前缀来实现兼容。

## 解决问题

1.首先一样，获取 Canvas 对象：

<div class="prettyprint-title"><span>JavaScript 代码:</span></div><pre class="prettyprint lang-JavaScript linenums:1 prettyprinted" style="">

1.  <span class="kwd">var</span><span class="pln"> myCanvas </span><span class="pun">=</span><span class="pln"> document</span><span class="pun">.</span><span class="pln">getElementById</span><span class="pun">(</span><span class="str">"my_canvas"</span><span class="pun">);</span>
2.  <span class="kwd">var</span><span class="pln"> context </span><span class="pun">=</span><span class="pln"> myCanvas</span><span class="pun">.</span><span class="pln">getContext</span><span class="pun">(</span><span class="str">"2d"</span><span class="pun">);</span></pre>

2.获取像素比，将 Canvas 宽高进行放大，放大比例为：`devicePixelRatio / webkitBackingStorePixelRatio` , 我们写了一个兼容的方法。

<div class="prettyprint-title"><span>JavaScript 代码:</span></div><pre class="prettyprint lang-JavaScript linenums:1 prettyprinted" style="">

1.  <span class="kwd">var</span><span class="pln"> getPixelRatio </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pln"> </span><span class="pun">(</span><span class="pln">context</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span>
2.  <span class="pln">    </span><span class="kwd">var</span><span class="pln"> backingStore </span><span class="pun">=</span><span class="pln"> context</span><span class="pun">.</span><span class="pln">backingStorePixelRatio </span><span class="pun">||</span>
3.  <span class="pln">        context</span><span class="pun">.</span><span class="pln">webkitBackingStorePixelRatio </span><span class="pun">||</span>
4.  <span class="pln">        context</span><span class="pun">.</span><span class="pln">mozBackingStorePixelRatio </span><span class="pun">||</span>
5.  <span class="pln">        context</span><span class="pun">.</span><span class="pln">msBackingStorePixelRatio </span><span class="pun">||</span>
6.  <span class="pln">        context</span><span class="pun">.</span><span class="pln">oBackingStorePixelRatio </span><span class="pun">||</span>
7.  <span class="pln">        context</span><span class="pun">.</span><span class="pln">backingStorePixelRatio </span><span class="pun">||</span><span class="pln"> </span><span class="lit">1</span><span class="pun">;</span>
8.  <span class="pln">    </span><span class="kwd">return</span><span class="pln"> </span><span class="pun">(</span><span class="pln">window</span><span class="pun">.</span><span class="pln">devicePixelRatio </span><span class="pun">||</span><span class="pln"> </span><span class="lit">1</span><span class="pun">)</span><span class="pln"> </span><span class="pun">/</span><span class="pln"> backingStore</span><span class="pun">;</span>
9.  <span class="pun">};</span>
10.  <span class="kwd">var</span><span class="pln"> ratio </span><span class="pun">=</span><span class="pln"> getPixelRatio</span><span class="pun">(</span><span class="pln">context</span><span class="pun">);</span></pre>

3.按实际渲染倍率来缩放canvas。

注意基础知识点：

*   要设置canvas的画布大小，使用的是 `canvas.width` 和 `canvas.height`；
*   要设置画布的实际渲染大小，使用的 `style` 属性或`CSS`设置的 `width` 和`height`，只是简单的对画布进行缩放。

2倍屏幕下示例代码：

<div class="prettyprint-title"><span>HTML 代码:</span></div><pre class="prettyprint lang-HTML linenums:1 prettyprinted" style="">

1.  <span class="tag">&lt;canvas</span><span class="pln"> </span><span class="atn">width</span><span class="pun">=</span><span class="atv">"640"</span><span class="pln"> </span><span class="atn">height</span><span class="pun">=</span><span class="atv">"800"</span><span class="pln"> </span><span class="atn">style</span><span class="pun">=</span><span class="atv">"</span><span class="pln">width</span><span class="pun">:</span><span class="lit">320px</span><span class="pun">;</span><span class="pln"> height</span><span class="pun">:</span><span class="lit">400px</span><span class="atv">"</span><span class="tag">&gt;&lt;/canvas&gt;</span></pre>

canvas的实际大小的640px × 800px，但是实际渲染到页面的大小是320px × 400px，相当于缩小一倍来显示。

那么在3倍屏幕下就是：

<div class="prettyprint-title"><span>HTML 代码:</span></div><pre class="prettyprint lang-HTML linenums:1 prettyprinted" style="">

1.  <span class="tag">&lt;canvas</span><span class="pln"> </span><span class="atn">width</span><span class="pun">=</span><span class="atv">"960"</span><span class="pln"> </span><span class="atn">height</span><span class="pun">=</span><span class="atv">"1200"</span><span class="pln"> </span><span class="atn">style</span><span class="pun">=</span><span class="atv">"</span><span class="pln">width</span><span class="pun">:</span><span class="lit">320px</span><span class="pun">;</span><span class="pln"> height</span><span class="pun">:</span><span class="lit">400px</span><span class="atv">"</span><span class="tag">&gt;&lt;/canvas&gt;</span></pre>

因此，要使canvas适配高倍屏，就是要将canvas放大到设备像素比来绘制，最后将canvas压缩成一倍的物理大小来展示。如下：

<div class="prettyprint-title"><span>JavaScript 代码:</span></div><pre class="prettyprint lang-JavaScript linenums:1 prettyprinted" style="">

1.  <span class="pln">myCanvas</span><span class="pun">.</span><span class="pln">style</span><span class="pun">.</span><span class="pln">width </span><span class="pun">=</span><span class="pln"> myCanvas</span><span class="pun">.</span><span class="pln">width </span><span class="pun">+</span><span class="pln"> </span><span class="str">'px'</span><span class="pun">;</span>
2.  <span class="pln">myCanvas</span><span class="pun">.</span><span class="pln">style</span><span class="pun">.</span><span class="pln">height </span><span class="pun">=</span><span class="pln"> myCanvas</span><span class="pun">.</span><span class="pln">height </span><span class="pun">+</span><span class="pln"> </span><span class="str">'px'</span><span class="pun">;</span>
3.  <span class="pln">&nbsp;</span>
4.  <span class="pln">myCanvas</span><span class="pun">.</span><span class="pln">width </span><span class="pun">=</span><span class="pln"> myCanvas</span><span class="pun">.</span><span class="pln">width </span><span class="pun">*</span><span class="pln"> ratio</span><span class="pun">;</span>
5.  <span class="pln">myCanvas</span><span class="pun">.</span><span class="pln">height </span><span class="pun">=</span><span class="pln"> myCanvas</span><span class="pun">.</span><span class="pln">height </span><span class="pun">*</span><span class="pln"> ratio</span><span class="pun">;</span></pre>

4.绘制

由于 Canvas 放大后，相应的绘制图片时也要放大，有两种方式：

第一种方法：每一个绘制相应的放大，比如我们绘制文字

<div class="prettyprint-title"><span>JavaScript 代码:</span></div><pre class="prettyprint lang-JavaScript linenums:1 prettyprinted" style="">

1.  <span class="pln">context</span><span class="pun">.</span><span class="pln">font </span><span class="pun">=</span><span class="pln"> </span><span class="str">"36px Georgia"</span><span class="pun">;</span><span class="pln"> </span><span class="com">//一倍屏下18px字体</span>
2.  <span class="pln">context</span><span class="pun">.</span><span class="pln">fillStyle </span><span class="pun">=</span><span class="pln"> </span><span class="str">"#999"</span><span class="pun">;</span>
3.  <span class="pln">context</span><span class="pun">.</span><span class="pln">fillText</span><span class="pun">(</span><span class="str">"我是清晰的文字"</span><span class="pun">,</span><span class="pln"> </span><span class="lit">50</span><span class="pun">*</span><span class="pln">ratio</span><span class="pun">,</span><span class="pln"> </span><span class="lit">50</span><span class="pun">*</span><span class="pln">ratio</span><span class="pun">);</span><span class="com">// 坐标位置乘以像素比</span></pre>

相对来说这个方法非常繁琐麻烦。

第二种方法：直接使用 `scale` 方法:

<div class="prettyprint-title"><span>JavaScript 代码:</span></div><pre class="prettyprint lang-JavaScript linenums:1 prettyprinted" style="">

1.  <span class="com">// 放大倍数</span>
2.  <span class="pln">context</span><span class="pun">.</span><span class="pln">scale</span><span class="pun">(</span><span class="pln">ratio</span><span class="pun">,</span><span class="pln"> ratio</span><span class="pun">);</span>
3.  <span class="pln">&nbsp;</span>
4.  <span class="pln">context</span><span class="pun">.</span><span class="pln">font </span><span class="pun">=</span><span class="pln"> </span><span class="str">"18px Georgia"</span><span class="pun">;</span>
5.  <span class="pln">context</span><span class="pun">.</span><span class="pln">fillStyle </span><span class="pun">=</span><span class="pln"> </span><span class="str">"#999"</span><span class="pun">;</span>
6.  <span class="pln">context</span><span class="pun">.</span><span class="pln">fillText</span><span class="pun">(</span><span class="str">"我是清晰的文字"</span><span class="pun">,</span><span class="pln"> </span><span class="lit">50</span><span class="pun">,</span><span class="pln"> </span><span class="lit">50</span><span class="pun">);</span></pre>

这样就可以解决 canvas 在高清屏中绘制模糊的问题

完整的demo：[https://www.html.cn/demo/canvas_retina/index.html](/demo/canvas_retina/index.html)

</article>