import ApiController from './apiController';

interface MsgListResult {
    statusCode: number;
    data?: string; 
    reason?: any; 
}

async function newMsgStream(): Promise<MsgListResult> {
    try {
        // Construct the URL with token as a query parameter
        const url = `${ApiController().apiUrl}/sse?token=${ApiController().token}`;

        const eventSource = new EventSource(url);

        // Create a promise to resolve when the event is received
        const messagePromise = new Promise<string>((resolve, reject) => {
            eventSource.onmessage = (event: MessageEvent) => {
                resolve(event.data);
            };

            eventSource.onerror = (error) => {
                reject(error);
            };
        });

        // Wait for the message to be received
        const messageData = await messagePromise;

        // Close the event source after receiving the message
        eventSource.close();

        // Return the received message
        return {
            statusCode: 200,
            data: messageData,
        };
    } catch (error) {
        console.error('Error fetching message data:', error);
        return {
            statusCode: 500,
            reason: error,
        };
    }
}

export default newMsgStream;
