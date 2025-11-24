const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// OpenAI API 설정
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GPT_ASSISTANT_ID = 'g-6916fd7193a08191ba94c968988b46e8'; // 사용자 제공 GPT ID

// ChatGPT API 호출 함수
async function callOpenAI(userMessage) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview', // 또는 'gpt-3.5-turbo'
                messages: [
                    {
                        role: 'system',
                        content: '당신은 모이소 매장의 고객 응대 전문가입니다. 고객의 클레임이나 문의사항에 대해 정중하고 친절하게, 그리고 전문적으로 답변해주세요. 답변은 구체적이고 실질적인 해결방안을 포함해야 합니다.'
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API 호출 실패');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw error;
    }
}

// API 엔드포인트
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({
                success: false,
                error: '메시지를 입력해주세요.'
            });
        }

        if (!OPENAI_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'OpenAI API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.'
            });
        }

        // OpenAI API 호출
        const aiResponse = await callOpenAI(message);

        res.json({
            success: true,
            response: aiResponse
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            success: false,
            error: error.message || '서버 오류가 발생했습니다.'
        });
    }
});

// 루트 경로
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 헬스 체크
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`🌐 http://localhost:${PORT} 에서 접속 가능합니다.`);

    if (!OPENAI_API_KEY) {
        console.warn('⚠️  경고: OPENAI_API_KEY가 설정되지 않았습니다!');
        console.log('   .env 파일에 OPENAI_API_KEY를 추가해주세요.');
    }
});
