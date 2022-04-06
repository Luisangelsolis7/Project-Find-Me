import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useFetch from "../useFetch";
import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "./Modal";

const ItemList = function (props) {
    //This is the code to format how the list of items to be displayed
    let tableHeader = [];

    function checkNull(item) {
        if (item !== null) {
            return (<>{item}</>)
        }
    }

    function formatDate(inputDate) {
        var date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            // Months use 0 index.
            return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }

    }

    if (props.active == "H") {
        tableHeader = ["", "Date Found", "Name", "Category", "Description", "Value", "Location Found", "", "Officer Badge", ""];
    }
    if (props.active == "C") {
        tableHeader = ["", "Date Claimed", "Name", "Category", "Description", "Value", "", "Claimant", "Officer Badge", ""];
    }
    if (props.active == "R") {
        tableHeader = ["", "Date Lost", "Item", "Category", "Description", "Value", "Location Lost", "Reported by", "", ""];
    }
    const [show, setShow] = useState(false);
    const [style1, setStyle1] = useState("fixedHeight");
    return (
        <>
            <table className="table">
                <thead className="table-dark">
                <tr scope="row">
                    {tableHeader.map((i) => (
                        <td key={i}>{i}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {props.items.map((i) => (
                    <tr key={i.Item_ID}>
                        <td>
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="checkbox" value={i.Item_ID}
                                       aria-label="Checkbox for following text input"></input>
                            </div>
                        </td>
                        <td>{formatDate(i.ISH_Date)} {i.ISH_Time}</td>
                        <td>{checkNull(i.Item_Name)}</td>
                        <td>{checkNull(i.Category_Name)}</td>
                        <td>
                            <div className={style1}>{i.Item_Desc}</div>
                        </td>
                        <td>${i.Item_Value}</td>
                        <td>
                            <div className={style1}>{checkNull(i.ISH_Location)}</div>
                        </td>
                        <td>
                            <div className={style1}>{checkNull(i.User_Fname)} {checkNull(i.User_Lname)} <br/>
                                {checkNull(i.User_Phone)}<br/>
                                {checkNull(i.User_Email)} </div>
                        </td>
                        <td>{checkNull(i.Officer_Badge)}</td>
                        <td><Button className="btn btn-success" onClick={() => setShow(true)}>Edit</Button>
                            <Modal onClose={() => setShow(false)} show={show} active="Edit"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>

    )

}
export default ItemList;