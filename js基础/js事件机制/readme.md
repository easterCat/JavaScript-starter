## 面试题 event 事件

- 事件委托是什么？
- 如何阻止事件冒泡,阻止默认事件呢？
- Javascript 的事件流模型都有什么？
- 事件绑定和普通事件有什么区别？

![event](https://github.com/easterCat/common_js/blob/master/js%E4%BA%8B%E4%BB%B6/img/03.png?raw=true)

## Event 对象

Event 对象，当事件发生的时候出发某个函数，该 Event 对象将自动在函数内可用，该对象包含了很多事件触发时候的信息，
但 IE 却没有这么实现，而是自己实现的，IE 浏览器是通过全局对象 window 下的 event 属性来包含这些信息

```
function myEventHandler(e) {
    // 注意参数e
    // 该函数调用的时候e是event对象（W3C实现）
    // 兼容IE的代码
    e = e || window.event;
    // 现在e就可以兼容各种浏览器了
}
```

## 事件注册

这里最重要的就是 IE 的 attachEvent 和 W3C 标准 addEventListener 在执行上的一些区别

1. attachEvent 只支持事件冒泡 addEventListener 既支持事件冒泡，也支持事件捕获
2. 参数：attachEvent 事件类型需要 on 前缀 addEventListener 事件类型不需要 on 前缀
3. 如果使用 attachEvent 对一个元素的目标阶段绑定了多次事件，那么会按照绑定顺序的相反顺序进行触发。如果使用 addEventListener 对一个元素的目标阶段绑定了多次事件，那么会按照绑定顺序进行触发

### w3c

```
var oBtn = document.getElementById("btn1");
oBtn.addEventListener('click', introClick, false);
```

### ie

```
var oBtn = document.getElementById("btn1");
oBtn.attachEvent('onclick', introClick);
```

### 兼容写法

```
      var oBtn = document.getElementById("btn1");
      addEvent(oBtn, "click", show);
      addEvent(oBtn, "click", show2);
      // removeEvent(oBtn, "click", show);

      //对象.addEventListener(事件名,函数,false);	for 高
      //事件名	onclick	over/out/down/up.........不带on
      //函数	obj.onclick=show	show==函数
      function addEvent(obj, eve, fn) {
        if (obj.addEventListener) {
          obj.addEventListener(eve, fn, false); //由于事件参数不带on
        } else {
          obj.attachEvent("on" + eve, fn); //所以这里的绑定事件要将on补上
        }
      }

      //解绑
      //对象.removeEventListener(事件名,函数,false);  chrome FF IE 9 10
      //对象.detachEvent(事件名,函数);        IE 6 7 8
      // oBtn.detachEvent('onclick',show2);
      //移除函数
      function removeEvent(obj, eve, fn) {
        if (obj.removeEventListener) {
          obj.removeEventListener(eve, fn, false);
        } else {
          obj.detachEvent("on" + eve, fn);
        }
      }

      function show() {
        alert("我将弹出1");
      }

      function show2() {
        alert("我将弹出2");
      }
```

### 删除匿名函数的引用

```
addEvent(oBtn, 'click', function(){
    alert("弹出1");
    //arguments对象包含了所有传递进来的参数以及该函数自身(callee)
    console.log(arguments);
    removeEvent(oBtn, 'click', arguments.callee);
});
```

![arguments对象](https://github.com/easterCat/common_js/blob/master/js%E4%BA%8B%E4%BB%B6/img/01.png?raw=true)

> W3C 和微软模型还有其他的少许差异，callee 是返回正在被执行的 function 函数，也就是所指定的 function 对象的正文。arguments.callee 知道就好了，别在代码中用了

## 事件冒泡和捕获

当年，IE 是冒泡流，而网景是捕获流，W3C 费些力使 JS 支持了冒泡流和捕获流。但是前些年或者更之前的时候，IE 还是老大，于是早期的 IE 浏览器并不支持捕获。

### 冒泡

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>事件冒泡</title>
    <style></style>
    <script>
      window.onload = function() {
        _id("div1").addEventListener(
          "click",
          function() {
            alert(_id("div1").style.background);
          },
          false
        );

        _id("div2").addEventListener(
          "click",
          function() {
            alert(_id("div2").style.background);
          },
          false
        );

        _id("div3").addEventListener(
          "click",
          function() {
            alert(_id("div3").style.background);
          },
          false
        );

        function _id(id) {
          return document.getElementById(id);
        }
      };
    </script>
  </head>

  <body>
    <div id="div1" style="width:500px; height:500px; background:red;">
      <div id="div2" style="height:300px; width:300px; background:yellow">
        <div id="div3" style="width:100px; height:100px; background:blue"></div>
      </div>
    </div>
  </body>
</html>
```

### 捕获

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>事件捕获</title>
    <style></style>
    <script>
      window.onload = function() {
        var oDiv1 = document.getElementById("div1");
        var oDiv2 = document.getElementById("div2");
        var oDiv3 = document.getElementById("div3");

        oDiv1.addEventListener(
          "click",
          function() {
            alert(oDiv1.style.background);
          },
          true
        );

        oDiv2.addEventListener(
          "click",
          function() {
            alert(oDiv2.style.background);
          },
          true
        );

        oDiv3.addEventListener(
          "click",
          function() {
            alert(oDiv3.style.background);
          },
          true
        );
      };
    </script>
  </head>

  <body>
    <div id="div1" style="width:500px; height:500px; background:red;">
      <div id="div2" style="height:300px; width:300px; background:yellow">
        <div id="div3" style="width:100px; height:100px; background:blue"></div>
      </div>
    </div>
  </body>
</html>
```

> addEventListener 的第三个参数 true 就是捕获，false 就是冒泡

### 阻止默认行为

```
    <script type="text/javascript">
      var oBtn = document.getElementById("btn1");
      addEvent(oBtn, "click", myEventHandler);

      //对象.addEventListener(事件名,函数,false);	for 高
      //事件名	onclick	over/out/down/up.........不带on
      //函数	obj.onclick=show	show==函数
      function addEvent(obj, eve, fn) {
        if (obj.addEventListener) {
          obj.addEventListener(eve, fn, false); //由于事件参数不带on
        } else {
          obj.attachEvent("on" + eve, fn); //所以这里的绑定事件要将on补上
        }
      }

      function myEventHandler(e) {
        e = e || window.event;
        // 防止默认行为
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    </script>
```

禁止一下鼠标右键

```
    document.getElementById("contextmenu").addEventListener(
      "contextmenu",
      function(ev) {
        var oEvt = ev || event;
        oEvt.preventDefault(); //阻止默认
      },
      false
    );
```

### 阻止冒泡

```
<script>
      window.onload = function() {
        _id("div1").addEventListener(
          "click",
          function() {
            alert(_id("div1").style.background);
          },
          false
        );

        _id("div2").addEventListener(
          "click",
          function() {
            alert(_id("div2").style.background);
          },
          false
        );

        _id("div3").addEventListener("click", myParagraphEventHandler, false);

        function _id(id) {
          return document.getElementById(id);
        }

        function myParagraphEventHandler(e) {
          alert(this.style.background);
          e = e || window.event;
          // 停止向上冒泡
          if (e.stopPropagation) {
            // W3C实现
            e.stopPropagation();
          } else {
            // IE实现
            e.cancelBubble = true;
          }
        }
      };
    </script>
```

为什么我们要阻止默认事件呢？

1. 异步操作
2. 提交表单之前对表单进行一些基本的验证，比如邮箱是否合法，用户名是不是满足指定的格式，为了不让 a 点击之后跳转，我们就要给他的点击事件进行阻止
3. 文本框获得焦点

### 事件委托

事件委托描述的是将事件绑定在容器元素上，然后通过判断点击的 target 子元素的类型来触发相应的事件

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <table id="my-table">
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
      <tr>
        <td>7</td>
        <td>8</td>
        <td>9</td>
      </tr>
      <tr>
        <td>11</td>
        <td>22</td>
        <td>33</td>
      </tr>
      <tr>
        <td>44</td>
        <td>55</td>
        <td>66</td>
      </tr>
    </table>
  </body>
  <script>
    var myTable = document.getElementById("my-table");

    myTable.onclick = function(e) {
      // 处理浏览器兼容
      e = e || window.event;
      var targetNode = e.target || e.srcElement;

      if (targetNode.nodeName.toLowerCase() === "td") {
        alert("You clicked a table row!");
      }
    };
  </script>
</html>
```

### DOM 事件流

这就是为什么捕获事件中，目标阶段是最后。而在冒泡事件中，目标阶段是最先了

![DOM 事件流](https://github.com/easterCat/common_js/blob/master/js%E4%BA%8B%E4%BB%B6/img/02.png?raw=true)

##面试题答案

- 利用事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行 2.阻止冒泡 ie 是 ;其他是;

- | 浏览器 |               阻止冒泡 |            阻止默认 |
  | :----- | ---------------------: | ------------------: |
  | ie     | ev.cancelBubble = true |        return false |
  | 其他   |   ev.stopPropagation() | ev.preventDefault() |

- "事件冒泡"：事件开始由最具体的元素接受，然后逐级向上传播
  "事件捕捉"：事件由最不具体的节点先接收，然后逐级向下，一直到最具体的
  "DOM 事件流"：三个阶段：事件捕捉，目标阶段，事件冒泡

- xxx.onEvent = function(){}其实是赋值操作，下面取缔上面的。而事件绑定可以一口气绑定多个事件，按绑定顺序执行

> xxx.onEvent 就是对监听属性赋值一个函数，取消绑定设置为空就好了 xxx.onEvent = null

## 常见事件

#### 鼠标事件

- mousedown 鼠标设备按下一个元素的时候触发 mousedown 事件
- mouseup 鼠标设备从按下的元素上弹起的时候触发 mouseup 事件
- click 鼠标点击元素的时候触发 click 事件
- dblclick 鼠标双击元素的时候触发 dblclick 事件
- mouseover 鼠标移动到某元素上的时候触发 mouseover 事件
- mouseout 鼠标从某元素离开的时候触发 mouseout 事件
- mousemove 鼠标在某元素上移动但未离开的时候触发 mousemove 事件

#### 键盘事件

- keypress 按键按下的时候触发该事件
- keydown 按键按下的时候触发该事件，并且在 keypress 事件之前
- keyup 按键松开的时候触发该事件，在 keydown 和 keypress 事件之后

#### 表单事件

- select 文本字段（input, textarea 等）的文本被选择的时候触发该事件
- change 控件失去 input 焦点的时候触发该事件（或者值被改变的时候）
- submit 表单提交的时候触发该事件
- reset 表单重置的时候触发该事件
- focus 元素获得焦点的时候触发该事件，通常来自鼠标设备或 Tab 导航
- blur 元素失去焦点的时候触发该事件，通常来自鼠标设备或 Tab 导航

#### 其它事件

- load 页面加载完毕（包括内容、图片、frame、object）的时候触发该事件
- resize 页面大小改变的时候触发该事件（例如浏览器缩放）
- scroll 页面滚动的时候触发该事件
- unload 从页面或 frame 删除所有内容的时候触发该事件（例如离开一个页面）

## 参考

[MDN - addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
[JavaScript 权威指南(第 5 版)](https://book.douban.com/subject/1231579/)
