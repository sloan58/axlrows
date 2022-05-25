import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";

const Ucm = () => {
    let params = useParams();
    const [ucm, setUcm] = useState([]);
    useEffect(() => {
        console.log(fetch(`http://axlrows.test/api/ucm/${params.ucmId}`)
            .then(data => data.json())
            .then(ucm => setUcm(ucm))
            .catch(err => console.log(err))
        )
    }, [])

    return (
        <h1>{ucm.name}</h1>
    )
}

export default Ucm
