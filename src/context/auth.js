import React, {useContext, createContext, useState} from 'react';
import {removeData, storeData} from '../services/store';

const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [authState, setAuthState] = useState({
    token: null,
    email: null,
    nome: null,
  });

  async function logout() {
    await removeData('@user');
    setAuthState({token: null, email: null, nome: null});
  }

  async function login(data) {
    await storeData('@user', data);
    setAuthState(data);
  }

  return (
    <AuthContext.Provider value={{authState, logout, login}}>
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
  };
}
