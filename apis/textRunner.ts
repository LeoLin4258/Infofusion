import axios, { AxiosResponse } from 'axios';
import ApiController from './apiController';



interface MsgCountResult {
    statusCode: number;
}

async function testRunner(apiUrl : string): Promise<MsgCountResult> {
    try {
        const response: AxiosResponse = await axios.get(`${apiUrl}`, {
          
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
