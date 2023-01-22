const user = require('../model/user');
const weatherData = require('../model/weather');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt =  require('jsonwebtoken');

exports.getUsers = async (req, res) => {
    try {
        const userWeatherdata = await weatherData.find({userBy : req.userInfo.userId})
        const userPersonaldata = await user.findById(req.userInfo.userId)
        let newNote = {
            userWeatherdata,
            userPersonaldata
        }
        res.status(200).json({result :newNote});
    } catch (error) {
        res.json({
            error : error
        })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const findUser = await user.findOne({email : email});
        if(findUser){
            bcrypt.compare(password, findUser.password, (err, matched) => {
                if(matched){
                    const token = jwt.sign(
                        {
                            email: email,
                            userId : findUser._id
                        },  process.env.JWT_SECRET_KEY, {expiresIn : '2h'});
                        res.status(200).json({
                            token : token
                    })
                }else{
                    res.status(401).json({
                        error : 'Incorrect password or email.'
                    })
                }
            })
        }else{
            res.status(404).json({
                error : 'User not found.'
            })
        }
    } catch (error) {
        res.status(500).json({
            err: error
        })
    }
}

exports.addUser = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const insertData = await getData(req);
        insertData.save((err, result) => {
            if(!(err)){
                res.status(200).json({
                    message: 'User Added.'
                })
            }else{
                res.status(409).json({
                    message: err.message
                })
            }

        })
    }else{
        return res.status(400).json({ errors: errors.array() });
    }
}


async function getData(data){
    const {name, email, password} = data.body;
    try {
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password, salt);
        const userData =  new user({
            name: name,
            email: email,
            password : hashedPassword
        });
        return userData;
    } catch (error) {
        return error;   
    }
}