import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
class Login extends React.Component{
    constructor(){
        let LoggedInStatus = false;
        super();
        this.state = {
            username: "",
            password: "",
            LoggedInStatus,
            currentUser: "",

        }
        this.onChangeListner = this.onChangeListner.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        axios.post(`http://localhost:5000/api/users/login`, new_login)
        .then(res => {
            console.log(res.data.success)
            if(res.data.success){
                localStorage.setItem('token', "anyrandomstring");
                this.setState({LoggedInStatus: true});

            }
        })
        .catch(err => console.log(err.response.data))
    }
    render(){
        if(this.state.LoggedInStatus)
            return <Redirect to = '/main'/>
    return (
            <div>
                <NavBar/>
                <form className = "contact" onSubmit = {this.onSubmit}>
                    <div className="details" style = {{marginTop: "80px"}}>
                        <div className="red-bg">
                            <h1 style = {{color: "black", paddingTop: "30px", fontWeight: "bold", fontSize: "50px"}}>Sign in</h1>
                            <div className="form">
                                <div className="inputbox">
                                    <input type="text" name = "username" value = {this.state.username} onChange = {this.onChangeListner} id="email" placeholder="Email Address"/>
                                </div>
                                <div className="inputbox">
                                    <input type="password" name = "password" value = {this.state.password} onChange = {this.onChangeListner} id="password" placeholder="Password"/>
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

export default Login;