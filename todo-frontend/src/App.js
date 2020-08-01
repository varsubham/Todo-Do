import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
//import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      loggedinuser: "",
    }
    this.somefunction = this.somefunction.bind(this);
  }
  somefunction(value){
    this.setState({loggedinuser: value});
  }
  render(){
    console.log(this.state.loggedinuser);
  return (
    <div>
       <Router>
         <Route path = "/" exact component = {Landing} />
         <Route path = "/login" exact component = {() => <Login function1 = {this.somefunction} />} />
         <Route path = "/register" exact component = {Register} />
         <Route path = "/main" exact component = {MainPage} />
       </Router>
    </div>
  );
}
}
export default App;
