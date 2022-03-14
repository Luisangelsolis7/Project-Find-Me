import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const ItemList = function(){
    //This is the code to format how the list of items to be displayed


    return(
<>
    "itemName": "All About Money",
    "itemCategory": "",
    "itemDescription": "Its about the root of all evil",
    "itemValue": "This ariticle is a complete guide about money. Its nice to have but not eveyone has it.",
    "userFirst": "",
    "userLast": "",
    "userDOB": "",
    "userPhone": "",
    "userEmail": "",
    "date": "",
    "time": "",
    "location": ""
    }
                <table className="table">
                    <thead className="table-dark">
                    <tr scope="row">
                        <td scope="col">Name</td>
                        <td scope="col">Category</td>
                        <td scope="col">Description</td>
                        <td scope="col">Value</td>
                        <td scope="col">Date</td>
                        <td scope="col">Location</td>
                    </tr>
                    </thead>
                    <tr>
                        <td>
                                    <div className="input-group-text">
                                        <input className="form-check-input mt-0" type="checkbox" value=""
                                               aria-label="Checkbox for following text input"></input>
                                    </div>
                        </td>
                        <td>Name</td>
                        <td><select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                            <option value="electronic">Electronic</option>
                            <option value="clothing">Clothing</option>
                            <option value="accessory">accessory</option>
                            <option value="id">Identification</option>
                            <option value="misc">Misc</option>
                        </select></td>
                        <td>This is a test description because we have no idea how long they are going to be. so i will continue to add words here</td>
                        <td>$1000.00</td>
                        <td>3/14/2022</td>
                        <td><select>
                            <option value="electronic">Stephens Hall</option>
                            <option value="clothing">Parking Garage</option>
                            <option value="accessory">Dunham Hall</option>
                            <option value="id">Institute for Collaboration</option>
                            <option value="misc">Business Office</option>
                            <option value="misc"></option>
                        </select></td>
                    </tr>
                    <tr>
                        <td>
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="checkbox" value=""
                                       aria-label="Checkbox for following text input"></input>
                            </div>
                        </td>
                        <td>Name</td>
                        <td>Category</td>
                        <td>Value</td>
                        <td>Blah Blah Blah DESC</td>
                    </tr>
                </table>
    </>
    )
}
export default ItemList;