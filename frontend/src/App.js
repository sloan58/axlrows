import Container from 'react-bootstrap/Container';
import TopNav from "./Layout/TopNav";
import { useEffect, useState } from 'react'

function App() {
    const [ucms, setUcms] = useState([]);
    useEffect(() => {
        console.log(fetch('http://axlrows.test/api/ucm')
            .then(data => data.json())
            .then(ucms => setUcms(ucms))
            .catch(err => console.log(err))
        )
    }, [])
  return (
      <Container fluid>
          <TopNav />
          {ucms.map(ucm => {
              return <p>{ucm.name}</p>
          })}
      </Container>
  );
}

export default App;
