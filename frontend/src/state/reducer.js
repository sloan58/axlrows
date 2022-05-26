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
        default:
            throw new Error();
    }
};

export default appReducer
