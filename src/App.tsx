import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import DocsPage from './pages/DocsPage';
import TeamPage from './pages/TeamPage';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const activePath = window.location.pathname.replace(/\/$/, '') || '/';

  const page = activePath === '/docs'
    ? <DocsPage />
    : activePath === '/team'
      ? <TeamPage />
      : <main className="page-content" aria-label="페이지 콘텐츠" />;

  return (
    <div className="site-shell" data-theme={darkMode ? 'dark' : 'light'}>
      <Header darkMode={darkMode} activePath={activePath} onToggleTheme={() => setDarkMode((value) => !value)} />
      {page}
      <Footer />
    </div>
  );
}
