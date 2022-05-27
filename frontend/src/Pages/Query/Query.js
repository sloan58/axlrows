import {Col, Row} from "react-bootstrap";
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import {useContext} from "react";
import AppContext from "../../store/AppContext";

const Query = () => {
    const { state, dispatch } = useContext(AppContext);

    const handleOnChange = value => {
        dispatch({
            "type": "QUERY_UPDATED",
            "query": value
        })
    }

    return (
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
    )
}

export default Query
