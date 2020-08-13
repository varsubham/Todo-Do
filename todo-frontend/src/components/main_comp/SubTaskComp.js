import React from 'react';

class SubTaskComp extends React.Component{
    render(){
        //console.log(this.props.subtask);
        return (
            <div class="checkbox" style = {{border: "1px solid black", borderRadius: "4px", padding: "8px", margin: "8px 0px"}}>
                <label><input id = {this.props.subtask.id} checked = {this.props.subtask.isCompleted} onChange = {() => this.props.checkboxClicked(this.props.subtask.id, this.props.task_id)} type="checkbox" value=""/> {this.props.subtask.text}</label>
            </div>
        )
    }
}



export default SubTaskComp;