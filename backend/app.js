import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

//importing routes
import userRouter from './routes/userRouter.js'
import applicationRouter from './routes/applicationRouter.js'
import jobRouter from './routes/jobRouter.js'

//importing dbConnection
import {dbConnection} from './databases/dbConnection.js'

//importing middleware
import {errorMiddleware} from './middlewares/error.js'


const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
    cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true,

    })
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//can use muttler also
app.use(
    fileUpload({
        useTempFiles :true,
        tempFileDir : "/tmp/",
    })
);

//using routes
app.use('/api/v1/user',userRouter);
app.use('/api/v1/application',applicationRouter);
app.use('/api/v1/job',jobRouter);

//dbconnection
dbConnection();


//middlewares
app.use(errorMiddleware);


export default app;