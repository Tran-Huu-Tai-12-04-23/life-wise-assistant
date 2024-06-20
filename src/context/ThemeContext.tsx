// ThemeContext.tsx

import { EThemes } from "@/themes/colors";
import React, { createContext, useContext, useState } from "react";

// Context object with default values
const ThemeContext = createContext<{
  theme: string;
  updateTheme: (theme: string) => void;
}>({
  theme: EThemes.lofi,
  updateTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(EThemes.lofi);

  const updateTheme = (updatedTheme: string) => {
    setTheme(updatedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <div data-theme={theme.toString()}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
