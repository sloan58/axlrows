import {Container} from "react-bootstrap";
import TopNav from "./Layout/TopNav";
import {Outlet} from "react-router-dom";
import AppContext from "./store/AppContext";
import {useReducer} from "react";
import appReducer from "./store/reducer";
import initialState from "./store/initialState";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const [state, dispatch] =  useReducer(appReducer, initialState);

  return (
      <AppContext.Provider value={{state, dispatch}}>
          <Container fluid>
              <TopNav />
              <Outlet />
              {/*<ToastContainer />*/}
          </Container>
      </AppContext.Provider>
  );
}

export default App;
