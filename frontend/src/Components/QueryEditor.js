import {Button, Col, Row} from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import {oneDark} from "@codemirror/theme-one-dark";
import {sql} from "@codemirror/lang-sql";
import {useContext, useState} from "react";
import AppContext from "../store/AppContext";
import {fetchWrapper} from "../util/fetchWrapper";

const QueryEditor = () => {
    const { state, dispatch } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true)
        fetchWrapper.post('/query', {
            "statement": state.query.statement,
            "targets": state.query.targets
        })
            .then(response => {
                setLoading(false)
                console.log(response)
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
                        value={state.query.current}
                        width="100%"
                        height="400px"
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
                        disabled={isLoading}
                        onClick={!isLoading ? handleSubmit : null}
                    >
                        {isLoading ? 'Loading…' : 'Submit'}
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default QueryEditor