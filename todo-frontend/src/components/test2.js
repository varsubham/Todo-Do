let k = [
    {
        _id: "12345",
        position: {},
        main: 'xyz'
    },
    {
        _id: "123456",
        position: {},
        main: 'xyz2'
    },
    {
        _id: "123457",
        position: {},
        main: 'xyz3'
    },
];

// let k1 = k[2] === 5 ? (() => 78)() : k[2];

let k1 = k.map(val => {
    return((() => {
        return {_id: val._id,position: val.position}
    })())
})

console.log(k1);