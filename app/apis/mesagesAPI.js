import axiosInstance from "./config/axiosConfig";
import axios from "axios";


export const messagesAPI = {
    createMessage: async (data) => {
        return (await axiosInstance.post("/create/message", data, axiosInstance));
    }, 
};
