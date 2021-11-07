import React from 'react';
import XXUpload from './xx-upload';
import { TYPES_VIDEO } from './xx-upload';

// truthy: 类真值的 !!truthy -> true, 有东西的
// falsy: 类价值的, !!falsy -> false, ('', false, 0, null, undefined, NaN)

export default function Picture(props: any) {
  return <XXUpload type='video' accept={TYPES_VIDEO} {...props} />
};
