import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="site-shell" data-theme={darkMode ? 'dark' : 'light'}>
      <Header darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} />
      <main className="page-content" aria-label="페이지 콘텐츠" />
      <Footer />
    </div>
  );
}
