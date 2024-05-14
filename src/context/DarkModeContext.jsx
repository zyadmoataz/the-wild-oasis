/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "./../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  //we have a custom hook called useLocalStorageState and it have  2 parameters 1. key 2. initial value
  // const [isDarkMode, setIsDarkMode] = useLocalStorageState("isDarkMode", false);
  //make it by default set as the window theme
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(() => {
    //root element
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode", isDarkMode);
      document.documentElement.classList.remove("light-mode", isDarkMode);
    } else {
      document.documentElement.classList.remove("dark-mode", isDarkMode);
      document.documentElement.classList.add("light-mode", isDarkMode);
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
