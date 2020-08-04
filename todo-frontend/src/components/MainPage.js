import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logoutUser} from '../actions/authActions'
import { Redirect } from 'react-router-dom';
import MainNavBar from './MainNavBar';
class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
    }
    render(){
        //console.log(this.props.location.state.username1);
        //console.log(this.props.location.state);
           const {user}  = this.props.auth;
    return (
        <div>
            <MainNavBar function1 = {this.onLogoutClick} name = {user.name}/>
            <h1>Welcome  to the main Page</h1>
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