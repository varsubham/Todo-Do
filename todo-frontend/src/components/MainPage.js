import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logoutUser} from '../actions/authActions'
import { Redirect } from 'react-router-dom';
import MainNavBar from './MainNavBar';
import axios from 'axios';
import EmptyComp from './main_comp/EmptyComp';
import TasksComp from './main_comp/TasksComp';
//const tasks_get = require('./axios_route/tasks_get');
//import tasks_get from './axios_route/tasks_get';
class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current_user: {},            // detail of current logged in user
            username: "",               // current logged in username(email)
            tasks: [],
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
            //console.log(this.state.username);
            //const k = tasks_get(this.state.username);
            // tasks_get(this.state.username);
            // console.log('after');

            //this.setState({tasks: tasks_get(this.state.username)})
            //console.log(tasks_get(this.state.username))
            // console.log(k);
            let tasks_list = [];
            const tasks_get = (username, callback) => {
            axios.get('http://localhost:5000/api/users/tasks/')
            .then(res => {
                //console.log(res.data[0].tasks)
                //console.log(res.data);
                //console.log(username);
                //console.log(username);
                tasks_list = res.data.filter(value =>{
                    //console.log(value.email);
                    return value.email === username;
                });
                //console.log(tasks_list[0].tasks);
                if(tasks_list.length){
                    //console.log(tasks_list[0].tasks);
                    callback();
                }
                //console.log(tasks_list);
        
            });
            
        }
        tasks_get(this.state.username, () => {
            this.setState({tasks: tasks_list[0].tasks});
            //console.log(tasks_list[0].tasks);
        })


        });
        //console.log(this.state.username);
        //tasks_get(this.state.username);

        // tasks_Get axios request
        //console.log(this.state.username);
        

        //tasks_get(this.state.username, () => {
            
        }
    render(){     
        //console.log(this.state.tasks);
        const ind_task_comp = this.state.tasks.map(value => {
            return <TasksComp key = {value._id} task = {value} />
        })
    return (
        <div>
            <MainNavBar function1 = {this.onLogoutClick} name = {this.state.username}/>
            {this.state.tasks.length > 0 ? ind_task_comp : <EmptyComp />}
            
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