const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const Transport = require('../Models/Transport')
const AddressBook = require('../Models/AddressBook')
const Products = require('../Models/ProductsSchema')
router.post('/add-document', async (req, res) => {
    console.log(req.body);
    const {
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
        externalAppariance,
        port,
        noPackeges,
        annotations, } = req.body.documentData;
    const {
        address,
        postalcode,
        city,
        province,
    } = req.body.recipientData;

    const { finalProducts, lastProducts } = req.body;
    const products = [
        ...finalProducts,
        lastProducts
    ]
    const theseAreTheLastProducts = products.filter((val) => {
        return !val.productDescription == "";
    })
    if (theseAreTheLastProducts.length >= 1) {
        const user_ref = req.headers.id
        if (
            !docDate ||
            !transportStartTime ||
            !goodsTravilingByMeans ||
            !sanderAddress ||
            !agentInCharge ||
            !status ||
            !recipientName ||
            !goodDestinationNation ||
            !goodDestinationAddress ||
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

            const data2 = await Transport.find().count();
            if (data2 == 0) {

                const interedData = new Transport(
                    {
                        user_ref,
                        docNo: 1,
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
                        products: theseAreTheLastProducts
                    }
                )
                interedData.user_ref = user_ref
                const saved = await interedData.save();
                res.status(200).json({ message: "data submitted successfully" })
            } else {
                const data2 = await Transport.find();
                const lastIndex = data2.length - 1;
                const doc = data2[lastIndex];
                const docNo = doc.docNo + 1;
                console.log("not first");
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
                        products: theseAreTheLastProducts
                    }
                )
                interedData.user_ref = user_ref
                const saved = await interedData.save();
                res.status(200).json({ message: "data submitted successfully" })
            }
        }
    } else {
        res.status(403).json({ error: "atleast one product is required" })
    }
})

router.get('/get-recipitents-data', async (req, res) => {
    const id = req.headers.id;
    const data = await AddressBook.find({ user_ref: id });
    const data2 = await Transport.find().count();
    if (data2 == 0) {

        res.status(200).json({ data: data, docNo: 1 })
    } else {
        const data2 = await Transport.find();
        const lastIndex = data2.length - 1;
        const doc = data2[lastIndex];
        const docNo = doc.docNo + 1;
        res.status(200).json({ data: data, docNo })
    }
})


router.get('/display-transports', async (req, res) => {
    const ID = req.headers.id
    const data = await Transport.find({ user_ref: ID });
    let filteredDates = data.map(function (val) {
        return val.docDate.slice(-4);
    })
    let dates = filteredDates.filter(function (item, index) {
        return filteredDates.indexOf(item) === index;
    });
    res.status(200).json({ data: data, dates });
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
    res.status(200).json({ data: data });
})
router.get('/get-products-data', async (req, res) => {
    const data = await Products.find();
    res.status(200).json({ data })
})
router.get('/document-data', async (req, res) => {
    const ID = req.headers.documentid
    const data = await Transport.findOne({ _id: ID });
    res.status(200).json({ data: data });
})

router.post('/update-document', async (req, res) => {
    const { documentid } = req.headers
    const { documentData, finalProducts, lastProducts } = req.body;
    if (lastProducts.productDescription == "") {
        const products = [
            ...finalProducts,
        ]
        console.log(req.body, "updated data is up");
        const data = req.body;
        console.log(data, "this si the pudated data");
        const updated = await Transport.updateOne({ _id: documentid }, { $set: { documentData, products } })
        res.status(200).json({ message: "documento aggiornato" })
    } else {
        const products = [
            ...finalProducts,
            lastProducts
        ]
        const updated = await Transport.updateOne({ _id: documentid }, { $set: { documentData, products } })
        res.status(200).json({ message: "documento aggiornato" })
    }

})
module.exports = router