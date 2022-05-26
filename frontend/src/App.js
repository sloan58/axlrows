import {Container} from "react-bootstrap";
import TopNav from "./Layout/TopNav";
import {Outlet} from "react-router-dom";
import AppContext from "./state/AppContext";
import {useReducer} from "react";
import appReducer from "./state/reducer";
import initialState from "./state/initialState";
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
