import  axiosInstance from "./config/axiosConfig";
import storage from "./config/storage";

export const userAPI = {
    signUp: async (data) => {
        return (await axiosInstance.post('/register', data));
    },
    signIn: async (data) => {
        try {
            

            let response;
            try {
                response = await axiosInstance.post('/login', {
                    username: data.username,
                    password: data.password,
                });
                
            } catch (error) {
                console.error("Error during API call: ", error);
                throw new Error("Login API call failed");
            }

            if (!response.data || !response.data.access_token) {
                throw new Error("Access token not found in the response");
            }

            const accessTokenExpiry = new Date().getTime() + (3 * 60 * 60 * 1000);
            try {
                await storage.save({
                    key: 'accessToken',
                    data: response.data.access_token,
                    expires: accessTokenExpiry,
                });
                
                const token = await storage.load({ key: 'accessToken' })
                
                
            } catch (error) {
                console.error("Error saving access token: ", error);
                throw new Error("Failed to save access token");
            }

        } catch (error) {
            console.error("Login error: ", error);
        }
    },
    getUser: async () => {
        return (await axiosInstance.get('/get/user', axiosInstance));
    }
};