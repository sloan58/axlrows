import {Col, Row} from "react-bootstrap";
import Select from "react-select";
import {useContext, useEffect, useState} from "react";
import {fetchWrapper} from "../util/fetchWrapper";
import AppContext from "../store/AppContext";

const TargetSelector = () => {
    const { state, dispatch } = useContext(AppContext);
    const [ucms, setUcms] = useState([]);

    useEffect(() => {
        fetchWrapper.get('/ucm')
            .then(ucms => {
                setUcms(ucms)
            })
            .catch(error => {
                console.error(error)
                dispatch({
                    "type": "TOAST_SHOW_ERROR",
                    "title": "Oops!",
                    "message": "Sorry, there was a problem loading the UCM's"
                })
            });
    }, [])

    return (
        <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={10} lg={8}>
                <Select
                    placeholder='Select Query Targets...'
                    closeMenuOnSelect={false}
                    defaultValue={state.query.targets}
                    isMulti
                    options={ucms.map(ucm => {
                        return { label: ucm.name, value: ucm.id }
                    })}
                    onChange={e => dispatch({
                        "type": "QUERY_TARGETS_UPDATED",
                        "targets": e ? e : []
                    })}
                />
            </Col>
        </Row>
    )
}

export default TargetSelector