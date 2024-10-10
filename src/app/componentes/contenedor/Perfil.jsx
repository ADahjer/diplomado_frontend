import React, {useContext} from 'react';
import { AuthContext } from './Authcontext';

const Perfil = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Perfil de {user.name}</h1>
      <p>Email: {user.email}</p>
      {/* Otros datos del perfil */}
    </div>
  );
};

export default Perfil;
