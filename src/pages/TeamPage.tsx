import { useState } from 'react';
import './team-page.css';

type Member = {
  name: string;
  github: string;
  roles: string[];
};

const members: Member[] = [
  { name: '양지우', github: 'jiwoo1222', roles: ['Frontend', 'Design'] },
  { name: '서아란', github: 'aranchini', roles: ['Frontend'] },
  { name: '선가영', github: 'gyungud4', roles: ['Frontend'] },
  { name: '추혜인', github: 'hyeinggu', roles: ['Design'] },
  { name: '김민준', github: 'minjun0317', roles: ['Design'] },
  { name: '정인성', github: 'soyuo', roles: ['Backend', 'Application'] },
  { name: '전태양', github: 'wjsxodid-BE', roles: ['Backend'] },
  { name: '이다원', github: 's26047-code', roles: ['Backend'] },
  { name: '박정혁', github: 'jigumeong012-byte', roles: ['Backend'] },
  { name: '조현', github: 'mmHg-9060', roles: ['Backend'] },
  { name: '이채율', github: 'ci667702-star', roles: ['DevOps'] },
  { name: '엄민용', github: 'RGB327', roles: ['DevOps'] },
  { name: '이시우', github: 'dltldn1234', roles: ['Application', 'HP'] },
  { name: '박지성', github: 'cnsvkf', roles: ['Application'] },
];

export default function TeamPage() {
  return (
    <main className="page-content team-page" aria-label="팀원 페이지">
      <div className="team-content">
        <header className="team-intro">
          <span className="team-eyebrow">팀원 소개</span>
          <h1>Reflua</h1>
          <p>함께 Reflua를 만들어 가는 팀원들을 소개해요.</p>
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
  const profileUrl = `https://github.com/${member.github}`;

  return (
    <li className="team-card">
      <div className="team-avatar">
        {imageFailed ? (
          <PersonIcon />
        ) : (
          <img
            src={`${profileUrl}.png?size=160`}
            alt={`${member.name} 프로필 사진`}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <h2 className="team-name">{member.name}</h2>

      <p className="team-github">
        <a
          className="team-github-link"
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} GitHub 프로필 열기`}
        >
          <span className="team-github-icon" aria-hidden="true" />
          {member.github}
        </a>
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