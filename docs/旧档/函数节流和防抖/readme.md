## js 的函数节流(throttle)和函数防抖(debounce)概述

### 函数防抖(debounce)

一个事件频繁触发，但是我们不想让他触发的这么频繁，于是我们就设置一个定时器让这个事件在 xxx 秒之后再执行。如果 xxx 秒内触发了，则清理定时器，重置等待事件 xxx 秒
比如在拖动 window 窗口进行 background 变色的操作的时候，如果不加限制的话，随便拖个来回会引起无限制的页面回流与重绘
或者在用户进行 input 输入的时候，对内容的验证放在用户停止输入的 300ms 后执行(当然这样不一定好，比如银行卡长度验证不能再输入过程中及时反馈)

#### 一段代码实现窗口拖动变色

```
  <script>
    let body = document.getElementsByTagName("body")[0];
    let index = 0;
    if (body) {
      window.onresize = function() {
        index++;
        console.log("变色" + index + "次");
        let num = [Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255)];
        body.style.background = "rgb(" + num[0] + "," + num[1] + "," + num[2] + ")"; //晃瞎眼睛
      };
    }
  </script>
```

#### 简单的防抖

> 使用 setTimeout 进行延迟处理，每次触发事件时都清除掉之前的方法

```
  <script>
    let body = document.getElementsByTagName("body")[0];
    let index = 0;
    let timer = null;
    if (body) {
      window.onresize = function() {
        //如果在一秒的延迟过程中再次触发,就将定时器清除，清除完再重新设置一个新的
        clearTimeout(timer);

        timer = setTimeout(function() {
          index++;
          console.log("变色" + index + "次");
          let num = [Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255)];
          body.style.background = "rgb(" + num[0] + "," + num[1] + "," + num[2] + ")";
        }, 1000); //反正就是等你什么都不干一秒后才会执行代码
      };
    }
  </script>
```

#### 抽离 debounce

> 但是目前有一个问题，就是代码耦合，这样不够优雅，将防抖和变色分离一下

```
  <script>
    let body = document.getElementsByTagName("body")[0];
    let index = 0;
    let lazyLayout = debounce(changeBgColor, 1000);
    window.onresize = lazyLayout;

    function changeBgColor() {
      index++;
      console.log("变色" + index + "次");
      let num = [Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255)];
      body.style.background = "rgb(" + num[0] + "," + num[1] + "," + num[2] + ")";
    }

    //函数去抖（连续事件触发结束后只触发一次）
    function debounce(func, wait) {
      let timeout, context, args; //默认都是undefined

      return function() {
        context = this;
        args = arguments;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(function() {
          //执行的时候到了
          func.apply(context, args);
        }, wait);
      };
    }
  </script>
```

#### underscore.js 的 debounce

> underscore.js 实现的 debounce 已经经过检验

```
//1.9.1
 _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };
```

### 函数节流(throttle)

#### 简单的节流

> 一个事件频繁触发，但是在 xxx 秒内只能执行一次代码

```
//上面的变色在节流中就是这样写了
  <script>
    let doSomething = true;
    let body = document.getElementsByTagName("body")[0];
    let index = 0;

    window.onresize = function() {
      if (!doSomething) return;
      doSomething = false;
      setTimeout(function() {
        index++;
        console.log("变色" + index + "次");
        let num = [Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255)];
        body.style.background = "rgb(" + num[0] + "," + num[1] + "," + num[2] + ")";
        doSomething = true;
      }, 1000);
    };
  </script>
```

#### 分离出 throttle 函数

> 跟上面的防抖差不多，分离一下，降低代码的耦合度

```
<script>
    let body = document.getElementsByTagName("body")[0];
    let index = 0;
    let lazyLayout = throttle(changeBgColor, 1000);
    window.onresize = lazyLayout;

    function changeBgColor() {
      index++;
      console.log("变色" + index + "次");
      let num = [Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255), Math.ceil(Math.random() * 255)];
      body.style.background = "rgb(" + num[0] + "," + num[1] + "," + num[2] + ")";
    }

    //函数去抖（连续事件触发结束后只触发一次）
    function throttle(func, wait) {
      let context,
        args,
        doSomething = true;

      return function() {
        context = this;
        args = arguments;

        if (!doSomething) return;

        doSomething = false;

        setTimeout(function() {
          //执行的时候到了
          func.apply(context, args);
          doSomething = true;
        }, wait);
      };
    }
  </script>
```

#### underscore.js 中 throttle 函数实现

```
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };
```

### 防抖和节流是用来干什么的？

#### 防抖的用处

- 绑定 scroll 滚动事件,resize 监听事件
- 鼠标点击，执行一个异步事件，相当于让用户连续点击事件只生效一次（很有用吧）
- 还有就是输入框校验事件（但是不一定好使，比如校验银行卡长度，当你输入完之后已经超出 100 个字符，正常应该是超出就提示错误信息）

#### 节流的用处

- 当然还是鼠标点击啦，但是这个是限制用户点击频率。类似于你拿把 ak47 射击，枪的射速是 100 发/分钟,但是的手速达到 1000 按/分钟，就要限制一下喽（防止恶意刷子）
- 根据屏幕滚动到底部加载更多的功能

> 其实二者主要就是为了解决短时间内连续多次重复触发和大量的 DOM 操作的问题，来进行性能优化（重点是同时还能接着办事，并不耽误）
> 防抖主要是一定在 xxx 秒后执行,而节流主要是在 xxx 内执行（时间之后，时间之内）

右边那个快速目录就是加了个 throttle，控制台的执行速度就减少了（快速目录是看了掘金的目录之后弄的，确实方便了好多，对于长文本的阅读体验好了不少）

文章写的时候用的 underscore 1.8.2 版本，实现也是参考 underscore 的源码，实现方式与 underscore 最新有些代码还是不太一样了。（功能还是相同的）

- [underscorejs API](https://underscorejs.org/)
- [underscorejs 源码](https://github.com/jashkenas/underscore/blob/d5fe0fd4060f13b40608cb9d92eda6d857e8752c/underscore.js)
- [伢羽 underscore 防抖](https://github.com/mqyqingfeng/Blog/issues/22)
- [伢羽 underscore 节流](https://github.com/mqyqingfeng/Blog/issues/26)
