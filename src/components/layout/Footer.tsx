import { env } from '../../config/env';
import { navigation } from '../../config/navigation';
import { Link } from '../../lib/router';
import './footer.css';

const columns = [
  {
    title: '서비스',
    links: navigation.map(({ label, href }) => ({ label, href })),
  },
  {
    title: '프로젝트',
    links: [{ label: 'Reflua 웹', href: '/' }],
  },
  {
    title: '커뮤니티',
    links: [
      { label: 'GitHub', href: env.githubUrl },
      { label: 'Issues', href: env.githubIssuesUrl },
      ...(env.contactEmail ? [{ label: 'Contact', href: `mailto:${env.contactEmail}` }] : []),
    ],
  },
];

const githubLabel = env.githubUrl.replace(/^https?:\/\//, '');

function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href);
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-block">
            <Link className="brand brand-small" href="/" aria-label="Reflua 홈">
              <span className="brand-mark brand-mark-small" aria-hidden="true" />
              <span>Reflua</span>
            </Link>
            <p className="brand-description">
              사람과 기술을 연결해 더 나은 흐름을 만듭니다.
            </p>
          </div>

          <div className="footer-link-columns">
            {columns.map((column) => (
              <div className="footer-link-column" key={column.title}>
                <h2>{column.title}</h2>
                {column.links.map((link) =>
                  isExternal(link.href) ? (
                    <a href={link.href} key={link.label}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} key={link.label}>
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Reflua. All rights reserved.</p>
          <a className="github-link" href={env.githubUrl}>
            <span className="github-icon" aria-hidden="true" />
            <span>{githubLabel}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
