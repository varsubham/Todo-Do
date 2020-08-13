import React from 'react';
import SubTaskInput from './SubTaskInput';
import store from '../../../store';
import axios from 'axios';
class AddTask extends React.Component{
    constructor(){
        super();
        this.state = {
            subtask_count: 1,
            username: '',
            usertaskfound: false,
            usertaskdetail: {},
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }
    increment(){
        this.setState({subtask_count: this.state.subtask_count + 1});
    }
    decrement(){
        if(this.state.subtask_count >= 2)
            this.setState({subtask_count: this.state.subtask_count - 1});
    }
    componentDidMount(){
        axios.get('http://localhost:5000/api/users/')
        .then(res => {
            //console.log(res.data);
            const current_user_arr = res.data.filter(val => {
                if(val._id === store.getState().auth.user.id)
                    return val;
            });
            this.setState({username: current_user_arr[0].email}, () => {
                axios.get('http://localhost:5000/api/users/tasks/')
                .then(res => {
                    const current_user_task = res.data.filter(val => {
                        if(val.email === this.state.username){
                            this.setState({usertaskfound: true});
                            return val;
                            
                        }
                    })
                    this.setState({usertaskdetail: current_user_task[0]});
                    if(!current_user_task.length)
                        this.setState({usertaskfound: false});
                })
            });
        })
    }
    render(){
        //console.log(this.props.auth.user);
        //console.log(store.getState().auth.user);
        //console.log(this.state.usertaskfound);
        console.log(this.state.usertaskdetail)
        let temp_arr = [];
        let subtaskinput = () => {
            for(let i = 1; i <= this.state.subtask_count; i++){
                temp_arr.push(<SubTaskInput id = {i}/>);
            }
            return temp_arr;
        }
    return (
        <div>
        <div style = {{display: "flex", justifyContent: 'center', marginTop: '50px'}}> 
        <div className = "task-border" style = {{textAlign: "center", cursor: 'default', backgroundColor: "white", border: 'none', boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <div class = "main-task">
                    <input style = {{marginBottom: "10px"}} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Task Main-Title"/>
                    
                        <div style = {{display: 'flex'}}>
                            <div style = {{marginRight: "8px"}}>
                                <button onClick = {this.increment} type="button" class="btn btn-primary"><i class="fa fa-plus" style={{fontSize: '16px'}}></i></button>
                            </div>
                            <div>
                                <button onClick = {this.decrement} type="button" class="btn btn-primary"><i class="fa fa-minus" style={{fontSize: '16px'}}></i></button>
                            </div>
                            <div style = {{marginLeft: '70px'}}>
                                <button type="button" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                </div>
                <div className="dropdown-divider"></div>
                <div class = "sub-tasks" style = {{border: '1px solid #217a7a'}}>
                    <h4>Sub-Tasks:-</h4>
                    {subtaskinput()}
                </div>
            </div>
            </div>
            </div>
    )
}
}
export default AddTask;