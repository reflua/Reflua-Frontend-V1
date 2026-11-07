import { useState } from 'react';
import './docs-page.css';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'WS';
type Endpoint = {
  id: string;
  group: string;
  name: string;
  path: string;
  method: Method;
  headers: boolean;
  access: string;
  testable: boolean;
  description: string;
};

const endpoints: Endpoint[] = [
  { id: 'health', group: '서버 & 가상 디바이스', name: '서버 확인', path: '/', method: 'GET', headers: false, access: '전체', testable: true, description: '서버의 생존 확인 및 정보를 반환하는 용도입니다.' },
  { id: 'virtual-device', group: '서버 & 가상 디바이스', name: '기기 정보', path: '/virtualDevice', method: 'GET', headers: false, access: '전체', testable: false, description: '자신의 가상 기기 정보를 조회합니다.' },
  { id: 'login', group: '서버 & 가상 디바이스', name: '로그인 요청', path: '/virtualDevice/login', method: 'POST', headers: false, access: '전체', testable: false, description: '자신의 카카오톡 계정에 대한 가상 기기에서 로그인을 시도합니다.' },
  { id: 'create-device', group: '서버 & 가상 디바이스', name: '기기 생성', path: '/virtualDevice/create', method: 'POST', headers: false, access: '전체', testable: false, description: '자신의 카카오톡 계정에 대한 가상 기기를 생성합니다. 기존에 기기가 있었다면 이를 초기화합니다.' },
  { id: 'verify-device', group: '서버 & 가상 디바이스', name: '기기 인증', path: '/virtualDevice/verify', method: 'POST', headers: false, access: '전체', testable: false, description: '자신의 카카오톡 계정을 해당 가상 기기에서 인증합니다.' },
  { id: 'polling', group: '서버 & 가상 디바이스', name: '인증 세션 확인', path: '/virtualDevice/polling', method: 'POST', headers: false, access: '인증 절차', testable: false, description: '기기 인증 단계에서 생성된 인증 세션이 만료되었는지 확인합니다.' },
  { id: 'refresh-token', group: '서버 & 가상 디바이스', name: '토큰 갱신', path: '/token/refresh', method: 'POST', headers: false, access: '인증 절차', testable: false, description: 'API refresh token을 회전하여 새 access/refresh token을 발급합니다. 유효한 refresh token이 필요합니다.' },
  { id: 'worker-list', group: '디바이스 & 워커', name: '워커 확인', path: '/worker', method: 'GET', headers: true, access: '사용자', testable: false, description: '자신의 가상 기기를 통해 동작 중인 봇 워커들 목록을 조회합니다.' },
  { id: 'worker-connect', group: '디바이스 & 워커', name: '워커 추가', path: '/worker/connect', method: 'WS', headers: false, access: '사용자', testable: false, description: '자신의 가상 기기를 통해 봇 워커를 추가해 연결합니다.' },
  { id: 'worker-info', group: '디바이스 & 워커', name: '워커 정보', path: '/workers/{worker-Id}', method: 'GET', headers: true, access: '사용자', testable: false, description: '자신의 가상 기기를 통해 동작 중인 봇 워커의 정보를 확인합니다.' },
  { id: 'worker-disconnect', group: '디바이스 & 워커', name: '워커 연결 해제', path: '/workers/{worker-id}', method: 'DELETE', headers: true, access: '사용자', testable: false, description: '자신의 가상 기기를 통해 동작 중인 봇 워커를 강제로 연결을 끊습니다.' },
  { id: 'vox-rooms', group: '디바이스 & 워커', name: 'Vox 방 목록', path: '/vox/rooms', method: 'GET', headers: true, access: '사용자', testable: false, description: '인증된 사용자가 등록한 Vox 방 설정 목록을 조회합니다.' },
  { id: 'vox-create', group: '디바이스 & 워커', name: 'Vox 방 생성', path: '/vox/rooms', method: 'POST', headers: true, access: '사용자', testable: false, description: '계정의 Vox 방 설정을 생성합니다. 새 설정은 기본 활성화되며 방별 세션 워커의 입력으로 사용됩니다.' },
  { id: 'vox-update', group: '디바이스 & 워커', name: 'Vox 방 설정 수정', path: '/vox/rooms/{room-id}', method: 'PATCH', headers: true, access: '사용자', testable: false, description: '자신이 소유한 Vox 방 설정의 제목 및 활성화 여부를 수정합니다.' },
  { id: 'vox-delete', group: '디바이스 & 워커', name: 'Vox 방 설정 삭제', path: '/vox/rooms/{room-id}', method: 'DELETE', headers: true, access: '사용자', testable: false, description: '자신이 소유한 Vox 방 설정을 삭제합니다. 백그라운드 세션 워커가 다음 동기화에서 방 세션을 정리합니다.' },
];

type RequestResult = { status?: number; duration?: number; body: string; error?: boolean };

export default function DocsPage() {
  const baseUrl = 'https://api.reflua.com';
  const [baseUrlCopied, setBaseUrlCopied] = useState(false);
  const [result, setResult] = useState<RequestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const groups = [...new Set(endpoints.map(({ group }) => group))];

  async function copyBaseUrl() {
    try {
      await navigator.clipboard.writeText(baseUrl);
      setBaseUrlCopied(true);
      window.setTimeout(() => setBaseUrlCopied(false), 1800);
    } catch {
      setBaseUrlCopied(false);
    }
  }

  async function testHealthEndpoint() {
    setLoading(true);
    setResult({ body: '요청을 보내고 있습니다.' });
    const startedAt = performance.now();
    try {
      const response = await fetch(`${baseUrl}/`, { method: 'GET', signal: AbortSignal.timeout(15000) });
      const rawBody = await response.text();
      let body = rawBody || '(응답 본문 없음)';
      try { body = JSON.stringify(JSON.parse(rawBody), null, 2); } catch { /* Keep plain text responses readable. */ }
      if (!response.ok) body = `HTTP ${response.status} 응답이에요.\n\n${body}`;
      setResult({ status: response.status, duration: Math.round(performance.now() - startedAt), body, error: !response.ok });
    } catch (requestError) {
      const message = requestError instanceof Error && requestError.name === 'TimeoutError'
        ? '15초 동안 응답이 없어 요청 시간이 초과됐어요. 서버 상태와 네트워크 연결을 확인해주세요.'
        : requestError instanceof TypeError
          ? '서버에 연결하지 못했어요. 서버 주소, 네트워크 연결, CORS 허용 설정을 확인해주세요.'
          : '요청을 처리하지 못했어요. 잠시 후 다시 시도해주세요.';
      setResult({ body: message, error: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-content docs-page">
      <div className="docs-content">
        <header className="docs-intro">
          <span className="docs-eyebrow">API 문서</span>
          <h1>API 문서</h1>
          <p>Reflua 서버가 제공하는 API와 사용 정보를 확인할 수 있어요.</p>
        </header>

        <label className="docs-base-uri">
          <span className="docs-base-label">Base URI</span>
          <code className="docs-base-url">{baseUrl}</code>
          <span className="docs-base-hint">모든 요청 주소 앞에 붙여서 사용해요.</span>
          <button className="docs-copy-button" type="button" onClick={() => void copyBaseUrl()} aria-label={baseUrlCopied ? 'Base URI 복사 완료' : 'Base URI 복사'} title={baseUrlCopied ? '복사 완료' : 'Base URI 복사'}>
            {baseUrlCopied ? (
              <svg className="docs-copied-check" aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <path d="m4.5 10.5 3.6 3.6 7.4-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <rect x="7" y="6" width="9" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13 6V4.75A1.75 1.75 0 0 0 11.25 3h-6.5A1.75 1.75 0 0 0 3 4.75v8.5A1.75 1.75 0 0 0 4.75 15H7" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </label>

        {groups.map((group) => (
          <section className="docs-group" key={group}>
            <div className="docs-group-heading"><h2>{group}</h2></div>
            <div className="docs-endpoints">
              {endpoints.filter((endpoint) => endpoint.group === group).map((endpoint) => (
                <article className={`docs-endpoint-card${endpoint.testable ? ' is-testable' : ''}`} key={endpoint.id}>
                  <div className="docs-card-heading"><h3>{endpoint.name}</h3><span className={`docs-method method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span></div>
                  <code className="docs-path">{endpoint.path}</code>
                  <p className="docs-description">{endpoint.description}</p>
                  <p className="docs-endpoint-meta">
                    <span>Headers {endpoint.headers ? '필요' : '불필요'}</span>
                    <span>사용자 {endpoint.access}</span>
                  </p>
                  {endpoint.testable ? (
                    <section className="docs-tester" aria-label={`${endpoint.name} API 테스트`}>
                      <div className="docs-tester-toolbar">
                        <div className="docs-tester-heading"><strong>테스트</strong><span>GET / 요청으로 서버 상태를 확인해요.</span></div>
                        <button className="docs-send-button" type="button" onClick={() => void testHealthEndpoint()} disabled={loading}>{loading ? '요청 중…' : '요청 보내기'}</button>
                      </div>
                      {result && <ResponsePanel result={result} />}
                    </section>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function ResponsePanel({ result }: { result: RequestResult | null }) {
  return (
    <div className={`docs-response${result?.error ? ' is-error' : ''}`} aria-live="polite">
      {result?.status !== undefined && <div className="docs-response-meta"><strong>HTTP {result.status}</strong><span>{result.duration} ms</span></div>}
      <pre>{result?.body ?? '요청을 보내면 응답이 여기에 표시돼요.'}</pre>
    </div>
  );
}
