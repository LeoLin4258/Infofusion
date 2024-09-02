import axios, { AxiosResponse } from 'axios';
import ApiController from './apiController';

type getAiResParams = {
    prompt: {};
    runnerUrl: string; 
    batchCount:string
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

async function localRes(params: getAiResParams): Promise<string[]> {
    const { prompt, runnerUrl,batchCount } = params; 
    const aiResList: string[] = []; // 用于存储每次请求的结果

    for (let i = 0; i < parseInt(batchCount); i++) {
        try {
            const response: AxiosResponse<MsgResponse> = await axios.post(`${runnerUrl}/completions`, prompt, {
                headers: {
                    'token': ApiController().token,
                },
            });

            console.log(`AI res ${i + 1} 👇`);
            if (response.data.choices) {
                console.log(JSON.stringify(response.data.choices[0].text));
            }

            aiResList.push(
                 response.data.choices[0].text || '',
            );
        } catch (error) {
            console.error(`Error fetching message data on attempt ${i + 1}:`, error);
            aiResList.push('Error fetching message data');
        }
    }

    return aiResList; // 返回包含所有结果的列表
}

export default localRes;
