import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logoutUser} from '../actions/authActions'
import MainNavBar from './MainNavBar';
import axios from 'axios';
import EmptyComp from './main_comp/EmptyComp';
import TasksComp from './main_comp/TasksComp';
import _ from 'lodash';
class MainPage extends React.Component{
    constructor(props){
        super(props);
        let isLoading = true;
        this.state = {
            current_user: {},            // detail of current logged in user
            username: "",               // current logged in username(email)
            tasks: [],
            userdetail_id : "",
            isLoading
        }

        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.checkboxClicked = this.checkboxClicked.bind(this);
        this.onchangePosition = this.onchangePosition.bind(this);
        this.ondelete = this.ondelete.bind(this);
    }
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser();
    }
    componentDidMount(){
        axios.get('/api/users/')
        .then(res => {
            //get logged in user email id(username)
            const current_user = res.data.filter(val => {
                if(val._id === this.props.auth.user.id)
                    return val;
            })
            this.setState({current_user});
            this.setState({username: current_user[0].email})

            //get tasks list of current logged in user
            let tasks_list = [];
            const tasks_get = (username, callback) => {
            axios.get('/api/users/tasks/')
            .then(res => {
                tasks_list = res.data.filter(value =>{
                    return value.email === username;
                });
                if(tasks_list.length){
                    //run the call back function if user has added some tasks
                    callback();
                }
                else{
                    this.setState({isLoading: false});
                }
        
                });
            }
            tasks_get(this.state.username, () => {
                //add the tasks list to the state variable
                this.setState({tasks: tasks_list[0].tasks}, () => this.setState({isLoading: false}));
                this.setState({userdetail_id: tasks_list[0]._id});
                })
        });
    }
    checkboxClicked(subtask_id, task_id){
        //making clone of previous state and will updated only clicked checkbox value
        let copy_state = _.cloneDeep(this.state.tasks);
        for(let i of copy_state){
            if(i._id === task_id){
                for(let j of i.subtasks){
                    if(j.id === subtask_id)
                        j.isCompleted = !j.isCompleted;
                }
            }
        }
        this.setState({tasks: copy_state}, (this.update_db));
    }
    update_db(){
        //for updating the database when user clicks a click box or when user changes position of TaskComp
        const updated_task_details = {
            email: this.state.username,
            tasks: this.state.tasks,
        }
        axios.post(`/api/users/tasks/${this.state.userdetail_id}`, updated_task_details)
        .then(res => {
            //console.log(res);
            console.log(res.data);
        });
    }
        
    onchangePosition(comp_id){
        const k_left = document.getElementById(comp_id).offsetLeft;
        const k_top = document.getElementById(comp_id).offsetTop;
        // Check if the position has changed then only update database
        let copy_state = _.cloneDeep(this.state.tasks);
        for(let i of copy_state){
            if(i._id === comp_id){
                if(i.position.offSetTop !== k_top || i.position.offSetLeft !== k_left){
                    i.position = {offSetLeft: k_left, offSetTop: k_top};
                    this.setState({tasks: copy_state}, this.update_db);
                    break;
                }
            }
        }
    }
    ondelete(id){
        const updated_task = this.state.tasks.filter(val => {
            if(val._id === id)
                return false;
            else 
                return true;
        });
        if(window.confirm('Do you Really Want to delete your Task ?'))
            this.setState({tasks: updated_task}, this.update_db);
    }

    render(){
        const ind_task_comp = this.state.tasks.map(value => {
            let subtasks_length = value.subtasks.length;
            let checked_number = 0 ;
            for(let i of value.subtasks){
                if(i.isCompleted)
                    checked_number += 1;
            }
            let progress_percent = Math.round((checked_number / subtasks_length) * 100);
            return <TasksComp key = {value._id} ondelete = {this.ondelete} changePosition = {this.onchangePosition} position = {value.position} task = {value} checkboxClicked = {this.checkboxClicked} progress_percent = {progress_percent} />
        })
        return (
            <div>
                <MainNavBar function1 = {this.onLogoutClick} name = {this.state.username}/>
                {
                    this.state.isLoading ? 
                    <div className = "text-center">
                        <h1 style = {{fontSize: "70px" , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Loading
                            <div className="spinner-border" style={{width: "10rem", height: "10rem"}} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </h1>
                    </div> : 
                    this.state.tasks.length > 0 ? 
                    ind_task_comp : 
                    <EmptyComp />
                }
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