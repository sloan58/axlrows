import {Col, Row, Toast, ToastContainer} from "react-bootstrap";
import AppContext from "../state/AppContext";
import {useContext} from "react";

const Toasts = () => {
    const { state, dispatch } = useContext(AppContext);
    return (
        <Row>
            <Col md={6} className="mb-2">
                <ToastContainer className="p-3" position="top-end">
                    <Toast show={state.toast.success} onClose={() => dispatch({"type": "TOAST_CLOSE"})} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto text-success">{state.toast.title}</strong>
                        </Toast.Header>
                        <Toast.Body>{state.toast.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
                <ToastContainer className="p-3" position="top-end">
                    <Toast show={state.toast.fail} onClose={() => dispatch({"type": "TOAST_CLOSE"})}>
                        <Toast.Header>
                            <strong className="me-auto text-danger">{state.toast.title}</strong>
                        </Toast.Header>
                        <Toast.Body>{state.toast.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
        </Row>
    )
}

export default Toasts
