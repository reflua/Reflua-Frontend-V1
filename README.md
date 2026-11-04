# Reflua Frontend V1

Reflua 팀과 프로젝트를 소개하는 프론트엔드입니다. (React + TypeScript + Vite)

## Development

```bash
npm install
npm run dev
```

## Environment variables

`.env`에 공개 가능한 설정값이 들어 있습니다. 로컬에서만 바꾸고 싶다면 `.env.local`을 만들어 덮어쓰세요 (git에 올라가지 않습니다).

| 변수 | 설명 |
| --- | --- |
| `VITE_GITHUB_URL` | 푸터의 GitHub 주소 |
| `VITE_GITHUB_ISSUES_URL` | 푸터의 Issues 주소 |
| `VITE_CONTACT_EMAIL` | 푸터의 문의 메일 |

> `VITE_` 접두사가 붙은 값은 빌드 결과물에 그대로 노출됩니다. 비밀 값은 넣지 마세요.

## Structure

```
src/
├─ assets/        icons/, logo/
├─ components/    layout/ (Header, Footer + css)
├─ config/        env.ts, navigation.ts
├─ hooks/         useTheme.ts
├─ lib/           router.tsx (가벼운 클라이언트 라우터)
├─ pages/         HomePage, DocsPage, TeamPage
└─ styles/        base.css (전역 스타일, 테마 변수)
```

## Branch flow

작업 브랜치에서 변경하고 `dev`로 모은 뒤, 릴리스할 내용을 `main`으로 전달합니다.
