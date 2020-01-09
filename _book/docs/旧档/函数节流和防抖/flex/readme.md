```
graph LR
传统布局方式-->display-position-float
```

```
graph LR
flex-->设置容器display:flex
flex-->设置行内元素容器display:inline-flex
```

> 设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效

```
graph LR
容器的属性-->|决定主轴的方向|flex-direction
flex-direction-->row默认值,主轴为水平方向,起点在左端
flex-direction-->row-reverse,主轴为水平方向,起点在右端
flex-direction-->column,主轴为垂直方向,起点在上沿
flex-direction-->column-reverse,主轴为垂直方向,起点在下沿


容器的属性-->|定义,如果一条轴线排不下,如何换行|flex-wrap
flex-wrap-->nowrap默认不换行
flex-wrap-->wrap换行,第一行在上面
flex-wrap-->wrap-reverse换行,第一行在下方


容器的属性-->|flex-direction和flex-wrap的简写|flex-flow
flex-flow-->默认值为row,nowrap


容器的属性-->|定义了项目在主轴上的对齐方式|justify-content
justify-content-->flex-start默认值,左对齐
justify-content-->flexend,右对齐
justify-content-->center,居中
justify-content-->space-between,两端对齐,项目之间的间隔都相等
justify-content-->space-around,每个项目两侧的间隔相等



容器的属性-->|定义项目在交叉轴上如何对齐|align-items
align-items-->flex-start:交叉轴的起点对齐
align-items-->flexend:交叉轴的终点对齐
align-items-->center:交叉轴的中点对齐
align-items-->baseline:项目的第一行文字的基线对齐
align-items-->stretch默认值:如果项目未设置高度或设为auto,将占满整个容器的高度


容器的属性-->|定义了多根轴线的对齐方式|align-content
align-content-->flex-start:与交叉轴的起点对齐
align-content-->flexend:与交叉轴的终点对齐
align-content-->center:与交叉轴的中点对齐
align-content-->space-between:与交叉轴两端对齐,轴线之间的间隔平均分布
align-content-->space-around:每根轴线两侧的间隔都相等,所以,轴线之间的间隔比轴线与边框的间隔大一倍
align-content-->stretch默认值:轴线占满整个交叉轴
```

```
graph LR
项目的属性-->|项目的排列顺序|order
order-->数值越小,排列越靠前,默认为0

项目的属性-->|定义项目放大比例|flex-grow
flex-grow-->默认为0,存在剩余空间,也不放大

项目的属性-->|定义项目缩小比例|flex-shrink
flex-shrink-->默认为0,如果空间不足,该项目将缩小

项目的属性-->|定义了在分配多余空间之前,项目占据的主轴空间|flex-basis
flex-basis-->默认值为auto,即项目的本来大小

项目的属性-->|flex-grow,flex-shrink和flex-basis的简写|flex
flex-->默认值为0,1,auto

项目的属性-->|允许单个项目有与其他项目不一样的对齐方式,可覆盖align-items属性|align-self
align-self-->auto
align-self-->flex-start
align-self-->flex-en
align-self-->center
align-self-->baseline
align-self-->stretch
```
