import mongoose from "mongoose";

function connect(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(()=>{
        console.log("Connected To Database")
    })
    .catch((error)=>{
        console.log("Error connecting to the database",error.message)
    })
}

export default connect