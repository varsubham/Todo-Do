import React from 'react';
import { Link } from 'react-router-dom';
const logo = require('../images/logo4.svg');

function Landing(){
    return (
        <div className = "container">
            <div className = "container-flex">
                <img width = "400" src = {logo} alt = ""/>
                <div className = "landing-description">
                    <h1>Let 2-do handle you Tasks</h1>
                    <Link to = '/register'>
                        <button class="button-main" ><span>Register</span></button>
                    </Link>
                </div>
                
            </div>
            
        </div>
    )
}

export default Landing;