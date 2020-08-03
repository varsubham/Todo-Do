import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
//import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import {Provider} from 'react-redux';
import store from './store';
class App extends React.Component {
  
  constructor(){
    super();
    //this.loggedUser = 'xyz';
    this.state = {
      loggedinuser: "",
    }
    this.somefunction = this.somefunction.bind(this);
    console.log('fron constructor');
  }
  somefunction(value){
    this.setState({loggedinuser: value});
    //this.loggedUser = this.state.loggedinuser;
    console.log('somefunc');
  }
  
  render(){
    console.log('from render');
  return (
    <div>
      <Provider store = {store}>
       <Router>
         <h1>{this.state.loggedinuser}</h1>
         <Route path = "/" exact component = {Landing} />
         <Route path = "/login" exact component = {() => <Login function1 = {this.somefunction} />} />
         <Route path = "/register" exact component = {Register} />
         <Route path = "/main" exact component = {() => <MainPage loggedinuser = {this.state.loggedinuser} />} />
       </Router>
      </Provider>
    </div>
  );
}
}
export default App;
