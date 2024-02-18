import React, { useState, useEffect } from "react";
import {

  Link,
} from "react-router-dom";
import './comp.css'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se está cargando o no
  const [cont, setCont] = useState(1); // Estado para almacenar el contador

  const offset = (cont - 1) * 25; // Calcula el offset según el contador
  const limit = 25;

  useEffect(() => {
    // Simulación de llamada a la API para obtener datos de pokémons
    const obtenerPokemons = async () => {
      try {
        setIsLoading(true); // Inicia la carga
        const respuestaApi = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        if (!respuestaApi.ok) {
          throw new Error('No se pudo obtener la lista de pokémons');
        }
        const datos = await respuestaApi.json();
        // Mapea cada URL de Pokémon para obtener los detalles de cada uno
        const promesasDetalles = datos.results.map(async (pokemon) => {
          const respuestaDetalle = await fetch(pokemon.url);
          if (!respuestaDetalle.ok) {
            throw new Error('No se pudo obtener los detalles del pokémon');
          }
          const datosDetalle = await respuestaDetalle.json();
          return {
            id: datosDetalle.id,
            nombre: datosDetalle.name,
            peso: datosDetalle.weight,
            altura: datosDetalle.height,
            imagen: datosDetalle.sprites.front_default // URL de la imagen del Pokémon
          };
        });
        // Espera a que todas las promesas se resuelvan
        const detallesPokemon = await Promise.all(promesasDetalles);
        setPokemons(detallesPokemon);
        setIsLoading(false); // Finaliza la carga, independientemente de si fue exitosa o no
      } catch (error) {
        console.error('Error al obtener la lista de pokémons:', error);
        setIsLoading(false); // Asegúrate de que isLoading sea false en caso de error
      }
    };

    obtenerPokemons();
  }, [offset]); // Se ejecuta cada vez que el offset cambia

  // Función para manejar el clic del botón "+"
  const handleIncrement = () => {
    
    setCont(cont + 1);
  };
  const handleDecrement = () => {
    if(cont>1){
    setCont(cont - 1);
    }
  };

  // Si isLoading es true, muestra un mensaje de carga
  if (isLoading) {
    console.log("cargando")
    return <div className="loader"></div>;
  }

  // Generamos una lista de componentes para cada Pokémon, incluyendo sus detalles
  const listaPokemons = pokemons.map((pokemon, index) => (
    <li key={index}>
      
      <strong>{pokemon.nombre}</strong>
      <div>
      <p>{pokemon.id}</p>
      <p>Peso: {pokemon.peso}</p> 
      <p>Altura: {pokemon.altura}</p>
      </div>
      <img src={pokemon.imagen} alt={pokemon.nombre} 
      />
      <Link to={'/detalle/'+pokemon.id} >Detalle</Link>
    </li>
  ));

  return (
    <div class="pokcontent">
      <div>
        <h1>Pokémons</h1>
        <ul class="poks">{listaPokemons}</ul>
      </div>
      <div class="pag">
        <button onClick={handleIncrement}>+</button>
        <p>{cont}</p>
        <button onClick={handleDecrement}>-</button>
      </div>
    </div>
  );
}

export default App;