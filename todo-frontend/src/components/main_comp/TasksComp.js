import React from 'react';
import './tasksComp.css';
import SubTaskComp from './SubTaskComp';
const dragElement = require('./draggable.js');
class TasksComp extends React.Component{
    componentDidMount(){
        //this will drag our component
        dragElement(document.getElementById(this.props.task._id));
  }
    
    render(){
        const sub_tasks_comp = this.props.task.subtasks.map(value => {
            return <SubTaskComp key = {value.id} subtask = {value} checkboxClicked = {this.props.checkboxClicked} task_id = {this.props.task._id}/>
        })

        let progress_percent = `${this.props.progress_percent}%`;

        return (
            <div id = {this.props.task._id} className = "task-border" style = {{left: `${this.props.position.offSetLeft}px`, top: `${this.props.position.offSetTop}px`, padding: "0",border: 'none', backgroundColor: '#73C2FB', width: '300px', boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <div className = "main-task">
                    <div style = {{backgroundColor: '#4CAFF7', boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" , borderRadius: '6px 6px 0 0', padding: '12px 12px 12px 12px', color: 'white', marginBottom: '18px'}}>
                        <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div onMouseUp = {() => this.props.changePosition(this.props.task._id)}>
                                <i id = {this.props.task._id+'header'} className="fa fa-arrows" style = {{fontSize: '30px', cursor: 'move'}}></i>
                            </div>
                            <div><i onClick = {() => this.props.ondelete(this.props.task._id)} className="fa fa-trash-o" style={{fontSize: '36px', cursor: 'pointer', visibility: this.props.progress_percent === 100 ? 'visible' : 'hidden'}}></i></div>
                        </div>
                        <div style = {{}}>
                            <h2 style = {{}}>{this.props.task.maintitle}</h2>
                        </div>
                    </div>
                    <div className="progress" style = {{width: "96%", margin: "auto", height: "16px", backgroundColor: "white", marginBottom: '18px'}}>
                        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: progress_percent, height: "16px", backgroundColor: '#00743f'}}>
                            {progress_percent}
                        </div>
                    </div>
                    <hr style = {{width:'90%'}}/>
                </div>
                
                <div className = "sub-tasks" style = {{border: 'none', marginBottom: '12px'}}>
                    <h4 style = {{color: 'white', marginBottom: '8px'}}>Sub-Tasks:-</h4>
                    {sub_tasks_comp}
                </div>
            </div>
        )
    }
}

export default TasksComp;