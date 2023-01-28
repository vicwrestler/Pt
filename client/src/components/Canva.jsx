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
  // ctx.beginPath();

  ctx.arc(
    225,
    300,
    distancia,
    toRadians(angulo * 15),
    toRadians(angulo * 15 + 15),
    false
  );
  // ctx.stroke();
};
function Canva({ datosServidor }) {
  const canvasRef = useRef(null);
  const [arreglo, setArreglo]=useState({});

  useEffect(() => {
    /* document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    // socket.emit('control', 1);
                    console.log('arriba')
                    break;
                case 'ArrowRight':
                    // socket.emit('control', 4);
                    console.log('derecha')
                    break;
                case 'ArrowDown':
                    // socket.emit('control', 2);
                    console.log('abajo')
                    break;
                case 'ArrowLeft':
                    // socket.emit('control', 3);
                    console.log('izquierda')
                    break;
                default:
                    break;
            }
        }); */
    if(datosServidor.angulo===23){
      setArreglo(datosServidor.arreglo);
    }
    const canvas = canvasRef.current;
    canvas.width = 450;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, 450, 600);
    // pinta(ctx);
    ctx.font = "20px roboto";
    ctx.fillText(`${datosServidor.velocidad} rpm`, 190, 335);
    datosServidor.sensores.forEach((sensor, index) => {
      // console.log(sensor, index);
      switch (index) {
        case 1:
          if(!sensor)
            dibujaCuadro(ctx, 155, 115); //s1
          else{
              // ctx.clearRect(0, 0, 450, 600);
          }
          break;
        case 2:
          if(sensor)
            dibujaCuadro(ctx, 210, 100); //s2
          break;
        case 3:
          if(sensor)
            dibujaCuadro(ctx, 270, 115); //s3
          break;
        case 4:
          if(sensor)
            dibujaCuadro(ctx, 155, 445); //s4
          break;
        case 5:
          if(sensor)
            dibujaCuadro(ctx, 210, 460); //s5
          break;
        case 6:
          if(sensor)
            dibujaCuadro(ctx, 270, 445); //s6
          break;
        default:
          break;
      }
    });
    /* for (let i = 0; i < 24; i++) {
      if (i === 0) {
        ctx.beginPath();
      }
      dibujaSegmento(ctx, i, 220);
      if (i === 23) {
        ctx.stroke();
      }
    } */
    // if(datosServidor.angulo===0){
    //   ctx.beginPath();
    // }
    // dibujaSegmento(ctx, datosServidor.angulo, datosServidor.distancia);
    // dibujaSegmento(ctx, , 220);
    /* if(datosServidor.angulo===23){
      ctx.stroke();
    } */
    // ejemplo 2
    // console.log(arreglo);
    // if(datosServidor.angulo===23){
      ctx.beginPath();
      pinta(ctx, arreglo);
      // arreglo.forEach((angulo, index) => {
        // console.log(`angulo: ${angulo} index: ${index}`	);
        // dibujaSegmento(ctx, angulo, index*8);
        // dibujaSegmento(ctx, index, angulo);
      // });
      /* arreglo.map((angulo, index) => {
        // console.log(`angulo: ${angulo} index: ${index}`);
        if(angulo<0){
          dibujaSegmento(ctx, index+1, (240+1));
        }
        dibujaSegmento(ctx, index+1, angulo);
        return null;
      }); */
      ctx.stroke();
    // }
  }, [datosServidor, arreglo]);

  return (
    <canvas
      ref={canvasRef}
      className={style.canvas}
      // style={}
      // width={450}
      // height={600}
    ></canvas>
  );
}

export default Canva;
