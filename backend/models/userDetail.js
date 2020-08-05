const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema

const userDetailSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    // ['maintitle': String,
    //   'subtasks': Array]
    tasks: [
        {
            maintitle:{
                type: String,
            },
            subtasks:{
                type: Array,
                default: [],
            }
        }
    ]
    

},{
    timestamps: true,
});

module.exports = UserDetail = mongoose.model('userDetail', userDetailSchema);