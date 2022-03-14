import AdminNavBar from "../components/AdminNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemList from "../components/ItemList";
const Claimed = function() {
    return (
        <>
            <AdminNavBar active="C"/>
            <Container>
                <Row >
                    <Col>Left</Col>
                    <Col md={10}>
                        <ItemList active="C"/>
                    </Col>
                    <Col>
                        Right
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default Claimed;