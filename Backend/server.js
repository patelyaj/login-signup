import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDb from './config/configDb.js';
import cookieParser from 'cookie-parser';
configDotenv();
connectDb();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({

}))
// app.use(express.urlencoded(true));

app.get('/login/:id',(req,res)=>{

})

app.get('/checkbackend',(req,res)=>{
    // console.log('hel');
    // res.send('hello');
    try {
        res.json('okk');
    } catch (error) {
        res.json(res.status('404'),error)
    }
});

app.listen(process.env.PORT,()=>{
    console.log(`runnning on http://localhost:${process.env.PORT}`);
});