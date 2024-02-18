import React, { useState, useEffect } from 'react';
import app from '../firebase'; // Importa la instancia de Firestore directamente
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { getFirestore } from "firebase/firestore"; 

const firestore = getFirestore(app);

const TopCollection = () => {
    const [topData, setTopData] = useState([]);
  
    useEffect(() => {
      const fetchTopData = async () => {
        try {
          const q = query(collection(firestore, 'TOP'), orderBy('puntos', 'desc'), limit(10));
          const querySnapshot = await getDocs(q);
  
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            puntos: doc.data().puntos,
            uid: doc.data().uid
          }));
          
          setTopData(data);
        } catch (error) {
          console.error('Error fetching top data:', error);
        }
      };
  
      fetchTopData();
    }, []);
  
    return (
      <div>
        <h2>Top Collection</h2>
        <ul>
          {topData.map((item, index) => (
            <li key={item.id}>
              <span>{index + 1}. </span>
              <span>Usuario: {item.uid}, Puntos: {item.puntos}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TopCollection;