import axios, { AxiosResponse } from "axios";
import ApiController from "./apiController";

type getAiResParams = {
    wxid: string;
};

interface MsgResponse {
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

async function getAiRes(params: getAiResParams): Promise<MsgCountResult> {
    try {
        const response: AxiosResponse<MsgResponse> = await axios.post(
            `${ApiController().apiUrl}/msgcontinue`,
            params,
            {
                headers: {
                    token: ApiController().token,
                },
            }
        );

        return {
            statusCode: response.status,
            msgs: response.data?.body?.msgs || [],
        };
    } catch (error) {
        console.error("Error fetching message data:", error);
        return {
            statusCode: 500,
            msgs: "",
        };
    }
}

export default getAiRes;
