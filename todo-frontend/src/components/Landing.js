import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import store from '../store'
import wave from './img/wave.svg'
import landing_logo2 from "../images/landing_logo2.svg";
import arrow from "../images/arrow.svg";

class Landing extends React.Component{

    render(){
        if(store.getState().auth.isAuthenticated)
            return <Redirect to ='/main'/>
        return (
            <div>
                <NavBar/>
                <img className="wave2" src={wave} alt=""/>
                    <div className = "container">
                        <div className = "container-flex">
                            <div className = "landing-description">
                                <h1>Organize your tasks with this App.</h1>
                                <ul style = {{textAlign: "left"}} className = "landing_sub_detail">
                                    <li>Add Tasks along with checklist</li>
                                    <li>Drag your tasks around the dashboard</li>
                                    <li>Check it when task is completed</li>
                                    <li style = {{marginBottom: '16px'}}>Delete it</li>
                                    <li style = {{fontWeight: "bold"}}>Try Yourself <img width = "24px" src ={arrow} alt=""/></li>
                                </ul>
                                <div className = "landing_btn">
                                    <Link to = '/register'>Get Started</Link>
                                </div>
                            </div>
                            <img className = "landing_logo" width = "700" src = {landing_logo2} alt = ""/>
                        </div>
                    </div>
            </div>
        )
    }
}
export default Landing;