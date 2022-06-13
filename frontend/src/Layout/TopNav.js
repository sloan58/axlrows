import {api} from "../util/api";
import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import AppContext from "../store/AppContext";

const TopNav = () => {
    let navigate = useNavigate();
    const {state, dispatch}  = useContext(AppContext);

    const login = () => {
        api.get('csrf-cookie').then(() => {
            api.post('login', {
                'email': 'test@example.com',
                'password': 'secret'
            })
            .then(() => {
                localStorage.setItem('axlrows_logged_in', 'true')
                dispatch({
                    'type': 'LOGIN'
                })
                navigate('/')
            })
            .catch(error => {
                if(error.response.status === 401) {
                    dispatch({
                        'type': 'LOGOUT'
                    })
                    navigate(`/login`);
                }
            })
        })
        .catch(e =>
            console.error('no cookie for you!', e)
        )
    }

    const logout = () => {
        api.post('logout')
        .then(res => {
            localStorage.removeItem('axlrows_logged_in')
            dispatch({
                'type': 'LOGOUT'
            })
            navigate('/login')
        })
        .catch(e => {
            localStorage.removeItem('axlrows_logged_in')
            dispatch({
                'type': 'LOGOUT'
            })
            navigate('/login')
        })
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </label>
                    {state.logged_in && (
                        <ul tabIndex="0"
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Query History</a></li>
                            <li><a>UCM</a></li>
                        </ul>
                    )}
                </div>
                <div className="mr-4 normal-case text-xl">AXL Rows</div>
                {state.logged_in && (
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li className="pr-2"><NavLink to="/">Home</NavLink></li>
                            <li className="pr-2"><NavLink to="/query-history">Query History</NavLink></li>
                            <li className="pr-2"><NavLink to="/ucm">Ucm</NavLink></li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="navbar-end">
                {state.logged_in ? (
                    <a onClick={logout} className="btn">Logout</a>
                ) : (
                    <a onClick={login} className="btn">Login</a>
                )}
            </div>
        </div>
    )
}

export default TopNav
