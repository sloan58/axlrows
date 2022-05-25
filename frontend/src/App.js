import {Container} from "react-bootstrap";
import TopNav from "./Layout/TopNav";
import {Outlet} from "react-router-dom";

function App() {
  return (
      <Container fluid>
          <TopNav />
          <Outlet />
      </Container>
  );
}

export default App;
