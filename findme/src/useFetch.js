import React, {useEffect, useState} from "react";

const useFetch = ( url ) => {
    const [ data, setData] = useState( [] ); // make this generic so its reusable
    const [ isPending, setPending] = useState( true );
    const [ error, setError] = useState( null );
    useEffect(() => {
        setTimeout(() => {

            console.log(`Use Effect Started data=${data}`)
            fetch(  url )
                .then(resp => {
                    console.log( "resp->")
                    console.log( resp );
                    if( !resp.ok ){
                        throw Error('Could not fetch data for AJAX resource')
                    }
                    return resp.json();
                }).then ( data => {
                console.log(`data->`);
                console.log(data);
                setData( data );   // Make generic
                setPending( false );
            })
                .catch(err =>{
                    console.log(`connection error: ${err.message}`)
                    alert( `Fetch Error: ${err.message }`)
                    setError( err.message )
                })                   // catch error
        }, 1000)
    }, [url] );  // run when url changes
    return { data, isPending, error }  // return 3 objects
}
export default useFetch;