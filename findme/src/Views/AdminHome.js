import React, {useEffect} from 'react';
import AdminNavBar from "../components/AdminNavBar";
import ItemList from "../components/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AddModal from "../components/AddModal";
import ClaimModal from "../components/ClaimModal";
import useFetch from "../useFetch";
import {useState} from "react";
import Pagination from "../components/Pagination";
import DestroyModal from "../components/DestroyModal";
import DonateModal from "../components/DonateModal";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import useAuth from "../Hooks/useAuth";

const Home = function () {
    const [toggle, setToggle] = useState("H")
    const [showAdd, setAddShow] = useState(false);
    const [showClaim, setClaimShow] = useState(false);
    const [showDestroy, setDestroyShow] = useState(false);
    const [showDonate, setDonateShow] = useState(false);

    let url;
    let title = "";
    let colWidths = {};
    let styles = {};
    if (toggle === "H") {
        colWidths = {
            0: {cellWidth: 1}, 1: {cellWidth: 10}, 2: {cellWidth: 20}, 3: {cellWidth: 20}, 4: {cellWidth: 20},
            5: {cellWidth: "auto"}, 6: {cellWidth: 15}, 7: {cellWidth: "auto"}, 8: {cellWidth: 1}, 9: {cellWidth: 15},
            10: {cellWidth: 1}, 11: {cellWidth: 1}
        }
        styles = {
            overflow: 'hidden',
            columnWidth: 'wrap',
            overflowColumns: 'linebreak'
        }
        title = "List of Unclaimed Items";
        url = 'http://localhost:3001/api/getUnclaimed'
    } else if (toggle === "R") {
        colWidths = {
            0: {cellWidth: 1}, 1: {cellWidth: 10}, 2: {cellWidth: 20}, 3: {cellWidth: 20}, 4: {cellWidth: 20},
            5: {cellWidth: "auto"}, 6: {cellWidth: 15}, 7: {cellWidth: "auto"}, 8: {cellWidth: 1}, 9: {cellWidth: 1},
            10: {cellWidth: 1}, 11: {cellWidth: 1}
        }
        styles = {
            overflow: 'hidden',
            columnWidth: 'wrap',
            overflowColumns: 'linebreak'
        }
        url = 'http://localhost:3001/api/getLost';
    } else if (toggle === "C") {
        url = 'http://localhost:3001/api/getClaimed';
        styles = {
            overflow: 'linebreak',
            columnWidth: 'wrap',
            overflowColumns: 'hidden'
        }
        colWidths = {
            0: {cellWidth: 1}, 1: {cellWidth: 10}, 2: {cellWidth: 20}, 3: {cellWidth: 20}, 4: {cellWidth: 20},
            5: {cellWidth: 40}, 6: {cellWidth: 10}, 7: {cellWidth: 1}, 8: {cellWidth: 30}, 9: {cellWidth: 10},
            10: {cellWidth: 1}, 11: {cellWidth: 1}
        }
    }
    const {data: items, isPending, error} = useFetch(url);

    function convertToPDF() {
        const doc = new jsPDF();

        doc.autoTable({
            html: '.table',
            columnStyles: colWidths,
            styles: styles
        });

        doc.save('Test.pdf');
    }

    const [itemInfo, setItemInfo] = useState([]);
    const [q, setQ] = useState("H");
    const [action, setAction] = useState("claim");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = search(items).slice(indexOfFirstItem, indexOfLastItem);


    function formatDate(inputDate) {
        let date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            // Months use 0 index.
            return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }

    }

    function selectBar(toggle) {
        if (toggle === "H") {
            return (
                <div className="input-group">
                    <select className="form-select" value={action} onChange={(e) => setAction(e.target.value)}
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon">
                        <option value="claim">Claim</option>
                        <option value="donate">Donate</option>
                        <option value="destroy">Destroy</option>
                    </select>
                    <button className="btn btn-outline-dark" onClick={(e) => openModal(action)}>Apply</button>
                </div>
            )
        }
    }

    function addButton(toggle) {
        if (toggle === "H") {
            return (
                <>
                    <Button className="openAddUnclaimed" onClick={() => setAddShow(true)}>Add Item</Button>
                    <br/>
                    <br/>
                </>

            )
        }

    }

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

    function openModal(e) {
        if (e === "claim") {
            setClaimShow(true);
        }
        if (e === "destroy") {
            setDestroyShow(true);
        }
        if (e === "donate") {
            setDonateShow(true);
        }
    }

    return (
        <>
            <AdminNavBar toggle={toggle} changeToggle={toggle => setToggle(toggle)} value={q}
                         onChangeValue={(e) => setQ(e.target.value)}/>
            <Container>
                <Row>
                    <Col md={1}>
                        <br/><br/><br/><br/>
                        <div className="counter">
                            {search(items).length} Items
                        </div>
                    </Col>
                    <Col md={10}>
                        <br/>
                        {selectBar(toggle)}
                        <br/>

                        {error && <div> {error}</div>}
                        {isPending && <div> Loading ... </div>}
                        {items && <ItemList items={search(currentItems)} itemInfo={itemInfo} setItemInfo={setItemInfo}
                                            active={toggle}/>}
                        <Pagination itemsPerPage={itemsPerPage} totalItems={search(items).length} paginate={paginate}
                                    currentPage={currentPage}/>

                    </Col>
                    <Col md={1}>

                        <br/><br/><br/>
                        {addButton(toggle)}
                        <Button className="openAddUnclaimed" onClick={() => convertToPDF()}>Convert to PDF</Button>

                    </Col>
                </Row>

                <AddModal onClose={() => setAddShow(false)} show={showAdd}/>
                <ClaimModal onClose={() => setClaimShow(false)} itemInfo={itemInfo} show={showClaim}/>
                <DestroyModal onClose={() => setDestroyShow(false)} itemInfo={itemInfo} show={showDestroy}/>
                <DonateModal onClose={() => setDonateShow(false)} itemInfo={itemInfo} show={showDonate}/>
            </Container>

        </>
    )
}
export default Home;