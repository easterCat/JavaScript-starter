## get 请求

使用 req.params,req.query

其中 是用在 get 请求当中

#### req.params

请求 url => http://localhost:8080/page/66

```js
app.get("/page/:current", function(req, res) {
  res.send(req.params["current"]);
});
```

请求 / 后面的参数匹配当前页数，然后会将 current 挂到 req.params 上

#### req.query

请求 url => http://localhost:8080/page?current=66

```js
app.get("/page", function(req, res) {
  res.send(req.query["current"]);
});
```

## post 请求

#### req.body

官方文档解释：
Contains key-value pairs of data submitted in the request body. By default, it is undefined,
and is populated when you use body-parsing middleware such as body-parser and multer.

稍微翻译一下：包含了提交数据的键值对在请求的 body 中，默认是 underfined,
你可以用 body-parser 或者 multer 来解析 body

解析 body 不是 nodejs 默认提供的，你需要载入 body-parser 中间件才可以使用 req.body

req.body 是用在 post 请求当中

```html
<form action="/login" method="POST">
  <div class="form-group">
    <input type="text" name="name" placeholder="登录名" />
  </div>
  <div class="form-group">
    <input type="password" name="password" placeholder="密码" />
    <%if(message) {%>
    <p><%= message%></p>
    <%}%>
  </div>
  <div class="form-group div">
    <input type="submit" value="登录" class="login" />
  </div>
</form>
```

那么 req.body.name 就会得到表单输入的登录名，req.body.password 就会得到表单输入的密码.

> body 方法通常用来解析 POST 数据,做文件上传的工作
