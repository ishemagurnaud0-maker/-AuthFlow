import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

const app = express();


app.use(express.json());
const dbUri = process.env.MONGO_URI;
mongoose.connect(dbUri)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('Error connecting to MongoDB', err)
    process.exit(1);
})
import router from './routes/index.js'
app.use('/api/users',router);



const PORT = process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`)
})