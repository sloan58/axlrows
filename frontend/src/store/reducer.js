import initialState from "./initialState";

const appReducer = (state, action) => {
    switch (action.type) {
        case 'QUERY_STATEMENT_UPDATED':
            return {
                ...state,
                "query_statement": action.statement
            }
        case 'QUERY_TARGETS_UPDATED':
            return {
                ...state,
                "query_targets": action.targets
            }
        case 'QUERY_RESULTS_UPDATED':
            return {
                ...state,
                "query_results": action.results
            }
        case 'PAGINATION_LENGTH_UPDATED':
            return {
                ...state,
                "pagination_length": action.length,
                "pagination_end": action.length
            }
        case 'PAGINATION_INCREMENTED':
            return {
                ...state,
                "pagination_start": state.pagination_start + state.pagination_length,
                "pagination_end": state.pagination_end + state.pagination_length
            }
        case 'PAGINATION_DECREMENTED':
            return {
                ...state,
                "pagination_start": state.pagination_start - state.pagination_length,
                "pagination_end": state.pagination_end - state.pagination_length
            }
        case 'PAGINATION_RESET':
            return {
                ...state,
                "pagination_start": initialState.pagination_start,
                "pagination_end": state.pagination_length
            }
        case 'PAGINATION_GOTO_START':
            return {
                ...state,
                "pagination_start": initialState.pagination_start,
                "pagination_end": state.pagination_length
            }
        case 'PAGINATION_GOTO_END':
            return {
                ...state,
                "pagination_start": state.query_results.totalRows - (state.query_results.totalRows % state.pagination_length),
                "pagination_end": (state.query_results.totalRows - (state.query_results.totalRows % state.pagination_length)) + state.pagination_length,
            }
        case 'SEARCH_UPDATED':
            return {
                ...state,
                "results_search": action.search
            }
        default:
            throw new Error();
    }
};

export default appReducer
