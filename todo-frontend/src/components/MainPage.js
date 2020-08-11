import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logoutUser} from '../actions/authActions'
import { Redirect } from 'react-router-dom';
import MainNavBar from './MainNavBar';
import axios from 'axios';
import EmptyComp from './main_comp/EmptyComp';
import TasksComp from './main_comp/TasksComp';
import _ from 'lodash';
//const tasks_get = require('./axios_route/tasks_get');
//import tasks_get from './axios_route/tasks_get';
class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current_user: {},            // detail of current logged in user
            username: "",               // current logged in username(email)
            tasks: [],
            userdetail_id : "",
            taskCompPosition: [],
        }
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.checkboxClicked = this.checkboxClicked.bind(this);
        //this.update_db = this.update_db.bind(this);
        this.onchangePosition = this.onchangePosition.bind(this);
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
                //console.log(res.data);
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
            //console.log(tasks_list[0]._id);
            this.setState({userdetail_id: tasks_list[0]._id});
            //console.log(tasks_list[0].tasks);
            //console.log(tasks_list[0]);
            let temp_position = tasks_list[0].tasks.map((val) => {
                return (() => {
                    return {_id: val._id, position: val.position}
                })();
            });
            //console.log(temp_position);
            this.setState({taskCompPosition: temp_position}, () => console.log(this.state));
        })


        });
        //console.log(this.state.username);
        //tasks_get(this.state.username);

        // tasks_Get axios request
        //console.log(this.state.username);
        

        //tasks_get(this.state.username, () => {
            
        }
        checkboxClicked(subtask_text, task_id){
            let copy_state = _.cloneDeep(this.state.tasks);
            // let copy_state = this.state.tasks.map(val => {
            //     if(val._id === task_id){
            //         let temp = val.subtasks.map(value => {
            //             return value.text === subtask_text ? (() => {
            //                 value.isCompleted = !value.isCompleted;
            //                 return value
            //             })() : value ;
            //         })
            //         return temp;
            //     }
            //     return val;
            // })
            for(let i of copy_state){
                if(i._id === task_id){
                    for(let j of i.subtasks){
                        if(j.text === subtask_text)
                            j.isCompleted = !j.isCompleted;
                    }
                }
            }
            console.log(copy_state);

            this.setState({tasks: copy_state}, (this.update_db));
            // const updated_task_details = {
            //     email: this.state.username,
            //     tasks: this.state.tasks,
            // }
            // axios.post(`http://localhost:5000/api/users/tasks/${this.state.userdetail_id}`, updated_task_details)
            // .then(res => {
            //     console.log(res);
            //     console.log(res.data);
            //   });
            //console.log(subtask_text,"     ", task_id);
            // console.log(this.state.tasks);
            // console.log(copy_state);
            //console.log(this.state.username);
            // update_db(){
                
                
            // }
        }
        update_db(){
            console.log(this.state.tasks);
            const updated_task_details = {
                email: this.state.username,
                tasks: this.state.tasks,
            }
            axios.post(`http://localhost:5000/api/users/tasks/${this.state.userdetail_id}`, updated_task_details)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        }
        
        onchangePosition(comp_id){
            const k_left = document.getElementById(comp_id).offsetLeft;
            const k_top = document.getElementById(comp_id).offsetTop;
            setTimeout(() => {
                let copy_state = _.cloneDeep(this.state.tasks);
            console.log(copy_state);
            for(let i of copy_state){
                if(i._id === comp_id)
                    i.position = {offSetLeft: k_left, offSetTop: k_top};
            }
            //console.log(copy_state);
            //console.log(this.state.tasks);
            this.setState({tasks: copy_state}, this.update_db);
            }, 300)
            // let copy_state = _.cloneDeep(this.state.tasks);
            // console.log(copy_state);
            // for(let i of copy_state){
            //     if(i._id === comp_id)
            //         i.position = {offSetLeft: k_left, offSetTop: k_top};
            // }
            // //console.log(copy_state);
            // //console.log(this.state.tasks);
            // this.setState({tasks: copy_state}, this.update_db);
            }
        
    render(){
        
        
        //console.log(this.state.tasks);
        console.log(this.state.tasks);
        const ind_task_comp = this.state.tasks.map(value => {
            let subtasks_length = value.subtasks.length;
            let checked_number = 0 ;
            for(let i of value.subtasks){
                if(i.isCompleted)
                    checked_number += 1;
            }
            let progress_percent = Math.round((checked_number / subtasks_length) * 100);
            return <TasksComp key = {value._id} changePosition = {this.onchangePosition} position = {value.position} task = {value} checkboxClicked = {this.checkboxClicked} progress_percent = {progress_percent} />
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