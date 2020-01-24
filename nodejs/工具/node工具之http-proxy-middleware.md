## 简介

一个轻松的配置代理服务器的中间件,让 Node.js 代理变得简单

## url 路径

```
         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
```

## 基本使用

```
var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use(
  '/api',
  proxy({ target: 'http://www.example.org', changeOrigin: true })
);
app.listen(3000);
```

## 两种形式

```
var apiProxy = proxy('/api', { target: 'http://www.example.org' });
//同样效果
var apiProxy = proxy('http://www.example.org/api');
```

## 配置

```
var options = {
  target: 'http://www.example.org', // 目标
  changeOrigin: true, // 虚拟站点必须
  ws: true, // 代理websocket
  pathRewrite: {
    '^/api/old-path': '/api/new-path', // 重写路径
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'dev.localhost:3000': 'http://localhost:8000'
  }
};
```

## 实际使用

```
const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production"; //判断是否是开发环境
const app = next({ dev });
const handle = app.getRequestHandler();
const compression = require("compression");
const port = parseInt(process.env.PORT, 10) || 6776;
const proxy = require("http-proxy-middleware");

const proxyOption = {
  target: "http://127.0.0.1:6688",
  pathRewrite: {
    "^/api/": "/" // 重写请求，api/解析为/
  },
  changeOrigoin: true
};

app
  .prepare()
  .then(() => {
    const server = express();

    if (dev) {
      server.use("/api/*", proxy(proxyOption));
    }

    if (!dev) {
      server.use(compression()); //gzip
    }

    server.get("/", (req, res) => app.render(req, res, "/home"));
    server.get("/home", (req, res) => app.render(req, res, "/home"));
    server.get("/books", (req, res) => app.render(req, res, "/books"));
    server.get("/articles", (req, res) => app.render(req, res, "/articles"));
    server.get("/login", (req, res) => app.render(req, res, "/login"));
    server.get("/markdown", (req, res) => app.render(req, res, "/markdown"));
    server.get("/books", (req, res) => app.render(req, res, "/books"));
    server.get("/write", (req, res) => app.render(req, res, "/write"));
    server.get("/book/:currentBookId", (req, res) =>
      app.render(req, res, "/book/[currentBookId]", { currentBookId: req.params.currentBookId })
    );
    server.get("/article/:curArticleId", (req, res) =>
      app.render(req, res, "/article/[curArticleId]", { curArticleId: req.params.curArticleId })
    );
    server.all("*", (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      else console.log(`http start at ===> http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
```

## doc

- [更多 http-proxy-middleware 的内容](https://github.com/chimurai/http-proxy-middleware)
