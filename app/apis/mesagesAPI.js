import { axiosInstance } from "./config/axiosConfig";
import axios from "axios";


export const messagesAPI = {
    createMessage: async (data) => {
        return (await axios.post(`/create/message`, data, axiosInstance));
    }, 
};
