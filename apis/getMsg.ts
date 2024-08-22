import axios, { AxiosResponse } from 'axios';
import ApiController from './apiController'
import { Contact, UserInfo } from '@/components/type'

type GetMsgParams = {
    start?: number;
    limit?: number;
    wxid: string;
};

interface Message {
    CreateTime: string;
    MsgSvrID: string;
    content: {
        msg: string;
        src: string;
    };
    id: number;
    is_sender: number;
    room_name: string;
    talker: string;
    type_name: string;
}

interface MsgResponse {
    body: {
        msg_list: Message[];
        my_wxid: string;
        user_list: UserInfo
    };
    code: number;
    extra: any;
    msg: string;
}

interface MsgListResult {
    statusCode: number;
    data?: MsgResponse['body'];
    reason?: any; 
}

async function getMsg(params: GetMsgParams): Promise<MsgListResult> {
    try {
        const response: AxiosResponse<MsgResponse> = await axios.post(`${ApiController().apiUrl}/msgs`, params, {
            headers: {
                'token': ApiController().token,
            },
        });

        const result: MsgListResult = {
            statusCode: response.status,
            data: response.data.body,
        };

        return result;
    } catch (error) {
        console.error('Error fetching message data:', error);
        return {
            statusCode: 500,
            reason: error, 
        };
    }
}

export default getMsg;
