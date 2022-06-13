import {Col, Row} from "react-bootstrap";
import Select from "react-select";
import {useContext, useEffect, useState} from "react";
import AppContext from "../store/AppContext";
import {toast} from "react-toastify";
import {api} from "../util/api";
import {useNavigate} from "react-router-dom";

const TargetSelector = () => {
    const { state, dispatch } = useContext(AppContext);
    const [ucms, setUcms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('ucm')
            .then(({data}) => {
                setUcms(data)
            })
            .catch(error => {
                console.error(error)
                if(error.response.status === 401) {
                    dispatch({
                        'type': 'LOGOUT'
                    })
                    navigate(`/login`);
                }
                toast.error("Sorry, there was a problem loading the UCM's")
            });
    }, [])

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-start-2 col-span-1 mt-4">
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
            </div>
        </div>
    )
}

export default TargetSelector
