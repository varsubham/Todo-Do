import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import NavBar from './NavBar';
import bg3 from './img/bg3.svg';
import wave from './img/wave.svg';
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
        
        //for animation when input box clicked
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
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    onChangeListner(event){
        this.setState({[event.target.name]: event.target.value});
    }

    onSumbit(event){
        event.preventDefault();
        const new_register = {
            name: this.state.name,
            email: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            
        }
        this.props.registerUser(new_register, this.props.history); 
    }

    render(){
        const { errors } = this.state;
        return (
            <div>
                <NavBar/>
                    <img className="wave" src={wave} alt=""/>
                    <div className="container2">
                        <div className="img2">
                            <img src={bg3} alt=""/>
                        </div>
                        <div className="login-content">
                            <form onSubmit = {this.onSumbit}>
                                <h2 className="title">Register</h2>
                                <div className="input-div one">
                                <div className="i">
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                        <h5>Name</h5>
                                        <span style = {{color: 'red',textAlign: 'left', position: 'relative', bottom: '20px', left: '50px'}}>
                                            {errors.name}
                                        </span>
                                        <input autoComplete="no" error = {errors.name} type="text" name = "name" value = {this.state.name} onChange = {this.onChangeListner} id="name" className="input2"/>
                                </div>
                                </div>
                                <div className="input-div one">
                                <div className="i">
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                        <h5>Email</h5>
                                        <span style = {{color: 'red',textAlign: 'left', position: 'relative', bottom: '20px', left: '50px'}}>
                                            {errors.email}
                                        </span>
                                        <input error = {errors.email} type="text" name = "username" value = {this.state.username} onChange = {this.onChangeListner} id="email" className="input2"/>
                                </div>
                                </div>
                                <div className="input-div pass">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        <h5>Password</h5>
                                        <span style = {{color: 'red',textAlign: 'left', position: 'relative', bottom: '30px', left: '70px'}}>
                                            {errors.password}
                                        </span>
                                        <input error = {errors.password} type="password" name = "password" value = {this.state.password} onChange = {this.onChangeListner} id="password1" className="input2"/>
                                </div>
                                </div>
                                <div className="input-div pass">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        <h5>Confirm Password</h5>
                                        <span style = {{color: 'red',textAlign: 'left', position: 'relative', bottom: '30px', left: '70px'}}>
                                            {errors.password2}
                                        </span>
                                        <input error = {errors.password2} type="password" name = "password2" value = {this.state.password2} onChange = {this.onChangeListner} id="password2" className="input2"/>
                                </div>
                                </div>
                                <input type="submit" className="btn2" value="Register"/>
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