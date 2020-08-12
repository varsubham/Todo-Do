import React from 'react';

class SubTaskInput extends React.Component{
    render(){
        return (
            <div class="checkbox" style = {{border: "1px solid #217a7a", borderRadius: "4px", padding: "8px", margin: "8px 0px"}}>
                <input style = {{marginBottom: "10px"}} type="text" class="form-control" id = {this.props.id} aria-describedby="emailHelp" placeholder="Sub-Tasks"/>
            </div>
        )
    }
}





export default SubTaskInput;