import style from './Carro.module.css'
// import camara from './../src/auto.mp4'
import auto from '../src/img/camara.jpg';
import Canva from './components/Canva';
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import CabeceraP from './components/CabeceraP';
import PiePag from './components/PiePag';
import VideoS from './components/VideoS';
const socket = io("http://localhost:6660");



function Carro() {
    const [data, setData] = useState({ velocidad: 0, distancia: 220, sensores: [1, 1, 0, 0, 1, 0], angulo: 0 });
    
    const [camara, setCamara] = useState(auto);
    // const [dataSensores, setDataSensores] = useState(null);
    
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
        socket.on('connection', () => {
            console.log('conectado')
        });
        socket.on('imagen', (data) => {
            var blob = new Blob([data], { type: 'image/jpeg' });
            setCamara(URL.createObjectURL(blob));
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
    <div>
        <CabeceraP></CabeceraP>
        <VideoS></VideoS>
        <PiePag></PiePag>
    </div>

        
  )
}

export default Carro