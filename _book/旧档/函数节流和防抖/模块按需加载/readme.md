## webpack-bundle-analyzer

这个工具主要是在打包之后,将项目的所有依赖全部展示出来,主要用来进行项目优化的时候作为一个参考作用,vue-cli 自带.

build/webpack.prod.conf.js

```
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
```

然后在 config/index.js 中修改配置

```
{
    ......
    bundleAnalyzerReport: true // 最下面
}
```

react 是自搭的一套环境,所以需要额外引入.

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [
        // new BundleAnalyzerPlugin(),
]
```

![01](https://github.com/easterCat/common_js/blob/master/%E6%A8%A1%E5%9D%97%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD/img/01.png?raw=true)

这样 build 之后自己就会打开依赖分析了

## 引入库

```
import {setSession} from 'kiana-js';

setSession();
```

![02](https://github.com/easterCat/common_js/blob/master/%E6%A8%A1%E5%9D%97%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD/img/02.png?raw=true)

实际上在使用的时候,我只是使用了一个方法,就将整个库全部都引入进来了,作为一个方法库,这是一个致命的缺点.

## 使用

[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
[按需加载实践](https://www.jianshu.com/p/7bd9db073633)
