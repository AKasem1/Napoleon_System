// import { createContext, useState, useEffect } from "react";

// const themes = {
//   dark: "dark",
//   light: "light",
// };

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isDark, setIsDark] = useState(() => {
//     const savedTheme = localStorage.getItem("isDark");
//     return savedTheme !== null ? JSON.parse(savedTheme) : false;
//   });

//   const toggleTheme = () => {
//     setIsDark((prevIsDark) => !prevIsDark);
//   };

//   useEffect(() => {
//     localStorage.setItem("isDark", JSON.stringify(isDark));
//     document.body.className = isDark ? themes.dark : themes.light;
//   }, [isDark]);

//   return (
//     <ThemeContext.Provider value={[{ isDark }, toggleTheme]}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
