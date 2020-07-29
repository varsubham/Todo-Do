import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div>
       <Router>
         <NavBar/>
         <Route path = "/" exact component = {Landing} />
         <Route path = "/login" exact component = {Login} />
         <Route path = "/register" exact component = {Register} />
       </Router>
    </div>
  );
}

export default App;
