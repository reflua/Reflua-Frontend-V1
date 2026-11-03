import moonMark from '../assets/reflua-mark.svg';
import sunIcon from '../assets/sun.svg';
import './header.css';

type HeaderProps = {
  darkMode: boolean;
  onToggleTheme: () => void;
};

const navigation = [
  { label: '소개', href: '#about', active: true },
  { label: '문서', href: '/docs', active: false },
  { label: '팀원', href: '/team', active: false },
];

export default function Header({ darkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand brand-large" href="/" aria-label="Reflua 홈">
          <img src={moonMark} width="35" height="35" alt="" />
          <span>Reflua</span>
        </a>

        <nav className="primary-nav" aria-label="주 메뉴">
          {navigation.map(({ label, href, active }) => (
            <a
              className={`nav-link${active ? ' is-active' : ''}`}
              href={href}
              key={label}
              aria-current={active ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className={`theme-toggle${darkMode ? ' is-dark' : ''}`}
            type="button"
            role="switch"
            aria-checked={darkMode}
            aria-label="다크 모드"
            onClick={onToggleTheme}
          >
            <span className="theme-knob">
              <img src={sunIcon} width="16" height="16" alt="" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
