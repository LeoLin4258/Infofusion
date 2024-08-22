import axios, { AxiosResponse } from 'axios';
import ApiController from './apiController';

type getAiResParams = {
    prompt: {};
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

async function localRes(params: getAiResParams): Promise<MsgCountResult> {
    const { prompt, runnerUrl } = params; 

    try {
        const response: AxiosResponse<MsgResponse> = await axios.post(`${runnerUrl}/completions`,  prompt , {
            headers: {
                'token': ApiController().token,
            },
        });
        console.log('AI res👇');
        if (response.data.choices) {
            console.log(JSON.stringify(response.data.choices[0].text));
        }

        return {
            statusCode: response.status,
            msgs: response.data.choices[0].text || '', 
        };
    } catch (error) {
        console.error('Error fetching message data:', error);
        return {
            statusCode: 500,
            msgs: '',
        };
    }
}

export default localRes;