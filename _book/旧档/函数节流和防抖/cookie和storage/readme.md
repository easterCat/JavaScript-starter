## Cookie

Cookie 是一些数据, 存储于你电脑上的文本文件中,当 web 服务器向浏览器发送 web 页面时，在连接关闭后，服务端不会记录用户的信息。Cookie 的作用就是存储 web 页面的用户信息

javascript 中使用 document.cookie 属性进行 cookie 的创建/读取/删除

```
//读取
allCookies = document.cookie;
//写入
document.cookie = newCookie;
//删除,设置 expires 参数为过期时间
document.cookie="hello=world; expires=Thu, 18 Dec 2043 12:00:00 GMT;"
```

#### Cookie 的属性值

- ;path=path (例如 '/', '/mydir') 如果没有定义，默认为当前文档位置的路径。
- ;domain=domain (例如 'example.com'， 'subdomain.example.com') 如果没有定义，默认为当前文档位置的路径的域名部分。与早期规范相反的是，在域名前面加 . 符将会被忽视，因为浏览器也许会拒绝设置这样的 cookie。如果指定了一个域，那么子域也包含在内。
- ;max-age=max-age-in-seconds (例如一年为 60*60*24\*365)
- ;expires=date-in-GMTString-format 如果没有定义，cookie 会在对话结束时过期
  这个值的格式参见 Date.toUTCString()
- ;secure (cookie 只通过 https 协议传输)

> cookie 的值字符串可以用 encodeURIComponent()来保证它不包含任何逗号、分号或空格(cookie 值中禁止使用这些值)

#### 浏览器个数限制

1. IE6 或更低版本最多 20 个 cookie
2. IE7 和之后的版本最后可以有 50 个 cookie。
3. Firefox 最多 50 个 cookie
4. chrome 和 Safari 没有做硬性限制

#### Cookie 的缺点

1. `Cookie`数量和长度的限制。每个 domain 最多只能有 20 条 cookie，每个 cookie 长度不能超过 4KB，否则会被截掉。
2. 安全性问题。如果 cookie 被人拦截了，那人就可以取得所有的 session 信息。即使加密也与事无补，因为拦截者并不需要知道 cookie 的意义，他只要原样转发 cookie 就可以达到目的了。
3. 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。

#### Cookie 的安全问题

路径限制并不能阻止从其他路径访问 cookie. 使用简单的 DOM 即可轻易地绕过限制(比如创建一个指向限制路径的, 隐藏的 iframe, 然后访问其 contentDocument.cookie 属性). 保护 cookie 不被非法访问的唯一方法是将它放在另一个域名/子域名之下, 利用同源策略保护其不被读取. Web 应用程序通常使用 cookies 来标识用户身份及他们的登录会话. 因此通过窃听这些 cookie, 就可以劫持已登录用户的会话. 窃听的 cookie 的常见方法包括社会工程和 XSS 攻击.

#### 解决安全问题的建议

1. 通过良好的编程，控制保存在 cookie 中的 session 对象的大小。
2. 通过加密和安全传输技术（SSL），减少 cookie 被破解的可能性。
3. 只在 cookie 中存放不敏感数据，即使被盗也不会有重大损失。
4. 控制 cookie 的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的 cookie。

## localStorage 和 sessionStorage

1. 返回值是一个 Storage 对象,可以添加、修改或删除存储的数据项
2. 只在本地存储,localStorage 和 sessionStorage 的数据不会跟随 HTTP 请求一起发送到服务器,cookie 会发送
3. 数据存储在 localStorage,它们都特定于页面的协议
4. localStorage 和 sessionStorage 中的键值对总是以字符串的形式存储。 (键值对总是以字符串的形式存储,数值类型会自动转化为字符串类型)
5. localStorage 和 sessionStorage 不能被爬虫抓取到
6. 不同浏览器无法共享 localStorage 或 sessionStorage 中的信息
7. 相同浏览器的不同页面间可以共享相同的 localStorage（同源策略）,但是不同页面或标签页间无法共享 sessionStorage 的信息(多个 iframe 算是同源页面)
8. 各浏览器支持的 localStorage 和 sessionStorage 容量上限不同,最低目前在 1m 以上[support-test](http://dev-test.nemikor.com/web-storage/support-test/)

#### localStorage 和 sessionStorage 不同

1. localStorage 属性允许你访问一个 Document 源（origin）的对象 Storage,sessionStorage 属性允许你访问一个 session Storage 对象
2. 存储在 sessionStorage 里面的数据在页面会话结束时会被清除(页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话),也就关闭浏览器会清除.localStorage 存储的数据能在跨浏览器会话保留,存储在 localStorage 的数据可以长期保留

#### localStorage 和 sessionStorage 方法

- key() 该方法接受一个数值 n 作为参数，并返回存储中的第 n 个键名(Storage 的方法)
- setItem(key,data) 该方法接受一个键名作为参数，返回键名对应的值
- getItem(key) 该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值
- removeItem(key) 该方法接受一个键名作为参数，并把该键名从存储中删除
- clear() 调用该方法会清空存储中的所有键名

#### sessionStorage 的使用(localStorage 差不多)

```
function initSession() {
    sessionStorage.clear();
}

function getSession(name) {
    if (sessionStorage.getItem(name)) {
        return JSON.parse(sessionStorage.getItem(name));
    }
}

function setSession(name, data) {
    var store = sessionStorage.getItem(name);
    if (store) {
        console.warn(name + "=>数据在sessionStorage已存在,执行替换操作");
        sessionStorage.removeItem(name);
    }
    sessionStorage.setItem(name, JSON.stringify(data));
}

//sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据
export { initSession, getSession, setSession };
```

## Docs

[MDN - document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)
[MDN - localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
[MDN - sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)
[MDN - Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)
[Cookies and Security](https://humanwhocodes.com/blog/2009/05/12/cookies-and-security/)
[JavaScript Cookie](http://www.runoob.com/js/js-cookies.html)
