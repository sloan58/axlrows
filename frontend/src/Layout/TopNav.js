import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from 'react-router-bootstrap'
import {api} from "../util/api";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AppContext from "../store/AppContext";

const TopNav = () => {
    let navigate = useNavigate();
    const {state, dispatch}  = useContext(AppContext);

    const login = () => {
        api.get('csrf-cookie').then(() => {
            api.post('login', {
                'email': 'test@example.com',
                'password': 'secret'
            })
            .then(() => {
                dispatch({
                    'type': 'LOGIN'
                })
                navigate('/')
            })
            .catch(e => console.error(e))
        })
        .catch(e =>
            console.error('no cookie for you!', e)
        )
    }

    const logout = () => {
        api.post('logout')
        .then(res => {
            dispatch({
                'type': 'LOGOUT'
            })
            navigate('/login')
        })
        .catch(e => {
            dispatch({
                'type': 'LOGOUT'
            })
            navigate('/login')
        })
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to={state.logged_in ? '/' : '/login'}>
                    <Navbar.Brand>AXL Rows</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {state.logged_in && (
                        <Nav className="me-auto">
                            <LinkContainer to="/query-history">
                                <Nav.Link>Query History</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/ucm">
                                <Nav.Link>UCM's</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    )}
                    <Nav className="ms-auto">
                        {state.logged_in ? (
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link onClick={login}>Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNav
