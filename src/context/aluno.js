import React, {useContext, createContext, useState} from 'react';

const AlunoContext = createContext({});

export default function AlunoProvider({children}) {
  const [showButtonAdd, setShowButtonAdd] = useState(true);

  return (
    <AlunoContext.Provider value={{showButtonAdd, setShowButtonAdd}}>
      {children}
    </AlunoContext.Provider>
  );
}

export function useAlunoContext() {
  const context = useContext(AlunoContext);

  return {
    showButtonAdd: context.showButtonAdd,
    setShowButtonAdd: context.setShowButtonAdd,
  };
}
