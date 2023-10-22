'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState('');

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  const handleThemeChange = () => {
    if (mode === 'dark') {
      // setMode('light');
      document.documentElement.classList.add('light');
    } else {
      // setMode('dark');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a theme provider');
  }

  return context;
};

export default ThemeProvider;
