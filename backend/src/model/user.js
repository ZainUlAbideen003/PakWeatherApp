const mongoose = require('mongoose');
//
const { Schema } = mongoose;
const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: [true, 'Please enter Email Address.'],
        unique: true,
        lowercase: true
    },
    password : {
        type : String,
        required : [true, 'Password not provided.'],
    },
    created_at :{
        type : Date,
        default: Date.now()
    },
    status : {
        type : String,
        default : 'active'
    }
});

module.exports = mongoose.model('user', userSchema);