## karma 和 jasmine

[karma](https://github.com/karma-runner/karma) 是 google 开源的一个基于 Node.js 的 JavaScript 前端测试运行框架，前身叫 Testacular.
[jasmine](https://jasmine.github.io/) 是一个 javascript 测试框架
[mocha](https://mochajs.org/#getting-started) 是一个 javascript 测试框架
[chai](https://www.chaijs.com/) 是一个断言库

一般组合是 karma + jasmine(自带断言库) 或者 karma + mocha +chai ,使用哪种看心情就好.这里用 karma + jasmine

## 安装依赖

karma-cli 用来全局使用 karma 命令

```
npm install karma-cli -g

输入 karma --version
输出 Karma version: 4.0.1
```

然后安装 karma 和 jasmine

```
npm install karma --save-dev
npm install karma-jasmine --save-dev
```

安装浏览器支持

```
npm install karma-chrome-launcher --save-dev
```

> 想支持其他浏览器就将 karma-chrome-launcher 中间的换成其他浏览器就好比如(karma-firefox-launcher,karma-ie-launcher)

安装覆盖率测试

```
npm install karma-coverage
```

package.json(没怎么升级过)

```
  "devDependencies": {
    "babel-polyfill": "^6.26.0",
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-external-helpers": "^6.22.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1",
    "chai": "^4.2.0",
    "file-loader": "^1.1.6",
    "html-loader": "^0.5.5",
    "karma-chrome-launcher": "^2.2.0",
    "karma-jasmine": "^2.0.1",
    "karma-webpack": "^3.0.5",
    "mocha": "^5.2.0",
    "rollup-plugin-babel": "^3.0.5",
    "rollup-plugin-node-resolve": "^4.0.0",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.11.1"
  },
```

## karma 的使用

karma 的 3 个命令 start,init,run

首先是 karma init,用来生成 karma.conf.js 文件作为 karma 的默认配置文件,这个文件可以叫其它名字.

```
D:\ComProjects>karma init

Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> jasmine

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> Chrome
>

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
>

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question.
>

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes


Config file generated at "D:\ComProjects\haocai\pc.haocai\karma.conf.js".
```

然后就是 karma start,会自己找到 karma.config.js 配置文件并执行,如果配置文件改名了,就执行 karma start filename.成功了就出现一个小的 chrome,这个窗口如果不中断进程,点击 x 关闭也会自己打开.

karma run 则在 karma start 之后对 karma 直接执行测试

![01](https://github.com/easterCat/common_js/blob/master/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95/img/01.png?raw=true)

## 单元测试

#### jasmine

- describe(string, function)：一个测试集,用来划分单元测试的，describe 是可以嵌套使用的

- it(string, function)：测试用例

- expect：断言表达式

修改 karma.conf.js 的 files 字段

```
files: ["src/**/*.js", "test/**/*.test.js"],
```

在 src 文件夹中创建 hello.js

```
function hello() {
  return "hello world";
}
```

在 test 文件夹中新建 hello.test.js (spec.js 也行)

```
describe('测试hello方法', function () {
  it('出来的是不是hello world呢?', function () {
    expect("hello world").toEqual(hello());
  });
});
```

启动测试

```
D:\ComProjects>karma start
18 03 2019 19:13:30.453:WARN [karma]: No captured browser, open http://localhost:9876/
18 03 2019 19:13:30.500:INFO [karma-server]: Karma v4.0.1 server started at http://0.0.0.0:9876/
18 03 2019 19:13:30.502:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
18 03 2019 19:13:30.515:INFO [launcher]: Starting browser Chrome
18 03 2019 19:13:31.371:INFO [Chrome 72.0.3626 (Windows 10.0.0)]: Connected on socket lrQtIUbS58RiCehKAAAA with id 27174253
Chrome 72.0.3626 (Windows 10.0.0): Executed 1 of 1 SUCCESS (0.005 secs / 0.001 secs)
TOTAL: 1 SUCCESS
```

此时打开另外一个控制台执行 karma run 会将测试再次执行一次(只能在 karma start 之后执行)

## 测试覆盖率

使用 karma-coverage 来测试代码覆盖率

修改 karma.conf.js

```
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.test.js': ['coverage']
    }, // 配置覆盖率，在预处理的文件上加coverage

    coverageReporter: {
      type: 'html',  //可以用其他的比如text
      dir:  'coverage/'
    }, //配置覆盖率报告的查看方式

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'], //在报告中使用coverage
```

启动 karma start,会生成 coverage 文件夹,测试的覆盖率就在里面的 index.html 里面,用浏览器打开
![02](https://github.com/easterCat/common_js/blob/master/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95/img/02.png?raw=true)

## 配合 webpack 测试 vue

#### 引入 webpack

安装 karma-webpack

```
npm install --save-dev karma-webpack
```

在 karma.conf.js 引用 webpack

```
const webpack = require("webpack");
```

然后加入 webpack 配置

```
const webpackConfig = require("./webpack.conf");

{
  ......
  webpack:webpackConfig
}
```

添加一个 src/hello.vue

```
<template>
  <div>
    <h1 id="hello">{{ text}}</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: 'hello world'
      }
    }
  }
</script>

<style scoped>
</style>

```

然后添加 hello.test.js

```
import Vue from 'vue'
import hello from "../src/hello.vue";

describe('hello world', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(hello);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#hello').textContent).toEqual('hello world');
  })
});
```

启动测试

```
INFO: 'Download the Vue Devtools extension for a better development experience:
https://github.com/vuejs/vue-devtools'
INFO: 'You are running Vue in development mode.
Make sure to turn on production mode when deploying for production.
See more tips at https://vuejs.org/guide/deployment.html'
Chrome 72.0.3626 (Windows 10.0.0): Executed 1 of 1 SUCCESS (0.101 secs / 0.009 secs)
TOTAL: 1 SUCCESS
```

最后出现个 1 SUCCESS 说明成功了

现在进行 vue 开发使用脚手架已经可以自带测试工具,是 karma + mocha 的组合,还有另外一个 jest(简单易用,强,无敌)

[Jasmine 入门（上）](https://www.cnblogs.com/wushangjue/p/4541209.html)
[karma+webpack 搭建 vue 单元测试环境](https://www.jianshu.com/p/a515fbbdd1b2)
[vuejs 单元测试](https://cn.vuejs.org/v2/guide/unit-testing.html)
[Karma+Jasmine 实现自动化单元测试](https://www.cnblogs.com/jasmine-95/p/6054839.html)
