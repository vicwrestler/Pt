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
    if(arreglo[i]<0)
        arreglo[i]=10;
    ctx.arc(225, 300, arreglo[i], toRadians(i * 15), toRadians(i * 15 + 15), false);
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
function Canva({ datosServidor }) {
  const canvasRef = useRef(null);
  const [arreglo, setArreglo]=useState(datosServidor.arreglo);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    dibujaSegmento(context, datosServidor.angulo, datosServidor.distancia);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className={style.canvas}
      // style={}
      width={450}
      height={600}
  ></canvas>
    
  );
}

export default Canva;
