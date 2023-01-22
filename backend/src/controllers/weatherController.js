const weather = require('../model/weather');
const request = require('request');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();
var api_key = process.env.Weather_API;
const bulkCity = {"locations": [
    {
        "q": "Karachi"
    },
    {
        "q": "Sukkur"
    },
    {
        "q": "Larkana",
    },
    {
        "q" : "Lahore"
    },
    {
        "q" : "Islamabad"
    }
]}
var options = {
    method : "GET",
    url: `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=bulk`,
    headers: {
        'Content-Type':'application/json'
    },
    data : bulkCity,
    json: true
  };

  async function getWeatherData() {
    try{
        let resp = await axios(options)
        let resp2 = await resp.data;
        let insertData = await weather.findOneAndUpdate({ status: 'default' }, {$set : {
                    weather : resp2.bulk
                }}, {upsert:true}).then((response) => {
                    console.log('Data is Updated!');
                }).catch((e) => {
                    console.log("err=>",e)
                })
    }catch(e){
        console.log("error occurred in reading axios...",e)
    }
  }

  setInterval(() => {
    getWeatherData();

  },900000)
exports.getData = async (req, res) => {
    try {
        const getWeatherData = await weather.find({status : 'default'}).then((response) =>{
            res.status(200).json({
                data : response
            });
            console.log("Data fatched.");
        }).catch((e) => {
            console.log('err',e);
        })
    } catch (e) {
        res.json({
            error : e
        })
    }
};