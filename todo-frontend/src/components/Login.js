import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import './login.css';
import avatar1  from './img/avatar1.svg';
import bg3  from './img/bg3.svg';
import wave  from'./img/wave.svg';
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
        //for animation when user clicks on input field
        const inputs = document.querySelectorAll(".input2");
            function addcl(){
                let parent = this.parentNode.parentNode;
                parent.classList.add("focus");
            }
            function remcl(){
                let parent = this.parentNode.parentNode;
                if(this.value === ""){
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
                <img className="wave" src={wave} alt = ""/>
                    <div className="container2">
                        <div className="img2">
                            <img src={bg3} alt = ""/>
                        </div>
                        <div className="login-content">
                            <form onSubmit = {this.onSubmit}>
                                <img src={avatar1} alt = ""/>
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
                                        <input  error = {errors.email} type="text" name = "username" onChange = {this.onChangeListner} id="email" value = {this.state.username} className="input2"/>
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
                                        <input  error = {errors.password} name = "password" value = {this.state.password} onChange = {this.onChangeListner} id="password" type="password" className="input2"/>
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