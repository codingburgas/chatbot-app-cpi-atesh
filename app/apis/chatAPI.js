import  axiosInstance  from "./config/axiosConfig";

export const chatAPI = {
    getChatHystory: async () => {
        return (await axiosInstance.get('/get/chats', axiosInstance));
    },
    createNewChat: async (name) => {
        return (await axiosInstance.post('/create/chat', {name}, axiosInstance));

    },
    getChat: async (id) => {
        return (await axiosInstance.get(`/get/chat/${id}`, axiosInstance));
    },
    
};
