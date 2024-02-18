import React, { useEffect, useState } from "react";
import "./PokemonHeader.css";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function PokemonHeader() {
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

    return () => {
      unsubscribe();
    };
  }, []);

  const cerrarSesion = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="pokemon-header">
      <div className="logo">
        <img src={Logo} alt="Pokemon Logo" />
      </div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/pokemons">Pokemons</Link>
        {usuario ? (
          <>
            <Link to="/TheGame">PokeGame</Link>
            <Link to="/top">Ranking</Link>
            <Link to="/" onClick={cerrarSesion}>Cerrar sesión</Link>
            {usuario.photoURL ? (
              <img src={usuario.photoURL} alt="User profile"></img>
            ) : (
              <span>{usuario.email}</span>
            )}
          </>
        ) : (
          <Link to="/sesion">Iniciar sesión</Link>
        )}
      </nav>
    </header>
  );
}

export default PokemonHeader;