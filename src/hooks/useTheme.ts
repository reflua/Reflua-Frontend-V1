import { useCallback, useEffect, useState } from 'react';

const THEME_KEY = 'reflua-theme';

function readStoredTheme() {
  try {
    return window.localStorage.getItem(THEME_KEY) === 'dark';
  } catch {
    return false;
  }
}

export function useTheme() {
  const [darkMode, setDarkMode] = useState(readStoredTheme);

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
    } catch {
      // 저장소를 쓸 수 없는 환경에서는 저장만 건너뜁니다.
    }
  }, [darkMode]);

  const toggleTheme = useCallback(() => setDarkMode((value) => !value), []);

  return { darkMode, toggleTheme };
}
