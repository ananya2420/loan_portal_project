//Theming a theme toggle (Light/dark) using redux state.
//Theme reference must persist
/*
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(()=>localStorage.getItem("theme") || "light");
  const reduxState = useSelector((state) => state.theme);

  useEffect(() => {
    if (reduxState) {
      setTheme(reduxState);
    }
  }, [reduxState]);

  const themeVariables = {
    light: {
      primaryColor: '#ffffff',
      secondaryColor: '#727272',
    },
    dark: {
      primaryColor: '#272727',
      secondaryColor: '#727272',
    },
  };

  const rootStyle = {
    '--primaryColor': themeVariables[theme].primaryColor,
    '--secondaryColor': themeVariables[theme].secondaryColor,
  };

  return <div style={rootStyle}>{children}</div>;
};

export default ThemeProvider;
*