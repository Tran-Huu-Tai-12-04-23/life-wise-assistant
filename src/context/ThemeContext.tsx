// ThemeContext.tsx

import { getTheme, saveTheme } from "@/helper";
import { EThemes } from "@/themes/colors";
import React, { createContext, useContext, useEffect, useState } from "react";

// Context object with default values
const ThemeContext = createContext<{
  theme: string;
  updateTheme: (theme: string) => void;
}>({
  theme: EThemes.light,
  updateTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(EThemes.dark);

  const updateTheme = (updatedTheme: string) => {
    setTheme(updatedTheme);
    saveTheme(updatedTheme);
  };

  useEffect(() => {
    const theme = getTheme();
    if (theme) setTheme(theme);
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <div className={theme.toString()}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
