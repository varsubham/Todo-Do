import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import './login.css';
const avatar1 = require('./img/avatar1.svg');
const bg3 = require('./img/bg3.svg');
const wave = require('./img/wave.svg');
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            currentUser: "",
            errors: {},
        }
        this.onChangeListner = this.onChangeListner.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/main");
        }
        const inputs = document.querySelectorAll(".input2");
            function addcl(){
                let parent = this.parentNode.parentNode;
                parent.classList.add("focus");
            }
            function remcl(){
                let parent = this.parentNode.parentNode;
                if(this.value == ""){
                    parent.classList.remove("focus");
                }
            }
            inputs.forEach(input => {
                input.addEventListener("focus", addcl);
                input.addEventListener("blur", remcl);
            });

      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/main"); // push user to dashboard when they login
        }
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }


    onChangeListner(event){
        this.setState({[event.target.name]: event.target.value});
        //console.log(this.state);
    }
    onSubmit(event){
        event.preventDefault();
        const new_login = {
            email: this.state.username,
            password: this.state.password,
            
        }
        this.props.loginUser(new_login);
    }
    render(){
        const { errors } = this.state;
        console.log(errors);
    return (
            <div>
                <NavBar/>
                <img className="wave" src={wave}/>
                    <div className="container2">
                        <div className="img2">
                            <img src={bg3}/>
                        </div>
                        <div className="login-content">
                            <form onSubmit = {this.onSubmit}>
                                <img src={avatar1}/>
                                <h2 className="title">Login</h2>
                                <div className="input-div one">
                                <div className="i">
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                        <h5>Username</h5>
                                        <span style = {{color: 'red',textAlign: 'left', position: 'relative', bottom: '20px', left: '50px'}}>
                                            {errors.email}
                                            {errors.emailnotfound}
                                        </span>
                                        <input className={classnames("", {invalid: errors.email || errors.emailnotfound})} error = {errors.email} type="text" name = "username" onChange = {this.onChangeListner} id="email" value = {this.state.username} className="input2"/>
                                </div>
                                </div>
                                <div className="input-div pass">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        <h5>Password</h5>
                                        <span style = {{color: 'red', textAlign: 'left', position: 'relative', bottom: '20px', left: '50px'}}>
                                            {errors.password}
                                            {errors.passwordincorrect}
                                        </span>
                                        <input className={classnames("", {invalid: errors.password || errors.passwordincorrect})} error = {errors.password} name = "password" value = {this.state.password} onChange = {this.onChangeListner} id="password" type="password" className="input2"/>
                                </div>
                                </div>
                                <input type="submit" className="btn2" value="Login"/>
                                <p>Don't have an account? <Link to = "/register">Sign Up</Link></p>
                            </form>
                        </div>
                    </div>
            </div>
            )
        }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);