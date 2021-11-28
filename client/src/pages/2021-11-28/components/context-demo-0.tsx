import React, { useState } from "react";
import ContextFF from '../contexts/context-ff';
import XXComp0 from "../components/xx-comp-0";

export default function ContextDemo0() {
  const [data, setData] = useState('周日');

  return (
    <ContextFF.Provider value={data}>
      <div>
        <XXComp0 />
      </div>
    </ContextFF.Provider>
  );
}
