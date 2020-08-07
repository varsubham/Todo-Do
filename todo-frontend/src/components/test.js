// let k = [6];

const { connect } = require("react-redux");

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
function somefunc(callback){
    setTimeout(() => {
        // console.log('inside setTimeout func');
        let a = 10;
        callback();
    },2000);
}
somefunc(() => console.log(a));