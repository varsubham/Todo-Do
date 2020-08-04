import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
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
    return (
            <div>
                <NavBar/>
                <form className = "contact" onSubmit = {this.onSubmit}>
                    <div className="details" style = {{marginTop: "80px"}}>
                        <div className="red-bg">
                            <h1 style = {{color: "black", paddingTop: "30px", fontWeight: "bold", fontSize: "50px"}}>Sign in</h1>
                            <div className="form">
                                <div className="inputbox">
                                    <input className={classnames("", {invalid: errors.email || errors.emailnotfound})} error = {errors.email} type="text" name = "username" value = {this.state.username} onChange = {this.onChangeListner} id="email" placeholder="Email Address"/>
                                </div>
                                <div className="inputbox">
                                    <input className={classnames("", {invalid: errors.password || errors.passwordincorrect})} error = {errors.password} type="password" name = "password" value = {this.state.password} onChange = {this.onChangeListner} id="password" placeholder="Password"/>
                                </div>
                                <div className="inputbox1">
                                    <button className="button-main" type = "submit" style = {{backgroundImage: "linear-gradient(#ffffff, #bebebe)", width: "fit-content", padding: "10px 30px"}} ><span style= {{color: "black", fontSize: "xx-large", fontWeight: "bold"}}>Sign in</span></button>
                                </div>
                                <div style = {{borderBottom: "1px solid white", width: "90%", margin: "auto", paddingTop: "20px"}}></div>
                            </div>
                            <div style ={{padding: "10px"}}>
                            <p style = {{color: "white", fontSize: "18px"}}>Don't have an accout? <Link to = '/register' style = {{color: "white"}}>Sign up</Link></p>
                            </div>
                        </div>
                    </div>
                </form>
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