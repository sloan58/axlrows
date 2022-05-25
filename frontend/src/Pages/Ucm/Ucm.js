import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import request from '../../util/request'
import {Button, Col, Form, Row} from "react-bootstrap";

const Ucm = () => {
    let params = useParams();
    const [input, setInput] = useState({});

    useEffect(() => {
        request(`/ucm/${params.ucmId}`)
            .then(ucm => setInput(ucm))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        // request(`/ucm/${params.ucmId}`)
        //     .then(ucm => setInput(ucm))
        //     .catch(err => console.log(err))
        // history.push('/admin/ucms')
    }

    return (
        <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={4}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"
                                      id="name"
                                      placeholder=""
                                      value={input.name}
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
                                      value={input.ipAddress}
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
                                      value={input.username}
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
                                      value={input.password}
                                      onChange={e =>
                                          setInput({ ...input, [e.target.id]: e.target.value })
                                      }
                                      required
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
    )
}

export default Ucm
