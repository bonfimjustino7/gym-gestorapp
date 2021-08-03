import React, {useContext, createContext, useState} from 'react';
import {removeData} from '../services/store';

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

  return (
    <AuthContext.Provider value={{authState, setAuthState, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return {
    auth: context.authState,
    setAuth: context.setAuthState,
    logout: context.logout,
  };
}
