const appReducer = (state, action) => {
    switch (action.type) {
        case 'TOAST_SHOW_SUCCESS':
            return {
                ...state,
                "toast": {
                    "title": action.title,
                    "message": action.message,
                    "success": true,
                    "fail": false,
                }
            }
        case 'TOAST_SHOW_FAIL':
            return {
                ...state,
                "toast": {
                    "title": action.title,
                    "message": action.message,
                    "fail": true,
                    "success": false,
                }
            }
        case 'TOAST_CLOSE':
            return {
                ...state,
                "toast": {
                    "title": "",
                    "message": "",
                    "fail": false,
                    "success": false,
                }
            }
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
                "pagination_length": action.length
            }
        default:
            throw new Error();
    }
};

export default appReducer
