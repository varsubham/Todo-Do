import React from 'react';
import { Redirect } from 'react-router-dom';
import MainNavBar from './MainNavBar';
class MainPage extends React.Component{
    constructor(props){
        super(props);
        let loggedin = true;
        const tokenstatus = localStorage.getItem('token');
        if(tokenstatus === null){
            loggedin = false;
        }
        this.state = {
            loggedin,
            uservalue: "",
        }
        
    }
    componentDidMount(){
        // console.log(this.props.location.state);
        // this.setState({uservalue: this.props.location.uservalue});
    }
    render(){
        //console.log(this.props.location.state.username1);
        //console.log(this.props.location.state);
        if(this.state.loggedin === false)
            return <Redirect to = '/'/>
           
    return (
        <div>
            <MainNavBar/>
            <h1>From Main Page only for users</h1>
        </div>
    )
    }
}



export default MainPage;