// let k = [6];

// const { connect } = require("react-redux");

// let up_k = k.filter(val => {
//     return val === 6;
// })

// console.log(up_k)

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         if(true)
//             resolve('succesful');
//         else
//             reject('not successful');
//     }, 3000);
// });

// //console.log(typeof promise);
// //console.log('after promise')
// promise.then(message => {
//     console.log(message);
    
// })
// .catch(mes => console.log(mes));

// console.log('after promise');
// //console.log('after promise')
//let a = 5;
// function somefunc(callback){
//     setTimeout(() => {
//         // console.log('inside setTimeout func');
//         let a = 10;
//         callback();
//     },2000);
// }
// somefunc(() => console.log(a));


// let k = [2,4,6,8,34,3,1];

// let up_k = k.filter(val => {
//     return val == 4;
// })

// console.log(up_k);


// let k = [2,3,5,6,4,3];

// // for(let i = 0; i < k.length; i++){
// //     if(k[i] == 5){
// //         k[i] = 78;
// //     }
// // }

// let k1 = k.map(val => {
//     return val == 5 ? 43 : val;
// })

// console.log(k1);

//import _ from 'lodash';
const loda = require('lodash');
let tasks = [
    {
    _id: "12345678",
    subtasks: [
        {
            text: "text1",
            isCompleted: false,
        },
        {
            text: "text2",
            isCompleted: true,
        },
        {
            text: "text3",
            isCompleted: true,
        },
    ]
},
{
    _id: "12345",
    subtasks: [
        {
            text: "text4",
            isCompleted: false,
        },
        {
            text: "text5",
            isCompleted: true,
        },
        {
            text: "text6",
            isCompleted: true,
        },
    ]
}
]


// let a1 = tasks.map(val => {
//     if(val._id === "12345678"){
//         let f1 = val.subtasks.map(value => {
            
//                 return value.text === "text2" ? (() => {value.isCompleted = !value.isCompleted; return value})() : value;
            
//         })
//         return f1;
//     }
//     return val;
// })

let copy_task = loda.cloneDeep(tasks);

for(let i of copy_task){
    if(i._id === '12345678'){
        for(let j of i.subtasks){
            if(j.text === 'text2')
                j.isCompleted = !j.isCompleted;
        }
    }
}

console.log(copy_task[0].subtasks);
//console.log(tasks);
// let up_k = k.filter(val => {
//    if(val == 5)
//    return 78;
// })
// console.log(up_k);