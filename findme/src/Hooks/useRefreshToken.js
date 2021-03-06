import useAuth from "./useAuth";
import axios from '../api/axios';

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth()
    const badge = auth.badge;

    const refresh = async () => {
        const response = await axios.get('/api/refresh',{
            withCredentials: true,
        });
        setAuth(prev => {
            return { ...prev, badge: response.data.badge, accessToken: response.data.accessToken}
        });
        return response.data;
    }
    return refresh;
};

export default useRefreshToken;