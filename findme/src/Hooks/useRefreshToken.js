import useAuth from "./useAuth";
import useFetch from "./useFetch";
import axios from "axios";

const useRefreshToken = () => {
    const {setAuth} = useAuth()

    const refresh = async () => {
        const response = await axios.get('http://localhost:3001/api/refresh', {
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