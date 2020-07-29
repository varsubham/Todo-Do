import React from 'react';
import { Redirect } from 'react-router-dom';

class MainPage extends React.Component{
    constructor(){
        super();
        let loggedin = true;
        const tokenstatus = localStorage.getItem('token');
        if(tokenstatus === null){
            loggedin = false;
        }
        this.state = {
            loggedin
        }
    }
    render(){
        if(this.state.loggedin === false)
            return <Redirect to = './login'/>
    return (
        <h1>From Main Page only for users</h1>
    )
    }
}



export default MainPage;