import express from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.use(morgan('tiny'));

export default app;