const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const connectDb = require('./config/database');
const AuthRouter = require('./router/AuthRoutes')
const UserRouter = require('./router/UserRoutes')
const PostRouter = require('./router/PostRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from http://localhost:5173
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));



app.use(cookieParser());

const CommentRouter = require('./router/CommentRoutes')
app.use('/api/auth',AuthRouter)
app.use('/api/user',UserRouter)
app.use('/api/post',PostRouter)
app.use('/api/comment',CommentRouter)


app.get('/HI',(req,resp)=>{
    resp.status(200).json({
        msg:"tETS api",   
    })
})


connectDb();
app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`);
})    


