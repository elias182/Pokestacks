import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as React from "react";
import Comp from './components/comp.jsx'
import { createRoot } from "react-dom/client";
import PokemonHeader from './components/cabecera.jsx'
import PokemonDetails from './components/pokedetail.jsx';
import Juego from './components/juego.jsx';
import Sesion from './components/sesion.jsx';
import TopCollection from './components/top.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function Main() {
  const [usuario, setUsuario] = React.useState(null);

  // Función para manejar el inicio de sesión
  const handleLogin = (user) => {
    setUsuario(user);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
      <PokemonHeader></PokemonHeader>
      <App></App></>,
    },
    {
      path: "pokemons",
      element: <>
      <PokemonHeader></PokemonHeader>
      <Comp></Comp>
      </>,
    },
    {
      path: "detalle/:id",
      element: <>
      <PokemonHeader></PokemonHeader>
      <PokemonDetails></PokemonDetails>
      </>,
    },
    {
      path: "TheGame",
      element: <>
      <PokemonHeader />
      <Juego></Juego>
      </>,
    },
    {
      path: "sesion",
      element: <>
      <PokemonHeader />
      <Sesion/>
      </>,
    },
    {
      path: "top",
      element: <>
      <PokemonHeader></PokemonHeader>
      <TopCollection></TopCollection>
      </>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

createRoot(document.getElementById("root")).render(
  <Main />
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
