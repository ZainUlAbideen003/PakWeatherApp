const mongoose = require('mongoose');
const dbUrl = "mongodb://0.0.0.0:27017/weather";
const connect = async () => {
    // mongoose.connect(dbUrl, (err, db) =>{
    //     if(err) console.log(err)
    //     else console.log('Mongoose connected.')
    // });
    try{
        await mongoose.connect(dbUrl);
        console.log('mongoose connected.')
    }catch(e){
        console.log('error occurred',e)
    }
    
}

module.exports = connect;