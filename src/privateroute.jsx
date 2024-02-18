import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Juego from './components/juego.jsx';
const PrivateRoute = ({ element: Element, ...rest }) => {
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

  return usuario ? <Juego/> : <Navigate to="/sesion" replace />;
};

export default PrivateRoute;