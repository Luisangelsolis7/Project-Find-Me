import React, {useState, useEffect} from "react";


const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try{
                const response = await fetch()
            }catch (err){
                console.error(err)
            }
        }


    },[])
    return(
        <article>
            <h2>Users List</h2>
            {users.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key{i}>{user?.name}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>

        )
}

export default Users