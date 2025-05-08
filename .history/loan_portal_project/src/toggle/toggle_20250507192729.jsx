//Theming a theme toggle (Light/dark) using redux state.
//Theme reference must persist

import { useEffect, useState } from "react"; 
import { FaMoon, FaSun } from "react-icons/fa";
import { updateTheme } from "../redux/actions/theme"; 
import { useDispatch } from "react-redux"; 


function Toggle() {
  const [isDarkMode, setDarkMode] = useState(()=>{
    return localStorage.getItem("theme")==="dark";
  }); 
  const dispatch = useDispatch();

  useEffect(()=>{ 
    const initialTheme =localStorage.getItem("theme") || "light";
    dispatch(updateTheme(initialTheme))

  },[dispatch])

  const toggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setDarkMode(!isDarkMode); 
    dispatch(updateTheme(newTheme));
  };

  return (
    <div>
      {!isDarkMode ? (
        <FaSun onClick={toggle} className='icon' />
      ) : (
        <FaMoon onClick={toggle} className='icon' />
      )}
    </div>
  );
}

export default Toggle;