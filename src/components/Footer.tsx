import githubIcon from '../assets/github.svg';
import moonMark from '../assets/reflua-mark-small.svg';
import './footer.css';

const columns = [
  {
    title: '서비스',
    links: [
      { label: '소개', href: '/' },
      { label: '문서', href: '/docs' },
      { label: '팀원', href: '/team' },
    ],
  },
  {
    title: '프로젝트',
    links: [
      { label: 'Reflua 웹', href: '/' },
    ],
  },
  {
    title: '커뮤니티',
    links: [
      { label: 'GitHub', href: 'https://github.com/reflua' },
      { label: 'Issues', href: 'https://github.com/reflua/Reflua-Frontend-V1/issues' },
      { label: 'Contact', href: 'mailto:contact@reflua.dev' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-block">
            <a className="brand brand-small" href="/" aria-label="Reflua 홈">
              <img src={moonMark} width="24" height="24" alt="" />
              <span>Reflua</span>
            </a>
            <p className="brand-description">
              사람과 기술을 연결해 더 나은 흐름을 만듭니다.
            </p>
          </div>

          <div className="footer-link-columns">
            {columns.map((column) => (
              <div className="footer-link-column" key={column.title}>
                <h2>{column.title}</h2>
                {column.links.map((link) => (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Reflua. All rights reserved.</p>
          <a className="github-link" href="https://github.com/reflua">
            <img src={githubIcon} width="16" height="16" alt="" />
            <span>github.com/Reflua</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
