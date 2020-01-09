## XMLHttpRequest

使用 XMLHttpRequest 对象可以和服务器进行交互,可以获取到数据,而无需让整个页面进行刷新.这样 web 页面可以做到只更新局部页面,降低了对用户操作的影响.

XMLHttpRequest 对象可以用于获取各种类型的数据,而不止是 xml,还支持 JSON，HTML 或者纯文本

## 本地服务器

```
let http = require("http");
let url = require("url");

const port = 3333;

http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, { "Content-type": "text/html;charset=utf8" });

    if (request.url !== "/favicon.ico") {
        let pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, "");
        if (pathname === "get_money") {
            get_money(request, response);
        }
        response.end("\r\n钱给完了,没了", "utf-8");
    }
}).listen(port);

console.log(`本地服务器创建成功=>localhost:${port}`);

function get_money(request, response) {
    response.write("给了你666块钱", "utf-8");
}
```

安装个 node,跑在本地就行

### status/readyState/onreadystatechange

-   **onreadystatechange**
    -   当 readyState 值变化时,会调用相应的处理函数
-   **readyState**
    -   0=>UNSENT=>XMLHttpRequest 代理被创建，但尚未调用 open() 方法
    -   1=>OPENED=>open() 方法已经被调用,可以通过 setRequestHeader() 方法来设置请求的头部， 可以调用 send() 方法来发起请求
    -   2=>HEADERS_RECEIVED=>send() 方法已经被调用，响应头也已经被接收
    -   3=>LOADING=>响应体部分正在被接收。如果 responseType 属性是 text 或空字符串， responseText 将会在载入的过程中拥有部分响应数据
    -   4=>DONE=>请求操作已经完成。这意味着数据传输已经彻底完成或失败
-   **status**
    -   在请求完成前,status 的值为 0.XMLHttpRequest 出错,浏览器返回的 status 也为 0
    -   如果服务器响应中没有明确指定 status 码,XMLHttpRequest.status 将会默认为 200

```
        var xhr = new XMLHttpRequest();

        console.log("open调用前的status", xhr.status); // open调用前的status 0
        console.log("open调用前的readyState", xhr.readyState); //open调用前的readyState 0

        xhr.open("GET", "http://127.0.0.1:3333/get_money", true);

        console.log("open调用后的status", xhr.status); //open调用后的status 0
        console.log("open调用后的readyState", xhr.readyState); //open调用后的readyState 1

        xhr.send();

        console.log("send调用后的status", xhr.status); //send调用后的status 0
        console.log("send调用后的readyState", xhr.readyState); //send调用后的readyState 1

        xhr.onreadystatechange = function() {
            console.log(xhr.status); //2,3,4
            console.log(xhr.readyState); //200,200,200
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            }
        };
```

![02](https://github.com/easterCat/common_es6/blob/master/ajax/02.png?raw=true)

> readyState 代表 send()方法已经被调用,但是 send()之后 readyState 不一定就是 2

当服务器指定了 status,其实就是 http 的状态码

```
//node中writeHead修改一下
response.writeHead(404, { "Content-type": "text/html;charset=utf8" });
```

![03](https://github.com/easterCat/common_es6/blob/master/ajax/03.png?raw=true)

### response/responseText/responseType

-   **response**
    1. 返回响应的正文
    2. 返回的类型可以是 ArrayBuffer,Blob,Document,Object,DOMString.这取决于 responseType 属性
    3. 请求尚未完成或未成功,则取值是 null
    4. 读取文本数据时如果将 responseType 的值设置成 text 或空字符串且当请求状态还在是 readyState (3) 时,response 包含到目前为止该请求已经取得的内容
-   **responseText**
    1. 返回一个 DOMString,包含对文本请求的响应,请求不成功或者请求尚未发送,返回 null
    2. 在请求完成之前将会得到部分属性
    3. 如果值不是 text 或者 string,responseType 将会抛出 InvalidStateError 异常
-   **responseType**
    1. responseType 属性是一个枚举类型的属性,返回响应数据的类型
    2. 设置为一个空字符串,它将使用默认的 text 类型
    3. 同步请求设置 responseType 会抛出一个 InvalidAccessError 的异常
    4. "","arraybuffer","blob","document","json","text"

```
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://127.0.0.1:3333/get_money", true);

        xhr.onreadystatechange = function() {
            console.log("readyState=>", xhr.readyState);
            console.log("status=>", xhr.status);
            console.log(xhr.response);
            console.log(xhr.responseText);
        };

        xhr.send();
```

![04](https://github.com/easterCat/common_es6/blob/master/ajax/04.png?raw=true)

### open 和 send

-   [open(method,url,async,user,password)](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open)
    1. XMLHttpRequest 的 http 或者 https 的请求必须通过 open 来发起
    2. 必须要在 send 之前调用
    3. method('GET','POST','PUT','DELETE').url 请求地址.async 是否开启同步请求,默认 true,执行异步操作.用户名用于认证,默认 null.密码用于认证,默认 null
    4. 同步的请求会阻塞 js 执行,不需要调用 onreadystatechange 事件监听器
-   **sendRequestHeader(header,value)**
    1. 在 open() 方法和 send() 之间调用
    2. 多次对同一个请求头赋值，只会生成一个合并了多个值的请求头
-   [send()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)
    1. 用于发送 http 请求,异步请求会在请求发送后立即返回,如果是同步请求,会在响应到达后才返回
    2. send()接收一个可选参数,作为请求主体.如果请求方法是 GET 或 HEAD,则将请求主体设为 null
    3. 发送二进制内容的最佳方法是结合 ArrayBufferView 或者[Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
    4. 参数['null','ArrayBuffer','ArrayBufferView','Blob','Document','FormData','DOMString']

一个小案例

通过请求发送一个留言,通过 FormData 发送一个表单数据

![05](https://github.com/easterCat/common_es6/blob/master/ajax/05.png?raw=true)

```
        var xhr = new XMLHttpRequest();

        xhr.open("POST", "http://127.0.0.1:3333/add", true);

        var body = new FormData();

        body.append("oid", 8029794);
        body.append("type", 1);
        body.append("message", "本大王来巡山了");
        body.append("plat", 1);
        body.append("jsonp", "jsonp");
        body.append("csrf", "af15b2a3a0e64a2ea304f885bea6bfd1");

        xhr.send(body);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.response);
            }
        };
```

为了安全，跨域 XHR 对象有一些限制：

1. 不能使用 setRequestHeader() 设置自定义头部
2. 不能发送和接收 cookie
3. 调用 getAllResponseHeaders() 方法总会返回空字符串

#### 属性

-   responseURL
-   responseXML
-   statusText
-   timeout
-   upload
-   withCredentials

#### 方法

-   abort()
-   getAllReponseHeaders()
-   getResponseHeader()
-   overrideMimeType()

#### 事件

-   loadstart
-   progress
-   abort
-   error
-   load
-   timeout
-   loadend
-   readystatechange

[FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)

[构造方法 XMLHttpRequest()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

[HTTP 响应代码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
