import axios, { AxiosResponse } from 'axios';
import ApiController from './apiController';

type getAiSummaryParams = {
    messages: string;
    runnerUrl: string;
};

interface MsgResponse {
    choices: any;
    body: any;
    data: {
        body: {
            msgs: string;
        };
        code: number;
    };
    status: number;
}

interface MsgCountResult {
    statusCode: number;
    msgs: string;
}

async function getAiSummary(params: getAiSummaryParams): Promise<string> {
    const { messages, runnerUrl } = params;
    const aiResList: string[] = []; // 用于存储每次请求的结果

    const requestBody =
    // {
    //     messages: [

    //     ],
    //     names: {
    //         "user": "User",
    //         "assistant": "Assistant"
    //     },
    //     stop: [
    //         "\n\nUser:",
    //         "\nUser:",
    //         "User:",
    //         "\n\nHuman:",
    //         "\nHuman:",
    //         "Human:"
    //     ],
    //     stream: false,
    //     max_tokens: 1000,
    //     sampler_override: {
    //         "type": "Nucleus",
    //         "top_p": 0.9,
    //         "top_k": 50,
    //         "temperature": 0.7,
    //         "presence_penalty": 0.5,
    //         "frequency_penalty": 0.5,
    //         "penalty": 400,
    //         "penalty_decay": 0.99654026
    //     }
    // }

    {
        "frequency_penalty": 1,
        "max_tokens": 1000,
        "model": "rwkv",
        "presence_penalty": 0,
        "prompt": `Instruction: 你是一个得力的微信聊天记录总结助手，你会从微信聊天记录中提取关键信息，并且生成总结内容

Input: [微信聊天记录]

${messages}

Response: 根据提取的微信聊天记录，可以得到以下总结内容：
1.`,
        "stream": false,
        "temperature": 1,
        "top_p": 0.3,
        "stop": ["\n\nUser", "\n\nQuestion", "\n\nQ", "\n\nHuman", "\n\nBob", "\n\nAssistant", "\n\nAnswer", "\n\nA", "\n\nBot", "\n\nAlice"]
    }

    try {
        const response: AxiosResponse<MsgResponse> = await axios.post(`${runnerUrl}completions`, requestBody, {
            headers: {
                'token': ApiController().token,
            },
        });

        if (response.data.choices) {
            const summary = "1." + response.data.choices[0].text;
            return summary;
        }
    } catch (error) {
        return 'Error fetching message data';
    }

    return 'Error fetching message data';
}

export default getAiSummary;
