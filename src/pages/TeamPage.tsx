import teamLogo from '../assets/team-logo.svg';
import userIcon from '../assets/user-icon.svg';
import githubIcon from '../assets/github.svg';
import './team-page.css';

const members = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: '양지우',
  github: 'jiwoo1222',
  roles: ['Frontend', 'Design'],
}));

export default function TeamPage() {
  return (
    <main className="page-content team-page">
      <div className="team-container">
        <section className="team-heading" aria-labelledby="team-title">
          <img className="team-logo" src={teamLogo} width="96" height="96" alt="Reflua 팀 로고" />
          <div className="team-copy">
            <span className="page-chip">팀원 소개</span>
            <h1 id="team-title">Reflua</h1>
            <p>함께 Reflua를 만들어 가는 팀원들을 소개해요.</p>
          </div>
        </section>

        <ul className="team-grid">
          {members.map((member) => (
            <li className="member-card" key={member.id}>
              <span className="member-avatar">
                <img src={userIcon} width="24" height="24" alt="" />
              </span>
              <h2>{member.name}</h2>
              <a className="member-github" href={`https://github.com/${member.github}`}>
                <img src={githubIcon} width="16" height="16" alt="" />
                <span>{member.github}</span>
              </a>
              <div className="member-roles">
                <span className="member-roles-label">맡은 분야</span>
                {member.roles.map((role) => <span className="role-chip" key={role}>{role}</span>)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
