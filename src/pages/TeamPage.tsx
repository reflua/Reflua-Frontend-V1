import { useEffect, useState } from 'react';
import './team-page.css';

type Member = {
  github: string;
  roles: string[];
};

type GithubUser = {
  name: string | null;
};

const members: Member[] = [
  { github: 'jiwoo1222', roles: ['Frontend', 'Design'] },
  { github: 'aranchini', roles: ['Frontend'] },
  { github: 'gyungud4', roles: ['Frontend'] },
  { github: 'hyeinggu', roles: ['Design'] },
  { github: 'minjun0317', roles: ['Design'] },
  { github: 'soyuo', roles: ['Backend', 'Application'] },
  { github: 'wjsxodid-BE', roles: ['Backend'] },
  { github: 's26047-code', roles: ['Backend'] },
  { github: 'jigumeong012-byte', roles: ['Backend'] },
  { github: 'mmHg-9060', roles: ['Backend'] },
  { github: 'ci667702-star', roles: ['DevOps'] },
  { github: 'RGB327', roles: ['DevOps'] },
  { github: 'dltldn1234', roles: ['Application', 'HP'] },
  { github: 'cnsvkf', roles: ['Application'] },
];

export default function TeamPage() {
  return (
    <main className="page-content team-page" aria-label="팀원 페이지">
      <div className="team-content">
        <header className="team-intro">
          <span className="team-logo" role="img" aria-label="Reflua 로고">
            <span className="team-logo-mark" />
          </span>

          <div className="team-intro-text">
            <span className="team-eyebrow">팀원 소개</span>
            <h1>Reflua</h1>
            <p>함께 Reflua를 만들어 가는 팀원들을 소개해요.</p>
          </div>
        </header>

        <ul className="team-grid">
          {members.map((member) => (
            <MemberCard key={member.github} member={member} />
          ))}
        </ul>
      </div>
    </main>
  );
}

function MemberCard({ member }: { member: Member }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const profileUrl = `https://github.com/${member.github}`;

  useEffect(() => {
    const controller = new AbortController();

    async function loadDisplayName() {
      try {
        const response = await fetch(`https://api.github.com/users/${member.github}`, {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const user: GithubUser = await response.json();
        if (user.name) setDisplayName(user.name);
      } catch {
        return;
      }
    }

    void loadDisplayName();
    return () => controller.abort();
  }, [member.github]);

  return (
    <li className="team-card">
      <div className="team-avatar">
        {imageFailed ? (
          <PersonIcon />
        ) : (
          <img
            src={`${profileUrl}.png?size=160`}
            alt={`${member.github} 프로필 사진`}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <h2 className="team-name">
        <a href={profileUrl} target="_blank" rel="noreferrer">
          {displayName ?? member.github}
        </a>
      </h2>

      <p className="team-github">
        <span className="team-github-icon" aria-hidden="true" />
        {member.github}
      </p>

      <div className="team-roles">
        <span className="team-roles-label">맡은 분야</span>
        {member.roles.map((role) => (
          <span className="team-role" key={role}>
            {role}
          </span>
        ))}
      </div>
    </li>
  );
}

function PersonIcon() {
  return (
    <svg className="team-person-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 19.5c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}