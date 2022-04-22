import React, {useEffect} from 'react';
import AdminNavBar from "../components/AdminNavBar";
import ItemList from "../components/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AddModal from "../components/AddModal";
import ClaimModal from "../components/ClaimModal";
import useFetch from "../Hooks/useFetch";
import {useState} from "react";
import Pagination from "../components/Pagination";
import DestroyModal from "../components/DestroyModal";
import DonateModal from "../components/DonateModal";
import jsPDF from 'jspdf'
import useRefreshToken from "../Hooks/useRefreshToken";

const Home = function () {
    const refresh = useRefreshToken();
    const [toggle, setToggle] = useState("H")
    const [showAdd, setAddShow] = useState(false);
    const [showClaim, setClaimShow] = useState(false);
    const [showDestroy, setDestroyShow] = useState(false);
    const [showDonate, setDonateShow] = useState(false);

    let url;
    if (toggle === "H") url = '/api/getUnclaimed'
    else if (toggle === "R") url = '/api/getLost'
    else if (toggle === "C") url = '/api/getClaimed';
    const {data: items, isPending, error} = useFetch(url);

    function convertToPDF() {
        let x = 10;
        let y = 10;
        const doc = new jsPDF();

        items.forEach(function (item, i) {
            if(i % 28 == 0 && i != 0){
                y = 10;
                doc.addPage();
            }
            doc.setFont('TimesNewRoman')
            doc.setFontSize(10);
            doc.text(x, y,
                "Item Name"+item.Item_Name);
            y = y + 10;
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
                    <br />
                    <br />
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
                        <Button className="openPDF" onClick={() => convertToPDF()}>Convert to PDF</Button>
                        <br/> <br/>
                        <Button className="refresh" onClick={() => refresh()}>Refresh</Button>


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