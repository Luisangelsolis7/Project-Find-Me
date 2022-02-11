import Item from "../components/Item"
const ItemList = function(){
    //This is the code to format how the list of items to be displayed


    return(
    <div className="container-lg">
        <div className="table align-middle">
            <div class="table-responsive">
            <table class="table">
                <thead class="table-dark">
                <tr scope="row">
                    <td scope="col">Blah</td>
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


            <div className="input-group">
                <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                    <option selected>Destroy</option>
                    <option value="1">Claim</option>
                    <option value="2">Edit</option>
                    <option value="3">Donate</option>
                </select>
                <button className="btn btn-outline-secondary" type="button">Apply to ALL</button>
            </div>

        </div>
        </div>
    </div>
    )
}
export default ItemList;