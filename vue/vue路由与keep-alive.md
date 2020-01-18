## 性能优化

性能优化一直是前端开发的注意点，通常情况下，当前页面跳转到下一个页面，然后再返回，当前页面会重新渲染 DOM 然后再获取数据更新 DOM，在此过程中造成了不必要的资源浪费。正好 vue 中提供了 keep-alive 内置组件，使用 keep-alive 包裹组件，可以把切换出去的组件保留在内存中，从而保留它的状态避免重新渲染，达到了缓存组件的效果。

## 组件缓存

```js
<keep-alive>
  <router-view />
</keep-alive>
```

问题描述：但是，在列表页切换到详情页（动态路由）的时候，就出现问题了。访问详情页之后，返回到列表页，再查看另外的详情页，显示的还是上一次的详情页，说明 keep-alive 把第一次的详情页缓存了，导致数据不刷新。

```js
<transition name="fade" mode="out-in">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</transition>
```

有几种解决方式

#### 配置 include 或 exclude 属性

在 keep-alive 中直接添加 include，cachedViews（Array 类型：包含 vue 文件的组件 name 都将被缓存起来）；反之 exclude 则是不包含；

注意：所有.vue 组件文件都必须附上 name 属性！！！建议用 vuex 管理 cachedViews

```js
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>

<!-- cachedViews -->
<keep-alive :include="cachedViews">
    <router-view></router-view>
</keep-alive>
```

exclude 属性

```js
<!-- 不缓存Detail组件 -->
<keep-alive exclude="Detail">
  <router-view />
</keep-alive>
<!-- 注意Detail是组件名字，在路由记录中配置 -->
```

#### 使用 watch 监听\$route

每次切换，\$route 都会变化，可以监听它的变化，再次获取数据，触发页面更新.此方法会造成页面闪动，页面会首页显示缓存中的数据，然后再获取新数据.会在页面离开时再次执行 fetchDate，并不是我们需要的，所以可以在 to 和 from 上添加执行逻辑，但也是十分的麻烦

```js
watch: {
	'$route' (to, from) {
		const toDepth = to.path.split('/').length
		const fromDepth = from.path.split('/').length
		if (toDepth < fromDepth) { // 返回到列表页面，直接退出
			return
		}
        if（list.indexOf(from.path) === -1）{ //自行添加逻辑，list 为你不想有缓存的路径
　　　　　　　　 this.getDetail()
        }
		this.id = to.params.id // 获取新路由的参数id
		this.getDetail() // 更新数据
	}
}
```

#### activated()钩子

添加 keep-alive 后会增加两个生命周期 mounted/activated, 当组件在 `<keep-alive>` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。这样就可以在每次入路由执行更细致的操作了,通过在钩子函数内的逻辑，很好的解决了缓存组件的问题

```js
mounted() {
  this.lastId = this.$route.params.id // 在 created 或 mounted 钩子中记录上一次的id
},
activated() {
  if (this.lastId !== this.$route.params.id) {
    this.lastId = this.$route.params.id // 重置上一次的 id
    this.getDetail() // 更新数据
  }
}
```

#### v-if 直接控制渲染

```js
<div>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
```

#### 通过路由信息配置

还有种情况，在不同路由应用了相同的 vue 组件

```js
{path:'aaa',component:Mompage,name:'mom'},
{path:'bbb',component:Mompage,name:'momPlus'}
```

默认情况下当这两个页面切换时并不会触发 vue 的 created 或者 mounted 钩子，需要手动的 watch:\$router（又回到上面的步骤），或者在 router-view 上加上唯一值。

```js
<router-view :key="key"></router-view>
computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.\$route + +new Date()
    }
}
```

## doc

- [https://qyhever.top/2018/03/20/vue%E4%B8%AD%E5%BC%80%E5%90%AFkeep-alive%E7%9A%84%E6%B3%A8%E6%84%8F%E7%82%B9/](https://qyhever.top/2018/03/20/vue%E4%B8%AD%E5%BC%80%E5%90%AFkeep-alive%E7%9A%84%E6%B3%A8%E6%84%8F%E7%82%B9/)
