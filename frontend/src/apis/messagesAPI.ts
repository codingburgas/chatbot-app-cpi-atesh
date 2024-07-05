import { axiosConfig } from "./config/axiosConfig";
import axios from "axios";

export interface Message {
    chat_id: number | undefined,
    content: string | undefined,
    author: string,
}

export const messagesAPI = {
    createMessage: async (data: Message) => {
        return (await axios.post(`/create/message`, data, axiosConfig));
    }, 
};

