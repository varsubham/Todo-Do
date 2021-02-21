import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo3.svg';
function NavBar(){
    return (
        <div>
            <nav className="navbar navbar-custom navbar-expand-lg navbar-dark ">
                <div className="container">
                    <Link  className="navbar-brand" style = {{paddingLeft: "20px"}} to = '/'>
                        <img src={logo} height = "70" className="d-inline-block align-top" alt = ""/> 
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to = '/' style = {{fontSize: "28px", fontWeight: "bold", marginLeft: "24px"}}>Home</Link>
                            </li>
                        </ul>
                        <div style = {{marginRight: "20px"}}>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active" style = {{fontSize: "20px", fontWeight: "bold", float: "right", marginLeft: "24px"}}>
                                    <Link className="nav-link" to = '/login'>Login</Link>
                                 </li>
                                <li className="nav-item active" style = {{fontSize: "20px", fontWeight: "bold", marginLeft: "24px"}}>
                                    <Link  to = '/register' className="nav-link">Register</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;