
import style from "./ControlA.module.css";

function ControlA({socket}) {    
  const handleControl = (control) => {
    socket?.emit("control", control);
  };
  return (
    <div className={style.ControlA}>
      <button
        className={`${style.control} ${style.arriba}`}
        onMouseDown={()=>handleControl(1)}
        onMouseUp={()=>handleControl(0)}
      ></button>
      <button
        className={`${style.control} ${style.derecha}`}
        onMouseDown={()=>handleControl(4)}
        onMouseUp={()=>handleControl(0)}
      ></button>
      <button
        className={`${style.control} ${style.abajo}`}
        onMouseDown={()=>handleControl(2)}
        onMouseUp={()=>handleControl(0)}
      ></button>
      <button
        className={`${style.control} ${style.izquierda}`}
        onMouseDown={()=>handleControl(3)}
        onMouseUp={()=>handleControl(0)}
      ></button>
    </div>
  );
}

export default ControlA;
