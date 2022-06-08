import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import {api} from "../../util/api";

const Ucm = () => {
    let navigate = useNavigate();

    let params = useParams();
    const [input, setInput] = useState({});
    const [ errors, setErrors ] = useState({})


    useEffect(() => {
        api.get(`ucm/${params.ucmId}`)
            .then(ucm => setInput(ucm))
            .catch(error => console.error(error));
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        setErrors({})
        api.put(`ucm/${params.ucmId}`, input)
            .then(() => {
                setInput({
                    ...input,
                    "password": ""
                })
                toast.success("UCM Updated!")
            })
            .catch(error => {
                console.error(error)
                if(error.errors) {
                    setErrors(error.errors)
                } else {
                    toast.error("UCM could not be updated")
                }
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
                                          value={input.name || ''}
                                          onChange={e =>
                                              setInput({ ...input, [e.target.id]: e.target.value })
                                          }
                                          required
                                          isInvalid={ !!errors.name }
                            />
                            <Form.Control.Feedback type="invalid">{ errors.name }</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>IP Address</Form.Label>
                            <Form.Control type="text"
                                          id="ipAddress"
                                          value={input.ipAddress || ''}
                                          onChange={e =>
                                              setInput({ ...input, [e.target.id]: e.target.value })
                                          }
                                          required
                                          isInvalid={ !!errors.ipAddress }
                            />
                            <Form.Control.Feedback type="invalid">{ errors.ipAddress }</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          id="username"
                                          value={input.username || ''}
                                          onChange={e =>
                                              setInput({ ...input, [e.target.id]: e.target.value })
                                          }
                                          required
                                          isInvalid={ !!errors.username }
                            />
                            <Form.Control.Feedback type="invalid">{ errors.username }</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          id="password"
                                          value={input.password || ''}
                                          onChange={e =>
                                              setInput({ ...input, [e.target.id]: e.target.value })
                                          }
                                          isInvalid={ !!errors.password }
                            />
                            <Form.Control.Feedback type="invalid">{ errors.password }</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Version</Form.Label>
                            <Form.Select
                                id="version"
                                aria-label="Select UCM version"
                                value={input.version || ''}
                                isInvalid={ !!errors.version }
                                onChange={e =>
                                    setInput({ ...input, [e.target.id]: e.target.value })
                                }
                            >
                                <option>Select Version</option>
                                <option value="14">14</option>
                                <option value="12.5">12.5</option>
                                <option value="11.5">11.5</option>
                                <option value="10.5">10.5</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{ errors.version }</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button onClick={() => navigate('/ucm')} variant="secondary ms-2">
                            Back
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Ucm
