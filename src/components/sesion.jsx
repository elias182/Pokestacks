import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebase';

function Sesion({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Determina si estamos en la pantalla de inicio de sesión o de registro

  const auth = getAuth(app);

  const iniciarSesionRegistro = async (e) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        // Iniciar sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user)
        window.location.href = '/';

      } else {
        // Registrar usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

      }
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  const iniciarSesionGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      window.location.href = '/';
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  const iniciarSesionGithub = async () => {
    try {
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log('Usuario inició sesión con GitHub exitosamente:', user);
      window.location.href = '/';
    } catch (error) {
      console.error('Error al iniciar sesión con GitHub:', error);
      throw error;
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
      <form onSubmit={iniciarSesionRegistro}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</button>
      </form>
      <p>
        {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
        <span
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? ' Registrarse' : ' Iniciar sesión'}
        </span>
      </p>
      <button onClick={iniciarSesionGoogle}>Iniciar sesión con Google</button>
      <button onClick={iniciarSesionGithub}>Iniciar sesión con GitHub</button>
    </div>
  );
}

export default Sesion;