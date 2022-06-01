import {Button, Card, Col, Nav, Row, Table} from "react-bootstrap";
import AppContext from "../store/AppContext";
import {useContext} from "react";

const QueryResults = () => {
    const {state, dispatch} = useContext(AppContext)

    return (
        <>
            {state.query_results.length !== 0 && (
                <Row className="justify-content-md-center mt-3">
                    <Col xs={12} md={10} lg={10}>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                {state.query_results && state.query_results[0].columns.map(column => {
                                    return (
                                        <th>{column}</th>
                                    )
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {state.query_results && state.query_results.map(ucm => {
                                return ucm.data.map(row => {
                                    return (
                                        <tr>
                                            {state.query_results[0].columns.map(column => {
                                                return (
                                                    <td>{row[column]}</td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default QueryResults
