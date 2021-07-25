import React, {useContext, createContext, useState} from 'react';

const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [authState, setAuthState] = useState({
    token: null,
    email: null,
    nome: null,
  });

  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return {
    auth: context.authState,
    setAuth: context.setAuthState,
  };
}
