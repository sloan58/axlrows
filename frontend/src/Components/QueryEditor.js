import {Button, Col, Row} from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import {oneDark} from "@codemirror/theme-one-dark";
import {sql} from "@codemirror/lang-sql";
import {useContext, useState} from "react";
import AppContext from "../store/AppContext";
import {toast} from "react-toastify";
import {api} from "../util/api";

const QueryEditor = () => {
    const { state, dispatch } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

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
            });
    }

    return (
        <>
            <Row className="justify-content-md-center mt-3">
                <Col xs={12} md={10} lg={8}>
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
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-2">
                <Col xs={12} md={10} lg={8}>
                    <Button
                        variant={!isLoading ? 'primary' : 'outline-primary'}
                        disabled={isLoading || state.query_targets.length === 0 || !state.query_statement}
                        onClick={!isLoading ? handleSubmit : null}
                    >
                        {isLoading ? 'Loading???' : 'Submit'}
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default QueryEditor
