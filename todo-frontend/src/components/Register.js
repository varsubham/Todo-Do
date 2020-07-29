import React from 'react';
import { Link } from 'react-router-dom';
function Register(){
    return (
        <div>
            <form class = "contact">
        <div class="details">
            <div class="red-bg">
                <h1 style = {{color: "black", paddingTop: "30px", fontWeight: "bold", fontSize: "50px"}}>Sign Up</h1>
                <div class="form">
                    <div class="inputbox">
                        <input type="text" id="name" placeholder="Full Name"/>
                    </div>
                    <div class="inputbox">
                        <input type="text" id="email" placeholder="Email Address"/>
                    </div>
                    <div class="inputbox">
                        <input type="password" id="password" placeholder="Password"/>
                    </div>
                    <div class="inputbox">
                        <input type="password" id="password" placeholder="Confirm Password"/>
                    </div>
                    
                    <div class="inputbox1">
                        <button class="button-main" style = {{backgroundImage: "linear-gradient(#ffffff, #bebebe)", width: "fit-content", padding: "10px 30px"}} ><span style= {{color: "black", fontSize: "xx-large", fontWeight: "bold"}}>Sign Up</span></button>
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

export default Register;