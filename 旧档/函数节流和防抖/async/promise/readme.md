## promise

promise 是 es6 提出的一个异步解决方案,比传统回调事件的写法更加合理更加强大,主要还是优雅

promise 有 pending(等待中),fulfilled(已成功),rejected(已失败),只有异步操作的结果才能够将状态改变,且只会有 pending->fulfilled 或者 pending->rejected,只要状态改变,会一直保持这个结果

```
const p = new Promise((resolve, reject) => {
    if (true) {
        resolve("成功"); //将状态由pending->fulfilled
    } else {
        reject("失败"); //将状态由pending->rejected
    }
});
console.log(p);
```

![01](https://github.com/easterCat/common_es6/blob/master/async/promise/01.png?raw=true)

## 方法

-   **then(fulfilled_callback,[,rejected_callback])**

then 方法中包含两个参数,第一个参数(必须,但是不限定是函数)是 fulfilled 的回调函数,第二个参数(可选)是 rejected 的回调函数

then 方法返回的是一个全新的 promises 实例,与之前状态改变的不一样,之前的 promise 状态改变,就会一直保持改变的结果.同时由于是返回一个全新的 primise,类似于 jquery 的 return this,所以可以一直调用 promise 的方法, p.then().then().all()......

```
        "use strict";

        const createPromise = function(bool) {
            return new Promise((resolve, reject) => {
                if (bool) {
                    resolve("我们成功了"); //状态由pending->fulfilled,我们成功了
                } else {
                    reject("还是失败了");
                }
            });
        };

        createPromise(true).then(
            function(value) {
                console.log(value);
            },
            function(error) {
                console.log(error);
            }
        );

        createPromise(false).then(
            function(value) {
                console.log(value);
            },
            function(error) {
                console.log(error); ////状态由pending->rejected,还是失败了
            }
        );
```

> 同时 then 的第一个方法可以传其他值,比如数字数组,对象...都可以执行,作用就是 catch()方法,但是第二个参数传其他类型值就报错

```
        createPromise(false).then(null, function(error) {
            console.log(error); //还是失败了
        });

        createPromise(false).then(undefined, function(error) {
            console.log(error); //还是失败了
        });

        createPromise(false).then([1, 2, 3], function(error) {
            console.log(error); //还是失败了
        });

        createPromise(false).then({ a: "1" }, function(error) {
            console.log(error); //还是失败了
        });

        createPromise(false).then("刘德华", function(error) {
            console.log(error); //还是失败了
        });
```

-   **catch**

Promise.prototype.catch 方法是.then(null, rejection)或.then(undefined, rejection)

```
        "use strict";

        const createPromise = function(bool) {
            return new Promise((resolve, reject) => {
                if (bool) {
                    resolve("我们成功了");
                } else {
                    reject("还是失败了");
                }
            });
        };

        createPromise(false)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error); //还是失败了,更then的第二个方法一样
            });
```

catch 不止是 rejected 回调,当运行到 then 的 fulfilled 回调事件中出错依然能够捕获
但是 then(xxx,rejected_callback)无法这样捕获

```
        createPromise(true)
            .then(result => {
                console.log(result); //我们成功了
                throw new Error('我在then里面出错了,怎么办');
            })
            .catch(error => {
                console.log(error); //Error: 我在then里面出错了,怎么办
            });


        createPromise(true).then(
            result => {
                console.log(result); //我们成功了
                throw new Error("我在then里面出错了,怎么办");
            },
            error => {
                console.log(error); //Uncaught (in promise) Error: 我在then里面出错了,怎么办
            }
        );
```

当 promise 已经由 pending->fulfilled 或者 pending->rejected 之后,再报错也不会进行状态改变,可以认为当前 promise 实例已经在这一刻化为了永恒,亘古不变

```
        new Promise((resolve, reject) => {
            // resolve("我将走在错误的前面");
            reject("我将走在错误的前面的错误")
            throw new Error("我在fulfilled后面了");
        }).then(
            result => {
                console.log(result); //我将走在错误的前面
            },
            error => {
                console.log(error); //我将走在错误的前面的错误
            }
        );
```

catch 捕获错误是层层向下传递的,错误总会被下面接触的第一个 catch 捕获到
![02](https://github.com/easterCat/common_es6/blob/master/async/promise/02.png?raw=true)

```
        new Promise((resolve, reject) => {
            resolve("我将走在错误的前面");
        })
            .then(result => {
                console.log(result); //我将走在错误的前面
                throw new Error('菜就不走了')
                return "走后面的菜";
            })
            .then(result => {
                console.log(result);
                return "比我还菜";
            })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error); //Error: 菜就不走了
            });
```

-   **finally**

    finally 不管状态是 fulfilled 还是 rejected 都会执行,与状态无关

```
        new Promise((resolve, reject) => {
            resolve("今天是个好日子");
        })
            .then(result => {
                console.log(result); //今天是个好日子
                throw new Error("出错了");
            })
            .catch(error => {
                console.log(error); //Error: 出错了
            })
            .finally(() => {
                console.log("finally"); //finally
            });
```

-   **all(array)**

1. all 的参数是数组,数组里面可以包含多个 promise 实例
2. 只有数组里面的所有 promise 状态都变为 fulfilled,Promise.all 状态才会变为 fulfilled,数组中有一个是 rejected,状态就是 rejected
3. 如果是网络请求或者文件读取等耗时任务,会按照短板原则执行,也就是只有当最后一个耗时最长的任务完成,才会执行下一步

```
//在./file文件新建01,02,03三个txt
const fs = require("fs");
const path = require("path");

Promise.all([create_promise(path.resolve(__dirname, "./file/01.txt")), create_promise(path.resolve(__dirname, "./file/02.txt")), create_promise(path.resolve(__dirname, "./file/03.txt"))]).then(result => {
    console.log(result);
});

function create_promise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
```

![03](https://github.com/easterCat/common_es6/blob/master/async/promise/03.png?raw=true)

-   **race**

race 总体写法更 all 方法类似,只是 race 的执行是长板原则,按照最长的那个板子来进行状态切换,多个请求只要有一个由 pending->fulfilled,那么整体的状态也改变了

```
const fs = require("fs");
const path = require("path");

Promise.race([create_promise(path.resolve(__dirname, "./file/01.txt")), create_promise(path.resolve(__dirname, "./file/02.txt")), create_promise(path.resolve(__dirname, "./file/03.txt"))]).then(result => {
    console.log(result);
});

function create_promise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
```

![04](https://github.com/easterCat/common_es6/blob/master/async/promise/04.png?raw=true)

-   **resolve**

resolve 是将现有对象转化为 promise 对象

1. 参数是一个 promise 实例,resolve 将不做任何修改,直接返回

```
        console.log(
            new Promise((resolve, reject) => {
                resolve("今日是个好日子");
            })
        ); //Promise {<resolved>: "今日是个好日子"}

        console.log(
            Promise.resolve(
                new Promise((resolve, reject) => {
                    resolve("今日是个好日子");
                })
            )
        ); //Promise {<resolved>: "今日是个好日子"}
```

2. 参数是一个 thenable 对象,会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then 方法

```
        var thenable = {
            then: function(resolve, reject) {
                resolve("今天是个好日子");
            }
        };

        var p = Promise.resolve(thenable);
        p.then(value => console.log(value)); //今天是个好日子
```

3. 参数不是带有 then 的对象,会返回一个新的 promise 对象,其状态直接是 resolved 状态

```
        var p = Promise.resolve([1, 2, 3, 4, 5]);

        p.then(value => console.log(value)); //[1,2,3,4,5]
```

4. 无参数,返回一个状态是 resolved 状态的 promise 对象

```
        var p = Promise.resolve();
        p.then(value => console.log(value)); //undefiend
```

-   **reject**

reject()会返回一个新的 promise 实例,状态是 rejected

```
        var p1 = Promise.reject("我错了");

        var p2 = new Promise((resolve, reject) => {
            reject("绝对错了");
        });

        p1.catch(error => console.log(error)); //我错了
        p2.catch(error => console.log(error)); //绝对错了
```

reject()方法的参数不会抓取抛出的错误,而是直接将参数整体传递给后面的方法当作参数

```
        var thenable = {
            then: function(resolve, reject) {
                reject("出错了");
            }
        };

        Promise.reject(thenable).catch(error => {
            console.log(error); //{then: ƒ}
        });
```

[翻译 Promises/A+规范](http://www.ituring.com.cn/article/66566)

[深入 Promise(一)——Promise 实现详解](https://zhuanlan.zhihu.com/p/25178630)

[Promise 对象](http://es6.ruanyifeng.com/?search=in&x=11&y=13#docs/promise)

[透彻掌握 Promise 的使用，读这篇就够了](https://www.jianshu.com/p/fe5f173276bd)

[大白话讲解 Promise（一）](http://www.cnblogs.com/lvdabao/p/es6-promise-1.html)

[JS 中的 Promise 的 then 方法做了啥?](https://segmentfault.com/q/1010000006627403)
