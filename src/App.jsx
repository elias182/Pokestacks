import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Comp from './components/comp.jsx'
import PokemonHeader from './components/cabecera.jsx'

function App() {
  const [count, setCount] = useState(0);
  const [showComp, setShowComp] = useState(false);

  return (
    <>
      <div class="land">
      <h1 class="title">Pokestacks</h1>
      <h3 class="sub">Busca, Aprende y Juega con Pokemons</h3>
      </div>
      
      
      
    </>
  );
}

export default App;