import axios, { AxiosResponse } from 'axios';
import ApiController from './apiController';

interface MsgCountResult {
    statusCode: number;
}

function getBaseUrl(url: string): string {
    const match = url.match(/^(https?:\/\/[^\/]+)/i);
    return match ? match[1] : url;
}

async function testRunner(apiUrl: string): Promise<MsgCountResult> {
    try {
        // 使用正则表达式提取基本 URL
        const baseUrl = getBaseUrl(apiUrl);

        const response: AxiosResponse = await axios.get(baseUrl, {
            // 如果需要，可以在这里添加其他配置选项
        });

        return {
            statusCode: response.status,
        };
    } catch (error) {
        console.error('Error fetching message data:', error);
        return {
            statusCode: 500,
        };
    }
}

export default testRunner;
