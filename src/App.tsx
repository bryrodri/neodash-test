import React,{useEffect} from 'react'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Application from './application/Application';
import { useAuth0 } from "@auth0/auth0-react";
import Test from "./Test";
import './App.css'


//components


//masterPAges



function App() {
  const { loginWithRedirect, isAuthenticated, isLoading} = useAuth0();
  console.log(isLoading)
  useEffect(() => {
    console.log('auth', isAuthenticated)
    console.log('loading', isLoading)
    if(!isLoading){
      if(!isAuthenticated){
        console.log(isAuthenticated)
        loginWithRedirect()
      }
    }
  }, [isLoading]);

  return (

    <>  
      <Router>
        <Routes>
          <Route path="/" element={ isAuthenticated ? <Application/> :<></>}></Route>
          <Route path="/nepage" element={<Test/>}></Route>
          <Route path="*" element={<div >Error</div>} />
        </Routes>
      </Router>
    </>
  );
}



export default App;