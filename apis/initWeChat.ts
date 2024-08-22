import axios, { AxiosResponse } from "axios";
import ApiController from "./apiController";

interface Info {
  is_init: boolean
  key: string
  media_path: string
  micro_path: string
  msg_path: string
  my_wxid: string
  wx_path: string
}

interface WxInfoResponse {
  body: Info[];
  code: number;
  extra: any;
  msg: string;
}

interface AccountInfoResult {
  statusCode: number; // HTTP status code
  data: Info[]; // Contact data
}

interface InitParams {
  init_type: string;
  key: string;
  media_path: string;
  micro_path: string;
  msg_path: string;
  my_wxid: string;
  wx_path: string;
}

async function initWeChat(params: InitParams): Promise<AccountInfoResult> {
  try {
    const response: AxiosResponse<WxInfoResponse> = await axios.post(`${ApiController().apiUrl}/init_key`, params,
      {
        headers: {
          'token': ApiController().token,
        },
      });
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

export default initWeChat;