#### 方法
```
graph LR
String-->|返回特定位置字符| String.prototype.charAt

String-->|返回下标字符的unicode|String.prototype.charCodeAt

String-->String.prototype.codePointAt

String-->|连接两个字符,返回新字符| String.prototype.concat

String-->|判断一字符是否包含另一字符| String.prototype.includes

String-->|判断一个字符串的结尾是否包含其他字符串中的字符|String.prototype.endsWith

String-->|字符串对象中返回首个被发现索引值,没有返回-1|String.prototype.indexOf

String-->|字符串对象中返回最后一个被发现索引值,没有返回-1|String.prototype.lastIndexOf

String-->String.prototype.localeCompare

String-->|使用正则表达式与字符串相比较|String.prototype.match

String-->String.prototype.normalize

String-->|返回指定重复次数的由元素组成的字符串对象|String.prototype.repeat

String-->|正则表达式比较,用新字符来替换被匹配的字符|String.prototype.replace

String-->|正则表达式匹配,返回第一个匹配的下标|String.prototype.search

String-->|截取一个字符串区域,返回新字符串|String.prototype.slice

String-->|通过分离字符串成字串,将字符串对象分割成字符串数组|String.prototype.split

String-->String.prototype.startsWith

String-->|通过指定字符数返回在指定位置开始的字符串中的字符|String.prototype.substr

String-->|返回在字符串中指定两个下标之间的字符|String.prototype.substring

String-->String.prototype.toLocaleUpperCase

String-->String.prototype.toLocaleLowerCase

String-->String.prototype.toUpperCase

String-->String.prototype.toLowerCase

String-->|返回用字符串表示的特定对象|String.prototype.toString

String-->|字符串的开始和结尾去除空格|String.prototype.trim

String-->|返回特定对象的原始值|String.prototype.valueOf
```

#### 字符串
1. js中字符串一旦创建不可修改，只能销毁，replace()，toUpperCase()方法返回的都是新字符串,原字符串并没有更改
2. js中字符串可以当只读数组，访问字符可以用charAt也可以str[index]
3. 声明字符 var str = 'hello,world'  或  var str = new String("hello,world")

- 返回下标所在的字符str.charAt(4)  //0 给下标 返字符
- 返回字符首次出现的位置str.indexOf(要查找的字符，从第几个位置开始查)；
- 返回字符最后出现的位置str.lastIndexOf(要查找的字符，从0到该位置形成一个查找区间)；
- 截取字符串str.slice( 开始位置,结束位置 )  //参数可以接受负数
- 截取字符串(判断文件后缀) str.substring( 开始位置,结束位置 )  //结束位置不支持负数，负数会转成0
- 提取字符串str.substr( 开始位置, 长度) //提取一个固定长度的字符串
- 分割字符串,返回数组 str.split( 字符中的规则 )  //["hello","world"]
- 字符替换str.replace("hello","HELLO")  //"HELLO,world"
- 小写转大写str.toUpperCase();
- 大写转小写str.toLowerCase();
- 获取指定字符Unicodestr.charCodeAt(index)
- 编码 转化 字符String.fromCharCode(code)
- 字符 转化 编码strObj.charCodeAt(index)