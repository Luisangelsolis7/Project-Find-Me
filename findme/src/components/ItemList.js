import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const ItemList = function(){
    //This is the code to format how the list of items to be displayed


    return(
<>
                <table className="table">
                    <thead className="table-dark">
                    <tr scope="row">
                        <td>Blah</td>
                        <td scope="col">Blah</td>
                        <td scope="col">Blah</td>
                        <td scope="col">Blah</td>
                        <td scope="col">Blah</td>
                        <td scope="col">Blah</td>
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
                        <td></td>
                        <td>Value</td>
                        <td>Blah Blah Blah DESC</td>
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