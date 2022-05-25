import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Col, Form, Row, Toast, ToastContainer} from "react-bootstrap";
import {fetchWrapper} from "../../util/fetchWrapper";

const Ucm = () => {
    let params = useParams();
    const [input, setInput] = useState({});

    const [success, setSuccess] = useState(false);
    const toggleSuccess = () => setSuccess(!success);

    const [fail, setFail] = useState(false);
    const toggleFail = () => setFail(!fail);

    useEffect(() => {
        fetchWrapper.get(`/ucm/${params.ucmId}`)
            .then(ucm => setInput(ucm))
            .catch(error => console.error(error));
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        fetchWrapper.put(`/ucm/${params.ucmId}`, input)
            .then(ucm => toggleSuccess())
            .catch(error => {
                toggleFail()
                console.error(error)
            });
    }

    return (
        <>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={4}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                          id="name"
                                          placeholder=""
                                          value={input.name || ''}
                                          onChange={e =>
                                              setInput({ ...input, [e.target.id]: e.target.value })
                                          }
                                          required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>IP Address</Form.Label>
                            <Form.Control type="text"
                                          id="ipAddress"
                                          placeholder=""
                                          value={input.ipAddress || ''}
                                          onChange={e =>
                                              setInput({ ...input, [e.target.id]: e.target.value })
                                          }
                                          required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          id="username"
                                          placeholder=""
                                          value={input.username || ''}
                                          onChange={e =>
                                              setInput({ ...input, [e.target.id]: e.target.value })
                                          }
                                          required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          id="password"
                                          placeholder=""
                                          value={input.password || ''}
                                          onChange={e =>
                                              setInput({ ...input, [e.target.id]: e.target.value })
                                          }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Version</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-2">
                    <ToastContainer className="p-3" position="top-end">
                        <Toast show={success} onClose={toggleSuccess} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto text-success">Success</strong>
                            </Toast.Header>
                            <Toast.Body>UCM Updated!</Toast.Body>
                        </Toast>
                    </ToastContainer>
                    <ToastContainer className="p-3" position="top-end">
                        <Toast show={fail} onClose={toggleFail}>
                            <Toast.Header>
                                <strong className="me-auto text-danger">Error</strong>
                            </Toast.Header>
                            <Toast.Body>Sorry, we couldn't update the UCM</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
            </Row>
        </>
    )
}

export default Ucm
