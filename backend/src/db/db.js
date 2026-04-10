const mongoose = require('mongoose');

const connectDb = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/projects`);
        console.log('Db Conected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;