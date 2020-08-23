import React from 'react';

class SubTaskComp extends React.Component{
    render(){
        return (
            <div className="checkbox" style = {{border: "none" , boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: 'white', borderRadius: "4px", padding: "8px", margin: "8px 0px"}}>
                <label style = {{display: 'flex',}}>
                    <input id = {this.props.subtask.id} style ={{marginTop: '7px', marginRight: '6px', verticalAlign: 'middle'}} checked = {this.props.subtask.isCompleted} onChange = {() => this.props.checkboxClicked(this.props.subtask.id, this.props.task_id)} type="checkbox" value=""/> 
                    <p style = {{verticalAlign:'middle'}}>{this.props.subtask.text}</p>
                </label>
            </div>
        )
    }
}

export default SubTaskComp;