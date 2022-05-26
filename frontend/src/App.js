import {Container} from "react-bootstrap";
import TopNav from "./Layout/TopNav";
import {Outlet} from "react-router-dom";
import AppContext from "./store/AppContext";
import {useReducer} from "react";
import appReducer from "./store/reducer";
import initialState from "./store/initialState";
import Toasts from "./Components/Toasts";


function App() {
    const [state, dispatch] =  useReducer(appReducer, initialState);

  return (
      <AppContext.Provider value={{state, dispatch}}>
          <Container fluid>
              <TopNav />
              <Outlet />
              <Toasts />
          </Container>
      </AppContext.Provider>
  );
}

export default App;
