import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Button, Select } from 'antd';
import { HOCInput, HOCInputRef } from './forward-ref';
import _ from 'lodash';

type InputMode = '' | 'throttle' | 'debounce';

export default function aa() {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [inputVal, setInputVal] = useState<string>('');
  const inputRef = useRef<HOCInputRef>(null);

  const btnclick = () => {
    setButtonVisible((visible) => !visible);
  };

  const onChangeInputVal = useCallback((value: string) => {
    console.log('实际: input的输入: ', value);
    setInputVal(value);
  }, []);

  const onClearHOCInput = () => {
    if (inputRef.current) {
      inputRef.current.clear();
    }
  };

  const [mode, setMode] = useState<InputMode>('throttle');
  const onChangeInputValCb = useMemo(() => {
    console.log('onChangeInputValCb - mode', mode);
    return !mode
      ? onChangeInputVal
      : 'throttle'
      ? _.throttle(onChangeInputVal, 5000)
      : _.debounce(onChangeInputVal, 5000);
  }, [mode, onChangeInputVal]);

  return (
    <div style={{ padding: '24px 0 0 24px' }}>
      <Button onClick={btnclick}>按钮</Button>
      {!buttonVisible ? null : <DestroyedButton />}
      <div style={{ height: 12 }}></div>
      <button onClick={onClearHOCInput}>清除HOCInput的值</button>
      <div style={{ height: 12 }}></div>
      <Select
        value={mode}
        onChange={(value) => {
          setMode(value);
        }}
      >
        <Select.Option value="">无模式</Select.Option>
        <Select.Option value="throttle">节流</Select.Option>
        <Select.Option value="debounce">防抖</Select.Option>
      </Select>
      <div style={{ height: 12 }}></div>
      <HOCInput ref={inputRef} value={inputVal} onChange={onChangeInputValCb} />
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
