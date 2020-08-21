import axios from 'axios';
const tasks_list;
const tasks_get = (username, callback) => {
    axios.get('/api/users/tasks/')
    .then(res => {
        //console.log(res.data[0].tasks)
        //console.log(res.data);
        //console.log(username);
        //console.log(username);
        tasks_list = res.data.filter(value =>{
            //console.log(value.email);
            return value.email === username;
        });
        //console.log(tasks_list[0].tasks);
        if(tasks_list.length){
            console.log(tasks_list[0].tasks);
            callback();
        }
        //console.log(tasks_list);

    });
    
}
const callback = () => {
    
}

export default tasks_get;