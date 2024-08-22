import axios, { AxiosResponse } from "axios";
import { Contact } from "@/components/type";
import ApiController from "./apiController";

type ContactListParams = {
    start?: number; // Indicates the starting index for fetching data
    limit?: number; // Specifies how many contacts to fetch
    word?: string; // Search keyword
    filterZeroCount?: boolean; // Whether to filter out contacts with no chat records
};

interface ContactResponse {
    body: Contact[]; // The actual array of contact data
    code: number; // Response status code
    extra: any; // Additional information
    msg: string; // Response message or description
}

interface ContactListResult {
    statusCode: number; // HTTP status code
    data: Contact[]; // Contact data
}

async function getContactList(
    params?: ContactListParams
): Promise<ContactListResult> {
    try {
        const response: AxiosResponse<ContactResponse> = await axios.post(
            `${ApiController().apiUrl}/recent_user_list`,
            params,
            {
                headers: {
                    token: ApiController().token,
                },
            }
        );
        const result: ContactListResult = {
            statusCode: response.status,
            data: [],
        };

        if (response.status === 200 && response.data.body) {
            let data = response.data.body;
            // Applies filter to exclude contacts with no chat records if specified in the request
            // if (params?.filterZeroCount) {
            //     data = data.filter((contact) => contact.chat_count > 0);
            // }
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

export default getContactList;
