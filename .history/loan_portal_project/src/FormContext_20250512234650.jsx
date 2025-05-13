
/

import React, { createContext, useState } from 'react';

export const formContext = createContext();

export const FormProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState({
    0: 'Personal Information',
    1: 'Employee Details',
    2: 'Loan Details',
    3: 'Document Updates',
    4: 'Updated Picture',
  });

  return (
    <formContext.Provider value={{ page, setPage, title }}>
      {children}
    </formContext.Provider>
  );
};
