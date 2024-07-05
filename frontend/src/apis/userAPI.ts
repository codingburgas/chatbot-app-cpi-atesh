import { axiosConfig } from "./config/axiosConfig";
import axios from "axios";

export interface SignUpData {
    username: string,
    password: string
}

export const userAPI = {
    signUp: async (data: SignUpData) => {
        return (await axios.post('/register', data, axiosConfig));
    },
    signIn: async (data: SignUpData) => {
        return (await axios.post('/login', data, axiosConfig)).data;
    },
    getUser: async () => {
        return (await axios.get('/get/user', axiosConfig)).data;
    }
};
