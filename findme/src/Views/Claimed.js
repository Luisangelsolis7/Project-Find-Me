import React, {useState} from 'react';
import AdminNavBar from "../components/AdminNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemList from "../components/ItemList";
import useFetch from "../useFetch";
import Pagination from "../components/Pagination";
const Claimed = function() {

    const {data : items, isPending, error } = useFetch('http://localhost:3001/api/getClaimed');
    const [q, setQ] = useState("");
    const[currentPage, setCurrentPage] = useState(1);
    const[itemsPerPage, setItemsPerPage] = useState(20);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = search(items).slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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

                        { error  && <div> {error}</div>}
                        { isPending && <div> Loading ... </div> }
                        { items && <ItemList items={search(currentItems)} active="C"/>}
                        <Pagination itemsPerPage={itemsPerPage} totalItems={search(items).length} paginate={paginate} currentPage={currentPage}/>
                    </Col>
                    <Col md={1}>

                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default Claimed;