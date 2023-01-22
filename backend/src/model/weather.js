const mongoose = require('mongoose');
const { Schema } = mongoose;

const weatherSchema = new Schema({
    weather : {
        type: Array
    },
    status : {
        type : String,
        default : 'default'
    }
});

module.exports = mongoose.model('weather', weatherSchema)