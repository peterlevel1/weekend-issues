import { useImperativeHandle, forwardRef, useRef } from 'react';
export interface HOCInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface HOCInputRef {
  clear: () => void;
}

export type HOCInputMode = '' | 'throttle' | 'debounce';

// HighOrderComponent
export const HOCInput = forwardRef<HOCInputRef, HOCInputProps>((props, ref) => {
  const { value, onChange } = props;
  const nativeRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    clear() {
      onChange('');
    },
  }));

  return (
    <input
      ref={nativeRef}
      value={value}
      onChange={(ev) => {
        // console.log('onChange: input的输入: ', ev.target.value);
        onChange(ev.target.value);
      }}
      placeholder="老妹儿的forwardRef演示"
    />
  );
});

// export { HOCInput };
