## gitbook-cli

```bash
npm install -g gitbook-cli
mkdir book
cd book
gitbook init
```

生成的两个 md 文件

- README.md 将包含电子书的简介
- SUMMARY.md 将包含电子书的目录

```
gitbook serve
```

可以在http://localhost:4000预览书籍

```
gitbook build
```

将电子书的内容制作成静态网页，并保存在 \_book 目录中。

## GitHub Pages

GitHub Pages 是 GitHub 提供的静态网站托管服务。`https://<username>.github.io/<repository>/`

GitHub Pages 的静态资源支持下面 3 个来源：

- master 分支
- master 分支的 /docs 目录
- gh-pages 分支

因此我们在生成静态网页的时候更改 build 命令

```
gitbook build ./ ./docs
```

## 添加 theme

```
touch book.json
```

内容

```json
{
  "title": "Java-starter",
  "author": "qingcheng",
  "authorHomepage": "http://www.baidu.com",
  "language": "zh-hans",
  "plugins": ["theme-code", "splitter", "prism", "folding-chapters", "-sharing"],
  "pluginsConfig": {
    "theme-default": {
      "showLevel": true
    }
  }
}
```

最后`gitbook install`更新依赖

## 操作

- gitbook init
- gitbook build
- gitbool serve
- gitbook install

## doc

- [gitbook 简明教程](http://www.chengweiyang.cn/gitbook/basic-usage/README.html)
- [GitBook 插件](http://gitbook.zhangjikai.com/plugins.html)
