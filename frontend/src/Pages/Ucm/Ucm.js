import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import request from '../../util/request'

const Ucm = () => {
    let params = useParams();
    const [ucm, setUcm] = useState([]);
    useEffect(() => {
        console.log(request.get(`/ucm/${params.ucmId}`)
            .then(data => data.json())
            .then(ucm => {console.log('here i am'); setUcm(ucm)})
            .catch(err => console.log(err))
        )
    }, [])

    return (
        <h1>{ucm.name}</h1>
    )
}

export default Ucm
