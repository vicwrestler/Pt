import { useState, useEffect } from 'react';
import auto from '../../src/img/camara.jpg';
import style from './VideoS.module.css'
export default function VideoS(data) {
    const [camara, setCamara] = useState('');
    useEffect(() => {
        if(data.length>0)
            setCamara(data);
        else
            setCamara(auto);
    }, [data]);
  return (
    <section className={style.videoS}>
        <img src={camara} alt="auto" />
    </section>
  )
}
