import {Button, Col, Row} from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import {oneDark} from "@codemirror/theme-one-dark";
import {sql} from "@codemirror/lang-sql";
import {useContext, useState} from "react";
import AppContext from "../store/AppContext";
import {toast} from "react-toastify";
import {api} from "../util/api";
import {useNavigate} from "react-router-dom";

const QueryEditor = () => {
    const { state, dispatch } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true)
        dispatch({
            "type": "QUERY_RESULTS_UPDATED",
            "results": []
        })
        dispatch({
            "type": "PAGINATION_RESET"
        })
        api.post('query', {
            "statement": state.query_statement,
            "targets": state.query_targets
        })
            .then(({ data }) => {
                setLoading(false)
                data.results.map(result => {
                    if(result.error) {
                        let message = `${result.target}: ${result.error}`
                        toast.error(message, {
                            autoClose: false,
                        })
                    }
                })
                dispatch({
                    "type": "QUERY_RESULTS_UPDATED",
                    "results": data
                })
                console.log(data)
            })
            .catch(error => {
                setLoading(false)
                console.error(error)
                if(error.response.status === 401) {
                    dispatch({
                        'type': 'LOGOUT'
                    })
                    navigate(`/login`);
                }
            });
    }

    return (
        <>
            <div className="grid grid-cols-8 gap-4">
                <div className="col-start-3 col-span-4 mt-4">
                    <CodeMirror
                        value={state.query_statement}
                        width="100%"
                        height="250px"
                        theme={oneDark}
                        extensions={[sql({
                            upperCaseKeywords: true
                        })]}
                        onChange={value => dispatch({
                            "type": "QUERY_STATEMENT_UPDATED",
                            "statement": value
                        })}
                    />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-start-2 col-span-2 mt-2">
                    <button className={isLoading ? 'btn btn-outline' : 'btn'}
                        disabled={isLoading || state.query_targets.length === 0 || !state.query_statement}
                        onClick={!isLoading ? handleSubmit : null}
                    >
                        {isLoading ? 'Loading…' : 'Submit'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default QueryEditor
