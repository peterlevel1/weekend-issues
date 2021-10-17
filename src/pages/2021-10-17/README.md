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

---

到底要不要useCallback?

useCallback 主要解决的是函数组件重复渲染调用，反复创建函数，浪费资源
其实呢，老妹儿不用也行

高阶组件是 fn(组件) => 新组件
约定：
1. 高阶组件返回的新组件，是在原组件的基础上进行扩展
2. 高阶组件返回的新组件 与 原组件的参数和表现应一致

比如:
antd 的 Button 与 原生的 button
用在原生的 button 的属性好用，那么我推定，用在 antd 的 Button 组件也好用

---

forwardRef, useImperialHandle

不能用 ref 引用 函数组件, 可以用 forwardRef 包裹函数组件,

- 格式: forwardRef(函数组件)
- 默认值: 函数组件的参数属性，不能有默认值，默认值需要在函数内处理，一般
- 函数组件的参数: 函数组件(props, ref)
- useImperialHandle(ref, () => ({ 方法1, 方法2, ... }));
- ref 就是和类组件引用时用的ref, 是一个类型的ref
- ref 的好处是无论React内部状态怎么刷新，ref的值在内部处理时都可以保持不变
- React 内部源码中看到了对ref做了特定处理

---

节流/防抖
https://blog.csdn.net/weixin_41615439/article/details/113880510

节流: 在规定时间内只执行一次, 只响应该时间段内的第一次的输入
防抖: 在规定时间内只执行一次, 只响应该时间段内的最后一次的输入

测试 - 节流: 在三秒内，输入asd
输出: a

测试 - 防抖: 在三秒内，输入asd
输出: d

---

老妹儿的意思是请求的节流

其实 在哥个人认为，二者没有区别

请求的时候，对吧，大哥一般是，(防抖/节流) + 最后一次检查输入
所以不管是防抖还是节流，都需要比对输入的参数

```javascript:

const [ params, setParams ] = useState(params);

const request = (params) => {
  return requestCb(params);
}

const requestCb = throttle(request, 1000);

  const onRequest = (inputParam) => {
  if (inputParams === parmas) {
    return;
  }

  return requestCb(params);
  };

```

---

alt: alternative: 二选一
option: option: 选项

---
