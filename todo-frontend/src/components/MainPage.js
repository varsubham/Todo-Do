import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logoutUser} from '../actions/authActions'
import { Redirect } from 'react-router-dom';
import MainNavBar from './MainNavBar';
import axios from 'axios';
import EmptyComp from './main_comp/EmptyComp';
import TasksComp from './main_comp/TasksComp';
class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current_user: {},            // detail of current logged in user
            username: "",               // current logged in username(email)
        }
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser();
        console.log('logout clicked')
    }
    componentDidMount(){
        // console.log(this.props.location.state);
        // this.setState({uservalue: this.props.location.uservalue});
        axios.get('http://localhost:5000/api/users/')
        .then(res => {
            const current_user = res.data.filter(val => {
                if(val._id === this.props.auth.user.id)
                    return val;
            })
            this.setState({current_user});
            this.setState({username: current_user[0].email})
            // console.log(this.state.username);
            //console.log(this.state.current_user[0].email);
            //console.log(this.state.current_user[0].email);
        });
    }
    render(){
        //console.log(this.props.location.state.username1);
        //console.log(this.props.location.state);
           const {user}  = this.props.auth;
           //console.log(this.state);
           
    return (
        <div>
            <MainNavBar function1 = {this.onLogoutClick} name = {this.state.username}/>
            <TasksComp/>
        </div>
    )
    }
}

MainPage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    {logoutUser}
) (MainPage);