import { useState, useEffect } from "react";
import style from "./VideoS.module.css";
export default function VideoS({ socket }) {
  const [camara, setCamara] = useState("");
  useEffect(() => {
    socket.on("imagen", (data) => {
      var blob = new Blob([data], { type: "image/jpeg" });
      setCamara(URL.createObjectURL(blob));
    });
  }, [socket]);
  return (
    <section className={style.videoS}>
      {camara ? <img src={camara} alt="auto" /> : <p>Esperando imagen...</p>}
      {/* <img src={camara} alt="auto" /> */}
    </section>
  );
}
