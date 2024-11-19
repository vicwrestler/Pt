import style from './Carro.module.css'
// import camara from './../src/auto.mp4'
import auto from '../src/img/camara.jpg';
import Canva from './components/Canva';
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import CabeceraP from './components/CabeceraP';
import PiePag from './components/PiePag';
import VideoS from './components/VideoS';
import ControlA from './components/ControlA';


const socket = io("http://localhost:6660");// Se prueba el crearlo desde fuera del componente, si no funciona entonces descomentar la linea 15 (originalmente estaba activada)
function Carro() {
    // const socket = io("http://localhost:6660");
    const [data, setData] = useState({ velocidad: 10, distancia: 210, sensores: [0, 0, 0, 0, 0, 0], angulo: 7 });
    // const [data, setData] = useState(null);
    const [camara, setCamara] = useState(auto);
    const [dataSensores, setDataSensores] = useState(null);
    
    useEffect(() => {
        
        socket.on('connection', () => {
            console.log('conectado')
        });
        socket.on('imagen', (data) => {

            var blob = new Blob([data], { type: 'image/jpeg' });
            setCamara(URL.createObjectURL(blob));
            // console.log(camara);
        });
        
        socket.on('message', (data) => {
            // data=JSON.parse(data);
            // console.log(data);
            // console.log(typeof data)
            setData(data);
            // setData(JSON.parse(data));
            
        });
        return () => {
            socket.off('message');
            socket.off('connection');
            socket.disconnect();
        }
    }, [])
  return (
    <div className={style.contenedor}>
        <CabeceraP></CabeceraP>
        <VideoS data={camara}></VideoS>
        <ControlA data={socket}></ControlA>
        <Canva datosServidor={data}></Canva>
        <PiePag></PiePag>
    </div>

        
  )
}

export default Carro