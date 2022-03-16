import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const ItemList = function(props){
    //This is the code to format how the list of items to be displayed
    let tableHeader = [];
    if(props.active == "H"){
        tableHeader = ["","Name","Category","Description","Value","Date","Location"];
    }if(props.active == "C"){
        tableHeader =["","another item"];
    }if(props.active == "R"){

    }

    return(
<>                <table className="table">
                    <thead className="table-dark">
                    <tr scope="row">
                        {tableHeader.map((i) => (
                            <td>{i}</td>
                        ))}
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
                            <option value="electronic">Alumni Hall</option>
                            <option value="clothing">Bookstore</option>
                            <option value="accessory">Business Office</option>
                            <option value="id">Campus Public Safety</option>
                            <option value="misc">Business Office</option>
                            <option value="electronic">Centennial Hall</option>
                            <option value="clothing">Parking Garage</option>
                            <option value="accessory">Dunham Hall</option>
                            <option value="id">Institute for Collaboration</option>
                            <option value="misc">Business Office</option>
                            <option value="electronic">The Community Foundation of the
                                Fox River Valley Center for Cultural
                                Enrichment and Perry Theatre</option>
                            <option value="clothing">Copy Center</option>
                            <option value="accessory">Dunham Hall</option>
                            <option value="id">Davis Hall</option>
                            <option value="misc">Dining Hall</option>
                            <option value="electronic">Dunham Hall</option>
                            <option value="clothing">Eckhart Hall</option>
                            <option value="accessory">Fitness Center</option>
                            <option value="id">Founders Annex</option>
                            <option value="misc">Founders House</option>
                            <option value="electronic">Hill Welcome Center and
                                Ethel Tapper Recital Hall</option>
                            <option value="clothing">Human Resources</option>
                            <option value="accessory">Institute for Collaboration</option>
                            <option value="id">Crimi Auditorium</option>
                            <option value="misc">Jenks Hall</option>
                            <option value="clothing">John C. Dunham
                                STEM Partnership School
                                Kimberly and James Hill Center
                                for Student Success</option>
                            <option value="accessory">Labyrinth</option>
                            <option value="id">Mail Center</option>
                            <option value="misc">Memorial Hall</option>
                            <option value="electronic">Michael J. Birck Collaboration
                                Center for Innovation</option>
                            <option value="clothing">Office of Admission and
                                Financial Aid</option>
                            <option value="accessory">Phillips Library</option>
                            <option value="id">Quad</option>
                            <option value="misc">Roger and Marilyn Parolini
                                Music Center</option> <option value="clothing">Parking Garage</option>
                            <option value="accessory">Schingoethe Center</option>
                            <option value="id">Spartan Spot</option>
                            <option value="misc">Spartan Statue/
                                Bedrosian Plaza</option>
                            <option value="electronic">Spartan Terrace</option>
                            <option value="clothing">Stephens Hall</option>
                            <option value="accessory">Thornton Gymnasium</option>
                            <option value="id">Tru Blu Coffee</option>
                            <option value="misc">University Banquet Hall</option>
                            <option value="id">University Communications</option>
                            <option value="misc">Vago Field</option> <option value="clothing">Parking Garage</option>
                            <option value="accessory">Wackerlin Center for
                                Faith and Action</option>
                            <option value="id">Watkins Hall</option>
                            <option value="misc">Wellness Center
                                (Health Services/Counseling
                                and Psychological Services)</option>
                            <option value="electronic">Wilkinson Hall</option>
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