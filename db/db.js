const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/login'

const connectDB = async()=>{
      
    try{
      await mongoose.connect(uri)
      console.log("created s");
    }catch(err){
        console.log(err);
    }
}
module.exports = connectDB;