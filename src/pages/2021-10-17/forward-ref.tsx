import {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  LegacyRef,
} from 'react';

export interface HOCInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface HOCInputRef {
  clear: () => void;
}

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
        onChange(ev.target.value);
      }}
      placeholder="老妹儿的forwardRef演示"
    />
  );
});

// export { HOCInput };
