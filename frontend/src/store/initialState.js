const initialState = {
    "query_statement": "",
    "query_targets": [],
    "query_results": [],
    "pagination_length": 10,
    "pagination_start": 0,
    "pagination_end": 10,
    "results_search": '',
    "logged_in": localStorage.getItem('axlrows_logged_in'),
    "user": {},
}

export default initialState
