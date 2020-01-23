## node 中的路径分类

node 中的路径大致分 5 类，dirname,filename,process.cwd(),./,../,其中前三个都是绝对路径

```js
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve("./"));
```

使用 node 下运行 src/task.js

```
/Users/mac/Porjects/demo/src
/Users/mac/Porjects/demo/src/task.js
/Users/mac/Porjects/demo/src
/Users/mac/Porjects/demo/src
```

得到的返回值告诉我们：

- \*\*dirname 返回的是执行的 JavaScript 文件。
- \*\*filename 与\_\_dirname 一样，返回的是执行的目标 JavaScript 文件。
- process.cwd()返回的是项目的目录，也就是运行的 JavaScript 所在的目录，以下是官方解释。
- path.resolve('./')调用同 process.cwd()，可以执行一系列路径操作后返回最终路径，官方说明如下：

path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')

相当于：

```
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd
```

区别是不同的路径可以是文件或者不存在。
