import {Col, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import {LinkContainer} from "react-router-bootstrap";

const Ucms = () => {

    const [ucms, setUcms] = useState([]);
    useEffect(() => {
        console.log(fetch('http://axlrows.test/api/ucm')
            .then(data => data.json())
            .then(ucms => setUcms(ucms))
            .catch(err => console.log(err))
        )
    }, [])

    return (
        <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={10} lg={8}>
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
            </Col>
        </Row>
    )
}

export default Ucms
