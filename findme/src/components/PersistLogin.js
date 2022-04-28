import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from "../Hooks/useRefreshToken";
import useAuth from "../Hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        const verifyRefresh = async () => {
            try{
                await refresh();
            }catch (err) {
                console.log(err);
            }finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefresh() : setIsLoading(false);

    }, [])


    return(
        <>
            {isLoading
                ? <p>Loading..</p>
                :<Outlet />}
        </>
    )
}

export default PersistLogin;