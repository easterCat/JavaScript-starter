# 学会使用 JavaScript 访问和修改 CSS 样式

### 第一部分：接口介绍

首先说在 HTML 中定义样式的方式有 3 种：

1. 通过 `link` 元素包含外部样式表文件
2. 使用 `style` 元素定义嵌入式样式
3. 使用 `style` 特性定义针对特定元素的样式

DOM2 级模块围绕这三种应用样式机制提供了一套 API。理解了这套 API 就理解了如何用 JS 操作 CSS 了。这套接口种类很多。如下图：
![](https://user-gold-cdn.xitu.io/2019/6/28/16b9b209cc1c7277?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
可以参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model)这篇文章了解。
接口都是有规律的，死记硬背不好记住，根据 HTML 中定义样式的 3 种方式来看接口的定义，自然就更好理解。

#### 1.1 `CSSStyleSheet`样式表对象

名字中带有`StyleSheet`的接口就样式表的意思。`CSSStyleSheet`接口类型表示的是样式表。包括通过`link`元素包含的外部样式表和在`<style type="text/css"></style>`元素中定义的样式表。`CSSStyleSheet`接口继承`StyleSheet`。`StyleSheet`可以作为一个基础接口来定义非 CSS 样式表。

#### 1.2 `CSSRule`样式表规则对象

名字中带有`Rule`的接口就代表规则的意思。`CSSRule`对象表示样式表中的每一条规则。`CSSRule`其实 是一个供其他多种类型继承的基类型。其中最常用的就是 `CSSStyleRule` 类型，表示样式信息。

`CSSRule`的所有子类型如下：

1. `CSSCharsetRule`
2. `CSSConditionRule`
3. `CSSCounterStyleRule`
4. `CSSFontFeatureValuesRule`
5. `CSSGroupingRule`
6. `CSSImportRule`
7. `CSSKeyframeRule`
8. `CSSKeyframesRule`
9. `CSSMarginRule`
10. `CSSMediaRule`
11. `CSSNamespaceRule`
12. `CSSPageRule`
13. `CSSSupportsRule`
14. `CSSViewportRule`
15. `CSSFontFaceRule`
16. `CSSStyleRule`

> 这些规则很少有必要通过脚本来访问，而最常用的就是 `CSSStyleRule` 类型。

通过下图可以加深对`StyleSheet`，`CSSRule`关系的理解。

![](data:image/svg+xml;utf8,<?xml version=&quot;1.0&quot;?><svg xmlns=&quot;http://www.w3.org/2000/svg&quot; version=&quot;1.1&quot; width=&quot;500&quot; height=&quot;393&quot;></svg>)

#### 1.3 `CSSStyleDeclaration` 应用在元素 style 属性的对象

任何支持`style`特性的`HTML`元素在`JavaScript`中都有一个对应的`style`属性。这个`style`对象是 `CSSStyleDeclaration`的实例。包含着通过`HTML`的`style`特性指定的所有样式信息，但不包含 与外部样式表或嵌入样式表经层叠而来的样式。

我们经常使用的通过`HTMLElement.style`属性就是返回来`CSSStyleDeclaration`对象。`CSSStyleDeclaration`对象表示一个元素的`style`属性。

### 第二部分：`CSSStyleSheet`类型接口介绍

#### 2.1 `StyleSheet` 类型支持的属性和方法:

`CSSStyleSheet` 继承自`StyleSheet`，`StyleSheet`作为一个基础接口来定义非 `CSS` 样式表。从 ，`StyleSheet`接口继承而来的属性如下：

- `disabled`：表示样式表是否被禁用的布尔值。这个属性是可读/写的，将这个值设置为 true 可 以禁用样式表。
- `href`：如果样式表是通过包含的，则是样式表的 URL;否则，是 null。
- `media`：
- `ownerNode`：指向拥有当前样式表的节点的指针，样式表可能是在 HTML 中通过`link(HTMLLinkElement)`或`style(HTMLStyleElement)`引入的。如果当前样式表是其他样式表通过@import 导入的，则这个属性值为 null。IE 不支持这个属性。
- `parentStyleSheet`：在当前样式表是通过`@import`导入的情况下，这个属性是一个指向导入它的样式表的指针，否则为 null。
- `title`： ownerNode 中 title 属性的值，否则为 null。
- `type`：表示样式表类型的字符串。对 CSS 样式表而言，这个字符串是"type/css"。

> `CSSStyleSheet` 对象则是一 套只读的接口。除了 `disabled` 属性之外。

#### 2.2 `CSSStyleSheet` 接口类型支持的属性和方法:

`CSSStyleSheet`除了继承`StyleSheet`接口的属性之外，而且还支持下列属性和方法：

- `cssRules(rules)`：样式表中包含的样式规则的集合。IE 不支持这个属性，但有一个类似的 `rules` 属性。
- `ownerRule`：如果样式表是通过`@import`导入的，这个属性就是一个指针，指向表示导入的规
  则;否则，值为 null。IE 不支持这个属性。
- `deleteRule(index)`：删除`cssRules`集合中指定位置的规则。IE 不支持这个方法，但支持
  一个类似的`removeRule()`方法。
- `insertRule(rule,index)`：向`cssRules`集合中指定的位置插入`rule`字符串。IE 不支持这
  个方法，但支持一个类似的`addRule()`方法。
- `replace()`：构建一个样式表，不允许外部引用。
- `replaceSync()`：构建一个样式表，允许外部引用。

#### 2.3 使用`JavaScript`访问样式表

##### 访问样式表方式一

应用于文档的所有样式表是通过`document.styleSheets`集合来表示的。通过这个集合的 length 属性可以获知文档中样式表的数量，而通过方括号语法或 item()方法可以访问每一个样式表。

    let sheet = null;
    for(let i = 0, len = document.styleSheets.length;i < len; i++) {
        sheet = document.styleSheets[i];
        console.log(sheet.href)
    }

以上代码可以输出文档中使用的每一个样式表的 href 属性(`style`元素包含的样式表没有 href 属性)。

##### 访问样式表方式二

还可以通过`link`或`style`元素取得`CSSStyleSheet`对象。DOM 规定了一个包含`CSSStyleSheet` 对象的属性，名叫`sheet`。除了 IE，其他浏览器都支持这个属性。IE 支持的是`styleSheet`属性。

在不同浏览器中都能取得样式表对象：

    function getStyleSheet(element){
        return element.sheet || element.styleSheet;
    }
    //取得第一个<link/>元素引入的样式表,如果没有则返回空的HTMLCollection集合
    const link = document.getElementsByTagName("link")[0];
    if(typeof link === 'object' && link.rel === 'stylesheet') {
     const sheet = getStyleSheet(link);
    }

> 如果`link`标签不是引入的`css`样式，则`sheet`返回`null`。

### 第三部分：`CSSRule`规则类型接口介绍

`CSSRule`对象表示样式表中的每一条规则。实际上，`CSSRule`是一个供其他多种类型继承的基类 型，其中最常见的就是`CSSStyleRule`类型，表示样式信息(其他规则还有`@import`、`@font-face`、 `@page`和`@charset`，但这些规则很少有必要通过脚本来访问)。`CSSStyleRule` 对象包含下列属性。

- `cssText`：返回整条规则对应的文本。由于浏览器对样式表的内部处理方式不同，返回的文本 可能会与样式表中实际的文本不一样;Safari 始终都会将文本转换成全部小写。IE 不支持这个 属性。
- `parentRule`：如果当前规则是导入的规则，这个属性引用的就是导入规则;否则，这个值为 null。IE 不支持这个属性。
- `parentStyleSheet`：当前规则所属的样式表。IE 不支持这个属性。
- `selectorText`：返回当前规则的选择符文本。
- `style`：一个`CSSStyleDeclaration`对象，可以通过它设置和取得规则中特定的样式值。
- `type`：表示规则类型的常量值。对于样式规则，这个值是 1。IE 不支持这个属性。
- `styleMap`：一个`StylePropertyMap`对象。`StylePropertyMap`对象提供了 CSS 声明块的表示，该声明块可以替代`CSSStyleDeclaration`。

> `CSSStyleRule`对象的`cssText`属性与`style.cssText`属性类似，但并不相同。前者包含选择符文本和围绕样式信息的花括号，后者只包含样式信息(类似于 元素的 style.cssText)。此外，cssText 是只读的，而 `style.cssText` 也可以被重写。

下面是获取各个属性显示的结果：

    <style type="text/css">
      .demo {
        background-color: blue;
        width: 100px;
        height: 200px;
      }
    </style>

    <script>
      var sheet = document.styleSheets[0];
      var rules = sheet.cssRules || sheet.rules;
      var rule = rules[0];
      console.log(rule.selectorText);           //.demo
      console.log(rule.style.backgroundColor);  //blue
      console.log(rule.style.width);            //100px
      console.log(rule.style.height);           //200px
      //.demo { background-color: blue; width: 100px; height: 200px; }
      console.log(rule.cssText);
      //background-color: blue; width: 100px; height: 200px;
      console.log(rule.style.cssText);
    </script>

使用`rule.style`这种方式，可以像确定元素的行内样式信息一样，确定与规则相关的样式信息。与使用元素的方式一样，在这种方式下也可以修改样式信息，如下面的例子：

    var sheet = document.styleSheets[0];
    var rules = sheet.cssRules || sheet.rules;
    var rule = rules[0];
    rule.style.backgroundColor = "red";

以上面这种方式修改规则会影响页面中适用于该规则的所有元素。换句话说，如果有两个带有`demo`类的`div`元素，那么这两个元素都会应用修改后的样式。

#### 3.1 创建规则和删除规则(`CSSStyleSheet`接口的方法)

##### 创建规则

DOM 规定，要向现有样式表中添加新规则，需要使用`insertRule()`方法。这个方法接受两个参 数：规则文本和表示在哪里插入规则的索引。

    var sheet = document.styleSheets[0];
    sheet.insertRule("body { background-color: silver }", 0); //IE不支持

IE8 及更早版本支持一个类似的方法，名叫 `addRule()`

    sheet.addRule("body", "background-color: silver", 0); //仅对 IE 有效

以跨浏览器的方式向样式表中插入规则：

    //insertRule(document.styleSheets[0], "body", "background-color: silver", 0);
    function insertRule(sheet, selectorText, cssText, position){
        if (sheet.insertRule){
            sheet.insertRule(selectorText + "{" + cssText + "}", position);
        } elseif (sheet.addRule){
          sheet.addRule(selectorText, cssText, position);
      }
    }

> 上面这个例子插入的规则会改变元素的背景颜色。插入的规则将成为样式表中的第一条规则(插入到了 位置 0)——规则的次序在确定层叠之后应用到文档的规则时至关重要。

##### 删除规则

从样式表中删除规则的方法是 deleteRule()，这个方法接受一个参数:要删除的规则的位置。例 如，要删除样式表中的第一条规则。

    sheet.deleteRule(0);

IE 支持的类似方法叫 `removeRule()`：

    sheet.removeRule(0); //仅对 IE 有效

以跨浏览器的方式向样式表中删除规则：

    //deleteRule(document.styleSheets[0], 0);
    function deleteRule(sheet, index){
        if (sheet.deleteRule){
            sheet.deleteRule(index);
        } elseif (sheet.removeRule){
            sheet.removeRule(index);
        }
    }

> 添加规则和删除规则在实际 `Web` 开发中并不常用，慎重使用。

### 第四部分：`CSSStyleDeclaration` 直接访问元素的样式

任何支持 style 特性的 HTML 元素在 JavaScript 中都有一个对应的 style 属性。就是我们平常在 HTML 元素里写的样式：

    <div style="font-size:20px;color:red;">容器</div>

上面这个 `style` 对象 是 `CSSStyleDeclaration` 的实例。包含着通过 HTML 的 `style` 特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。

对于使用短划线(分隔不同的词汇，例如 background-image)的 CSS 属性 名，必须将其转换成驼峰大小写形式。下面是几个例子：
CSS 属性 JavaScript 属性` background-image``style.backgroundImage``color``style.color``font-family``style.fontFamily `
var myDiv = document.getElementById("myDiv");
myDiv.style.backgroundColor = "red";
myDiv.style.width = "100px";
myDiv.style.border = "1px solid black";

其中一个不能直接转换的 `CSS`属性 就是 `float`。由于 `float` 是 `JavaScript` 中的保留字，因此不能用作属性名。DOM2 级样式”规范规定 样式对象上相应的属性名应该是 `cssFloat`。而 IE 支持的则是`styleFloat`。可以通过下面的方式来判断当前浏览器所支持的`float`：

    const support = (function(){
      const div = document.createElement("div");
      div.style.cssText = "float:left;";
      let support = {
        cssFloat: !!div.style.cssFloat
      }
      return support;
    })()
    const floatReal = support.cssFloat ? 'cssFloat' : 'styleFloat';

还可以直接通过`document.documentMode`来判断：

    const floatReal =  Number(document.documentMode) < 9 ? 'styleFloat' : 'cssFloat'

只要取得一个有效的 DOM 元素的引用，就可以随时使用 JavaScript 为其设置样式：

    var myDiv = document.getElementById("myDiv");
    myDiv.style.width = "100px";
    myDiv.style.border = "1px solid black";

所有度量值都必须指定一个度量单位。下面是一个设置元素`style`属性的例子：

    functionsetStyle(element, styles) {
        function is_numeric(n) {
            return (n !== '' && !isNaN(parseFloat(n)) && isFinite(n));
        }
        Object.keys(styles).forEach(function(prop) {
            var unit = '';
            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && is_numeric(styles[prop])) {
                unit = 'px';
            }
            element.style[prop] = styles[prop] + unit;
        });
    }
    setStyle(document.getElementById("myDiv"),{ position: 'absolute', top: 0 })

> `Element.style`返回的只是行内样式，并不是该元素的全部样式。通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。元素的全部样式要通过`window.getComputedStyle()`得到。

#### 4.1 `CSSStyleDeclaration` 对象的属性和方法

- `cssText`：通过它能够访问到 style 特性中的 CSS 代码，可读写。
- `length`：应用给元素的 CSS 属性的数量。
- `parentRule`：表示 CSS 信息的 CSSRule 对象。
- `getPropertyPriority(propertyName)`：:如果给定的属性使用了!important 设置，则返回
  "important";否则，返回空字符串。
- `getPropertyValue(propertyName)`：:返回给定属性的字符串值。
- `item(index)`：返回给定位置的 CSS 属性的名称。
- `removeProperty(propertyName)`：从样式中删除给定属性。
- `setProperty(propertyName,value,priority)`：将给定属性设置为相应的值，并加上优先
  权标志("important"或者一个空字符串)。

##### `cssText`详解

通过`cssText`属性可以访问 `style` 特性中的 `CSS` 代码。在读取模式下，`cssText` 返回浏览器对 `style`特性中 `CSS` 代码的内部表示。在写入模式下，赋给 `cssText` 的值会重写整个 `style` 特性的值;也就是说，以前通过 `style` 特性指定的样式信息都将丢失。例如，如果通过 `style` 特性为元素设置了边框，然后再以不包含边框的规则重写 `cssText`，那么就会抹去元素上的边框。

    <div id="demo" style="border:5px solid red;">容器</div>
    var myDiv = document.getElementById("myDiv");
    myDiv.style.cssText = "background-color: green";
    console.log(myDiv.style.cssText) //background-color: green;

> 设置 `cssText` 是为元素应用多项变化最快捷的方式，因为可以一次性地应用所有变化。

##### `length`属性，`item()`方法， `getPropertyValue()`方法，`removeProperty()`方法

设计 length 属性的目的，就是将其与 item()方法配套使用，以便迭代在元素中定义的 CSS 属性。 在使用 length 和 item()时，style 对象实际上就相当于一个集合：

    <div id="demo" style="width:100px;font-size:22px;">容器</div>

    const myDiv = document.getElementById('demo');
    for(let i = 0; i < myDiv.style.length; i++) {
      //或者使用myDiv.style.item(i)
      console.log(myDiv.style[i])  //width font-size
    }

使用方括号语法或 item()方法，都可以取得 CSS 属性名("background-color"， 不是"backgroundColor")。然后，就可以在 getPropertyValue()中使用取得的属性名进一步取得 属性的值。

    <div id="demo" style="width:100px;font-size:22px;">容器</div>

    const myDiv = document.getElementById('demo');
    var prop, value, i, len;
    for (i=0, len= myDiv.style.length; i < len; i++){
      prop = myDiv.style[i];
      value = myDiv.style.getPropertyValue(prop);
      console.log(prop + ':' + value); //width:100px font-size:22px
    }

要从元素的样式中移除某个 CSS 属性，需要使用 removeProperty()方法。使用这个方法移除一 个属性，意味着将会为该属性应用默认的样式(从其他样式表经层叠而来)。例如，要移除通过 style 特性设置的 `font-size` 属性：

    <div id="demo" style="width:100px;font-size:22px;">容器</div>

    const myDiv = document.getElementById('demo');
    myDiv.style.removeProperty("font-size");

只要移除相应的属性，就可以为元素应用默认值。

#### 4.2 `getComputedStyle()` 获得计算的样式

虽然 style 对象能够提供支持 style 特性的任何元素的样式信息，但它不包含那些从其他样式表 层叠而来并影响到当前元素的样式信息。

“DOM2 级样式”增强了 `document.defaultView`，提供了 `getComputedStyle()`方法。这个方法接受两个参数:要取得计算样式的元素和一个伪元素字符串(例 如":after")。如果不需要伪元素信息，第二个参数可以是 null。`getComputedStyle()`方法返回一个 实时的`CSSStyleDeclaration`对象，当元素的样式更改时，它会自动更新本身。其中包含当前元素的所有计算的样式。

> 其实`window.getComputedStyle()`也可以获得元素的`CSSStyleDeclaration`对象。 `document.defaultView.getComputedStyle()`和`window.getComputedStyle()`区别，请参考： [MDN 这篇文章](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle#defaultView)。

下面代码通过 `window.getComputedStyle()`获取元素样式：

    <style type="text/css">
      .demo {
        background-color: blue;
        width: 100px;
        height: 200px;
      }
    </style>

    <div id="demo" style="background-color: red; border: 5px solid black;">容器</div>
    <script>
      const myDemo = document.getElementById('demo');
      const computedStyle = window.getComputedStyle(myDemo,null);
      console.log(computedStyle.backgroundColor); //rgb(255, 0, 0)
      console.log(computedStyle.width);           //100px
      console.log(computedStyle.height);          //200px
      console.log(computedStyle.border);          //5px solid rgb(0, 0, 0)
    </script>

上面打印出的背景颜色不是"blue"，因为这个样式在自身的 `style` 特性中已经被覆盖了。

边框属性可能 会也可能不会返回样式表中实际的 `border` 规则。因为设置这种属性（综合属性）实际上会涉及 很多其他属性。在设置 border 时，实际上是设置了四个边的边框宽度、颜色、样式属性
( `border-left-width` 、 `border-top-color` 、 `border-bottom-style`等等)。 因 此，即使 `computedStyle.border`不会在所有浏览器中都返回值，但具体到`computedStyle.borderLeftWidth`会 返回值。

IE 不支持`getComputedStyle()`方法，但它有一种类似的概念。在 IE 中，每个具有`style`属性 的元素还有一个`currentStyle`属性。这个属性是`CSSStyleDeclaration`的实例。下面是一个兼容模式的例子：

    function getStyles(elem) {
        window.getComputedStyle ?  window.getComputedStyle(elem,null) : elem.currentStyle;
    }
    var myDemo = document.getElementById('demo');
    var computedStyle = getStyles(myDemo)

> 所有计算的样式都是只读的。不能修改计算后样式对象中的 CSS 属性。

### 第五部分：实例

#### 5.1 设置 style 样式

    const ieVersion =  Number(document.documentMode);
    /**
     * 将:-_等变成驼峰式，如foo-bar变成fooBar
     * @param name 要处理的字符串
     * @returns {*} 处理后的字符串
     */
    const camelCase = function(name) {
      return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
        // 开头的不大写，其余的大写
        return offset ? letter.toUpperCase() : letter;
      }).replace(/^moz([A-Z])/, 'Moz$1'); // 对moz进行特殊处理
    };

    /**
     * 设置元素的样式
     * @param element 要设置的元素
     * @param styleName 要设置的样式
     * @param value 要设置的值
     */
    functionsetStyle(element, styleName, value) {
      if (!element || !styleName) return;
      // 如果是对象则拆分后依次设置
      if (typeof styleName === 'object') {
        for (var prop in styleName) {
          if (styleName.hasOwnProperty(prop)) {
            setStyle(element, prop, styleName[prop]);
          }
        }
      } else {
        styleName = camelCase(styleName);
        // opacity特殊处理
        if (styleName === 'opacity' && ieVersion < 9) {
          element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
        } else {
          element.style[styleName] = value;
        }
      }
    };

#### 5.2 获得 style 样式

    var ieVersion =  Number(document.documentMode);
    /**
     * 将:-_等变成驼峰式，如foo-bar变成fooBar
     * @param name 要处理的字符串
     * @returns {*} 处理后的字符串
     */
    const camelCase = function(name) {
      return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
        // 开头的不大写，其余的大写
        return offset ? letter.toUpperCase() : letter;
      }).replace(/^moz([A-Z])/, 'Moz$1'); // 对moz进行特殊处理
    };
    /**
     * 获取样式，分IE9以下和其他两种方式处理
     * @type {Function}
     * @param element 要获取样式的元素
     * @param styleName 要获取的样式名
     */
    var getStyle = ieVersion < 9 ? function(element, styleName) {
      if (!element || !styleName) return null;
      // 将样式名转成驼峰式
      styleName = camelCase(styleName);
      // float特殊处理
      if (styleName === 'float') {
        styleName = 'styleFloat';
      }
      try {
        // opacity特殊处理
        switch (styleName) {
          case'opacity':
            try {
              return element.filters.item('alpha').opacity / 100;
            } catch (e) {
              return 1.0;
            }
          default:
            return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
        }
      } catch (e) {
        return element.style[styleName];
      }
    } : function(element, styleName) {
      if (!element || !styleName) return null;
      styleName = camelCase(styleName);
      if (styleName === 'float') {
        styleName = 'cssFloat';
      }
      try {
        var computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
      } catch (e) {
        return element.style[styleName];
      }
    };

#### 5.3 增加和删除 class 样式

    /**
     * 判断是否包含某类
     * @param el 要检测的元素
     * @param cls 要检测的类名
     * @returns {boolean}
     */
    function hasClass(el, cls) {
      if (!el || !cls) returnfalse;
      if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
      if (el.classList) {
        return el.classList.contains(cls);
      } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
      }
    };

    /**
     * 给元素添加某些类
     * @param el 要处理的元素
     * @param cls 要添加的类
     */
    function addClass(el, cls) {
      if (!el) return;
      var curClass = el.className;
      var classes = (cls || '').split(' ');

      for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
          el.classList.add(clsName);
        } elseif (!hasClass(el, clsName)) {
          curClass += ' ' + clsName;
        }
      }
      if (!el.classList) {
        el.className = curClass;
      }
    };

    /**
     * 给元素移除某些类
     * @param el 要处理的元素
     * @param cls 要移除的类
     */
    function removeClass(el, cls) {
      if (!el || !cls) return;
      var classes = cls.split(' ');
      var curClass = ' ' + el.className + ' ';

      for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
          el.classList.remove(clsName);
        } elseif (hasClass(el, clsName)) {
          curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
      }
      if (!el.classList) {
        el.className = trim(curClass);
      }
    };

### 参考链接

[JavaScript 高级程序设计（第 3 版）](https://www.douban.com/search?q=javascript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E6%B6%89%E5%8F%8A)

[JavaScript DOM 高级程序设计](https://book.douban.com/subject/3082278/)

[获取元素 CSS 值之 getComputedStyle 方法熟悉](https://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/)

[CSS Object Model](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model)

[可构造样式表](https://www.wandouip.com/t5i72374/)

[获取元素 CSS 值之 getComputedStyle 方法熟悉](https://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/)

[CSS 操作](http://javascript.ruanyifeng.com/dom/css.html)

[github.com/ElemeFE/ele…](https://github.com/ElemeFE/element/blob/dev/src/utils/dom.js)
