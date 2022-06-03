import {Button, Col, Row, Spinner, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useState, useEffect, useContext} from "react";
import {fetchWrapper} from "../../util/fetchWrapper";
import {toast} from "react-toastify";
import AppContext from "../../store/AppContext";
import {useNavigate} from "react-router-dom";

const QueryHistory = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [me, setMe] = useState({})
    const {dispatch} = useContext(AppContext)
    let navigate = useNavigate();

    useEffect(() => {
        fetchWrapper.get('/me')
            .then(me => {
                setMe(me)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error)
                toast.error("Sorry, there was a problem loading the query history")
                setIsLoading(false)
            });
    }, [])

    const loadQuery = query => {
        dispatch({
            'type': 'QUERY_STATEMENT_UPDATED',
            'statement': query
        })
        navigate('/')
    }

    return (
        <>
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
                                <th>Query</th>
                                <th>Load</th>
                            </tr>
                            </thead>
                            <tbody>
                            {me.queryHistory.map((query, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{query}</td>
                                        <td>
                                            <Button onClick={() => loadQuery(query)} variant="success">
                                                Load
                                            </Button>
                                            <Button variant="danger" className="ms-2">
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

export default QueryHistory
