import React, { useEffect, useRef, useState } from "react";
import style from "./Canva.module.css";


const datosBase = {
  velocidad: 0,
  distancia: 220,
  sensores: [1, 1, 1, 1, 1, 1],
  angulo: 0,
  arreglo: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 10, 20, 30],
};
const toRadians = (angle) => angle * (Math.PI / 180);
const dibujaSegmento = (ctx, angulo, distancia) => {
  if(angulo === 23){ ctx.clearRect(0, 0, "450", "500");}
  ctx.beginPath();
  ctx.arc(
    225,        
    300,        
    distancia,  
    toRadians(angulo * 15),
    toRadians(angulo * 15 + 15),
    false
  );
  ctx.stroke();
};

const Canva = ({ socket }) => {
  const canvasRef = useRef(null);
  
  const [datosServidor, setDatosServidor] = useState(datosBase);

  useEffect(() => {
    const manejoDelEvento = (event) => {
      setDatosServidor(event);
    };
    
    socket.on("message", manejoDelEvento);

    return () => {
      socket.off("message", manejoDelEvento);
    };
  }, [socket]);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    dibujaSegmento(ctx, datosServidor.angulo, datosServidor.distancia);
  }, [datosServidor.angulo, datosServidor.distancia]);

  return (
    <div className={style.canva}>
      <div className={style.velocidad}>
        <h2>Velocidad: {datosServidor.velocidad} rpm</h2>
      </div>
      <canvas
        ref={canvasRef}
        className={style.canvas}
        width={450}
        height={500}
      />
        {
        datosServidor.sensores.map((sensor, index) => {
          if (sensor) {
            return (
              <div
                key={index}
                className={`${style.sensor} ${style[`sensor${index + 1}`]}`}
              ></div>
            );
          }else{
            return null;
          }
        })

        // datos.sensores[0]&& <div className={`${style.sensor} ${style.sensor1}`}></div>
      }
      {/* <div className={`${style.sensor} ${style["sensor1"]}`}></div> */}
    </div>
  );
};

export default Canva;
