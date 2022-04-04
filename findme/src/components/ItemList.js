import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useFetch from "../useFetch";
import React from 'react';

const ItemList = function (props) {
    //This is the code to format how the list of items to be displayed
    let tableHeader = [];

    function checkNull(item) {
        if (item !== null) {
            if(!isNaN(+item)){
                return(<>Badge: {item}</>)
            }
            return (<>{item}</>)
        }
    }
    function  formatDate(inputDate){
        var date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            // Months use 0 index.
            return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }

    }



    if (props.active == "H") {
        tableHeader = ["","Date", "Name", "Category", "Description", "Value", "Location","", "Officer"];
    }
    if (props.active == "C") {
        tableHeader = ["","Date", "Name", "Category", "Description", "Value", "", "Claimant", "Officer"];
    }
    if (props.active == "R") {
        tableHeader = ["","Date", "Item","Category", "Description", "Value","Location", "Reported by",""];
    }

    return(
        <>                <table className="table">
            <thead className="table-dark">
            <tr scope="row">
                {tableHeader.map((i) => (
                    <td key={i}>{i}</td>
                ))}
            </tr>
            </thead>
            <tbody>
            {props.items.map((i) => (
                <tr>
                    <td><div className="input-group-text">
                        <input className="form-check-input mt-0" type="checkbox" value=""
                               aria-label="Checkbox for following text input"></input>
                    </div></td>
                    <td>{formatDate(i.ISH_Date)} {i.ISH_Time}</td>
                    <td>{checkNull(i.Item_Name)}</td>
                    <td>{checkNull(i.Category_Name)}</td>
                    <td>{i.Item_Desc}</td>
                    <td>${i.Item_Value}</td>
                    <td>{checkNull(i.ISH_Location)}</td>
                    <td>{checkNull(i.User_Fname)} {checkNull(i.User_Lname)} <br/>
                        {checkNull(i.User_Email)} <br/>
                        {checkNull(i.User_Phone)}</td>
                    <td>{checkNull(i.Officer_Badge)}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </>

    )

}
export default ItemList;