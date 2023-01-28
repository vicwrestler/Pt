import React from "react";
import logo from "../img/conjunto-baseCua.png";
import style from "./CabeceraP.module.css";
function CabeceraP() {
  return (
    <div className={style.cabecera}>
      <img src={logo} alt="logo" />
      <div className={style.titulo}>
        <h1>Proyecto Terminal</h1>
      </div>
    </div>
  );
}

export default CabeceraP;
