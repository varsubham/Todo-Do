import React from 'react';
import SubTaskInput from './SubTaskInput';
import store from '../../../store';
import axios from 'axios';
import _ from 'lodash';
class AddTask extends React.Component{
    constructor(){
        super();
        this.state = {
            subtask_count: 1,
            username: '',
            usertaskfound: false,
            usertaskdetail: {},
            main_title: '',
            subtask_input: [''],
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeMain_title = this.onChangeMain_title.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    increment(){
        this.setState({subtask_count: this.state.subtask_count + 1}, this.setState({subtask_input: (() => {
            let temp = _.cloneDeep(this.state.subtask_input);
            temp.push('');
            return temp;
        })()}));
    }
    decrement(){
        if(this.state.subtask_count >= 2){
            this.setState({subtask_count: this.state.subtask_count - 1},this.setState({subtask_input: (() => {
                let temp = _.cloneDeep(this.state.subtask_input);
                temp.pop();
                return temp;
            })()}) );
    }}
    componentDidMount(){
        axios.get('/api/users/')
        .then(res => {
            const current_user_arr = res.data.filter(val => {
                if(val._id === store.getState().auth.user.id)
                    return val;
            });
            this.setState({username: current_user_arr[0].email}, () => {
                axios.get('/api/users/tasks/')
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
    onChangeInput(id, event){
        this.setState({subtask_input: (() =>{
            let copy_subtask_input = _.cloneDeep(this.state.subtask_input);
            copy_subtask_input[id - 1] = event.target.value;
            return copy_subtask_input;
        })()})
    }
    onChangeMain_title(e){
        this.setState({main_title: e.target.value})
    }
    onSave(){
        if(!this.state.usertaskfound){
            let sub_task_temp = this.state.subtask_input.map((val, index) => {
                return {
                    id: index + 1,
                    text: val,
                    isCompleted: false
                }
            });
            let temp_task = [
                {
                    subtasks: sub_task_temp,
                    maintitle: this.state.main_title,
                    position: {
                        offSetTop: 104,
                        offSetLeft: 104,
                    },
                }
            ]
            const userdetail = {
                email: this.state.username,
                tasks: temp_task,
            }
            axios.post('/api/users/tasks/', userdetail)
            .then(res => {
                console.log(res.data);
                window.location.reload(false);
            });
        }
        else if(this.state.usertaskfound){
            let sub_task_temp = this.state.subtask_input.map((val, index) => {
                return {
                    id: index + 1,
                    text: val,
                    isCompleted: false
                }
            });
            let temp_task = [
                {
                    subtasks: sub_task_temp,
                    maintitle: this.state.main_title,
                    position: {
                        offSetTop: 104,
                        offSetLeft: 104,
                    },
                }
            ]
            const userdetail = {
                tasks: temp_task,
            }
            axios.post(`/api/users/tasks/update/${this.state.usertaskdetail._id}`, userdetail)
            .then(res => {
                console.log(res.data);
                window.location.reload(false);
            })
        }
    }
    render(){
        let temp_arr = [];
        let subtaskinput = () => {
            for(let i = 1; i <= this.state.subtask_count; i++){
                temp_arr.push(<SubTaskInput key = {i} id = {i} onChangeInput = {this.onChangeInput} subtask_text = {this.state.subtask_input[i - 1]}/>);
            }
            return temp_arr;
        }
    return (
        <div>
        <div style = {{display: "flex", justifyContent: 'center', marginTop: '50px'}}> 
        <div className = "task-border" style = {{textAlign: "center", cursor: 'default', backgroundColor: "white", border: 'none', boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <div className = "main-task">
                    <input style = {{marginBottom: "10px"}} type="text" className="form-control" onChange = {this.onChangeMain_title} value = {this.main_title} id="main_title" aria-describedby="emailHelp" placeholder="Task Main-Title"/>
                    
                        <div style = {{display: 'flex'}}>
                            <div style = {{marginRight: "8px"}}>
                                <button onClick = {this.increment} type="button" className="btn btn-primary"><i className="fa fa-plus" style={{fontSize: '16px'}}></i></button>
                            </div>
                            <div>
                                <button onClick = {this.decrement} type="button" className="btn btn-primary"><i className="fa fa-minus" style={{fontSize: '16px'}}></i></button>
                            </div>
                            <div style = {{marginLeft: '70px'}}>
                                <button type="button" onClick = {this.onSave} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                </div>
                <div className="dropdown-divider"></div>
                <div className = "sub-tasks" style = {{border: '1px solid #217a7a'}}>
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