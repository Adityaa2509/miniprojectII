const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        mongoose.connect(process.env.DB_URL).then(
            console.log(`DB CONNECTED SUCCESSFULLY AT URL ${process.env.DB_URL}`)
        )
    }
    catch(err){
            console.error(err);
            console.log("Error while connecting to DB");
    }
}
module.exports = connectDb