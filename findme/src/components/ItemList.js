import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "./Modal";


const ItemList = function (props) {
    //This is the code to format how the list of items to be displayed
    let tableHeader = [];
    let inputGroup = ''


    function checkNull(item) {
        if (item !== null) {
            return (<>{item}</>)
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
        tableHeader = ["", "ID", "Date Found", "Name", "Category", "Description", "Value", "Location Found", "", "Officer Badge", ""];
    }
    if (props.active === "C") {
        tableHeader = ["", "ID", "Date Claimed", "Name", "Category", "Description", "Value", "", "Claimant", "Officer Badge", ""];

    }
    if (props.active === "R") {
        tableHeader = ["", "ID","Date Lost", "Item", "Category", "Description", "Value", "Location Lost", "Reported by", "", ""];
    }
    const [show, setShow] = useState(false);
    const [style1, setStyle1] = useState("fixedHeight");
    const [itemInfo, setItemInfo] = useState({
        id: "",
        name: "",
        category: "",
        status: "",
        value: "",
        desc: "",
        location: "",
        userId: "",
        userFName: "",
        userLName: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        officer: ""
        }
    );
    let count = 0;
    function generateKey(i){
        let key = i
        if(i == ""){
            count++;
            return count;
        }
        if(i.Status_FK === 'Lost'){
            key += "L"
        }
        if(i.Status_FK === 'Unclaimed'){
            key += 'F'
        }
        if(i.Status_FK === 'Claimed'){
            key += 'C'
        }
        return key;
    }
    useEffect(() => {
        console.log(itemInfo);
    }, [itemInfo]);
    const toggleHandler = (i) => () => {

        setItemInfo((state) => ({
            ...state,
            [i.Item_ID]: state[i.Item_ID]
                ? null
                : {

                    id: i.Item_ID,
                    name: i.Item_Name,
                    category: i.Category_Name,
                    status: i.Status_FK,
                    value: i.Item_Value,
                    desc: i.Item_Desc,
                    location: i.Item_Location,
                    userId: i.User_FK,
                    userFName: i.User_Fname,
                    userLName: i.User_Lname,
                    phone: i.User_Phone,
                    email: i.User_email,
                    date: i.ISH_Date,
                    time: i.ISH_Time,
                    officer: i.Officer_FK
                }
        }));
    };

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
                        <td>
                            {/*<CheckBox item={i} handlechange={toggleHandler(i)} />*/}
                            <div className="input-group-text">
                                <input
                                    onChange={toggleHandler(i)}
                                    checked={!!itemInfo[i.Item_ID]}
                                    // <-- use checked prop, retrieve value by id
                                    type="checkbox"
                                />

                            </div>
                        </td>
                        <td>{i.Item_ID}</td>
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
                        <td><Button className="btn btn-success" onClick={() => setShow(true) && toggleHandler(i)}  >Edit</Button>
                            <Modal item={i} onClose={() => setShow(false)}  show={show} active="Edit"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )

}
export default ItemList;