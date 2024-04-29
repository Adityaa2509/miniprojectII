const bcrypt = require('bcrypt');
const User = require('../model/User');

const updateUser = async(req,resp)=>{
console.log(req.body)
  if(req.user.id !== req.params.userId){
    return resp.status(403).json({
        msg:'You are not allowed to update this user',
        params:req.params.userId,
        real:req.user.id
    })
}
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  try{
        const user2update = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                 email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
            }
        },{new:true})
        const {password,...userdata} = user2update._doc;
        resp.status(200).json({msg:"User Updated Successfully",userdata})
  }
  catch(err){
    console.log(err)
        return resp.status(400).json({msg:"Problem while updating user",err})
  }

}

const deleteUser = async(req,resp)=>{
    if(req.user.id !== req.params.userId){
        return resp.status(401).json({msg:"UnAuthorized Access"})
    }
    try{
      await User.findByIdAndDelete(req.params.userId);
      resp.status(200).json({msg:"User deleted Successfully"})

    }catch(err){
        return resp.status(500).json({msg:"Problem in deleting user"})
    }
}

const getUser = async (req, resp) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return resp.status(404).json({msg: "User Not Found"});
    }
    const { password, ...rest } = user._doc;
    resp.status(200).json(rest);
  } catch (err) {
    console.log(err);
    if (err.kind === 'ObjectId') {
      return resp.status(400).json({msg: "Invalid User ID"});
    }
    return resp.status(500).json({msg: "Problem while fetching User"});
  }
};


const getUsers = async (req, resp) => {
  return resp.status(200).json({msg:"Hello"})
};

module.exports = {updateUser,deleteUser,getUser,getUsers}