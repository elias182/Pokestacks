import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
  const [pokemonData, setPokemonData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return (
    <div className="pokemon-details">
      {pokemonData ? (
        <div>
          <h2 className="pokemon-name">{pokemonData.name}</h2>
          <div className="pokemon-image-container">
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokemon-image" />
          </div>
          <div className="pokemon-stats">
            <p className="pokemon-stat">Height: {pokemonData.height}</p>
            <p className="pokemon-stat">Weight: {pokemonData.weight}</p>
            <p className="pokemon-stat">Types:</p>
            <ul className="pokemon-types">
              {pokemonData.types.map((type, index) => (
                <li key={index} className="type">{type.type.name}</li>
              ))}
            </ul>
            <p className="pokemon-stat">Base Stats:</p>
            <ul className="pokemon-stats-list">
              {pokemonData.stats.map((stat, index) => (
                <li key={index} className="stat">{stat.stat.name}: {stat.base_stat}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PokemonDetails;