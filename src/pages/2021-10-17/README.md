为什么要设置定时器？


因为要清它

写定时器的目的是什么

你说要我假设一个场景吗？

我想要的是，演示一下 useEffect, useMemo, useCallback, useRef, useLayoutEffect, forwardRef
的用法

设立定时器的目的是 在函数组件内演示 componentWillUnmount 吗？

```jsx:
// useEffect(fn, []);
// 1. 第二个参数是空数组的情况下，相当于 componentDidMount
// 2. 在 fn 内返回一个函数， 相当于 componentWillUnmount
useEffect(() => {
  // 
}, []);
```
