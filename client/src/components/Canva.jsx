import React, { useRef, useEffect, useState } from "react";

import style from "./Canva.module.css";
const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};
const dibujaCuadro = (ctx, x, y) => {
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x, y, 35, 35);
  // ctx.rect(x, y, 35, 35);
  ctx.stroke();
};
const pinta = (ctx, arreglo) => {
  // ctx.clearRect(0, 0, 450, 600);
  // dibujaCuadro(ctx, 155, 115); //s1
  // dibujaCuadro(ctx, 210, 100); //s2
  // dibujaCuadro(ctx, 270, 115); //s3
  // dibujaCuadro(ctx, 155, 445); //s4
  // dibujaCuadro(ctx, 210, 460); //s5
  // dibujaCuadro(ctx, 270, 445); //s6
  ctx.beginPath();
  // arc(x, y, radius, startAngle, endAngle, counterclockwise)
  for (let i = 0; i < 24; i++) {
    // genera un numero aleatorio entre 30 y 60
    let random = Math.floor(Math.random() * (210 - 230)) + 230;

    // ctx.arc(225, 300, random, toRadians(i * 15), toRadians(i * 15 + 15), false);
    if (arreglo[i] < 0) arreglo[i] = 10;
    ctx.arc(
      225,
      300,
      arreglo[i],
      toRadians(i * 15),
      toRadians(i * 15 + 15),
      false
    );
  }
  // ctx.arc(100, 100, 30, toRadians(0), toRadians(15), false);
  ctx.stroke();
};
const dibujaSegmento = (ctx, angulo, distancia) => {
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
// const datosServidor = {
//   arreglo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
//   angulo: 23,
//   distancia: 220,
// };
const datosServidor = {
  velocidad: 0,
  distancia: 220,
  sensores: [1, 1, 1, 1, 1, 1],
  angulo: 0,
  arreglo: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22,
  ],
};
function Canva({ datosServidor }) {
// function Canva() {

  const canvasRef = useRef(null);
  const [datos, setDatos] = useState(datosServidor);
  const [arreglo, setArreglo] = useState(datosServidor.arreglo);
  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    console.log(datosServidor);
    
    dibujaSegmento(context, datosServidor.angulo, datosServidor.distancia);
  }, []);
  return (
    <div className={style.canva}>
      <div className={style.velocidad}>
        <h2>Velocidad: {datosServidor.velocidad} rpm</h2>
      </div>
      <canvas
        ref={canvasRef}
        className={style.canvas}
        // style={}
        width={450}
        height={500}
      ></canvas>
      {
        datos.sensores.map((sensor, index) => {
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
}

export default Canva;
