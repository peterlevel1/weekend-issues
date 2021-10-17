import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Button } from 'antd';
import { HOCInput, HOCInputRef } from './forward-ref';

export default function aa() {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [inputVal, setInputVal] = useState<string>('');
  const inputRef = useRef<HOCInputRef>(null);

  const btnclick = () => {
    setButtonVisible((visible) => !visible);
  };

  const onChangeInputVal = (value: string) => {
    setInputVal(value);
  };

  const onClearHOCInput = () => {
    if (inputRef.current) {
      inputRef.current.clear();
    }
  };

  console.log('HOCInput的值: ', inputVal);

  return (
    <div>
      <Button onClick={btnclick}>按钮</Button>
      {!buttonVisible ? null : <DestroyedButton />}
      <div style={{ height: 12 }}></div>
      <button onClick={onClearHOCInput}>清除HOCInput的值</button>
      <HOCInput ref={inputRef} value={inputVal} onChange={onChangeInputVal} />
    </div>
  );
}

let timer: NodeJS.Timer | null = null;
const colors: string[] = ['red', 'blue', 'yellow', 'green'];

function DestroyedButton() {
  const [num, setNum] = useState(1);
  const color = useMemo(() => colors[num % colors.length], [num]);

  // useCallback(fn, args[]): 缓存函数，节省调用
  // useCallback = useMemo(() => fn, args[]);
  // useCallback 单独处理函数方法
  //
  // useMemo 处理其他类型的变量
  // useMemo 需要根据其他变量产生变化而变化
  // 比如，你喝什么咖啡，我就喝什么咖啡
  const createTimer = useCallback(() => {
    if (timer !== null) {
      clearInterval(timer);
    }

    timer = setInterval(() => {
      setNum((n) => n + 1);
    }, 1000);
  }, [timer]);

  useEffect(() => {
    createTimer();

    return () => {
      console.log('老妹儿给大哥演示 componentWillUnmount 用法');
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, []);

  return <button style={{ backgroundColor: color }}>{num}</button>;
}
