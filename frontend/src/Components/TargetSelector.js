import {Col, Row} from "react-bootstrap";
import Select from "react-select";
import {useContext, useEffect, useState} from "react";
import AppContext from "../store/AppContext";
import {toast} from "react-toastify";
import {api} from "../util/api";

const TargetSelector = () => {
    const { state, dispatch } = useContext(AppContext);
    const [ucms, setUcms] = useState([]);

    useEffect(() => {
        api.get('ucm')
            .then(ucms => {
                setUcms(ucms)
            })
            .catch(error => {
                console.error(error)
                toast.error("Sorry, there was a problem loading the UCM's")
            });
    }, [])

    return (
        <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={10} lg={8}>
                <Select
                    placeholder='Select Query Targets...'
                    closeMenuOnSelect={false}
                    defaultValue={state.query_targets}
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
