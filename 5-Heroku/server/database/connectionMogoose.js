const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL)
    } catch(err) {
        console.log(err)
        process.exit(1);
    }
}

module.exports = connectDB;