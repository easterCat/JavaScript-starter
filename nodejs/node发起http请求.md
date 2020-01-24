## node 发起 http 请求

创建 HTTP 请求使现代编程语言的核心功能之一，也是很多程序员在接触到新的开发环境时最先遇到的技术之一。在 Node.js 中有相当多的解决方案，其中有语言内置功能，也有开源社区贡献的开发库。下面咱们来看一下比较流行的几种方式。

#### HTTP - 标准库

首先是标准库中默认的 HTTP 模块。这个模块无需安装依赖外部即可使用，做到了真正的即插即用。缺点是与其他解决方案相比，用起来不是那么友好。

下面的代码将向 NASA 的 API 发送一个 GET 请求，并输出当天的天文照片的 URL，以及它的注解:

```js
const https = require("https");

https
  .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", resp => {
    let data = "";

    // A chunk of data has been recieved.
    resp.on("data", chunk => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      console.log(JSON.parse(data).explanation);
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
```

HTTP 和 HTTPS 模块提供的大多数功能是相当有限的。你需要以区块为单位接收响应数据，而不是只提供一个回调函数，以便在收到所有数据后就立即执行。如果它是 JSON 格式你还需要进行手动解析。尽管工作量不大，但是它仍然会带来一些不必要的操作。

另一个麻烦是，HTTP 和 HTTPS 协议分属两个模块，因此如果我们使用的 API 是通过 HTTPS 协议进行通信，则需要 HTTPS 模块。

如果你不想向代码库中添加太多的依赖项或希望使用其底层的功能, 那么可能需要花费更多的精力来获取所需的数据, 尽管如此，但是它仍然是一个很好的工具。

#### Request

Request 是一个简化的 http 客户端，它和 Python 的 request 库很像。这个库比默认的 http 模块更好用，多年来被开源社区作为开发首选。

自从我开始使用 Node.js 就一直在用，他对快速完成开发任务很有帮助。与 http 模块不同的是，你必须使用 npm 来安装它。

在终端下进入到你想要代码被下载的目录中，运行以下命令：

`npm install request`

可以看到，不需要写太多代码就能完成前面的功能：

```js
const request = require("request");

request(
  "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
  { json: true },
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body.url);
    console.log(body.explanation);
  }
);
```

如果你想要一个使用正常方式处理 HTTP 请求的苦，那么 Request 是一个很好的选择。如果你想使用 Promises，也可以签出 request-promise 库。

#### Axios

Axios 是一个基于 promise 的 HTTP 客户端，可以用于浏览器和 Node.js。在处理需要更复杂的事件链的代码时，使用 Promises 具有很大的优势。 编写异步代码可能会令人困惑，而 Promises 是这个问题的几种解决方案之一。 它们甚至被用在其它语言中，比如 Swift。

使用 npm 安装 Axios，在终端中输入以下命令：

`npm install axios`

下面的代码实现相同的功能，得到 URL 并解释当天的天文学图片。

```js
const axios = require("axios");

axios
  .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
```

默认情况下，Axios 可以解析 JSON 响应，非常方便。你也可以看到错误处理是由.catch()完成的，现在我们都在使用 promises。

你甚至可以通过 axios.all 发起多个并发请求，比如说你想一次性得到两天的天文图片可以这样做：

```js
var axios = require("axios");

axios
  .all([
    axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-03"
    ),
    axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-02"
    )
  ])
  .then(
    axios.spread((response1, response2) => {
      console.log(response1.data.url);
      console.log(response2.data.url);
    })
  )
  .catch(error => {
    console.log(error);
  });
```

异步代码很容易地变得十分复杂并且不容易处理, Axios 很轻松的解决了这个问题，从长远看来可以使你的开发工作变得轻松。

#### SuperAgent

与 Axios 类似，SuperAgent 是另一个流行的库，主要用于浏览器中的 Ajax 请求，但也适用于 Node.js。使用以下命令安装 SuperAgent :

`npm install superagent`

SuperAgent 最酷的地方是能进行链式调用，你可以把其它函数链到像 query()这样的请求上，并且添加参数。在前面的例子中我们都是手动添加它们。请注意 SuperAgent 是怎样提供这种功能的:

```js
const superagent = require("superagent");

superagent
  .get("https://api.nasa.gov/planetary/apod")
  .query({ api_key: "DEMO_KEY", date: "2017-08-02" })
  .end((err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(res.body.url);
    console.log(res.body.explanation);
  });
```

和 axios 一样，你也不用自己解析去 JSON 响应，这非常酷。

#### Got

如果你想用一个更轻量级的库，Got 是另外一个选择。它也可用于 Twilio Functions。

再来一遍，实用 npm 安装 Got：

`npm install got`

和 Axios 一样，Got 也能同 Promises 一起很好的工作。下面的代码做的事情和前面的例子一样：

```js
const got = require("got");

got("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", { json: true })
  .then(response => {
    console.log(response.body.url);
    console.log(response.body.explanation);
  })
  .catch(error => {
    console.log(error.response.body);
  });
```

如果你想要一个不像 Request 那样臃肿的轻量级的库，使用 Got 就对了。
