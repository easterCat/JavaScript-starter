## 浏览器

目前使用的主流浏览器：Internet Explorer、Firefox、Safari、Chrome.他们的内核分别是 Trident，Gecko，Webkit，Chromium/Bink.而前端开发大多数情况下就是和浏览器打交道,作为前端开发人员了解一下浏览器有利于做出更加明智的决定,并理解一些开发中的问题.

## 功能

浏览器的主要功能就是向服务器发出请求，在浏览器窗口中展示您选择的网络资源。这里所说的资源一般是指 HTML 文档，也可以是 PDF、图片或其他的类型。资源的位置由用户使用 URI（统一资源标示符）指定。浏览器解释并显示 HTML 文件的方式是在 HTML 和 CSS 规范中指定的。

浏览器的用户界面有很多彼此相同的元素，其中包括:

- 用来输入 URI 的地址栏
- 前进和后退按钮
- 书签设置选项
- 用于刷新和停止加载当前文档的刷新和停止按钮
- 用于返回主页的主页按钮

## 结构

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/layers.png)

主要组件:

- 用户界面 - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
- 浏览器引擎 - 在用户界面和渲染引擎之间传送指令。
- 渲染引擎 - 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
- 网络 - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
- 用户界面后端 - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
- JavaScript 解释器。用于解析和执行 JavaScript 代码。
- 数据存储。这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。

## 渲染引擎

渲染引擎就是在浏览器的屏幕上显示请求的内容,主要用途是显示使用 CSS 格式化的 HTML 内容和图片。通过插件（或浏览器扩展程序），还可以显示其他类型的内容；例如，使用 PDF 查看器插件就能显示 PDF 文档。

渲染引擎一开始会从网络层获取请求文档的内容，其主流程:
![](https://raw.githubusercontent.com/easterCat/img-package/master/img/flow.png)

- 渲染引擎将开始解析 HTML 文档，并将各标记逐个转化成“内容树”上的 DOM 节点。同时也会解析外部 CSS 文件以及样式元素中的样式数据。HTML 中这些带有视觉指令的样式信息将用于创建渲染树。
- 渲染树构建完毕之后，进入“布局”处理阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标。
- 接下来是绘制阶段-渲染引擎会遍历渲染树，由用户界面后端层将每个节点绘制出来。

这是一个渐进的过程,为达到更好的用户体验，渲染引擎会力求尽快将内容显示在屏幕上。它不必等到整个 HTML 文档解析完毕之后，就会开始构建渲染树和设置布局。在不断接收和处理来自网络的其余内容的同时，渲染引擎会将部分内容解析并显示出来。

**WebKit 主流程**
![](https://raw.githubusercontent.com/easterCat/img-package/master/img/webkitflow.png)

**Gecko 主流程**
![](https://raw.githubusercontent.com/easterCat/img-package/master/img/image008.jpg)

#### 解析

解析文档是指将文档转化成为有意义的结构，也就是可让代码理解和使用的结构。解析得到的结果通常是代表了文档结构的节点树，它称作解析树或者语法树。

解析是以文档所遵循的语法规则（编写文档所用的语言或格式）为基础的。所有可以解析的格式都必须对应确定的语法（由词汇和语法规则构成）。这称为[与上下文无关的语法](https://zh.wikipedia.org/wiki/%E4%B8%8A%E4%B8%8B%E6%96%87%E6%97%A0%E5%85%B3%E6%96%87%E6%B3%95)。

解析的过程可以分成两个子过程：词法分析和语法分析。

- 词法分析是将输入内容分割成大量标记的过程。标记是语言中的词汇，即构成内容的单位。在人类语言中，它相当于语言字典中的单词。
- 语法分析是应用语言的语法规则的过程。

解析器通常将解析工作分给以下两个组件来处理：词法分析器（有时也称为标记生成器），负责将输入内容分解成一个个有效标记；而解析器负责根据语言的语法规则分析文档的结构，从而构建解析树。词法分析器知道如何将无关的字符（比如空格和换行符）分离出来。

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/image011.png)

解析是一个迭代的过程。通常，解析器会向词法分析器请求一个新标记，并尝试将其与某条语法规则进行匹配。如果发现了匹配规则，解析器会将一个对应于该标记的节点添加到解析树中，然后继续请求下一个标记。
如果没有规则可以匹配，解析器就会将标记存储到内部，并继续请求标记，直至找到可与所有内部存储的标记匹配的规则。如果找不到任何匹配规则，解析器就会引发一个异常。这意味着文档无效，包含语法错误。

#### 编译

很多时候，解析树还不是最终产品。解析通常是在翻译过程中使用的，而翻译是指将输入文档转换成另一种格式。编译就是这样一个例子。编译器可将源代码编译成机器代码，具体过程是首先将源代码解析成解析树，然后将解析树翻译成机器代码文档。
![](https://raw.githubusercontent.com/easterCat/img-package/master/img/image013.png)

#### 解析器类型

有两种基本类型的解析器：自上而下解析器和自下而上解析器。直观地来说，自上而下的解析器从语法的高层结构出发，尝试从中找到匹配的结构。而自下而上的解析器从低层规则出发，将输入内容逐步转化为语法规则，直至满足高层规则。

#### HTML 解析器

HTML 解析器的任务是将 HTML 标记解析成解析树。浏览器就创建了自定义的解析器来解析 HTML。

解析由两个阶段组成：标记化和树构建。

- 标记化是词法分析过程，将输入内容解析成多个标记。HTML 标记包括起始标记、结束标记、属性名称和属性值。
- 标记生成器识别标记，传递给树构造器，然后接受下一个字符以识别下一个标记；如此反复直到输入的结束。

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/image017.png)

**标记化算法**

该算法的输出结果是 HTML 标记。该算法使用状态机来表示。每一个状态接收来自输入信息流的一个或多个字符，并根据这些字符更新下一个状态。当前的标记化状态和树结构状态会影响进入下一状态的决定。这意味着，即使接收的字符相同，对于下一个正确的状态也会产生不同的结果，具体取决于当前的状态。

```
<html>
  <body>
    Hello world
  </body>
</html>
```

上面 html 的解析:

- 初始状态是数据状态
- 遇到字符 < 时，状态更改为“标记打开状态”。
- 接收一个 a-z 字符会创建“起始标记”，状态更改为“标记名称状态”。这个状态会一直保持到接收 > 字符。
- 遇到 > 标记时，会发送当前的标记，状态改回“数据状态”。
- `<body>` 标记也会进行同样的处理。当 html 和 body 标记均已发出。回到“数据状态”。
- 接收到 Hello world 中的 H 字符时，将创建并发送字符标记，直到接收`</body>`中的 <。我们将为 Hello world 中的每个字符都发送一个字符标记。
- 我们回到“标记打开状态”
- 接收下一个输入字符 / 时，会创建 end tag token 并改为“标记名称状态”。我们会保持这个状态，直到接收 >
- 然后将发送新的标记，并回到“数据状态”。
- `</html>` 输入也会进行同样的处理

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/image019.png)

**树构建算法**

在创建解析器的同时，也会创建 Document 对象。在树构建阶段，以 Document 为根节点的 DOM 树也会不断进行修改，向其中添加各种元素。标记生成器发送的每个节点都会由树构建器进行处理。规范中定义了每个标记所对应的 DOM 元素，这些元素会在接收到相应的标记时创建。这些元素不仅会添加到 DOM 树中，还会添加到开放元素的堆栈中。此堆栈用于纠正嵌套错误和处理未关闭的标记。其算法也可以用状态机来描述。这些状态称为“插入模式”。

```
<html>
  <body>
    Hello world
  </body>
</html>
```

树构造过程:

- 树构建阶段的输入是一个来自标记化阶段的标记序列。第一个模式是“initial mode”。
- 接收 HTML 标记后转为“before html”模式，并在这个模式下重新处理此标记。
- 创建一个 HTMLHtmlElement 元素，并将其附加到 Document 根对象上。
- 然后状态将改为“before head”。此时我们接收“body”标记。即使我们的示例中没有“head”标记，系统也会隐式创建一个 HTMLHeadElement，并将其添加到树中。
- 现在我们进入了“in head”模式
- 然后转入“after head”模式
- 系统对 body 标记进行重新处理，创建并插入 HTMLBodyElement，同时模式转变为“in body”。
- 现在，接收由“Hello world”字符串生成的一系列字符标记。接收第一个字符时会创建并插入“Text”节点，而其他字符也将附加到该节点。
- 接收 body 结束标记会触发“after body”模式。
- 现在我们将接收 HTML 结束标记，然后进入“after after body”模式。
- 接收到文件结束标记后，解析过程就此结束。

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/image022.gif)

解析结束后的操作，浏览器会将文档标注为交互状态，并开始解析那些处于“deferred”模式的脚本，也就是那些应在文档解析完成后才执行的脚本。然后，文档状态将设置为“完成”，一个“加载”事件将随之触发。

#### DOM 结构

解析器的输出“解析树”是由 DOM 元素和属性节点构成的树结构。DOM 是文档对象模型 (Document Object Model) 的缩写。它是 HTML 文档的对象表示，同时也是外部内容（例如 JavaScript）与 HTML 元素之间的接口。
解析树的根节点是“Document”对象。

DOM 与标记之间几乎是一一对应的关系。

```
<html>
  <body>
    <p>
      Hello World
    </p>
    <div> <img src="example.png"/></div>
  </body>
</html>
```

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/image015.png)

#### CSS 解析

和 HTML 不同，CSS 是上下文无关的语法，可以使用简介中描述的各种解析器进行解析。

**WebKit CSS 解析器**
WebKit 使用 Flex 和 Bison 解析器生成器，通过 CSS 语法文件自动创建解析器。正如我们之前在解析器简介中所说，Bison 会创建自下而上的移位归约解析器。Firefox 使用的是人工编写的自上而下的解析器。这两种解析器都会将 CSS 文件解析成 StyleSheet 对象，且每个对象都包含 CSS 规则。CSS 规则对象则包含选择器和声明对象，以及其他与 CSS 语法对应的对象。
![](https://raw.githubusercontent.com/easterCat/img-package/master/img/image023.png)

#### 处理脚本和样式表的顺序

**脚本**

网络的模型是同步的。网页作者希望解析器遇到 `<script>` 标记时立即解析并执行脚本。文档的解析将停止，直到脚本执行完毕。如果脚本是外部的，那么解析过程会停止，直到从网络同步抓取资源完成后再继续。此模型已经使用了多年，也在 HTML4 和 HTML5 规范中进行了指定。作者也可以将脚本标注为“defer”，这样它就不会停止文档解析，而是等到解析结束才执行。HTML5 增加了一个选项，可将脚本标记为异步，以便由其他线程解析和执行。

**预解析**
WebKit 和 Firefox 都进行了这项优化。在执行脚本时，其他线程会解析文档的其余部分，找出并加载需要通过网络加载的其他资源。通过这种方式，资源可以在并行连接上加载，从而提高总体速度。请注意，预解析器不会修改 DOM 树，而是将这项工作交由主解析器处理；预解析器只会解析外部资源（例如外部脚本、样式表和图片）的引用。

**样式表**
另一方面，样式表有着不同的模型。理论上来说，应用样式表不会更改 DOM 树，因此似乎没有必要等待样式表并停止文档解析。但这涉及到一个问题，就是脚本在文档解析阶段会请求样式信息。如果当时还没有加载和解析样式，脚本就会获得错误的回复，这样显然会产生很多问题。这看上去是一个非典型案例，但事实上非常普遍。Firefox 在样式表加载和解析的过程中，会禁止所有脚本。而对于 WebKit 而言，仅当脚本尝试访问的样式属性可能受尚未加载的样式表影响时，它才会禁止该脚本。

**渲染树构建**
在 DOM 树构建的同时，浏览器还会构建另一个树结构：渲染树。这是由可视化元素按照其显示顺序而组成的树，也是文档的可视化表示。它的作用是让您按照正确的顺序绘制内容。WebKit 使用的术语是渲染器,
渲染器知道如何布局并将自身及其子元素绘制出来。每一个渲染器都代表了一个矩形的区域，通常对应于相关节点的 CSS 框,它包含诸如宽度、高度和位置等几何信息。
框的类型会受到与节点相关的“display”样式属性的影响

#### 渲染树和 DOM 树的关系

渲染器是和 DOM 元素相对应的，但并非一一对应。非可视化的 DOM 元素不会插入渲染树中，例如“head”元素。如果元素的 display 属性值为“none”，那么也不会显示在渲染树中（但是 visibility 属性值为“hidden”的元素仍会显示）。

有一些 DOM 元素对应多个可视化对象。它们往往是具有复杂结构的元素，无法用单一的矩形来描述。例如，“select”元素有 3 个渲染器：一个用于显示区域，一个用于下拉列表框，还有一个用于按钮。如果由于宽度不够，文本无法在一行中显示而分为多行，那么新的行也会作为新的渲染器而添加。

另一个关于多渲染器的例子是格式无效的 HTML。根据 CSS 规范，inline 元素只能包含 block 元素或 inline 元素中的一种。如果出现了混合内容，则应创建匿名的 block 渲染器，以包裹 inline 元素。

有一些渲染对象对应于 DOM 节点，但在树中所在的位置与 DOM 节点不同。浮动定位和绝对定位的元素就是这样，它们处于正常的流程之外，放置在树中的其他地方，并映射到真正的框架，而放在原位的是占位框架。
![](https://raw.githubusercontent.com/easterCat/img-package/master/img/image025.png)

#### 构建渲染树的流程

在 Firefox 中，系统会针对 DOM 更新注册展示层，作为侦听器。展示层将框架创建工作委托给 FrameConstructor，由该构造器解析样式（请参阅样式计算）并创建框架。

在 WebKit 中，解析样式和创建渲染器的过程称为“附加”。每个 DOM 节点都有一个“attach”方法。附加是同步进行的，将节点插入 DOM 树需要调用新的节点“attach”方法。

处理 html 和 body 标记就会构建渲染树根节点。这个根节点渲染对象对应于 CSS 规范中所说的容器 block，这是最上层的 block，包含了其他所有 block。它的尺寸就是视口，即浏览器窗口显示区域的尺寸。Firefox 称之为 ViewPortFrame，而 WebKit 称之为 RenderView。这就是文档所指向的渲染对象。渲染树的其余部分以 DOM 树节点插入的形式来构建。

## 布局

渲染器在创建完成并添加到渲染树时，并不包含位置和大小信息。计算这些值的过程称为布局或重排。

HTML 采用基于流的布局模型，这意味着大多数情况下只要一次遍历就能计算出几何信息。处于流中靠后位置元素通常不会影响靠前位置元素的几何特征，因此布局可以按从左至右、从上至下的顺序遍历文档。但是也有例外情况，比如 HTML 表格的计算就需要不止一次的遍历 (3.5)。

坐标系是相对于根框架而建立的，使用的是上坐标和左坐标。

布局是一个递归的过程。它从根渲染器（对应于 HTML 文档的 `<html>` 元素）开始，然后递归遍历部分或所有的框架层次结构，为每一个需要计算的渲染器计算几何信息。

根渲染器的位置左边是 0,0，其尺寸为视口（也就是浏览器窗口的可见区域）。
所有的渲染器都有一个“layout”或者“reflow”方法，每一个渲染器都会调用其需要进行布局的子代的 layout 方法。

#### Dirty 位系统

为避免对所有细小更改都进行整体布局，浏览器采用了一种“dirty 位”系统。如果某个渲染器发生了更改，或者将自身及其子代标注为“dirty”，则需要进行布局。

有两种标记：“dirty”和“children are dirty”。“children are dirty”表示尽管渲染器自身没有变化，但它至少有一个子代需要布局。

#### 全局布局和增量布局

全局布局是指触发了整个渲染树范围的布局，触发原因可能包括：

- 影响所有渲染器的全局样式更改，例如字体大小更改。
- 屏幕大小调整。

布局可以采用增量方式，也就是只对 dirty 渲染器进行布局（这样可能存在需要进行额外布局的弊端）。
当渲染器为 dirty 时，会异步触发增量布局。例如，当来自网络的额外内容添加到 DOM 树之后，新的渲染器附加到了渲染树中

#### 异步布局和同步布局

增量布局是异步执行的。Firefox 将增量布局的“reflow 命令”加入队列，而调度程序会触发这些命令的批量执行。WebKit 也有用于执行增量布局的计时器：对渲染树进行遍历，并对 dirty 渲染器进行布局。
请求样式信息（例如“offsetHeight”）的脚本可同步触发增量布局。
全局布局往往是同步触发的。
有时，当初始布局完成之后，如果一些属性（如滚动位置）发生变化，布局就会作为回调而触发。

#### 优化

如果布局是由“大小调整”或渲染器的位置（而非大小）改变而触发的，那么可以从缓存中获取渲染器的大小，而无需重新计算。
在某些情况下，只有一个子树进行了修改，因此无需从根节点开始布局。这适用于在本地进行更改而不影响周围元素的情况，例如在文本字段中插入文本（否则每次键盘输入都将触发从根节点开始的布局）。

#### 布局处理

布局通常具有以下模式：

- 父渲染器确定自己的宽度。
- 父渲染器依次处理子渲染器，并且：
  - 放置子渲染器（设置 x,y 坐标）。
  - 如果有必要，调用子渲染器的布局（如果子渲染器是 dirty 的，或者这是全局布局，或出于其他某些原因），这会计算子渲染器的高度。
- 父渲染器根据子渲染器的累加高度以及边距和补白的高度来设置自身高度，此值也可供父渲染器的父渲染器使用。
- 将其 dirty 位设置为 false。

Firefox 使用“state”对象 (nsHTMLReflowState) 作为布局的参数（称为“reflow”），这其中包括了父渲染器的宽度。
Firefox 布局的输出为“metrics”对象 (nsHTMLReflowMetrics)，其包含计算得出的渲染器高度。

## doc

- [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)
- [深入理解浏览器工作原理](https://www.cnblogs.com/xiaohuochai/p/9174471.html)
