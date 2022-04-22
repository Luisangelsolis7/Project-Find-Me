import React, {useEffect, useState} from "react";
import axios from '../api/axios';

const useFetch = ( url ) => {
    const [ data, setData] = useState( [] ); // make this generic so its reusable
    const [ isPending, setPending] = useState( true );
    const [ error, setError] = useState( null );
    useEffect(() => {
        setTimeout(() => {
            const fetchPosts = async () =>{
                try{
                    const response = await axios.get( url );
                    setData(response.data);
                    setPending(false);
                } catch(err){
                        console.log(`connection error: ${err.message}`)
                        alert( `Fetch Error: ${err.message }`)
                        setError( err.message )
                }
            }

            fetchPosts();
            // catch error
        }, 1000)

    }, [url] );  // run when url changes
    return { data, isPending, error }  // return 3 objects
}
export default useFetch;