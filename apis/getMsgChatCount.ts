import axios, { AxiosResponse } from 'axios';
import ApiController from './apiController';

type GetMsgParams = {
    wxid: string;
};

interface MsgResponse {
    body: {
        [key: string]: number; // This assumes the body has a dynamic key with a count value
    };
    code: number;
    extra: any;
    msg: string;
}

interface MsgCountResult {
    statusCode: number;
    count: number;
}

async function getMsgChatCount(params: GetMsgParams): Promise<MsgCountResult> {
    try {
        const response: AxiosResponse<MsgResponse> = await axios.post(`${ApiController().apiUrl}/msg_count`, params, {
            headers: {
                'token': ApiController().token,
            },
        });

        const count = response.data.body[params.wxid];

        const result: MsgCountResult = {
            statusCode: response.status,
            count: count,
        };

        return result;
    } catch (error) {
        console.error('Error fetching message data:', error);
        return {
            statusCode: 500,
            count: 0,
        };
    }
}

export default getMsgChatCount;
