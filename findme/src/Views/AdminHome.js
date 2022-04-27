import React, {useEffect} from 'react';
import AdminNavBar from "../components/AdminNavBar";
import ItemList from "../components/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AddModal from "../components/AddModal";
import ClaimModal from "../components/ClaimModal";
import {useState} from "react";
import DestroyModal from "../components/DestroyModal";
import DonateModal from "../components/DonateModal";


import 'jspdf-autotable';
import jsPDF from 'jspdf'
import useAxiosPrivate from "../Hooks/useAxiosPrivate";


const Home = function () {
    let url;
    const axiosPrivate = useAxiosPrivate();
    const [toggle, setToggle] = useState("H")
    const [showAdd, setAddShow] = useState(false);
    const [showClaim, setClaimShow] = useState(false);
    const [showEdit, setEditShow] = useState(false);
    const [showDelete, setDeleteShow] = useState(false);
    const [showDestroy, setDestroyShow] = useState(false);
    const [showDonate, setDonateShow] = useState(false);
    const [items, setItems] = useState([]);



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
        url = '/api/getUnclaimed';

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
        url = '/api/getLost';
    } else if (toggle === "C") {
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
        url = '/api/getClaimed';
    }

    const getItems = async () => {
        try {
            const response = await axiosPrivate(url);
            setItems(response.data);
        } catch (e){
            console.error(e)
        }
    }

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
                    </select>
                    <button className="btn btn-outline-dark" onClick={(e) => openModal(action)}>Apply</button>
                </div>
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

    useEffect(() => {
        getItems();
    },[showAdd, showClaim, showDonate, showDestroy, url])


    return (
        <>
            <AdminNavBar active={toggle} changeToggle={toggle => setToggle(toggle)} value={q}
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


                        {items && <ItemList items={search(items)} itemInfo={itemInfo} setItemInfo={setItemInfo}
                                            active={toggle} />}


                    </Col>
                    <Col md={1}>

                        <br/><br/><br/>
                        {toggle === "H" && <Button className="openAddUnclaimed" onClick={() => setAddShow(true)}>Add Item</Button>}
                        <br/>
                        <br/>
                        {toggle === "H" && <Button className="openPDF" onClick={() => convertToPDF()}>Convert to PDF</Button>}
                        <br/> <br/>


                    </Col>
                </Row>

                <AddModal onClose={() => setAddShow(false)} setShow={setAddShow} show={showAdd}/>
                <ClaimModal onClose={() => setClaimShow(false)} itemInfo={itemInfo} setShow={setClaimShow} show={showClaim}/>
                <DestroyModal onClose={() => setDestroyShow(false)} itemInfo={itemInfo} setShow={setDestroyShow} show={showDestroy}/>
                <DonateModal onClose={() => setDonateShow(false)} itemInfo={itemInfo} setShow={setDonateShow} show={showDonate}/>
            </Container>

        </>
    )
}
export default Home;