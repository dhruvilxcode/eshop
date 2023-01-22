import express from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

// route imports
import AuthRoutes from "./routes/auth.js";
// route imports


const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.use(morgan('tiny'));
// middlewares


// routes
app.use("/api/v1/auth", AuthRoutes);
// routes

app.get("/", (req, res)=>{
    res.send("Welcome.");
})

export default app;