context
---

1. props 是父子组件之间的传递
2. context 传递数据，不需要直接传递，可以隔代传递

## 函数组件之间的隔代传递属性

1. 创建 Context类, 使用 React.createContext(默认值); 这里用 ContextXX
2. 使用创建的Context类的静态组件 ContextXX.Provider 提供 context, 并给定 value 属性的值
   这里暂定顶层使用 ContextXX.Provider 的组件为 TopComponent
3. TopComponent 下的函数组件不管是嵌套多少层级，只要使用useContext(ContextXX), 都可以直接使用，不需要显示传递
4. 为了避免循环依赖，建议小徐将 ContextXX 单独在一个文件中声明
