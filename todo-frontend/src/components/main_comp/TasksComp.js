import React from 'react';
import './tasksComp.css';
import SubTaskComp from './SubTaskComp';
const dragElement = require('./draggable.js');
class TasksComp extends React.Component{
    componentDidMount(){
        dragElement(document.getElementById(this.props.task._id));
  }
    
    render(){
        //console.log(this.props);
        const sub_tasks_comp = this.props.task.subtasks.map(value => {
            // console.log(value.id);
            return <SubTaskComp key = {value.id} subtask = {value} checkboxClicked = {this.props.checkboxClicked} task_id = {this.props.task._id}/>
        })
        let progress_percent = `${this.props.progress_percent}%`;
        return (
            <div id = {this.props.task._id} className = "task-border" onMouseUp = {() => this.props.changePosition(this.props.task._id)} style = {{left: `${this.props.position.offSetLeft}px`, top: `${this.props.position.offSetTop}px`, width: '300px'}}>
                <div className = "main-task">
                    <div>
                    <i id = {this.props.task._id+'header'} class="fa fa-arrows" style = {{fontSize: '36px', cursor: 'move'}}></i>
                    </div>
                    <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h4>{this.props.task.maintitle}</h4>
                        <div><i onClick = {() => this.props.ondelete(this.props.task._id)} class="fa fa-trash-o" style={{fontSize: '36px', cursor: 'pointer', visibility: this.props.progress_percent === 100 ? 'visible' : 'hidden'}}></i></div>
                    </div>
                    <div className="progress" style = {{width: "100%", margin: "auto", height: "25px", backgroundColor: "white"}}>
                        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: progress_percent, height: "25px"}}>
                            {progress_percent}
                        </div>
                    </div>
                </div>
                <div className = 'divider'></div>
                <div className = "sub-tasks">
                    <h4>Sub-Tasks:-</h4>
                    {sub_tasks_comp}
                </div>
            </div>
        )
    }
}



export default TasksComp;