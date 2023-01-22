const jwt = require('jsonwebtoken');
require('dotenv').config();
auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
        if(result){
            req.userInfo = result
            return next();
        }else{
            return res.status(404).json({
                err: `You are unauthorized ${err}.`
            })
        }
    });
}
module.exports = auth