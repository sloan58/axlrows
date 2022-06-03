import {Button, Col, Row, Spinner, Table} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {fetchWrapper} from "../../util/fetchWrapper";
import AppContext from "../../store/AppContext";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Ucms = () => {

    const {state, dispatch}  = useContext(AppContext);
    const [ucms, setUcms] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    let navigate = useNavigate();

    useEffect(() => {
        fetchWrapper.get('/ucm')
            .then(ucms => {
                setUcms(ucms)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error)
                toast.error("Sorry, there was a problem loading the UCM's")
                setIsLoading(false)
            });
    }, [])

    const deleteUcm = ucm => {
        fetchWrapper.delete(`/ucm/${ucm.id}`)
            .then(() => {
                setUcms(ucms.filter(_ucm => _ucm.id !== ucm.id))
                toast.success("UCM was deleted!")
            })
            .catch(error => {
                console.error(error)
                toast.error("Sorry, there was a problem deleting the UCM's")
            });
    }

    return (
        <>
            <Row className="justify-content-md-center mt-5 text-end">
                <Col xs={12} md={10} lg={8}>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/ucm/create')}
                    >Add</Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-2 text-center">
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
                                <th>Delete</th>
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
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => deleteUcm(ucm)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default Ucms
