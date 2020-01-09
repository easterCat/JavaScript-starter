在vue項目中使用vue-router通过url进行传值

## encodeURIComponent

encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。encodeURIComponent(URIstring)

```
this.alert = LayDialog.alert({
            content: str,
            okTheme: 'alink',
            title: '您有一笔充值订单待支付',
            okText: '查看详情',
            theme: 'ios',
            effect: 'slide',
          }).then(() => {
            this.$router.push(
              {
                path: 'Rechargebill',
                query: {
                  dataObj: encodeURIComponent(JSON.stringify(res.data)),
                }
              }
            );
          });
```

数据
```
dataObj=%7B"icon"%3A"http%3A%2F%2Fwww.baidu.com%2Fpubd","status"%3A"pending","way_name"%3A"建设银行转账","pay_type"%3A"bank","amount"%3A"11.00","username"%3A"bianlang3","remark"%3A"","orderno"%3A"OOVINU2931542","dateline"%3A"1555163311","extension"%3A%7B"receiver"%3A%7B"id"%3A"25","name"%3A"建设银行转账","account"%3A"685412266541223","person"%3A"张三"%7D,"transfer"%3A%7B"bank"%3A"","account"%3A"","person"%3A"张三"%7D%7D,"type"%3A"pending"%7D
```

encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。

## decodeURIComponent

decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。decodeURIComponent(URIstring)

```
let objparse = JSON.parse(decodeURIComponent(this.$route.query.dataObj))
```

## encodeURI()

encodeURI()可以对URI进行编码，以便发送给浏览器。有效的URI中不能包含某些字符，例如空格。而这URI编码方法就可以对URI进行编码，它们用特殊的UTF-8编码替换所有无效的字 符，从而让浏览器能够接受和理解。

encodeURI()主要用于整个URI(例如，http://www.baidu.com/index.html)，而encode-URIComponent()主要用于对URI中的某一段(例如前面URI中的index.html)进行编码。

## encodeURI()和encodeURIComponent()区别

- encodeURI()不会对本身属于URI的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而encodeURIComponent()则会对它发现的任何非标准字符进行编码。

- 使用encodeURI()编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了%20。而encodeURIComponent()方法则会使用对应的编码替换所有非字母数字字符。

- encodeURI()对基础URL进行编码，encodeURIComponent()对查询字符串参数进行编码

所以这就是对整个URI使用encodeURI()，对附加在现有URI后面的字符串使用encodeURIComponent()的原因。

#### tips

URI: Uniform ResourceIdentifiers,通用资源标识符

