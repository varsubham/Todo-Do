import React from 'react';
import './tasksComp.css';
const dragElement = require('./draggable.js');
class TasksComp extends React.Component{
    componentDidMount(){
        dragElement(document.getElementById("task-border"));
  }
    
    render(){
        return (
            <div id = "task-border">
        <div class = "main-task">
            <h4>Create Task Component for React</h4>
            <div class="progress" style = {{width: "100%", margin: "auto", height: "25px", backgroundColor: "white"}}>
    <div class="progress-bar progress-bar-striped progress-bar-animated" style={{width: "40%", height: "25px"}}>40%</div>
  </div>
        </div>
        <div class = 'divider'></div>
        <div class = "sub-tasks">
            <h4>Sub-Tasks:-</h4>
            <div class="checkbox" style = {{border: "1px solid black", borderRadius: "4px", padding: "8px", margin: "8px 0px"}}>
                <label><input type="checkbox" value=""/> Option 1</label>
            </div>
            <div class="checkbox" style = {{border: "1px solid black", borderRadius: "4px", padding: "8px", margin: "8px 0px"}}>
                <label><input type="checkbox" value=""/> Option 1</label>
            </div>
            <div class="checkbox" style = {{border: "1px solid black", borderRadius: "4px", padding: "8px", margin: "8px 0px"}}>
                <label><input type="checkbox" value=""/> Option 1</label>
            </div>

        </div>
    </div>
        )
    }
}



export default TasksComp;