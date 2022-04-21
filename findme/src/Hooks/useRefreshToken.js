import useAuth from "./useAuth";
import useFetch from "./useFetch";

const useRefreshToken = () => {
    const {setAuth} = useAuth()
    const refresh = async () => {
        const response = await fetch('http://localhost:3001/api/refresh', {
            credentials: 'include'
        })
        let data = await response.json();
        setAuth(prev => {
           console.log(JSON.stringify(prev));
           console.log(data);
           return{ ...prev, accessToken: data}
        });
        return data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;