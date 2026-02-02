import mongoose from 'mongoose';
import dotenv from 'dotenv';
// dotenv loads configuration from .env file

dotenv.config()
// reads the .env file and loads the variables there to process.env


// main connection function
const connectDB = async() => {
    try{
        // connection string from the .env file - checks if mongodb_uri exists 
        const connection = process.env.MONGODB_URI || 'mongodb://localhost:27017/gameConsoleDB';

        // connection to mongodb
        await mongoose.connect(connection);
        // waits on the previous thing to work then creates the db if it doesnt exist
        // connects to the server in the url

        // success msg
        console.log(`mongoDB has connected successfully.`)
        console.log(`Database: ${mongoose.connection.db.databaseName}`)
    }catch (error){
        console.error(`mongoDB connection error:`, error.message)
        process.exit(1)
        // process.exit(1) - stops the entire app if the connection fails
    }
}

// handling connection events
// mongoose.connection.on(`connected`, () => {
//     console.log(`mongodb connected to game console database`)
// })

// mongoose.connection.on(`error`, (err) => {
//     console.error(`mongodb connection error:`, err)
// })

// mongoose.connection.on(`disconnected`, () => {
//     console.log(`mongodb disconnected`)
// });

export default connectDB;