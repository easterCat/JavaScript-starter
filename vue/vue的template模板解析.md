# vue 的 dom 解析过程

## template 模板

- template 编译为 AST 语法树
- 然后通过 render 渲染函数进行渲染
- 最终返回一个 vnode 虚拟 dom 节点
