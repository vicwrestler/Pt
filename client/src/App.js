import './App.css';
// import io from "socket.io-client";


import Carro from './Carro';

// const socket = io("http://localhost:6660");

// crea una funcion que cambien el valor de angulo cada 0.5s
 


function App() {
 /*  const [angulo, setAngulo] = useState(-90);
  const changeAngle = () => {
    setInterval(() => {
      setAngulo(angulo + 1);
    }, 50);
   };
   useEffect(() => {
      changeAngle();
    }, []); */
  return (
    /* <div className={`${style.boton}`} style={{transform: `rotate(${angulo}deg)`}}>
      
    </div> */
  <Carro></Carro>
  );
}

export default App;
