import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavBar from './NavBar';

const logo = require('../images/logo4.svg');

class Landing extends React.Component{
    
    constructor(){
        super();
        this.state = {
        }
    }
    
    render(){
    return (
        <div>
            <NavBar/>
                <div className = "container">
                    <div className = "container-flex">
                        <img width = "400" src = {logo} alt = ""/>
                        <div className = "landing-description">
                            <h1>Let 2-do handle you Tasks</h1>
                            <Link to = '/register'>
                                <button className="button-main" ><span>Register</span></button>
                            </Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}
}
export default Landing;