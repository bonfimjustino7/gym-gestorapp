import React, {useContext, createContext, useState} from 'react';
import {removeData, storeData} from '../services/store';

const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [authState, setAuthState] = useState({
    token: null,
    email: null,
    nome: null,
  });

  //TODO criar outro estado para armazenar os dados do gerente
  function updateNome(novoNome) {
    setAuthState({...authState, nome: novoNome});
  }

  async function logout() {
    await removeData('@user');
    setAuthState({token: null, email: null, nome: null});
  }

  async function login(data) {
    await storeData('@user', data);
    setAuthState(data);
  }

  return (
    <AuthContext.Provider value={{authState, logout, login, updateNome}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return {
    auth: context.authState,
    logout: context.logout,
    login: context.login,
    updateNome: context.updateNome,
  };
}
