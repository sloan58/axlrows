import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from 'react-router-bootstrap'
import {api} from "../util/api";

const TopNav = () => {
    const login = () => {
        api.get('csrf-cookie')
            .then(res => {
                api.post('login', {
                    'email': 'test@example.com',
                    'password': 'password'
                })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(e => console.error(e))
            })
            .catch(e => console.error(e))
    }
    const logout = () => {
        api.post('logout').then(res => {
            console.log('out', res)
        })
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>AXL Rows</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/query-history">
                            <Nav.Link>Query History</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/ucm">
                            <Nav.Link>UCM's</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={login}>Login</Nav.Link>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNav
