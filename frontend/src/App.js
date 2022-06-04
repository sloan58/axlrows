import {Container} from "react-bootstrap";
import TopNav from "./Layout/TopNav";
import {Outlet} from "react-router-dom";
import AppContext from "./store/AppContext";
import {useEffect, useReducer} from "react";
import appReducer from "./store/reducer";
import initialState from "./store/initialState";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {fetchWrapper} from "./util/fetchWrapper";
import {api} from './util/api'


function App() {
    const [state, dispatch] =  useReducer(appReducer, initialState);
    useEffect(() => {
        api.post('logout').then(() => {
            api.get('csrf-cookie')
                .then(res => {
                    api.post('login', {
                        'email': 'test@example.com',
                        'password': 'password'
                    })
                        .then(res => {
                            console.log(res)
                        })
                        .catch(e => console.error(e))
                })
                .catch(e => console.error(e))
        })
    })
  return (
      <AppContext.Provider value={{state, dispatch}}>
          <Container fluid>
              <TopNav />
              <Outlet />
              <ToastContainer />
          </Container>
      </AppContext.Provider>
  );
}

export default App;
