const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Auth = require('../Models/AuthSchema')
router.post('/register', async (req, res) => {
    const { username, email, password, cpassword } = req.body
    if (!username || !email || !password || !cpassword) {
        console.log("should fill the complete form");
        res.status(403).json({ error: "Si prega di compilare il modulo in modo completo" })
    } else {
        if (password == cpassword) {
            const exist = await Auth.findOne({ email }).count();
            if (exist == 0) {
                const interedData = new Auth({ username, email, password, cpassword })
                const saved = await interedData.save();
                res.status(200).json({ data: saved })
            } else {
                res.status(403).json({ error: "email già registrata" })
            }
        } else {
            console.log("Password does match");
            res.status(403).json({ error: "La password non corrisponde" })
        }
    }
})
router.post('/login', async (req, res) => {
    const {
        enterEmail,
        enterPassword
    } = req.body

    if (!enterEmail || !enterPassword) {
        console.log("should fill the complete form");
        res.status(403).json({ error: "Si prega di compilare il modulo in modo completo" })
    }

    else {
        const exist = await Auth.findOne({
            $and: [
                { email: enterEmail },
                { password: enterPassword }
            ]
        }).count()
        if (exist == 1) {
            const data = await Auth.findOne({ email: enterEmail })
            res.status(200).json({ data })
        } else {
            res.status(403).json({ error: "Email e password non esistono" })
        }
    }
})
module.exports = router;