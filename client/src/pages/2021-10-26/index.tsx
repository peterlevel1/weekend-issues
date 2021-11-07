import { useState, forwardRef, useRef } from 'react';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import  './index.less'

export default function HOCInput () {
  const [iconDelVisible, setIconDelVisible] = useState<boolean>(false);
  const showIconDel = () => setIconDelVisible(true);
  const hideIconDel = () => setIconDelVisible(false);

  const clsIconDel = classNames('anniu', {
    active: iconDelVisible
  });
  console.log(clsIconDel);


  return (
    <div className='divv' onMouseEnter={showIconDel}
      onMouseLeave={hideIconDel}
    >
    <span className = 'tupian' >图片</span>
      <span className={clsIconDel} >
        <a href="" className='aaa'><EyeOutlined /></a>
        <button className='btn'><DeleteOutlined /></button>
    </span>

  </div>
  );
};

