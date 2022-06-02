import {Col, Dropdown, DropdownButton, Row, Table, Form, Pagination} from "react-bootstrap";
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

    const updateSearch = e => {
        dispatch({
            'type': 'SEARCH_UPDATED',
            'search': e.target.value
        })
    }

    const shouldShowPagination = () => {
        return canIncrementPagination() || canDecrementPagination()
    }

    const canIncrementPagination = () => {
        return (state.pagination_start + state.pagination_length) < state.query_results.totalRows;
    }

    const canDecrementPagination = () => {
        return (state.pagination_start - state.pagination_length) >= 0;
    }

    const gotoPaginationStart = () => {
        dispatch({
            'type': 'PAGINATION_GOTO_START'
        })
    }

    const gotoPaginationEnd = () => {
        dispatch({
            'type': 'PAGINATION_GOTO_END'
        })
    }

    const nextPage = () => {
        if(canIncrementPagination()) {
            dispatch({
                'type': 'PAGINATION_INCREMENTED'
            })
        }
    }

    const prevPage = () => {
        if(canDecrementPagination()) {
            dispatch({
                'type': 'PAGINATION_DECREMENTED'
            })
        }
    }

    return (
        <>
            {state.query_results.length !== 0 && (
                <>
                    <Row className="justify-content-md-center mt-5">
                        <Col xs={10}>
                            <Row className="justify-content-md-center">
                                <Col className="text-start">
                                    <Form.Control onChange={updateSearch} type="email" placeholder={state.results_search === '' ? 'Search' : state.results_search} />
                                </Col>
                                <Col className="d-inline-flex justify-content-end">
                                    <div className="mt-2 text-success" style={{cursor: 'pointer'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-download" viewBox="0 0 16 16">
                                            <path
                                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path
                                                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                    </div>
                                    <DropdownButton title={state.pagination_length} id="bg-vertical-dropdown-1" className="ms-3">
                                        <Dropdown.Item onClick={() => onSelect(10)}>10</Dropdown.Item>
                                        <Dropdown.Item onClick={() => onSelect(25)}>25</Dropdown.Item>
                                        <Dropdown.Item onClick={() => onSelect(50)}>50</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-3">
                        <Col xs={10}>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    {state.query_results && state.query_results.columns.map((column, index) => {
                                        return (
                                            <th key={index}>{column}</th>
                                        )
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {state.query_results && state.query_results.results.map(ucm => {
                                    return ucm.data.slice(state.pagination_start, state.pagination_end).map((row, index) => {
                                        if([].concat(...Object.values(row)).join(' ').toLowerCase().includes(state.results_search.toLowerCase())) {
                                            return (
                                                <tr key={index}>
                                                    {state.query_results.columns.map((column, index) => {
                                                        return (
                                                            <td key={index}>{row[column]}</td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        }
                                    })
                                })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-3">
                        <Col xs={5}>
                            <p>{state.pagination_start + 1} through {state.pagination_end > state.query_results.totalRows ? state.query_results.totalRows : state.pagination_end} of {state.query_results.totalRows} Total Records</p>
                        </Col>
                        <Col xs={5}>
                            {shouldShowPagination() &&
                                (
                                    <Pagination className="float-end">
                                        <Pagination.First onClick={gotoPaginationStart} disabled={!canDecrementPagination()}/>
                                        <Pagination.Prev onClick={prevPage} disabled={!canDecrementPagination()}/>
                                        <Pagination.Next onClick={nextPage} disabled={!canIncrementPagination()}/>
                                        <Pagination.Last onClick={gotoPaginationEnd} disabled={!canIncrementPagination()}/>
                                    </Pagination>
                                )
                            }
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}
export default QueryResults
