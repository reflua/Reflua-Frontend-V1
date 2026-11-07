# Reflua Frontend

Reflua 팀과 API 문서를 볼 수 있는 프론트엔드입니다. React, TypeScript, Vite로 만들었습니다.

## 실행하기

```bash
npm install
npm run dev
```

배포용 파일은 `npm run build`로 만들고, 로컬에서 확인할 때는 `npm run preview`를 실행하면 됩니다.

## 페이지

| 주소 | 내용 |
| --- | --- |
| `/` | Reflua 소개 |
| `/docs` | API 경로와 서버 확인 |
| `/team` | 팀원 페이지 |

API 문서에는 서버 확인용 `GET /` 요청을 보낼 수 있는 테스트 버튼이 있습니다. 다른 API는 명세 내용을 확인할 수 있도록 표시합니다.

## 환경 변수

필요한 값은 `.env.local`에 적어두면 로컬 실행 때 사용할 수 있습니다.

| 변수 | 용도 |
| --- | --- |
| `VITE_GITHUB_URL` | 푸터의 저장소 링크 |
| `VITE_GITHUB_ISSUES_URL` | 푸터의 Issues 링크 |
| `VITE_CONTACT_EMAIL` | 푸터의 문의 링크 |

`VITE_`로 시작하는 값은 브라우저에 공개됩니다. API 키나 비밀번호 같은 비밀 값은 넣지 마세요.

## 폴더 구성

```text
src/
├─ assets/        로고와 아이콘
├─ components/    공통 헤더와 푸터
├─ config/        환경 변수와 메뉴 설정
├─ hooks/         테마 상태
├─ lib/           페이지 이동 처리
├─ pages/         소개, API 문서, 팀원 페이지
└─ styles/        공통 색상과 기본 스타일
```

작업 브랜치에서 변경한 뒤 `dev`에 모읍니다. 배포할 변경은 `dev`에서 `main`으로 전달합니다.
