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
                text: {
                    type: String,
                },
                isCompleted: {
                    type: Boolean,
                },
                id: {
                    type: Number,
                }
            },
            position:{
                offSetTop: {type: Number, default: 0,},
                offSetLeft: {type: Number, default: 0,},
            },
        }
    ]
    

},{
    timestamps: true,
});

module.exports = UserDetail = mongoose.model('userDetail', userDetailSchema);