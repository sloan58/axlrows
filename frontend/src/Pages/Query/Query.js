import TargetSelector from "../../Components/TargetSelector";
import QueryEditor from "../../Components/QueryEditor";
import QueryResults from "../../Components/QueryResults";
import {useContext, useEffect} from "react";
import AppContext from "../../store/AppContext";
import {useNavigate} from "react-router-dom";

const Query = () => {
    const {state} = useContext(AppContext)
    let navigate = useNavigate();

    useEffect(() => {
        if(!state.logged_in) {
            navigate('/login', { replace: true })
        }
    }, [])

    return (
        <>
            <TargetSelector />
            <QueryEditor />
            <QueryResults />
        </>
    )
}

export default Query
