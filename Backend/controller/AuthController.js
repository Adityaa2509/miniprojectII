const User = require('../model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const signupController = async(req,resp)=>{
    
    try{
    const {username,email,password} = req.body;
    
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return resp.status(400).json({
                success:false,
            
            msg:"All fields are required"});
    }
        
    //    check whether iF USER alredy EXISTS
        if(await User.findOne({email}))
        {
            return resp.status(400).json({
                success:false,
                msg:'User already Exists',
            })
        }
    
            //securing the password by doing hashing of it
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return resp.status(500).json({
                success:false,
                msg:'Error inn hashing Password',
            });
        }
        try{
        await User.create({
          username,email,password:hashedPassword  
        })
        return resp.status(200).json({
            success:true,
            msg:"User Created SuccessFully"
        })}
        catch(err)
        {
            console.log(req.body);
            console.log(err)
            resp.status(500).json({
                success:false,
                msg:"Problem in adding user in model"
            })
        }


}catch(err){
      console.log(err)
            resp.status(500).json({
                success:false,
                msg:"Problem in adding user in model"
            })
}
}

const signinController = async(req,resp)=>{
    try{
    const {email,password} = req.body;
    if(!email || !password || email === '' || password === '')
    {
        return resp.status(400).json({
            success:false,
            msg:"All Fields are Required"
        })
    }
    let user = await User.findOne({email})
    if(!user)
    {
        return resp.status(404).json({
            success:false,
            msg:"User Do Not exists"
        })
    }

    const payLoad =
    {
        email:user.email,
        id:user._id,
        isAdmin:user.isAdmin
    } 

    if(await bcrypt.compare(password,user.password))
    {
        const token = jwt.sign(payLoad,
                               process.env.JWT_SECRET,
                               {expiresIn:"2h"})
        const {password,...userdata} = user._doc;
        const options={expires: new Date(Date.now() + 2*60*60*1000),
                        httpOnly:true,}                       
            resp.cookie("web_token",token,options);
            return resp.status(200).json({
                success:true,
                msg:"SignIn done successfully",
                userdata,
                token                
            })
}

    else{
        return resp.status(400).json({
            success:false,
            msg:"Password Do Not Match"
        })
    }

}
catch(err)
{
    console.error(err)
    resp.status(400).json({
        success:false,
        msg:"Error While Sign In"
    })
}
}

const logoutController = async(req,resp)=>{

     try {
    resp
      .clearCookie('web_token')
      .status(200)
      .json('User has been LogOut');
  } catch (err) {
    return resp.status(500).json({msg:"Problem while logout user"})
  }

}

module.exports = {signinController,signupController,logoutController};
