import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "./Modal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import {Pagination} from "react-bootstrap";
import useFetch from "../useFetch";


const ItemList = function (props) {
    //This is the code to format how the list of items to be displayed

    let tableHeader = [];
    let inputGroup = ''

    function checkNull(item) {
        if (item !== null) {
            return (<>{item}<br/></>)
        }
    }

    function formatDate(inputDate) {
        let date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            // Months use 0 index.
            return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }

    }

    if (props.active === "H") {
        tableHeader = ["", "ID", "Date Found", "Name", "Category", "Description", "Value", "Location Found", "", "Officer Badge", "", ""];
    }
    if (props.active === "C") {
        tableHeader = ["", "ID", "Date Claimed", "Name", "Category", "Description", "Value", "", "Claimant", "Officer Badge", "", ""];

    }
    if (props.active === "R") {
        tableHeader = ["", "ID", "Date Lost", "Item", "Category", "Description", "Value", "Location Lost", "Reported by", "", "", ""];
    }
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [style1, setStyle1] = useState("fixedHeight");
    const [currentItem, setCurrentItem] = useState("","","","","","","","","","","","");
    let count = 0;

    function generateKey(i) {
        let key = i
        if (i == "") {
            count++;
            return count;
        }
        if (i.Status_FK === 'Lost') {
            key += "L"
        }
        if (i.Status_FK === 'Unclaimed') {
            key += 'F'
        }
        if (i.Status_FK === 'Claimed') {
            key += 'C'
        }
        return key;
    }

    return (

        <div className="itemTable">
            <table className="table">
                <thead className="table-dark">
                <tr scope="row">

                    {tableHeader.map((i) => (
                        <td key={generateKey(i)}>{i}</td>

                    ))}
                </tr>
                </thead>
                <tbody>
                {props.items.map((i) => (
                    <tr key={generateKey(i.Item_ID)}>
                        <td className="input-group-text">
                            {/*<CheckBox item={i} handlechange={toggleHandler(i)} />*/}
                            <input
                                onChange={(e) => {
                                    // add to list
                                    if (e.target.checked) {
                                        props.setItemInfo([
                                            ...props.itemInfo,
                                                 i.Item_ID,


                                        ]);
                                    } else {
                                        // remove from list
                                        props.setItemInfo(
                                            props.itemInfo.filter(item => item !== i.Item_ID),
                                        );
                                    }
                                }}
                                value={props.itemInfo}
                                // <-- use checked prop, retrieve value by id
                                type="checkbox"
                            />
                        </td>
                        <td>{i.Item_ID}</td>
                        <td>{formatDate(i.ISH_Date)} {i.ISH_Time}</td>
                        <td>{i.Item_Name}</td>
                        <td>{i.Category_Name}</td>
                        <td>
                            <div className={style1}>{i.Item_Desc}</div>
                        </td>
                        <td>${i.Item_Value}</td>
                        <td>
                            <div className={style1}>{i.ISH_Location}</div>
                        </td>
                        <td>
                            <div className={style1}> {i.User_Fname} {i.User_Lname}<br/>
                                {checkNull(i.User_Phone)}
                                {checkNull(i.User_Email)}
                                {checkNull(i.User_DL)}
                                {checkNull(i.User_AUID)}</div>
                        </td>
                        <td>{checkNull(i.Officer_Badge)}</td>
                        <td><Button variant="secondary" size="sm" onClick={() => {
                            setCurrentItem(i);
                            setShowEdit(true);
                        }}>Edit</Button>
                        </td>

                        <td><Button className="btn btn-secondary" size="sm"  background-color="Red" onClick={() => {
                            setCurrentItem(i);
                            setShowDelete(true);
                        }}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <EditModal onClose={() => setShowEdit(false)} itemInfo={currentItem} show={showEdit}/>
            <DeleteModal onClose={() => setShowDelete(false)} itemInfo={currentItem} show={showDelete}/>


        </div>


    )

}
export default ItemList;