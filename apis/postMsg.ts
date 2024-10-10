import axios, { AxiosResponse } from 'axios';
import ApiController from './apiController'
import { Contact, UserInfo } from '@/components/type'

type GetMsgParams = {
    prompt?: string;
    ai_res?: string;
    ratting?: number;
};

interface MsgListResult {
    statusCode: number;
    msg: string;
}

async function PostMsg(params: GetMsgParams): Promise<MsgListResult> {
    try {
        const response: AxiosResponse = await axios.post(
            'https://nbusgzsgzfsqdvmcbhwb.supabase.co/rest/v1/infofusion_msgs',
            params,
            {
                headers: {
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idXNnenNnemZzcWR2bWNiaHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NDU3NTAsImV4cCI6MjA0NDEyMTc1MH0.MNBdz85HLG8vtnZc_OWVcvQGJeMJnd5hZ113rM7VJ1Y',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idXNnenNnemZzcWR2bWNiaHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NDU3NTAsImV4cCI6MjA0NDEyMTc1MH0.MNBdz85HLG8vtnZc_OWVcvQGJeMJnd5hZ113rM7VJ1Y',
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                }
            }
        );

        return {
            statusCode: response.status,
            msg: 'Message posted successfully'
        };
    } catch (error) {
        console.error('Error posting message data:', error);
        return {
            statusCode: 500,
            msg: 'Error posting message'
        };
    }
}

export default PostMsg;
