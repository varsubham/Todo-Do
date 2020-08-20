import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
//import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions'
import PrivateRoute from './components/private-route/PrivateRoute';

//check for token to keep user logged in
if(localStorage.jwtToken){
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;  //in miliseconds
  if(decoded.exp < currentTime){
    //Logout user
    store.dispatch(logoutUser());
    
    //Redirect to login
    window.location.href = './login';
  }
}

class App extends React.Component {
  
  constructor(){
    super();
    //this.loggedUser = 'xyz';
    this.state = {
      loggedinuser: "",
    }
  }
  
  render(){
    //console.log('from render');
  return (
    <div>
      <Provider store = {store}>
       <Router>
         <Route path = "/" exact component = {Landing} />
         <Route path = "/login" exact component = {Login} />
         <Route path = "/register" exact component = {Register} />
         <Switch>
            <PrivateRoute exact path = '/main' component = {MainPage}/>
         </Switch>
       </Router>
      </Provider>
    </div>
  );
}
}
export default App;
