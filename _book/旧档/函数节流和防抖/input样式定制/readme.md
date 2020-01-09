## input样式

定制一个泥团input，想怎么捏就怎么捏

#### appearance: none

所有主流浏览器都不支持 appearance 属性。

Firefox 支持替代的 -moz-appearance 属性。

Safari 和 Chrome 支持替代的 -webkit-appearance 属性。

- 去除系统默认appearance的样式引发的问题
- 改变按钮和其他控件的外观，使其类似于原生控件。
- appearance 是一个 不规范的属性（unsupported WebKit property）,它没有出现在 CSS 规范草案中.此属性非标准且渲染效果在不同浏览器下不同，有些属性值甚至不支持.

使 div 元素看上去像一个按钮
```
div
{
appearance:button;
-moz-appearance:button; /* Firefox */
-webkit-appearance:button; /* Safari 和 Chrome */
}
```

> appearance: normal|icon|window|button|menu|field;

#### caret-color

用于改变input获取焦点时候，闪耀光标的颜色，而不改变placeholder的字体颜色

caret-color 属性用来定义插入光标（caret）的颜色，这里说的插入光标，就是那个在网页的可编辑器区域内，用来指示用户的输入具体会插入到哪里的那个一闪一闪的形似竖杠 | 的东西。

> caret-color: auto|<color>;

[caret-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/caret-color)

#### outline

用于去除input点击获取焦点时候，去掉外部浏览器的样式，和border一起使用

CSS的outline属性是用来设置一个或多个单独的轮廓属性的简写属性 ， 例如 outline-style, outline-width 和 outline-color。 多数情况下，简写属性更加可取和便捷。

```
/* 宽度 | 样式 | 颜色 */
outline: 1px solid white;
```

> outline: [ <'outline-color'> || <'outline-style'> || <'outline-width'> ]


#### ::placeholder

用于改变input的placeholder的样式

伪元素::placeholder可以选择一个表单元素的占位文本，它允许开发者和设计师自定义占位文本的样式

```
input::-webkit-input-placeholder
/* Firefox < 19 */
input:-moz-placeholder
/* Firefox > 19 */
input::-moz-placeholder
/* Internet Explorer 10 */
input:-ms-input-placeholder
```

[input-placeholder](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::placeholder)

#### text-indent

控制input文本开始的位置，默认的贴边，不好看

text-indent 属性 规定了 一个元素 首行 文本内容之前应该有多少水平空格。水平空格是块级包含元素的内容盒子的左边(对于从右向左布局来说是右边).

(网上很多都提议是padding-left直接挤出一个位置，觉得不太合适，缩进方法感觉更适合)

```
text-indent: 3em       /*  values */
text-indent: 40px
text-indent: 15%       /*  values, relatives to the containing block width */
text-indent: each-line /* keywords values */
text-indent: hanging

text-indent: inherit
```

[text-indent](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-indent)
