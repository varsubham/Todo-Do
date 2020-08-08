import React from 'react';
import './tasksComp.css';
import SubTaskComp from './SubTaskComp';
const dragElement = require('./draggable.js');
class TasksComp extends React.Component{
    componentDidMount(){
        dragElement(document.getElementById(this.props.task._id));
  }
    
    render(){
        console.log(this.props);
        const sub_tasks_comp = this.props.task.subtasks.map(value => {
            return <SubTaskComp subtask = {value} checkboxClicked = {this.props.checkboxClicked} task_id = {this.props.task._id}/>
        })
        return (
            <div id = {this.props.task._id} className = "task-border">
        <div class = "main-task">
            <h4>{this.props.task.maintitle}</h4>
            <div class="progress" style = {{width: "100%", margin: "auto", height: "25px", backgroundColor: "white"}}>
    <div class="progress-bar progress-bar-striped progress-bar-animated" style={{width: "40%", height: "25px"}}>40%</div>
  </div>
        </div>
        <div class = 'divider'></div>
        <div class = "sub-tasks">
            <h4>Sub-Tasks:-</h4>
            {sub_tasks_comp}

        </div>
    </div>
        )
    }
}



export default TasksComp;