import {Button, Col, Row, Spinner, Table} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
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

    const toggleFavorite = query => {
        query.favorite = !query.favorite
        fetchWrapper.put(`/query/${query.id}`, query)
            .then(() => {
                setMe({
                    ...me,
                    queries: me.queries.map(q => q.id === query.id ? query : q)
                })
                toast('Query updated!')
            })
            .catch(error => {
                console.error(error)
                toast.error("Sorry, there was a problem updating the query history")
            });
    }

    const deleteQuery = query => {
        fetchWrapper.delete(`/query/${query.id}`)
            .then(() => {
                setMe({
                    ...me,
                    queries: me.queries.filter(q => q.id !== query.id)
                })
                toast('Query deleted!')
            })
            .catch(error => {
                console.error(error)
                toast.error("Sorry, there was a problem deleting the query history")
            });
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
                            {me.queries.map((query, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{query.statement}</td>
                                        <td>
                                            <Button onClick={() => loadQuery(query.statement)} variant="success" size="sm">
                                                Load
                                            </Button>
                                            <Button onClick={() => deleteQuery(query)} variant="danger" className="ms-2" size="sm">
                                                Delete
                                            </Button>
                                            {query.favorite ? (
                                                <Button onClick={() => toggleFavorite(query)} variant="warning" className="ms-2" size="sm">
                                                    Unfavorite
                                                </Button>
                                            ) : (
                                                <Button onClick={() => toggleFavorite(query)} variant="primary" className="ms-2 px-2" size="sm">
                                                    Favorite
                                                </Button>
                                            )}
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
