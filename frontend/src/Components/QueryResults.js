import {Col, Dropdown, DropdownButton, Row, Table} from "react-bootstrap";
import AppContext from "../store/AppContext";
import {useContext} from "react";

const QueryResults = () => {
    const {state, dispatch} = useContext(AppContext)

    const onSelect = selected => {
        dispatch({
            'type': 'PAGINATION_LENGTH_UPDATED',
            'length': selected
        })
    }

    return (
        <>
            {state.query_results.length !== 0 && (
                <>
                    <Row className="justify-content-md-center mt-3">
                        <Col xs={12} md={10} lg={10} className="text-end">
                            <DropdownButton title={state.pagination_length} id="bg-vertical-dropdown-1">
                                <Dropdown.Item onClick={() => onSelect(10)}>10</Dropdown.Item>
                                <Dropdown.Item onClick={() => onSelect(25)}>25</Dropdown.Item>
                                <Dropdown.Item onClick={() => onSelect(50)}>50</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-3">
                        <Col xs={12} md={10} lg={10}>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    {state.query_results && state.query_results[0].columns.map((column, index) => {
                                        return (
                                            <th key={index}>{column}</th>
                                        )
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {state.query_results && state.query_results.map(ucm => {
                                    return ucm.data.slice(0, state.pagination_length).map((row, index) => {
                                        return (
                                            <tr key={index}>
                                                {state.query_results[0].columns.map((column, index) => {
                                                    return (
                                                        <td key={index}>{row[column]}</td>
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
                </>
            )}
        </>
    )
}
export default QueryResults
