import { useState, useEffect } from "react";
import "./theme.css";

export const Mood = () => {
  const initialTheme = window.localStorage.getItem("themeMood") || "dark";
  const [isChecked, setIsChecked] = useState(initialTheme === "light");
  const [theme, setTheme] = useState(initialTheme);

  const toggletheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    window.localStorage.setItem("themeMood", theme);
    document.body.className = theme;
  }, [theme]);

  const handleChange = () => {
    setIsChecked(!isChecked);
    toggletheme();
  };

  return (
    <label className="switch d-block">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="slider pointer-event position-absolute top-0 bg-body rounded-5"></span>
    </label>
  );
};
