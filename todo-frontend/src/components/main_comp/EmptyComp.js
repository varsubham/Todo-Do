import React from 'react';
import './emptyComp.css';
import empty from '../img/empty.svg';
class EmptyComp extends React.Component{
    render(){
        return (
            <div className = "empty-comp1">
                <img src = {empty} alt = "" width = '300' />
                <div style = {{textAlign: "center"}}>
                    <h2 style = {{marginBottom: '16px'}}>You Don't have any pending Task</h2>
                    <h4>Click <i className="fa fa-plus"></i> on top to add tasks</h4>
                    <hr/>
                </div>
            </div>
        )
    }
}

export default EmptyComp;