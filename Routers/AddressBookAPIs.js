const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const AddressBook = require('../Models/AddressBook')
router.post('/add-address', async (req, res) => {
    const {
        callsign,
        address,
        postalcode,
        city,
        state,
        province,
        phone,
        email,
        additionalInfo,
    } = req.body
    const user_ref = req.headers.id

    if (!callsign || !address || !postalcode || !city || !state || !province || !phone) {
        res.status(403).json({ error: "Please complete the form first*" })
    } else {
        const interData = new AddressBook({
            user_ref,
            callsign,
            address,
            postalcode,
            city,
            state,
            province,
            phone,
            email,
            additionalInfo,
        })
        const saveData = await interData.save()
        res.status(200).json({ msg: "data saved successfully" })
    }
})
router.get('/display-addresses', async (req, res) => {
    const ID = req.headers.id

    const data = await AddressBook.find({ user_ref: ID });
    const distinctCallsigns = [...new Set(data.map((obj) => obj.callsign))];
    const callsignes = await AddressBook.distinct("callsign")
    res.status(200).json({ data: data, callsignes: distinctCallsigns });
})

router.post('/update-address', async (req, res) => {
    const {
        callsign,
        address,
        postalcode,
        city,
        state,
        province,
        phone,
        email,
        additionalInfo,
    } = req.body
    const address_ref = req.headers.id

    const update = await AddressBook.updateOne({ _id: address_ref }, {
        $set: {
            callsign,
            address,
            postalcode,
            city,
            state,
            province,
            phone,
            email,
            additionalInfo,
        }
    })
    if (update.acknowledged == true) {
        const data = await AddressBook.find({ _id: address_ref });
        res.status(200).json({ data })
    } else {
        res.status(403).json({ error: "something went wrong" })
    }
})
router.get('/delete-address', async (req, res) => {
    const address_id = req.headers.id;
    const data = await AddressBook.deleteOne({ _id: address_id })
    if (data.acknowledged == true) {
        const data = await AddressBook.find();
        res.status(200).json({ data: data })
    } else {
        res.status(403).json({ error: "something went wrong" })
    }

})
module.exports = router;
