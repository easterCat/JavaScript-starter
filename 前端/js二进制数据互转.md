## 三种格式

- `Blob`是现代浏览器中提供的能够装载二进制流（文件）的容器对象。
- `ArrayBuffer`是能够装载`Blob`（二进制流）数据的原始缓冲区，`ArrayBuffer`不能直接通过 js 读写。
- `TypeArray`是`ArrayBuffer`的一种类数组的视图对象，可以将`ArrayBuffer`按不同字节数读取成类似数组形式的数据类型，从而可以向读写数组元素一样，实现对`ArrayBuffer`数据的读写。常见的`TypeArray`包括`Uint8Array`,`Uint16Array`,`Uint32Array`等。[点这里查看所有的 TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

所以我对三者的理解是： `Blob` &lt;-&gt; `ArrayBuffer` &lt;-&gt; `TypeArray` &lt;—-&gt; `Array`
由于`TypeArray`和`Array`有些相似，因此往往我会选择在`TypeArray`这层做处理。
下面是`TypeArray`、`ArrayBuffer`和`Blob`之间相互转换的方法。

## [](#websocket接收arrayBuffer "websocket接收arrayBuffer")websocket 接收 arrayBuffer

<figure class="highlight js"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div><div class="line">6</div><div class="line">7</div></pre></td><td class="code"><pre><div class="line"><span class="comment">/* websocket的情况下二进制流的获取 */</span></div><div class="line"><span class="keyword">var</span> svip = <span class="string">'ws://127.0.0.1:8080'</span>;</div><div class="line"><span class="keyword">var</span> ws = <span class="keyword">new</span> WebSocket(svip);</div><div class="line">ws.binaryType = <span class="string">'arraybuffer'</span></div><div class="line">ws.onmessage = <span class="function"><span class="keyword">function</span> (<span class="params">e</span>) </span>{</div><div class="line">	<span class="keyword">var</span> message = e.data;</div><div class="line">}</div></pre></td></tr></tbody></table></figure>

## [](#blob轉arrayBuffer "blob轉arrayBuffer")blob 轉 arrayBuffer

<figure class="highlight js"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div><div class="line">6</div></pre></td><td class="code"><pre><div class="line"><span class="keyword">var</span> bl = <span class="keyword">new</span> Blob(); <span class="comment">// bl是要转换的blob</span></div><div class="line"><span class="keyword">var</span> fr = <span class="keyword">new</span> FileReader();</div><div class="line">fr.onload = <span class="function"><span class="keyword">function</span>(<span class="params"></span>)</span>{</div><div class="line">	<span class="keyword">var</span> ab = <span class="keyword">this</span>.result; <span class="comment">// ab是转换后的结果</span></div><div class="line">}</div><div class="line">fr.readAsArrayBuffer(bl);</div></pre></td></tr></tbody></table></figure>

## [](#ArrayBuffer-to-Blob-（ArrayBuffer转Blob） "ArrayBuffer to Blob （ArrayBuffer转Blob）")ArrayBuffer to Blob （ArrayBuffer 转 Blob）

<figure class="highlight js"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div></pre></td><td class="code"><pre><div class="line"><span class="keyword">var</span> ab = <span class="keyword">new</span> <span class="built_in">ArrayBuffer</span>(<span class="number">32</span>);</div><div class="line"><span class="keyword">var</span> blob = <span class="keyword">new</span> Blob([ab]); <span class="comment">// 注意必须包裹[]</span></div></pre></td></tr></tbody></table></figure>

## [](#ArrayBuffer-to-Uint8-（ArrayBuffer转Uint8数组） "ArrayBuffer to Uint8 （ArrayBuffer转Uint8数组）")ArrayBuffer to Uint8 （ArrayBuffer 转 Uint8 数组）

Uint8 数组可以直观的看到 ArrayBuffer 中每个字节（1 字节 == 8 位）的值。一般我们要将 ArrayBuffer 转成 Uint 类型数组后才能对其中的字节进行存取操作。

<figure class="highlight js"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div></pre></td><td class="code"><pre><div class="line"><span class="keyword">var</span> ab = arrayBuffer; <span class="comment">// arrayBuffer为要转换的值</span></div><div class="line"><span class="keyword">var</span> u8 = <span class="keyword">new</span> <span class="built_in">Uint8Array</span>(ab);</div></pre></td></tr></tbody></table></figure>

## [](#Uint8-to-ArrayBuffer（Uint数组转ArrayBuffer） "Uint8 to ArrayBuffer（Uint数组转ArrayBuffer）")Uint8 to ArrayBuffer（Uint 数组转 ArrayBuffer）

我们 Uint8 数组可以直观的看到 ArrayBuffer 中每个字节（1 字节 == 8 位）的值。一般我们要将 ArrayBuffer 转成 Uint 类型数组后才能对其中的字节进行存取操作。

<figure class="highlight js"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div></pre></td><td class="code"><pre><div class="line"><span class="keyword">var</span> u8 = <span class="keyword">new</span> <span class="built_in">Uint8Array</span>();</div><div class="line"><span class="keyword">var</span> ab = u8.buffer; <span class="comment">// ab即是u8对应的arrayBuffer</span></div></pre></td></tr></tbody></table></figure>

## [](#Array-to-ArrayBuffer（普通数组转ArrayBuffer） "Array to ArrayBuffer（普通数组转ArrayBuffer）")Array to ArrayBuffer（普通数组转 ArrayBuffer）

<figure class="highlight js"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div></pre></td><td class="code"><pre><div class="line"><span class="keyword">var</span> arr = [<span class="number">0x15</span>,<span class="number">0xFF</span>,<span class="number">0x01</span>,<span class="number">0x00</span>,<span class="number">0x34</span>,<span class="number">0xAB</span>,<span class="number">0x11</span>];</div><div class="line"><span class="keyword">var</span> u8 = <span class="keyword">new</span> <span class="built_in">Uint8Array</span>(arr);</div><div class="line"><span class="keyword">var</span> ab = u8.buffer;</div><div class="line"><span class="built_in">console</span>.log(ab); <span class="comment">// ab为要解析的ArrayBuffer</span></div></pre></td></tr></tbody></table></figure>

## [](#获取-设置ArrayBuffer对应的数值 "获取/设置ArrayBuffer对应的数值")获取/设置 ArrayBuffer 对应的数值

一串 ArrayBuffer 是可以被“理解”为很多个值的，以下面这个值为例，

按照服务端的协议，这串数据流的格式如下：
1 unsign byte (1 字节) + 1 unsign int (4 字节) + 1 unsign short (2 字节)

<figure class="highlight js"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div><div class="line">6</div><div class="line">7</div><div class="line">8</div><div class="line">9</div><div class="line">10</div><div class="line">11</div><div class="line">12</div><div class="line">13</div><div class="line">14</div><div class="line">15</div><div class="line">16</div><div class="line">17</div><div class="line">18</div><div class="line">19</div><div class="line">20</div><div class="line">21</div></pre></td><td class="code"><pre><div class="line"><span class="keyword">var</span> arr = [<span class="number">0x01</span>,<span class="number">0x02</span>,<span class="number">0x00</span>,<span class="number">0x00</span>,<span class="number">0x00</span>,<span class="number">0x00</span>,<span class="number">0x03</span>];</div><div class="line"><span class="keyword">var</span> u8 = <span class="keyword">new</span> <span class="built_in">Uint8Array</span>(arr);</div><div class="line"><span class="keyword">var</span> ab = u8.buffer;</div><div class="line"><span class="built_in">console</span>.log(ab); <span class="comment">// ab为要解析的ArrayBuffer</span></div><div class="line"></div><div class="line"><span class="keyword">var</span> u8 = <span class="keyword">new</span> <span class="built_in">Uint8Array</span>(ab, <span class="number">0</span>, <span class="number">1</span>); <span class="comment">// (arraybuffer, 字节解析的起点, 解析的长度)</span></div><div class="line"><span class="keyword">var</span> val_byte = u8[<span class="number">0</span>];</div><div class="line"><span class="built_in">console</span>.log(val_byte);</div><div class="line"></div><div class="line"><span class="comment">// 解析unsign int</span></div><div class="line"><span class="comment">// 由于Uint32Array的解析起点必须是4的整数倍，而在流中该数据的起点是1，所以选择先“裁剪”(slice)出要解析的流片段，再用Uint32去解析该片段</span></div><div class="line"><span class="keyword">var</span> u32buff = ab.slice(<span class="number">1</span>, <span class="number">5</span>);</div><div class="line"><span class="keyword">var</span> u32 = <span class="keyword">new</span> <span class="built_in">Uint32Array</span>(u32buff);</div><div class="line"><span class="keyword">var</span> val_uint = u32[<span class="number">0</span>];</div><div class="line"><span class="built_in">console</span>.log(val_uint);</div><div class="line"></div><div class="line"><span class="comment">// 解析unsign short</span></div><div class="line"><span class="keyword">var</span> u16buff = ab.slice(<span class="number">5</span>, <span class="number">7</span>);</div><div class="line"><span class="keyword">var</span> u16 = <span class="keyword">new</span> <span class="built_in">Uint16Array</span>(u16buff);</div><div class="line"><span class="keyword">var</span> val_short = u16[<span class="number">0</span>];</div><div class="line"><span class="built_in">console</span>.log(val_short);</div></pre></td></tr></tbody></table></figure>

## [](#TypeArray-to-Array "TypeArray to Array")TypeArray to Array

在上文中可以看到，普通数组可以轻松的转换成 TypeArray。
但 TypeArray 并不是 Array 的子集，所以它没有 Array 的许多方法，比如`push`
TypeArray 的方法参见：[TypedArray 的方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

<figure class="highlight js"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div></pre></td><td class="code"><pre><div class="line"><span class="keyword">var</span> arr = [<span class="number">0x01</span>,<span class="number">0x02</span>,<span class="number">0x00</span>,<span class="number">0x00</span>,<span class="number">0x00</span>,<span class="number">0x00</span>,<span class="number">0x03</span>];</div><div class="line"><span class="keyword">var</span> u8 = <span class="keyword">new</span> <span class="built_in">Uint8Array</span>(arr);</div><div class="line"><span class="built_in">console</span>.log(<span class="keyword">typeof</span> u8.push);</div></pre></td></tr></tbody></table></figure>

所以需要进行转换。
TypeArray to Array 的方法,在 ES6 中可以用 Array.form 实现 （[什么是 Array.form](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)）

也可以比较简单的封装一下。

<figure class="highlight js"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div><div class="line">6</div><div class="line">7</div><div class="line">8</div></pre></td><td class="code"><pre><div class="line"></div><div class="line"><span class="function"><span class="keyword">function</span> <span class="title">Uint8Array2Array</span>(<span class="params">u8a</span>) </span>{</div><div class="line">	<span class="keyword">var</span> arr = [];</div><div class="line">	<span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="number">0</span>; i &lt; u8a.length; i++) {</div><div class="line">		arr.push(u8a[i]);</div><div class="line">	}</div><div class="line">	<span class="keyword">return</span> arr;</div><div class="line">}</div></pre></td></tr></tbody></table></figure></div>
