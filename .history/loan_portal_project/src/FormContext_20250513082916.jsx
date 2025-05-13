


import React, { createContext, useState } from 'react';

export const formContext = createContext();

export const FormProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState({
    
  });

  return (
    <formContext.Provider value={{ page, setPage, title }}>
      {children}
    </formContext.Provider>
  );
};
