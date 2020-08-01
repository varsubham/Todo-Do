import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            name: "",
            username: "",
            password: "",
            password2: "",
        }
        this.onChangeListner = this.onChangeListner.bind(this);
        this.onSumbit = this.onSumbit.bind(this);
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
            password2: this.state.password2
        }
        axios.post(`http://localhost:5000/api/users/register`, new_register)
        .then(res => console.log(res.data))
    }
    render(){
        return (
            <div>
                <NavBar/>
                <form className = "contact" onSubmit = {this.onSumbit}>
                    <div className="details">
                        <div className="red-bg">
                            <h1 style = {{color: "black", paddingTop: "30px", fontWeight: "bold", fontSize: "50px"}}>Sign Up</h1>
                            <div className="form">
                                <div className="inputbox">
                                    <input type="text" name = "name" value = {this.state.name} onChange = {this.onChangeListner} id="name" placeholder="Name"/>
                                </div>
                                <div className="inputbox">
                                    <input type="text" name = "username" value = {this.state.username} onChange = {this.onChangeListner} id="email" placeholder="Email Address"/>
                                </div>
                                <div className="inputbox">
                                    <input type="password" name = "password" value = {this.state.password} onChange = {this.onChangeListner} id="password1" placeholder="Password"/>
                                </div>
                                <div className="inputbox">
                                    <input type="password" name = "password2" value = {this.state.password2} onChange = {this.onChangeListner} id="password2" placeholder="Confirm Password"/>
                                </div>
                                
                                <div className="inputbox1">
                                    <button className="button-main" type = "submit" style = {{backgroundImage: "linear-gradient(#ffffff, #bebebe)", width: "fit-content", padding: "10px 30px"}} ><span style= {{color: "black", fontSize: "xx-large", fontWeight: "bold"}}>Sign Up</span></button>
                                </div>
                                <div style = {{borderBottom: "1px solid white", width: "90%", margin: "auto", paddingTop: "20px"}}></div>
                            </div>
                            
                            <div style ={{padding: "10px"}}>
                            <p style = {{color: "white", fontSize: "18px"}}>Already have an accout? <Link to = '/login' style = {{color: "white"}}>Sign in</Link></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;