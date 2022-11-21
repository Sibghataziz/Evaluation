import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const connection = async () => {
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.zopdele.mongodb.net/?retryWrites=true&w=majority`);
    // await mongoose.connect('mongodb://127.0.0.1:27017/test')
}

export default connection

