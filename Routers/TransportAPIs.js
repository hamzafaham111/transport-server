const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Transport = require('../Models/Transport')
const AddressBook = require('../Models/AddressBook')
router.post('/transport', async (req, res) => {
    console.log(req.body);
    const {
        docNo,
        docDate,
        transportStartTime,
        goodsTravilingByMeans,
        sanderAddress,
        agentInCharge,
        status,
        recipientName,
        recipientaddress,
        recipientPostalCode,
        recipientCity,
        recipientProvince,
        recipientNation,
        goodDestinationAddress,
        goodDestinationPostalCode,
        goodsDestinationCity,
        goodDestinationProvince,
        goodDestinationNation,
        career1,
        career2,
        career3,
        causal,
        externalAppariance,
        port,
        noPackeges,
        annotations, } = req.body.documentData
    const { callsign,
        address,
        postalcode,
        city,
        state,
        province,
        phone,
        email,
        additionalInfo, } = req.body.recipientData;
    const user_ref = req.headers.id
    if (
        !docNo ||
        !docDate ||
        !transportStartTime ||
        !goodsTravilingByMeans ||
        !sanderAddress ||
        !agentInCharge ||
        !status ||
        !recipientName ||
        // !recipientaddress ||
        // !goodDestinationAddress ||
        // !goodDestinationPostalCode ||
        // !goodsDestinationCity ||
        // !goodDestinationProvince ||
        !goodDestinationNation ||
        !career1 ||
        !causal ||
        !externalAppariance ||
        !port ||
        !noPackeges) {
        console.log("should fill the complete form");
        res.status(403).json({ error: "Please Fill Your Form Completely" })
    } else {
        // if (password == cpassword) {
        //     const exist = await Auth.findOne({ email }).count();
        //     if (exist == 0) {
        const interedData = new Transport(
            {
                user_ref,
                docNo,
                docDate,
                transportStartTime,
                goodsTravilingByMeans,
                sanderAddress,
                agentInCharge,
                status,
                recipientName,
                recipientaddress: address,
                recipientPostalCode: postalcode,
                recipientCity: city,
                recipientProvince: province,
                recipientNation,
                goodDestinationAddress,
                goodDestinationPostalCode,
                goodsDestinationCity,
                goodDestinationProvince,
                goodDestinationNation,
                career1,
                career2,
                career3,
                causal,
                externalAppariance,
                port,
                noPackeges,
                annotations,
            }
        )
        interedData.user_ref = user_ref
        const saved = await interedData.save();
        res.status(200).json({ message: "data submitted successfully" })
        // } else {
        //     res.status(403).json({ error: "email alredy registered" })
        // }
        // } else {
        //     console.log("Password does match");
        //     res.status(403).json({ error: "password does not match" })
        // }
    }
})
router.get('/get-recipitents-data', async (req, res) => {
    const id = req.headers.id;
    const data = await AddressBook.find({ user_ref: id });
    res.status(200).json({ data: data })
})

router.get('/display-transports', async (req, res) => {
    const ID = req.headers.id

    const data = await Transport.find({ user_ref: ID });

    res.status(200).json({ data: data });
})
router.get('/delete-transports', async (req, res) => {
    const ID = req.headers.id
    const data = await Transport.deleteOne({ _id: ID });
    if (data.acknowledged == true) {

        const data2 = await Transport.find();
        res.status(200).json({ data: data2 })
    } else {
        res.status(403).json({ error: "something went wrong" })
    }
})
router.get('/display-transport-view', async (req, res) => {
    const ID = req.headers.id

    const data = await Transport.findOne({ _id: ID });
    console.log(data)
    res.status(200).json({ data: data });
})
module.exports = router