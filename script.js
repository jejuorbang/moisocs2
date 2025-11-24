// DOM 요소 가져오기
const customerInput = document.getElementById('customerInput');
const submitBtn = document.getElementById('submitBtn');
const outputSection = document.getElementById('outputSection');
const errorSection = document.getElementById('errorSection');
const responseText = document.getElementById('responseText');
const errorText = document.getElementById('errorText');
const copyBtn = document.getElementById('copyBtn');
const retryBtn = document.getElementById('retryBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

// API 설정 (서버 사이드 API를 사용할 것을 권장합니다)
const API_CONFIG = {
    // 실제 배포 시에는 서버 사이드에서 처리해야 합니다
    endpoint: '/api/chat',  // 서버 엔드포인트
};

// 제출 버튼 클릭 이벤트
submitBtn.addEventListener('click', handleSubmit);

// Enter 키로 제출 (Ctrl + Enter)
customerInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        handleSubmit();
    }
});

// 다시 시도 버튼
retryBtn.addEventListener('click', () => {
    errorSection.style.display = 'none';
    customerInput.focus();
});

// 복사 버튼
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(responseText.textContent);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ 복사 완료!';
        copyBtn.style.background = '#27AE60';

        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    } catch (err) {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다. 다시 시도해주세요.');
    }
});

// 제출 처리 함수
async function handleSubmit() {
    const input = customerInput.value.trim();

    // 입력 검증
    if (!input) {
        showError('문의 내용을 입력해주세요.');
        customerInput.focus();
        return;
    }

    // UI 상태 변경
    setLoading(true);
    hideError();
    hideOutput();

    try {
        // API 호출
        const response = await callChatGPTAPI(input);

        if (response.success) {
            showOutput(response.data);
        } else {
            throw new Error(response.error || '알 수 없는 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError(error.message || '서버와의 통신 중 오류가 발생했습니다.');
    } finally {
        setLoading(false);
    }
}

// ChatGPT API 호출 함수
async function callChatGPTAPI(userMessage) {
    try {
        // 서버 사이드 API 엔드포인트로 요청
        const response = await fetch(API_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
            }),
        });

        if (!response.ok) {
            throw new Error(`서버 오류: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: true,
            data: data.response || data.message,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}

// 로딩 상태 설정
function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    customerInput.disabled = isLoading;

    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
    } else {
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }
}

// 답변 출력
function showOutput(text) {
    responseText.textContent = text;
    outputSection.style.display = 'block';
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 답변 숨기기
function hideOutput() {
    outputSection.style.display = 'none';
}

// 에러 표시
function showError(message) {
    errorText.textContent = message;
    errorSection.style.display = 'block';
    errorSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 에러 숨기기
function hideError() {
    errorSection.style.display = 'none';
}

// 페이지 로드 시 입력란에 포커스
window.addEventListener('load', () => {
    customerInput.focus();
});
