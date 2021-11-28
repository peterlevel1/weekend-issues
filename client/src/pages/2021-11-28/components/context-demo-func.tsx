// ---------------------------------
// 函数组件使用 context 范例
// ---------------------------------

import React, { createContext, useState, useContext } from "react";

const colors = {
  red: 'red',
  green: 'green'
};

const ColorContext = createContext(colors.red);

export default function ContextDemoFunc() {
  const [color, setColor] = useState(colors.red);

  const onChangeColor = () => {
    setColor(color === 'red' ? 'green' : 'red');
  }

  return (
    <ColorContext.Provider value={color}>
      <div>
        <button onClick={onChangeColor}>改变 context color 的颜色</button>
        <ColorDisplayParent />
        <CompA />
      </div>
    </ColorContext.Provider>
  );
}

function ColorDisplayParent() {
  return (
    <div>
      <h2>ColorDisplayParent</h2>
      <ColorDisplay />
    </div>
  )
}

function ColorDisplay() {
  const color = useContext(ColorContext);

  return (
    <div>
      <h3>ColorDisplay</h3>
      <h4>color is: {color}</h4>
      <div style={{ width: '100%', height: '24px', backgroundColor: color }}></div>
    </div>
  );
}

function CompA() {
  const color = useContext(ColorContext);

  return (
    <div>
      <h2 style={{ color: 'white' }}>
        CompA
      </h2>
      <CompB />
    </div>
  )
}

function CompB() {
  const color = useContext(ColorContext);

  return (
    <div style={{ width: '100px', height: '100px', marginTop: 16, backgroundColor: color }}>
      <h2 style={{ color: 'white' }}>
        CompB
      </h2>
      <CompC />
    </div>
  )
}

function CompC() {
  const color = useContext(ColorContext);

  return (
    <div style={{ width: '100px', height: '100px', marginTop: 16, backgroundColor: color }}>
      <h2 style={{ color: 'white' }}>
        CompC
      </h2>
      <CompD />
    </div>
  );
}

function CompD() {
  const color = useContext(ColorContext);

  return (
    <div style={{ width: '100px', height: '100px', marginTop: 16, backgroundColor: color }}>
      <h2 style={{ color: 'white' }}>
        CompD
      </h2>
    </div>
  );
}
