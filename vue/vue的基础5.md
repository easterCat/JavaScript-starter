# vue

## 1.watch 怎么深度监听对象变化

'obj.xx': { handler: function(val) {}, deep:true }

## 2.怎么在 watch 监听开始之后立即被调用

'obj.xx': { handler: function(val) {}, immediate:true }

## 3.watch 和 computed 有什么区别

- watch 是侦听属性，computed 是计算属性
- watch 是为了应对复杂的逻辑计算，computed 是对数据的变化作出反应
- watch 是只有当缓存改变时才执行，computed 是只要从新渲染就会执行
- watch 有缓存，computed 没有缓存

## 4.v-show 和 v-if 有什么区别？使用场景分别是什么

- v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- v-show  就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

> 所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景和预渲染需求。

## 5.什么是双向绑定？原理是什么

通过 Observer 把数据劫持(Object.defineProperty()) 、加入到订阅器(Dep) 订阅器收集订阅者(Watcher )、视图通过编译(Compile)、解析指令(Directive)等一些列操作收集给订阅者 、最后通过触发数据变化 update 通知所有订阅者完成数据驱动

## 6.Class 与 Style 如何动态绑定

### Class 可以通过对象语法和数组语法进行动态绑定

- 对象语法：

```vue
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

data: { isActive: true, hasError: false }
```

- 数组语法：

```vue
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

data: { activeClass: 'active', errorClass: 'text-danger' }
```

### Style 也可以通过对象语法和数组语法进行动态绑定

- 对象语法：

```vue
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: { activeColor: 'red', fontSize: 30 }
```

- 数组语法：

```vue
<div v-bind:style="[styleColor, styleSize]"></div>

data: { styleColor: { color: 'red' }, styleSize:{ fontSize:'23px' } }
```

## 7.怎样理解 Vue 的单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 \$emit 派发一个自定义事件，父组件接收到后，由父组件修改。
有两种常见的试图改变一个 prop 的情形 :

- 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

```vue
props: ['initialCounter'], data: function () { return { counter:
this.initialCounter } }
```

- 这个 prop 以一种原始的值传入且需要进行转换。 在这种情况下，最好使用这个 prop 的值来定义一个计算属性

```vue
props: ['size'], computed: { normalizedSize: function () { return
this.size.trim().toLowerCase() } }
```

## 8.直接给一个数组项赋值，Vue 能检测到变化吗

由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength

为了解决第一个问题，Vue 提供了以下操作方法：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue);
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue);
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue);
```

为了解决第二个问题，Vue 提供了以下操作方法：

```js
// Array.prototype.splice
vm.items.splice(newLength);
```

## 9.谈谈你对 Vue 生命周期的理解

### 生命周期是什么

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

### 各个生命周期的作用

- beforeCreate 组件实例被创建之初，组件的属性生效之前

- created 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，\$el 还不可用

- beforeMount 在挂载开始之前被调用：相关的 render 函数首次被调用

- mountedel 被新创建的 vm.\$el 替换，并挂载到实例上去之后调用该钩子

- beforeUpdate 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前

- update 组件数据更新之后

- activited keep-alive 专属，组件被激活时调用

- deactivated keep-alive 专属，组件被销毁时调用

- beforeDestory 组件销毁前调用

- destoryed 组件销毁后调用

![](https://cn.vuejs.org/images/lifecycle.png)

## 10.vue 的 install 和 use 方法

插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

- 添加全局方法或者属性。如: vue-custom-element
- 添加全局资源：指令/过滤器/过渡等。如 vue-touch
- 通过全局混入来添加一些组件选项。如 vue-router
- 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
- 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

Vue.js 的插件应该暴露一个 install 方法,这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。,通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```
