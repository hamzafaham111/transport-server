const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    productDescription: {
        type: String,
        required: true,
    },
    netPrice: {
        type: String,
        required: true,
    },
    pricePerKg: {
        type: String,

    },
    grossPrice: {
        type: String,

    },
    textPrice: {
        type: String,

    },
})

const Products = mongoose.model('products', ProductSchema);

module.exports = Products;  