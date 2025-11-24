# 모이소 고객 CS 랜딩페이지

모이소 매장의 고객 클레임 및 문의사항에 대해 ChatGPT 기반 자동 답변을 제공하는 랜딩페이지입니다.

## 주요 기능

- 📝 고객 클레임/문의사항 입력
- 🤖 ChatGPT API를 활용한 자동 답변 생성
- 📋 답변 복사 기능
- 📱 반응형 디자인 (모바일/태블릿/데스크톱 지원)
- ⚡ 실시간 답변 제공

## 설치 방법

### 1. Node.js 설치
먼저 Node.js가 설치되어 있어야 합니다. [Node.js 공식 사이트](https://nodejs.org/)에서 다운로드하세요.

### 2. 프로젝트 설정

```bash
# 프로젝트 디렉토리로 이동
cd "C:\Users\user\OneDrive\문서\Desktop\모이소고객응대CS메뉴얼"

# 필요한 패키지 설치
npm install
```

### 3. OpenAI API 키 설정

1. [OpenAI Platform](https://platform.openai.com/api-keys)에서 API 키를 발급받습니다.
2. `.env.example` 파일을 복사하여 `.env` 파일을 생성합니다:
   ```bash
   copy .env.example .env
   ```
3. `.env` 파일을 열고 발급받은 API 키를 입력합니다:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   PORT=3000
   ```

## 실행 방법

### 개발 모드 실행
```bash
npm run dev
```

### 프로덕션 모드 실행
```bash
npm start
```

서버가 실행되면 브라우저에서 `http://localhost:3000`으로 접속하세요.

## 사용 방법

1. 웹 페이지에서 **고객 클레임이나 문의사항**을 입력란에 입력합니다.
2. **답변 받기** 버튼을 클릭합니다.
3. ChatGPT가 생성한 **적절한 답변 예시**가 화면에 표시됩니다.
4. **📋 답변 복사하기** 버튼을 클릭하여 답변을 클립보드에 복사할 수 있습니다.

## 프로젝트 구조

```
모이소고객응대CS메뉴얼/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── script.js           # 클라이언트 JavaScript
├── server.js           # Node.js 서버 (Express)
├── package.json        # 프로젝트 의존성 관리
├── .env               # 환경 변수 (API 키 등) - 직접 생성 필요
├── .env.example       # 환경 변수 예시 파일
└── README.md          # 프로젝트 문서
```

## 주의사항

⚠️ **보안 주의사항**
- `.env` 파일에는 중요한 API 키가 포함되어 있으므로 **절대 Git에 커밋하지 마세요**.
- 프로덕션 환경에서는 반드시 HTTPS를 사용하세요.
- API 키는 외부에 노출되지 않도록 주의하세요.

## 문제 해결

### "OPENAI_API_KEY가 설정되지 않았습니다" 오류
- `.env` 파일이 생성되었는지 확인하세요.
- `.env` 파일에 올바른 API 키가 입력되었는지 확인하세요.
- 서버를 재시작하세요.

### 포트 충돌 오류
- `.env` 파일에서 `PORT` 값을 다른 번호(예: 3001, 8080)로 변경하세요.

### API 호출 오류
- OpenAI API 키가 유효한지 확인하세요.
- [OpenAI 계정](https://platform.openai.com/account/billing)에 사용 가능한 크레딧이 있는지 확인하세요.

## 커스터마이징

### 답변 스타일 변경
`server.js` 파일의 `system` 메시지를 수정하여 ChatGPT의 답변 스타일을 변경할 수 있습니다:

```javascript
{
    role: 'system',
    content: '여기에 원하는 답변 스타일이나 지침을 작성하세요'
}
```

### 디자인 변경
`style.css` 파일에서 색상, 폰트, 레이아웃 등을 자유롭게 수정할 수 있습니다.

## 라이선스

MIT License

## 지원

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.
