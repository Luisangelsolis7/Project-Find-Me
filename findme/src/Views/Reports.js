import AdminNavBar from "../components/AdminNavBar";
import ItemList from "../components/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Reports = function() {
    return (
        <>
            <AdminNavBar active="R"/>
    <Container>
        <Row >
            <Col>Left</Col>
            <Col md={10}>
                <ItemList />
                <div className="input-group">
                    <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Delete</option>
                        <option value="1">Notify</option>
                    </select>
                    <button className="btn btn-outline-secondary" type="button">Apply to ALL</button>
                </div>
            </Col>
            <Col>
                Right
            </Col>
        </Row>
    </Container>
            </>
    )
};
export default Reports;