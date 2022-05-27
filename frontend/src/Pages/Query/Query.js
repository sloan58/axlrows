import {Button, Col, Row} from "react-bootstrap";
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import {useContext, useState} from "react";
import AppContext from "../../store/AppContext";

const Query = () => {
    const { state, dispatch } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }

    const handleOnChange = value => {
        dispatch({
            "type": "QUERY_UPDATED",
            "query": value
        })
    }

    return (
        <>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={10} lg={8}>
                    <CodeMirror
                        value={state.query.current}
                        width="100%"
                        height="400px"
                        theme={oneDark}
                        extensions={[sql({
                            upperCaseKeywords: true
                        })]}
                        onChange={handleOnChange}
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

export default Query
