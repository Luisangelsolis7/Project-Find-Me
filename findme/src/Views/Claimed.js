import React, {useState} from 'react';
import AdminNavBar from "../components/AdminNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemList from "../components/ItemList";
import useFetch from "../useFetch";
const Claimed = function() {

    const {data : items, isPending, error } = useFetch('http://localhost:3001/api/getClaimed');
    const [q, setQ] = useState("");
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
    return (
        <>
            <AdminNavBar active="C"/>
            <Container>
                <Row >
                    <Col md={11}>
                        <br/>
                    <div className="input-group">
                        <input type="text" placeholder='Search' value={q} onChange={(e) => setQ(e.target.value)} />
                    </div>
                        <br/>

                        { error  && <div> {error}</div>}
                        { isPending && <div> Loading ... </div> }
                        { items && <ItemList items={search(items)} active="C"/>}
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default Claimed;