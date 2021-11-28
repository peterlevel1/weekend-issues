import  { useContext } from "react";
import ContextFF from '../contexts/context-ff';

export default function XXComp1() {
  const data = useContext(ContextFF);

  return (
    <div>
      <h2>XXComp1:</h2>
      <p>
        日期: 到底是
        &nbsp;
        <span style={{ color: 'purple', fontWeight: 'bold' }}>
          {data}
        </span>
        &nbsp;
        吗？
      </p>
    </div>
  );
}
