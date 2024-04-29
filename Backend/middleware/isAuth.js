const jwt = require('jsonwebtoken');
const isAuth = async (req, resp, next) => {
 const token = req.cookies.web_token;
  if (!token) {
    return resp.status(401).json({
        
        msg:"Unauthorized Access"
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
       return resp.status(401).json({
        
        msg:"Unauthorized Access"
    });
    }
    req.user = user;
    console.log(user)
    next();})
};

module.exports = isAuth