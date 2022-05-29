import {Button, Card, Col, Nav, Row} from "react-bootstrap";
import AppContext from "../store/AppContext";
import {useContext} from "react";

const QueryResults = () => {
    const {state, dispatch} = useContext(AppContext)

    return (
        <>
            {state.query_results.length !== 0 && (
                <Row className="justify-content-md-center mt-3">
                    <Col xs={12} md={10} lg={10}>
                        <Card>
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="#first">
                                    {state.query_results.map((result, index) => {
                                        return (
                                            <Nav.Item key={index}>
                                                <Nav.Link
                                                    href="#first">
                                                    {result.target}
                                                </Nav.Link>
                                            </Nav.Item>
                                            )
                                    })}
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Special title treatment</Card.Title>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default QueryResults
