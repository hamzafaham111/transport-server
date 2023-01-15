const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const Transport = require('../Models/Transport')
const AddressBook = require('../Models/AddressBook')
const Products = require('../Models/ProductsSchema')
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
        productDescription,
        netPrice,
        pricePerKg,
        grossPrice,
        textPrice,
        externalAppariance,
        port,
        noPackeges,
        annotations, } = req.body.documentData
    const {
        address,
        postalcode,
        city,
        province,
    } = req.body.recipientData;
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
        !goodDestinationNation ||
        !career1 ||
        !causal ||
        !externalAppariance ||
        !port ||
        !noPackeges) {
        console.log("should fill the complete form");
        res.status(403).json({ error: "Please Fill Your Form Completely" })
    } else {
        const date = docDate;
        const parts = date.split("-");
        const reversedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
        console.log(reversedDate);
        const interedData = new Transport(
            {
                user_ref,
                docNo,
                docDate: reversedDate,
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
        const interedData2 = new Products({
            productDescription,
            netPrice,
            pricePerKg,
            grossPrice,
            textPrice,
        })
        interedData.user_ref = user_ref
        const saved = await interedData.save();
        const saved2 = await interedData2.save();
        res.status(200).json({ message: "data submitted successfully" })

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
    const userID = req.headers.userid
    const data = await Transport.deleteOne({ _id: ID });
    if (data.acknowledged == true) {

        const data2 = await Transport.find({ user_ref: userID });
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
router.get('/get-products-data', async (req, res) => {
    const data = await Products.find();
    res.status(200).json({ data })
})
router.get('/document-data', async (req, res) => {
    const ID = req.headers.documentid
    console.log(ID)
    const data = await Transport.findOne({ _id: ID });
    console.log(data)
    res.status(200).json({ data: data });
})

router.post('/update-document', async (req, res) => {
    const { documentid } = req.headers
    const data = req.body.documentData;
    const updated = await Transport.updateOne({ _id: documentid }, { $set: data })
    console.log(updated);
    res.status(200).json({ data: "" })
})
module.exports = router