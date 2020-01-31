## 一、prettier 介绍

官方自己介绍说，prettier 是一款强势武断的代码格式化工具，它几乎移除了编辑器本身所有的对代码的操作格式，然后重新显示。就是为了让所有用这套规则的人有完全相同的代码。在团队协作开发的时候更是体现出它的优势。与 eslint，tslint 等各种格式化工具不同的是，prettier 只关心代码格式化，而不关心语法问题。

目前在 github 上已经有了 31.5k 的 star。
![](https://user-gold-cdn.xitu.io/2019/4/28/16a6381d1299a7fe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
prettier 的优势也很明显，它支持 HTML/JS/JSX/TS/JSON/CSS/SCSS/LESS/VUE 等主流文件格式。下面这张图可以很好的进行说明：
![](https://user-gold-cdn.xitu.io/2019/4/28/16a637fd1608d540?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
也支持目前市面上所有主流的编辑器：
![](https://user-gold-cdn.xitu.io/2019/4/28/16a6380088b30124?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 二、prettier 的使用

prettier 的使用可分为两种方式：

### 1、使用编辑器的插件

使用编辑器插件是最为方便的一种方法，编写完代码，只需要一键即可格式化编写的代码，非常方便。这里已 vscode 为例进行说明，下面的配置是我自己的对于 HTML/CSS/JS/LESS 文件的 prettier 格式化规则：

    {
        // 使能每一种语言默认格式化规则
        "[html]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[css]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[less]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[javascript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },

        /*  prettier的配置 */
        "prettier.printWidth": 100, // 超过最大值换行
        "prettier.tabWidth": 4, // 缩进字节数
        "prettier.useTabs": false, // 缩进不使用tab，使用空格
        "prettier.semi": true, // 句尾添加分号
        "prettier.singleQuote": true, // 使用单引号代替双引号
        "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
        "prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
        "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
        "prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
        "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
        "prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
        "prettier.htmlWhitespaceSensitivity": "ignore",
        "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
        "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
        "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
        "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
        "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
        "prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
        "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
        "prettier.tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
    }
    复制代码

上面只是一些基本的语言的格式化规范，prettier 每一个属性的配置都有详细的说明，大家可以根据自己的情况进行调整。

相信每个在 vscode 上编写 vue 的都会下载 Vetur 插件，它目前是 vscode 上面最好用的一款 vue 插件。现在要说的是，如何使用 prettier 格式化 vue 的代码。你没法使用类似格式化 html/css/js 的方式来格式化 vue 格式的代码，像下面这样子的：

    {
        "[vue]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        }
    }
    复制代码

这样 prettier 是不认识的。不过幸运的是，Vetur 插件内部默认使用 prettier 进行格式化的，但是由于 Vetur 的默认格式化配置与我们期望的有所出入，所以我们需要单独对 Vetur 的 prettier 进行配置，如下：

    {
        "vetur.format.defaultFormatter.html": "prettier",
        "vetur.format.defaultFormatter.js": "prettier",
        "vetur.format.defaultFormatter.less": "prettier",
        "vetur.format.defaultFormatterOptions": {
            "prettier": {
                "printWidth": 160,
                "singleQuote": true, // 使用单引号
                "semi": true, // 末尾使用分号
                "tabWidth": 4,
                "arrowParens": "avoid",
                "bracketSpacing": true,
                "proseWrap": "preserve" // 代码超出是否要换行 preserve保留
            }
        },
    }
    复制代码

这些配置是不会和之前配置的 prettier 规则冲突的。

值得提一句的是，Vetur 对于 html 文件默认使用的是 prettyhtml，但是由于 prettier 也可以支持 html 的格式化，所以我觉得统一使用 prettier 对全语言的格式化是比较简洁的，也希望 prettier 能够对更多的语言进行支持。

### 2、使用脚本的方式

这种方式就是使用 prettier 指令在命令行窗口对单一文件进行格式化。
首先需要安装 prettier 全局指令：

    npm install -g prettier
    复制代码

可以使用 `prettier -v` 检查是否安装完成。

安装好之后，使用下面指令对 xxx.js 文件进行格式化（使用的是 prettier 默认的配置规则）。

    // //prettier--write <文件路劲+文件名>

    prettier --write ./xxx.js
    复制代码

当然，默认的配置规则是不符合我们的需求的，我们需要自定义配置规则。
书写自定义规则的文件需要是下面几种文件和格式：

- .prettierrc 文件，支持 yaml 和 json 格式；或者加上 .yaml/.yml/.json 后缀名
- .prettierrc.toml 文件（当为 toml 格式的时候，后缀是必须的）
- prettier.config.js 或者 .prettierrc.js，需要返回一个对象
- package.json 文件中加上"prettier"属性

每种文件的书写格式如下：
**JSON**

    {
      "trailingComma": "es5",
      "tabWidth": 4,
      "semi": false,
      "singleQuote": true
    }
    复制代码

**JS**

    // prettier.config.js or .prettierrc.jsmodule.exports = {
      trailingComma: "es5",
      tabWidth: 4,
      semi: false,
      singleQuote: true
    };
    复制代码

**YAML**

    # .prettierrc or .prettierrc.yamltrailingComma:"es5"tabWidth:4semi:falsesingleQuote:true复制代码

**TOML**

    # .prettierrc.tomltrailingComma = "es5"tabWidth = 4semi = falsesingleQuote = true复制代码

prettier 查找配置的方式首先会找当前目录下，使用以下指令格式化代码：

    //prettier --config --write <文件路劲+文件名>

     prettier --config --write ./xxx,js
    复制代码

如果 prettier 在当前目录找不到配置文件，会一直向上级目录查找，直到找到或找不到。如果我们配置文件放在别的地方，则需要手工指定配置文件的路径：

    // prettier --config <配置文件路径+文件名> --write <文件路劲+文件名>

    prettier --config ./prettier/.prettierrc --write ./xxx.js
    复制代码

如果觉得每次格式化一个文件比较麻烦，可以使用下面的指令，一次格式化所有文件：

    prettier --config ./prettier/.prettierrc --write './*.{ts,js,css,json}'复制代码

我们一般使用这种方式的时候，就把这个配置文件写在项目根路径下，然后使用命令行一次性格式化项目下的所有文件。

## 三、以上两种方式对比

上面两种方式各有优劣，我们来分析一下各自的使用场景和一些问题：

**第一种方式其实适合个人开发，第二种方式适合团队开发。**

至于为什么这么说，就要考虑到二者的优先级问题了。上面两种方式如果同时存在的话，会有优先级的问题。
**.prettierrc 的优先级会高于在 vscode 全局配置 settings.json 中格式化配置的优先级**

也就是说，如果你在一个项目中有 .prettierrc 配置文件，然后你又在 settings.json 也配置了格式化规则，那么当你在 vscode 编辑器中对一个文件点击鼠标右键[格式化文档]的时候，格式化规则会以 .prettierrc 为准。

所以，由于编辑器 settings.json 每个人的设置可能都不一样，要求每个人统一设置也不方便操作，而嵌入在项目中的配置文件则可以随着项目到达各个开发者，而且会覆盖每个开发者的不同代码喜好，真正做到团队代码统一的效果。

以上就是所有我对 prettier 理解的内容，希望对你有帮助。更多精彩内容可以关注我的微信公众号[前端队长]，我们一同成长，一同领略技术与生活“落霞与孤鹜齐飞，秋水共长天一色”的美好。

参考链接：

[blog.csdn.net/wxl1555/art…](https://blog.csdn.net/wxl1555/article/details/82857830)

[juejin.im/post/5bfcde…](https://juejin.im/post/5bfcdee25188251d9e0c40f2)

[segmentfault.com/a/119000001…](https://segmentfault.com/a/1190000012909159)
