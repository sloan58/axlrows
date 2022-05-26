import {Button, Col, Row, Spinner, Table} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {fetchWrapper} from "../../util/fetchWrapper";
import AppContext from "../../state/AppContext";

const Ucms = () => {

    const appContext = useContext(AppContext);
    const [ucms, setUcms] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchWrapper.get('/ucm')
            .then(ucms => {
                setUcms(ucms)
                setIsLoading(false)
            })
            .catch(error => console.error(error));
    }, [])

    return (
        <Row className="justify-content-md-center mt-5 text-center">
            <Col xs={12} md={10} lg={8}>
                {isLoading ? (
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                        />
                        Loading...
                    </Button>
                ) : (
                    <Table responsive bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>IP Address</th>
                            <th>Username</th>
                            <th>Version</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ucms.map((ucm, index) => {
                            return (
                                <tr key={index}>
                                    <LinkContainer to={`/ucm/${ucm.id}`} style={{ cursor: "pointer"}}>
                                        <td className="text-primary">{ucm.name}</td>
                                    </LinkContainer>
                                    <td>{ucm.ipAddress}</td>
                                    <td>{ucm.username}</td>
                                    <td>{ucm.version}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default Ucms
