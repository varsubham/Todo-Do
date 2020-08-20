import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import NavBar from './NavBar';
const avatar1 = require('./img/avatar1.svg');
const bg3 = require('./img/bg3.svg');
const wave = require('./img/wave.svg');
class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            name: "",
            username: "",
            password: "",
            password2: "",
            errors: {},
        }
        this.onChangeListner = this.onChangeListner.bind(this);
        this.onSumbit = this.onSumbit.bind(this);
    }
    componentDidMount(){
        //If logged in user navigates to register page
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/main');
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
    onSumbit(event){
        event.preventDefault();
        const new_register = {
            name: this.state.name,
            email: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            
        }
        // axios.post(`http://localhost:5000/api/users/register`, new_register)
        // .then(res => console.log(res.data))
        this.props.registerUser(new_register, this.props.history); 
    }
    render(){
        const { errors } = this.state;
        return (
            <div>
                <NavBar/>
                    <img class="wave" src={wave}/>
                    <div class="container2">
                        <div class="img2">
                            <img src={bg3}/>
                        </div>
                        <div class="login-content">
                            <form onSubmit = {this.onSumbit}>
                                {/* <img src={avatar1}/> */}
                                <h2 class="title">Register</h2>
                                <div class="input-div one">
                                <div class="i">
                                        <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                        <h5>Name</h5>
                                        <input autoComplete="no" className={classnames("", {invalid: errors.name})} error = {errors.name} type="text" name = "name" value = {this.state.name} onChange = {this.onChangeListner} id="name" class="input2"/>
                                </div>
                                </div>
                                <div class="input-div one">
                                <div class="i">
                                        <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                        <h5>Email</h5>
                                        <input className={classnames("", {invalid: errors.email})} error = {errors.email} type="text" name = "username" value = {this.state.username} onChange = {this.onChangeListner} id="email" class="input2"/>
                                </div>
                                </div>
                                <div class="input-div pass">
                                <div class="i"> 
                                        <i class="fas fa-lock"></i>
                                </div>
                                <div class="div">
                                        <h5>Password</h5>
                                        <input className={classnames("", {invalid: errors.password})} error = {errors.password} type="password" name = "password" value = {this.state.password} onChange = {this.onChangeListner} id="password1" class="input2"/>
                                </div>
                                </div>
                                <div class="input-div pass">
                                <div class="i"> 
                                        <i class="fas fa-lock"></i>
                                </div>
                                <div class="div">
                                        <h5>Confirm Password</h5>
                                        <input className={classnames("", {invalid: errors.password2})} error = {errors.password2} type="password" name = "password2" value = {this.state.password2} onChange = {this.onChangeListner} id="password2" class="input2"/>
                                </div>
                                </div>
                                <input type="submit" class="btn2" value="Register"/>
                                <p>Already have an Account? <Link to = '/login'>Login</Link></p>
                            </form>
                        </div>
                    </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register));