import React from 'react';

class SubTaskComp extends React.Component{
    render(){
        //console.log(this.props.subtask);
        return (
            <div class="checkbox" style = {{border: "1px solid black", borderRadius: "4px", padding: "8px", margin: "8px 0px"}}>
                <label><input type="checkbox" value=""/> {this.props.subtask}</label>
            </div>
        )
    }
}



export default SubTaskComp;