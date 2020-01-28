# 一.自定义指令 directive

除了核心功能默认内置的指令 (`v-model` 和`v-show`)，Vue 也允许注册自定义指令。注意，在 `Vue2.0` 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

来个实例，当页面加载时，该 input 元素将获得焦点：

    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function(el){
        // 聚焦元素
        el.focus()
      }
    })

如果想注册局部指令，组件中也接受一个`directives` 的选项：

    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }

然后你可以在模板中任何元素上使用新的 v-focus 属性，如下：

    <input v-focus>

## 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

接下来我们来看一下钩子函数的参数 (即 `el`、`binding`、`vnode`和 `oldVnode`)。

## 钩子函数参数

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM 。
-

`binding`：一个对象，包含以下属性：

- `name`：指令名，不包括 v- 前缀。
- `value`：指令的绑定值，例如：`v-my-directive="1 + 1"`中，绑定值为`2`。
- `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated`钩子中可用。无论值是否改变都可用。
- `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为`"1 + 1"`。
- `arg`：传给指令的参数，可选。例如 `v-my-directive:foo`中，参数为`"foo"`。
- `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

- `vnode`：`Vue` 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在`update` 和 `componentUpdated` 钩子中可用。

> 除了 `el`之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。

这是一个使用了这些属性的自定义钩子样例：

    <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>

    Vue.directive('demo', {
      bind: function(el, binding, vnode) {
        var s = JSON.stringify
        el.innerHTML =
          'name: '       + s(binding.name) + '<br>' +
          'value: '      + s(binding.value) + '<br>' +
          'expression: ' + s(binding.expression) + '<br>' +
          'argument: '   + s(binding.arg) + '<br>' +
          'modifiers: '  + s(binding.modifiers) + '<br>' +
          'vnode keys: ' + Object.keys(vnode).join(', ')
      }
    })

    new Vue({
      el:'#hook-arguments-example',
      data: {
        message: 'hello!'
      }
    })

结果：

    name:"demo"value:"hello!"expression:"message"argument:"foo"modifiers: {"a":true,"b":true}
    vnode keys: tag, data, children, text, elm, ns, context, fnContext, fnOptions, fnScopeId, key, componentOptions, componentInstance, parent, raw, isStatic, isRootInsert, isComment, isCloned, isOnce, asyncFactory, asyncMeta, isAsyncPlaceholder

在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。比如这样写:

    Vue.directive('color-swatch', function (el, binding) {
      el.style.backgroundColor = binding.value
    })

## 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

    <divv-demo="{ color: 'white', text: 'hello!' }"></div>

    Vue.directive('demo', function (el, binding) {
      console.log(binding.value.color) // => "white"
      console.log(binding.value.text)  // => "hello!"
    })

# 二.插件

插件通常会为 Vue 添加全局功能。插件的范围没有限制——一般有下面几种：

- 1.添加全局方法或者属性，如: [vue-custom-element](https://github.com/karol-f/vue-custom-element)
- 2.添加全局资源：指令/过滤器/过渡等，如 [vue-touch](https://github.com/vuejs/vue-touch)
- 3.通过全局 mixin 方法添加一些组件选项，如: [vue-router](https://github.com/vuejs/vue-router)
- 4.添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
- 5.一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 [vue-router](https://github.com/vuejs/vue-router)

Vue.js 的插件应当有一个公开方法`install` 。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

    MyPlugin.install = function(Vue, options){
      // 1. 添加全局方法或属性
      Vue.myGlobalMethod = function(){
        // 逻辑...
      }

      // 2. 添加全局资源
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // 逻辑...
        }
        ...
      })

      // 3. 注入组件
      Vue.mixin({
        created: function(){
          // 逻辑...
        }
        ...
      })

      // 4. 添加实例方法
      Vue.prototype.$myMethod = function(methodOptions){
        // 逻辑...
      }
    }

## 怎样使用插件

通过全局方法`Vue.use()`使用插件：

    // 调用 `MyPlugin.install(Vue)`
    Vue.use(MyPlugin)

也可以传入一个选项对象：

    Vue.use(MyPlugin, { someOption: true })

`Vue.use` 会自动阻止多次注册相同插件，届时只会注册一次该插件。

`Vue.js` 官方提供的一些插件 (例如 vue-router) 在检测到 Vue 是可访问的全局变量时会自动调用`Vue.use()`。然而在例如 CommonJS 的模块环境中，你应该始终显式地调用 `Vue.use()`：

    // 用 Browserify 或 webpack 提供的 CommonJS 模块环境时var Vue = require('vue')
    var VueRouter = require('vue-router')

    // 不要忘了调用此方法
    Vue.use(VueRouter)

## 简单例子

封装一个全局的插件，如下：
在 src 下的 components 文件夹下新建一个 countdown 文件夹，新建一个 countdown.vue 文件：

    <template><div>封装一个最简单的插件</div></template><script>exportdefault{
        name:'count-down'
    }
    </script>

在放 countdown.vue 的同级目录下新建一个 index.js：

    import countDown from'./countdown';

    countDown.install = function(Vue){
        Vue.component(countDown.name,countDown)
    };

    exportdefault countDown;

在 main.js 中：

    import countDown from'./components/countdown/index.js'
    Vue.use(countDown)

在组件中就可以这样使用了：

    <count-down></count-down>

# 三.混合 mixins

混合 (`mixins`) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。当组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。

    // 定义一个混合对象var myMixin = {
      created: function () {
        this.hello()
      },
      methods: {
        hello: function () {
          console.log('hello from mixin!')
        }
      }
    }

    // 定义一个使用混合对象的组件var Component = Vue.extend({
      mixins: [myMixin]
    })

    var component = new Component() // => "hello from mixin!"

## 选项合并

当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。比如，同名钩子函数将混合为一个数组，因此都将被调用。另外，混合对象的 钩子将在组件自身钩子 之前 调用 ：

    var mixin = {
      created: function () {
        console.log('混合对象的钩子被调用')
      }
    }

    new Vue({
      mixins: [mixin],
      created: function () {
        console.log('组件钩子被调用')
      }
    })

    // => "混合对象的钩子被调用"// => "组件钩子被调用"

值为对象的选项，例如`methods`, `components` 和 `directives`，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。

    var mixin = {
      methods: {
        foo: function() {
          console.log('foo')
        },
        conflicting:function() {
          console.log('from mixin')
        }
      }
    }

    var vm = new Vue({
      mixins: [mixin],
      methods: {
        bar: function() {
          console.log('bar')
        },
        conflicting:function() {
          console.log('from self')
        }
      }
    })

    vm.foo() // => "foo"vm.bar() // => "bar"vm.conflicting() // => "from self"

> 注意：`Vue.extend()`也使用同样的策略进行合并。

## 全局混合

也可以全局注册混合对象。注意使用！ 一旦使用全局混合对象，将会影响到 所有 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。

    // 为自定义的选项 'myOption' 注入一个处理器。
    Vue.mixin({
      created: function () {
        var myOption = this.$options.myOption
        if (myOption) {
          console.log(myOption)
        }
      }
    })

    new Vue({
      myOption: 'hello!'
    })
    // => "hello!"

> `谨慎使用全局混合对象`，因为会影响到每个单独创建的 Vue 实例 (包括第三方模板)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。也可以将其用作 Plugins 以避免产生重复应用

## 自定义选项合并策略

自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 `Vue.config.optionMergeStrategies` 添加一个函数：

    Vue.config.optionMergeStrategies.myOption = function(toVal, fromVal) {
      // returnmergedVal
    }

对于大多数对象选项，可以使用 methods 的合并策略：

    var strategies = Vue.config.optionMergeStrategies
    strategies.myOption = strategies.methods
