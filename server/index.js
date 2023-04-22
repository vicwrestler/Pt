import express from "express";
import morgan from "morgan";
import { Server as socketServer } from "socket.io";
import http from "http";
import cors from "cors";
import fs from "fs";

let imagen = undefined;
const app = express();
const server = http.createServer(app);
const port = 6660;
app.use(cors());
app.use(morgan("dev"));
const datos = {
    velocidad: 100,
    distancia: 10,
    sensores: [1, 0, 0, 1, 1, 1],
    anguloPos: 1, //cambiar a entero para saber que muestra se leyo
};
let contador = 0;
// crea un arreglo de 24 posiciones con 0
const arreglo = new Array(24).fill(0);
const actualizarDatos = (data) => {
    data.sensores = data.sensores.map((sensor) => {
        //calcula un numero aleatorio entre 0 y 1
        return Math.round(Math.random());
    });
    // console.log(data.sensores);
    data.velocidad = data.velocidad + 1;
    //calcula un numero aleatorio entre 0 y 1000
    data.distancia = Math.round(Math.random() * 100);

    data.angulo = data.angulo + 1;
};

const io = new socketServer(server, {
    cors: {
        origin: "*",
    },
});

/* const tiempo = (socket) => {
    setInterval(() => {
        actualizarDatos(datos);
        socket.emit("message", datos);
        // console.log("first")
    }, 1000);
};
 */
io.on("connect", (socket) => {
    console.log("new connection");
    // console.log(socket.id);
    socket.on("estado", (data) => {
        // console.log(data);
        // arreglo.fill
        arreglo[data.angulo] = data.distancia;
        if (data.angulo == 23) {
            data = {...data, "arreglo": arreglo };
        }
        console.log(data);
        io.emit("message", data);
    });
    socket.on("control", (data) => {
        console.log(data);
        io.emit("control", data);
    });
    // tiempo(socket);
    socket.on("imagen", (data) => {
        // console.log(data);
        io.emit("imagen", imagen);
    });

    socket.on("frame", (data) => {
        // console.log(data);
        imagen = data;
        io.emit("imagen", imagen);
    });
    socket.off("disconnect", () => {
        console.log("user disconnected");
    });
    // const video = fs.createReadStream("auto.mp4");
    // socket.emit("camara", video);
});
/* io.on("frame", (data) => {
    console.log(data);
}) */
app.get("/info", (req, res) => {
    res.json(datos);
});

// io.listen(3000);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});