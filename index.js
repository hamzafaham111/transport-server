const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//Require APIs
const AuthAPIs = require('./Routers/AuthAPIs')
const AddressBookAPIs = require('./Routers/AddressBookAPIs')
const TransportAPIs = require('./Routers/TransportAPIs')
const app = express();

app.use(express.json())
app.use(cors());
require('dotenv').config();
const Auth = require('../Models/AuthSchema')
mongoose.set('strictQuery', true); // just to avoid a warning

const PORT = 4000 || process.env.PORT;
require('./Connection')

//APIs Routs
app.use('/', AuthAPIs);
app.use('/', AddressBookAPIs)
app.use('/', TransportAPIs)

app.get('/test', (req, res) => {
    res.send("working")
})

app.get('/test2', async (req, res) => {
    console.log("hellp I am text2");
    const exist = await Auth.find()
    res.send(exist)
})

app.listen(PORT, () => { console.log(`server is running on port ${PORT}`) })