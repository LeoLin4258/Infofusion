import axios, { AxiosResponse } from 'axios';
import ApiController from './apiController'

type LoginParams = {
    userName?: string;
    password?: string;
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
        user_list: {
            [key: string]: {
                account: string;
                describe: string;
                headImgUrl: string;
                nickname: string;
                remark: string;
                username: string;
            };
        };
    };
    code: number;
    extra: any;
    msg: string;
}

interface MsgListResult {
    statusCode: number;
    data: any['body'];
}

async function ServerWeChatLogin(params: LoginParams): Promise<MsgListResult> {
    try {
        const response: AxiosResponse<any> = await axios.post("https://bing.com/api/login", params);
        const result: MsgListResult = {
            statusCode: response.status,
            data: response.data.body,
        };

        return result;
    } catch (error) {
        console.error('Error fetching message data:', error);
        return {
            statusCode: 500,
            data: { msg_list: [], my_wxid: '', user_list: {},msg:{error} },
        };
    }
}

export default ServerWeChatLogin;
