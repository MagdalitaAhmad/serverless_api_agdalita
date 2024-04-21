const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const dbCloudUrl = 'mongodb+srv://magdalitaahmad93:9h3gijn6@cluster0.lt6ddot.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0';
const dbLocalUrl = 'mongodb://localhost:27017/node-api';

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(dbCloudUrl || dbLocalUrl)
    .then(() => console.log('connected to monggo db'))
    .catch((error) => console.log('failed to connect mongo db', error));
     
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);