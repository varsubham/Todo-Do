import React from 'react';
import './emptyComp.css';
const logo = require('../../images/logo3.svg');

class EmptyComp extends React.Component{
    render(){
        return (
            <div className = "empty-comp1">
                <img src = {logo} alt = "" width = '300' />
                <div style = {{textAlign: "center"}}>
                    <h5>You have no pending Tasks</h5>
                    <h6>Click below to add tasks</h6>
                    <button>Add Tasks</button>
                </div>
            </div>
        )
    }
}

export default EmptyComp;