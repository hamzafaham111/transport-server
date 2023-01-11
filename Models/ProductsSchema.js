const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    productDescription: {
        type: String,
    },
    netPrice: {
        type: String,
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