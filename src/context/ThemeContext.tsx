// ThemeContext.tsx

import { EThemes } from "@/themes/colors";
import React, { createContext, useContext, useState } from "react";

// Context object with default values
const ThemeContext = createContext<{
  theme: EThemes;
  updateTheme: (theme: EThemes) => void;
}>({
  theme: EThemes.LIGHT,
  updateTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<EThemes>(EThemes.LIGHT);

  const updateTheme = (updatedTheme: EThemes) => {
    setTheme(updatedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <div className={`${theme === EThemes.LIGHT ? "light" : "dark"}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
