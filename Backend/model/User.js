const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        
    },
    profilePicture:{
        type:String,
        default:'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

const User = mongoose.model("User",UserSchema);
module.exports = User;