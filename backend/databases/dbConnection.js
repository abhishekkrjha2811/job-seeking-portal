import mongoose from "mongoose";

export const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName : "JOB_PLACEMENT_SEEKING",
    }).then(()=>{
        console.log("connected to databases");
    }).catch((err)=>{
        console.log(`some error occured while connecting to databases: ${err}`);
    });
};

