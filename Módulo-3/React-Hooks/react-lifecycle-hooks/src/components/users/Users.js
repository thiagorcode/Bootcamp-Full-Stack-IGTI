import React, { useState, useEffect } from 'react';
import User from './User';

export default function Users({ users }) {
  const [secondsVisible, setSecondsVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsVisible(secondsVisible + 1); // ? Realiza o efeito que quero
    }, 1000);

    return () => {
      clearInterval(interval); // *Realiza um efeito de limpeza de Interval
    };
  }, [secondsVisible]); /* ! Qual variável ele vai monitorar 
    Verifica se existe mudança no estado.
  */

  return (
    <div>
      <p>Componente Users visível por {secondsVisible} segundos</p>
      <ul>
        {users.map((user) => {
          const { login } = user;
          return (
            <li key={login.uuid}>
              <User user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
