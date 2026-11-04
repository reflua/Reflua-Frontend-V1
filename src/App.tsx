import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { useTheme } from './hooks/useTheme';
import { usePathname } from './lib/router';
import DocsPage from './pages/DocsPage';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';

const pages: Record<string, () => React.JSX.Element> = {
  '/': HomePage,
  '/docs': DocsPage,
  '/team': TeamPage,
};

export default function App() {
  const { darkMode, toggleTheme } = useTheme();
  const activePath = usePathname();
  const Page = pages[activePath] ?? HomePage;

  return (
    <div className="site-shell" data-theme={darkMode ? 'dark' : 'light'}>
      <Header darkMode={darkMode} activePath={activePath} onToggleTheme={toggleTheme} />
      <Page />
      <Footer />
    </div>
  );
}
