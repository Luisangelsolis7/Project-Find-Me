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
            console.log(response.data.accessToken);
            return { ...prev, badge: response.data.badge, accessToken: response.data.accessToken}
        });
        return response.data;
    }
    return refresh;
};

export default useRefreshToken;