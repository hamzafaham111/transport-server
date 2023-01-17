const mongoose = require('mongoose');
const TransportSchema = mongoose.Schema({
    user_ref: {
        type: String,
        required: true,
    },
    docNo: {
        type: String,
        required: true,
    },
    docDate: {
        type: String,
        required: true,
    },
    transportStartTime: {
        type: String,
        required: true,
    },
    goodsTravilingByMeans: {
        type: String,
        required: true,
    },
    sanderAddress: {
        type: String,
        required: true,
    },
    agentInCharge: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    recipientName: {
        type: String,
        required: true,
    },
    recipientaddress: {
        type: String,
        required: true,
    },
    recipientPostalCode: {
        type: String,

    },
    recipientCity: {
        type: String,

    },
    recipientProvince: {
        type: String,

    },
    recipientNation: {
        type: String,

    },
    goodDestinationAddress: {
        type: String,
        required: true,
    },
    goodDestinationPostalCode: {
        type: String,
        required: true,
    },
    goodsDestinationCity: {
        type: String,
        required: true,
    },
    goodDestinationProvince: {
        type: String,
        required: true,
    },
    goodDestinationNation: {
        type: String,
        required: true,
    },
    career1: {
        type: String,
        required: true,
    },
    career2: {
        type: String,

    },
    career3: {
        type: String,

    },
    causal: {
        type: String,
        required: true,
    },
    externalAppariance: {
        type: String,
        required: true,
    },
    port: {
        type: String,
        required: true,
    },
    noPackeges: {
        type: String,
        required: true,
    },
    annotations: {
        type: String,

    },
})


const Transport = mongoose.model('transport', TransportSchema);

module.exports = Transport;