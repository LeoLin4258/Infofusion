import axios, { AxiosResponse } from "axios";
import ApiController from "./apiController";

interface Info {
    account: string;
    filePath: string;
    key: string;
    mail: string;
    mobile: string;
    name: string;
    pid: number;
    version: string;
    wxid: string;
}

interface WxInfoResponse {
    body: Info[];
    code: number;
    extra: any;
    msg: string;
}

interface AccountInfoResult {
    statusCode: number; // HTTP status code
    data: Info[] | string; // Contact data
}

async function getWeChatInfo(): Promise<AccountInfoResult> {
    try {
        const response: AxiosResponse<WxInfoResponse> = await axios.get(`${ApiController().apiUrl}/wxinfo`,
            {
                headers: {
                    'token': ApiController().token,
                    'Content-Security-Policy': 'upgrade-insecure-requests',
                    "Access-Control-Allow-Origin" : "*",
                },
            }
        );
        const result: AccountInfoResult = {
            statusCode: response.status,
            data: [],
        };

        if (response.status === 200 && response.data.body) {
            let data = response.data.body;

            result.data = data;
        } else {
            console.error("Error fetching data:", response.status);
        }
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            statusCode: 500,
            data: [],
        };
    }
}

export default getWeChatInfo;
