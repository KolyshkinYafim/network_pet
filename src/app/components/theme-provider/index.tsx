import React from "react";
import { useState } from "react";
import { Theme } from "../../enums";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: Theme.dark,
  toggleTheme: () => null,
});

export const ThemeProvivider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storedTheme = localStorage.getItem("theme");
  const currentTheme = storedTheme
    ? (storedTheme as Theme.dark | Theme.light)
    : Theme.dark;

  const [theme, setTheme] = useState<Theme>(currentTheme);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === Theme.light ? Theme.dark : Theme.light;
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};
