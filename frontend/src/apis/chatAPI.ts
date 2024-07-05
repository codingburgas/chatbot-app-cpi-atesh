import { axiosConfig } from "./config/axiosConfig";
import axios from "axios";

export const chatAPI = {
    getChatHystory: async () => {
        return (await axios.get('/get/chats', axiosConfig));
    },
    createNewChat: async (name: string) => {
        return (await axios.post('/create/chat', {name}, axiosConfig));
    },
    getChat: async (id: number | undefined) => {
        return (await axios.get(`/get/chat/${id}`, axiosConfig));
    },
    deleteAllChats: async () => {
        return (await axios.delete('/delete/chats', axiosConfig));
    },
    deleteChat: async (id: number) => {
        return (await axios.delete(`/delete/chat/${id}`, axiosConfig));
    },
};

