import React from 'react';
import AdminNavBar from "../components/AdminNavBar";
import ItemList from "../components/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "../components/Modal";
import ClaimModal from "../components/ClaimModal";
import useFetch from "../useFetch";
import {useState} from "react";
import Pagination from "../components/Pagination";

const Home = function () {
    const [showAdd, setAddShow] = useState(false);
    const [showClaim, setClaimShow] = useState(false);
    const [itemInfo, setItemInfo] = useState([]);
    const {data: items, isPending, error} = useFetch('http://localhost:3001/api/getUnclaimed');
    const [q, setQ] = useState("");
    const[currentPage, setCurrentPage] = useState(1);
    const[itemsPerPage, setItemsPerPage] = useState(20);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = search(items).slice(indexOfFirstItem, indexOfLastItem);

    function search(rows) {
        return rows.filter(row => row.Item_ID?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Item_Name?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Item_Desc?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Category_Name?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Item_Value?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.ISH_Location?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.ISH_Date?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.ISH_Time?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.ISH_Location?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Officer_FK?.toLowerCase().indexOf(q.toLowerCase()) > -1
        )
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <AdminNavBar active="H" value={q} onChangeValue={(e) => setQ(e.target.value)}/>
            <Container>
                <Row>
                    <Col></Col>
                    <Col md={11}>
                        <br/>

                        <div className="input-group" >
                            <select className="form-select" defaultValue="claim" id="inputGroupSelect04"
                                    aria-label="Example select with button addon">
                                <option value="claim">Claim</option>
                                <option value="donate">Donate</option>
                                <option value="destroy">Destroy</option>
                            </select>
                            <button className="openClaimedForm" onClick={() => setClaimShow(true)}>Apply to ALL</button>
                            <ClaimModal onClose={() => setClaimShow(false)} itemInfo={itemInfo}  show={showClaim}  />


                        </div>
                        <br/>


                        {error && <div> {error}</div>}
                        {isPending && <div> Loading ... </div>}
                        {items && <ItemList items={search(currentItems)} itemInfo={itemInfo}  setItemInfo={setItemInfo} active="H"/>}
                        <Pagination itemsPerPage={itemsPerPage} totalItems={search(items).length}  paginate={paginate} currentPage={currentPage}/>

                    </Col>
                    <Col>

                        <br/>
                        <Button className="openAddUnclaimed" onClick={() => setAddShow(true)}>Add Item</Button>
                        <Modal onClose={() => setAddShow(false)} show={showAdd} active="Add"/>

                    </Col>
                </Row>


            </Container>

        </>
    )
}
export default Home;