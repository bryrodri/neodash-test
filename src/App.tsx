import React,{useEffect} from 'react'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Application from './application/Application';

//components


//masterPAges



function App() {
  return (

    <>  
      <Router>
        <Routes>
          <Route path="/" element={<Application/>}></Route>
          <Route path="/nepage" element={<div>new page</div>}></Route>
          <Route path="*" element={<div >Error</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;