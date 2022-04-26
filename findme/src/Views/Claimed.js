import React, {useEffect, useState} from 'react';
import AdminNavBar from "../components/AdminNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemList from "../components/ItemList";
import useFetch from "../Hooks/useFetch";
import Pagination from "../components/Pagination";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
const Claimed = function() {

    const axiosPrivate = useAxiosPrivate();
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");

    const getItems = async () => {
        try {
            const response = await axiosPrivate("/api/getClaimed");
            setItems(response.data);
        } catch (e){
            console.error(e)
        }
    }

    function search(rows){
        return rows.filter(row => row.Item_ID?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Item_Name?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Item_Desc?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Category_Name?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Item_Value?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.ISH_Location?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.ISH_Date?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.ISH_Time?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.ISH_Location?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.User_Fname?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.User_Lname?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.User_Phone?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.User_Email?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Officer_FK?.toLowerCase().indexOf(q.toLowerCase()) > -1
        )
    }

    useEffect(() => {
        getItems();
    },[])

    return (
        <>
            <AdminNavBar active="C" value={q} onChangeValue={(e) => setQ(e.target.value)}/>
            <Container>
                <Row >
                    <Col md={1}>
                        <br /><br /><br /><br />
                        <div className="counter">
                            {search(items).length} Items
                        </div>
                    </Col>
                    <Col md={10}>
                        <br/>
                    <div className="input-group">
                    </div>
                        <br/>

                        <ItemList items={search(items)} active="C"/>
                    </Col>
                    <Col md={1}>

                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default Claimed;