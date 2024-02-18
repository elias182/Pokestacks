import React, { useState, useEffect } from 'react';
import './Juego.css'; // Importamos un archivo CSS para los estilos adicionales
import { collection, addDoc } from 'firebase/firestore'; // Importa la función addDoc desde Firestore
import { getFirestore } from "firebase/firestore"; 
import app from '../firebase'; // Importa la instancia de Firestore directamente
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Juego() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [imageHeight, setImageHeight] = useState(200); // Estado para controlar la altura de la imagen
  const [intentos, setIntentos] = useState(5); // Estado para el número de intentos
  const [intentosFallidos, setIntentosFallidos] = useState(0); // Estado para el número de intentos fallidos
  const [gameOver, setGameOver] = useState(false); // Estado para controlar si el juego ha terminado
  
  const intentosf = 5;

  const firestore = getFirestore(app);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUsuario(user);
      } else {
        // User is signed out
        setUsuario(null);
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchRandomPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + (Math.floor(Math.random() * 1025) + 1) +"/");
    const data = await response.json();
    setPokemon(data);
    setImageHeight(2000); // Reiniciar la altura de la imagen a 200px al cargar un nuevo Pokémon
    console.log(data.name)
  };

  const handleGuess = async () => {
    if (gameOver) return; // Si el juego ha terminado, no permitir más intentos
    if (!pokemon) return;
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      const puntos = calcularPuntos(intentos); // Calcular puntos según intentos restantes
      setMessage(`¡Correcto! Ganaste ${puntos} puntos.`);
      setImageHeight(300); 
      setIntentosFallidos(0);
      setScore(score + puntos);
      setIntentos(5);
      setTimeout(() => {
        fetchRandomPokemon();
      }, 3000);
    } else {
      setMessage('¡Incorrecto! Inténtalo de nuevo.');
      if (imageHeight > 500) {
        setImageHeight(imageHeight - 500); // Disminuir la altura de la imagen en 50px si la adivinanza es incorrecta
      }
      // Restar un intento
      setIntentos(intentos - 1);
      // Incrementar el número de intentos fallidos
      setIntentosFallidos(intentosFallidos + 1);
      // Verificar si los intentos han llegado a cero
      if (intentos === 1) {
        setGameOver(true);
        setIntentos(5);
        // Agregar un documento a la colección 'perdidas' con la puntuación actual
        await addDoc(collection(firestore, 'TOP'), {
          uid: usuario.displayName,
          puntos: score
        });
      }
    }
  };

  const calcularPuntos = (intentosRestantes) => {
    // Se asigna una puntuación según los intentos restantes
    switch(intentosRestantes) {
      case 5:
        return 20;
      case 4:
        return 15;
      case 3:
        return 10;
      case 2:
        return 5;
      case 1:
        return 3;
      default:
        return 0;
    }
  };

  const restartGame = () => {
    setIntentos(5); // Reiniciar los intentos
    setIntentosFallidos(0); // Reiniciar el número de intentos fallidos
    setGameOver(false); // Reiniciar el estado del juego
    setScore(0); // Reiniciar la puntuación
    setMessage(''); // Reiniciar el mensaje
    fetchRandomPokemon(); // Cargar un nuevo Pokémon
  };

  return (
    <div className="App">
      <h1>Adivina el Pokémon</h1>

      <div className="intentos">
        {[...Array(intentosf)].map((_, index) => (
          <div key={index} className={`intento ${index < intentosFallidos ? 'rojo' : ''}`}></div>
        ))}
      </div>
      {pokemon && (
        <>
          <div className="zoom-wrapper">
            <img 
              src={pokemon.sprites.front_default}
              alt={pokemon.name} 
              style={{ height: imageHeight + 'px' }}
            />
          </div>
          <br />
          <label htmlFor="myInput" className="label">
            <span className="label-title">My nice input</span>
            <input id="myInput" className="input" type="text" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="¿Cuál es este Pokémon?" disabled={gameOver}/>
          </label>

          <button className="cssbuttons-io-button" onClick={handleGuess} disabled={gameOver}>
            Adivinar
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </>
      )}
      {gameOver && (
        <>
          <p>Game Over</p>
          <button onClick={restartGame}>Restart</button>
        </>
      )}
      <p>{message}</p>
      <p>Puntuación: {score}</p>
      
    </div>
  );
}

export default Juego;