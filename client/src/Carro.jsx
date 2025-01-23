import style from "./Carro.module.css";
// import camara from './../src/auto.mp4'
// import auto from '../src/img/camara.jpg';
import Canva from './components/Canva';
import io from "socket.io-client";
import { useEffect, useState } from "react";
import CabeceraP from "./components/CabeceraP";
import PiePag from "./components/PiePag";
import VideoS from "./components/VideoS";
import ControlA from "./components/ControlA";


function Carro() {
  // const socket = io("http://localhost:6660");
  // const [data, setData] = useState({ velocidad: 10, distancia: 210, sensores: [0, 0, 0, 0, 0, 0], angulo: 7 });
  // const [data, setData] = useState(null);
  // const [camara, setCamara] = useState(auto);
  // const [dataSensores, setDataSensores] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:6660"); 
    setSocket(socket);
    // socket.on("connection", () => {
    //   console.log("conectado");
    // });
    // lo de abajo es para que se actualice la imagen de la camara, el cual ya se actualizo en el componente VideoS
    // socket.on('imagen', (data) => {

    //     var blob = new Blob([data], { type: 'image/jpeg' });
    //     setCamara(URL.createObjectURL(blob));
    //     // console.log(camara);
    // });

    // socket.on('message', (data) => {
    // data=JSON.parse(data);
    // console.log(data);
    // console.log(typeof data)
    // setData(data);
    // setData(JSON.parse(data));
    // });
    return () => {
      // socket.off("message");
      // socket.off("connection");
      socket.disconnect();
    };
  }, []);
  return (
    <div className={style.contenedor}>
      <CabeceraP></CabeceraP>
      {socket ? 
        <div>
          <VideoS socket={socket}></VideoS>
          <ControlA socket={socket}></ControlA>
          <Canva socket={socket}></Canva>
        </div>
       : 
        <h2>No se esta conectado al servidor</h2>
      }
      <PiePag></PiePag>
    </div>
  );
}

export default Carro;