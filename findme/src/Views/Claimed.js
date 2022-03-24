import AdminNavBar from "../components/AdminNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemList from "../components/ItemList";
import useFetch from "../useFetch";
const Claimed = function() {

    const {data : items, isPending, error } = useFetch('http://localhost:3001/api/get');
    return (
        <>
            <AdminNavBar active="C"/>
            <Container>
                <Row >
                    <Col>Left</Col>
                    <Col md={10}>
                        { error  && <div> {error}</div>}
                        { isPending && <div> Loading ... </div> }
                        { items && <ItemList items={items} active="C"/>}
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