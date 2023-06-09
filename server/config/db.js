const mongoose = require('mongoose');

const connectDB = async () =>{
    try{

        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
        console.log(`MongoDB connected: ${db.connection.host}`);

    }catch(error){
        console.log(`MongoDB connection error: ${error.message}`);
    }
}

module.exports = connectDB;