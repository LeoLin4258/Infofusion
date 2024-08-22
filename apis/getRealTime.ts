import axios, { AxiosResponse } from 'axios';

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
    data: MsgResponse['body'];
}

async function getRealTime(): Promise<MsgListResult> {
    try {
        const response: AxiosResponse<MsgResponse> = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}//realtimemsg`);
        const result: MsgListResult = {
            statusCode: response.status,
            data: response.data.body,
        };

        return result;
    } catch (error) {
        console.error('Error fetching message data:', error);
        return {
            statusCode: 500,
            data: { msg_list: [], my_wxid: '', user_list: {} },
        };
    }
}

export default getRealTime;
