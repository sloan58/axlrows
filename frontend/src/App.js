import {Col, Container, Row, Table} from "react-bootstrap";
import TopNav from "./Layout/TopNav";
import {useEffect, useState} from 'react'
import {LinkContainer} from "react-router-bootstrap";

function App() {
    const [ucms, setUcms] = useState([]);
    useEffect(() => {
        console.log(fetch('http://axlrows.test/api/ucm')
            .then(data => data.json())
            .then(ucms => setUcms(ucms))
            .catch(err => console.log(err))
        )
    }, [])
  return (
      <Container fluid>
          <TopNav />
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
                                  <td><a href="#">{ucm.name}</a></td>
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
      </Container>
  );
}

export default App;
