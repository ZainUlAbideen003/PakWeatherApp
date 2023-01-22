const express = require('express');
const app = express();
require('dotenv').config();
const database = require('./database');
const routes = require('./router/routes');
const port = process.env.PORT || 5000;
const cors = require('cors');
database();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use('/', routes);


app.listen(port, (error) => {
    if(error) console.log(error)
    else console.log(`Server listen at ${port}.`);
});