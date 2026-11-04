import sunIcon from '../assets/sun.svg';
import './header.css';

type HeaderProps = {
  darkMode: boolean;
  activePath: string;
  onToggleTheme: () => void;
};

const navigation = [
  { label: '소개', href: '/' },
  { label: '문서', href: '/docs' },
  { label: '팀원', href: '/team' },
];

export default function Header({ darkMode, activePath, onToggleTheme }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand brand-large" href="/" aria-label="Reflua 홈">
          <span className="brand-mark" aria-hidden="true" />
          <span>Reflua</span>
        </a>

        <nav className="primary-nav" aria-label="주 메뉴">
          {navigation.map(({ label, href }) => {
            const active = activePath === href;

            return (
              <a
                className={`nav-link${active ? ' is-active' : ''}`}
                href={href}
                key={label}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            className={`theme-toggle${darkMode ? ' is-dark' : ''}`}
            type="button"
            role="switch"
            aria-checked={darkMode}
            aria-label="다크 모드 사용"
            onClick={onToggleTheme}
          >
            <span className="theme-knob">
              {darkMode ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M13.2 9.4A5.5 5.5 0 0 1 6.6 2.8 5.6 5.6 0 1 0 13.2 9.4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <img src={sunIcon} width="16" height="16" alt="" />
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
