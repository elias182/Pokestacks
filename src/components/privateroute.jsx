import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Juego from './juego.jsx';

const PrivateRoute = () => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // Verifica si el usuario está autenticado
    const isAuthenticated = usuario !== null;

    return<Juego />;
};

export default PrivateRoute;