import { useState, useEffect } from 'react';
import style from '/ControlA.module.css';
function ControlA(data) {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        if(data)
            setSocket(data);
        else
            console.error('No se ha recibido el socket');
    }, []);
  return (
    <div>
        <button className={`${style.control} ${style.arriba}`}
                // agrega un evento al boton cuando se deja de presionar
                // onClick={() => {socket.emit('control', 1)}}
                onMouseDown={() => {socket.emit('control', 1)}}
                onMouseUp={() => {socket.emit('control', 0)}}
                ></button>
                <button className={`${style.control} ${style.derecha}`}
                onMouseDown={() => {socket.emit('control', 4)}}
                onMouseUp={() => {socket.emit('control', 0)}}
                // onClick={() => {socket.emit('control', 'derecha')}}
                ></button>
                <button className={`${style.control} ${style.abajo}`}
                onMouseDown={() => {socket.emit('control', 2)}}
                onMouseUp={() => {socket.emit('control', 0)}}
                // onClick={() => {socket.emit('control', 'abajo')}}
                ></button>
                <button className={`${style.control} ${style.izquierda}`}
                onMouseDown={() => {socket.emit('control', 3)}}
                onMouseUp={() => {socket.emit('control', 0)}}
                // onClick={() => {socket.emit('control', 'izquierda')}}
                ></button>
    </div> 
  )
}

export default ControlA