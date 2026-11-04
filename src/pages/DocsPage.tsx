import './docs-page.css';

const endpoints = [
  {
    title: '로그인',
    method: 'POST',
    path: '/auth/login',
    description: '이메일과 비밀번호로 로그인하고 액세스 토큰을 발급받아요.',
    requestTitle: 'Request Body',
    request: [
      ['email', 'string', '가입한 이메일 주소'],
      ['password', 'string', '계정 비밀번호'],
    ],
    response: [
      ['accessToken', 'string', '발급된 액세스 토큰'],
      ['user', 'object', '로그인한 사용자 정보'],
    ],
  },
  {
    title: '회고 목록 조회',
    method: 'GET',
    path: '/reflections',
    description: '내가 작성한 회고를 최신순으로 조회해요.',
    requestTitle: 'Query',
    request: [
      ['page', 'number', '조회할 페이지 번호 (0부터 시작)'],
      ['size', 'number', '한 페이지에 가져올 개수'],
    ],
    response: [
      ['items', 'array', '회고 목록'],
      ['totalCount', 'number', '전체 회고 수'],
    ],
  },
  {
    title: '워커 추가',
    method: 'WS',
    path: '/ws/workers',
    description: '소켓으로 새 워커를 추가하고 실시간으로 상태를 전달받아요.',
    requestTitle: 'Request Body',
    request: [['workerName', 'string', '추가할 워커 이름']],
    response: [
      ['workerId', 'string', '생성된 워커 ID'],
      ['status', 'string', '워커 현재 상태'],
    ],
  },
];

function ApiTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <section className="api-table-section" aria-label={title}>
      <h3>{title}</h3>
      <div className="api-table">
        <div className="api-table-row api-table-heading" aria-hidden="true">
          <span>키</span>
          <span>타입</span>
          <span>설명</span>
        </div>
        {rows.map(([key, type, description]) => (
          <div className="api-table-row" key={key}>
            <code>{key}</code>
            <code>{type}</code>
            <span>{description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <main className="page-content docs-page">
      <div className="docs-container">
        <span className="page-chip">API 문서</span>
        <h1>API 문서</h1>
        <p className="docs-intro">Reflua 서버가 제공하는 API를 확인하고, 필요한 값을 입력해 바로 테스트해 볼 수 있어요.</p>

        <div className="base-uri">
          <span className="page-chip">Base URI</span>
          <code>https://api.reflua.com</code>
          <span>모든 요청 주소 앞에 붙여서 사용해요.</span>
        </div>

        <div className="api-list">
          {endpoints.map((endpoint) => (
            <article className="api-card" key={endpoint.path}>
              <h2>{endpoint.title}</h2>
              <div className="api-method-path">
                <span className={`method-badge method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
                <code>{endpoint.path}</code>
              </div>
              <p className="api-description">{endpoint.description}</p>
              <div className="api-tables">
                <ApiTable title={endpoint.requestTitle} rows={endpoint.request} />
                <ApiTable title="Response Body" rows={endpoint.response} />
              </div>
              {endpoint.method === 'WS' && (
                <p className="api-note">소켓 통신을 사용하는 API라서 테스트를 지원하지 않아요.</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
