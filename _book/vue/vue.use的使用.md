## Vue.use()

vue.use()的作用：
官方文档的解释：

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
vue.use()使用情景:
可以在项目中使用 vue.use()全局注入一个插件，从而不需要在每个组件文件中 import 插件。例如：
不使用 vue.use()注入插件：

```js
const utils = require("./utils");
// 或者
import utils from "./utils";
```

使用 vue.use()注入插件，最典型的案例：

```js
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
```

使用了 vue.use()注册插件之后就可以在所有的 vue 文件中使用路由：`this.$route`

## vue.use()源码

下面切入本文的主题。我们知道了 vue.use()怎么用还不够，还要知道它的内部是怎么实现的。下面展示源码：

```js
import { toArray } from "../util/index";

export function initUse(Vue: GlobalAPI) {
  Vue.use = function(plugin: Function | Object) {
    const installedPlugins =
      this.\_installedPlugins || (this.\_installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // additional parameters
    const args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === "function") {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
```

vue.use()源码中采用了 flow 的语法。flow 语法，官方解释是：

> Flow is a static type checker for your JavaScript code. It does a lot of work to make you more productive. Making you code faster, smarter, more confidently, and to a bigger scale.简单的意思就是 flow 是 JavaScript 代码的静态类型检查工具。使用 flow 的好处就是：在编译期对 js 代码变量做类型检查，缩短调试时间， 减少因类型错误引起的 bug。我们都知道 js 是解释执行语言，运行的时候才检查变量的类型，flow 可以在编译阶段就对 js 进行类型检查。

下面将对 vue.use()源码进行解读：

1、首先先判断插件 plugin 是否是对象或者函数：
`Vue.use = function (plugin: Function | Object)`

2、判断 vue 是否已经注册过这个插件
`installedPlugins.indexOf(plugin) > -1`
如果已经注册过，跳出方法

3、取 vue.use 参数。
`const args = toArray(arguments, 1)`

4、toArray()取参数
代码：

```js
export function toArray(list: any, start?: number): Array<any> {
  start = start || 0;
  let i = list.length - start;
  const ret: Array<any> = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
```

`let i = list.length - start` 意思是 vue.use()方法传入的参数，除第一个参数外（第一个参数是插件 plugin），其他参数都存储到一个数组中，并且将 vue 对象插入到参数数组的第一位。最后参数数组就是[vue,arg1,arg2,...]。

5、判断插件是否有 install 方法，如果有就执行 install()方法。没有就直接把 plugin 当 Install 执行。

```js
if (typeof plugin.install === "function") {
  plugin.install.apply(plugin, args);
} else if (typeof plugin === "function") {
  plugin.apply(null, args);
}
```

plugin.install.apply(plugin, args)将 install 方法绑定在 plugin 环境中执行，并且传入 args 参数数组进 install 方法。此时 install 方法内的 this 指向 plugin 对象。plugin.apply(null, args) plugin 内的 this 指向 null.

最后告知 vue 该插件已经注册过 installedPlugins.push(plugin)保证每个插件只会注册一次。

## 总结

使用 vue.use()注册插件，插件可以是一个函数，可以是一个带有 install 属性的对象。不管是函数还是 install 方法,第一个参数总是 vue 对象。个人还是喜欢使用将插件的功能方法写在 install 方法里。因为 install 内的 this 指向的是 plugin 对象自身，扩展性更好。
