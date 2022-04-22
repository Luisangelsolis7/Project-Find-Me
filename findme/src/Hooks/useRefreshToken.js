import useAuth from "./useAuth";
import axios from '../api/axios';

const useRefreshToken = () => {
    const {setAuth} = useAuth()

    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return { ...prev, accessToken: response.data}
        });
        return response.data;
    }
    return refresh;
};

export default useRefreshToken;