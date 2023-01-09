const mongoose = require('mongoose');
const AddressBookSchema = mongoose.Schema({
    user_ref: {
        type: String,
        require: true,
    },
    callsign: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    postalcode: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    province: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,

    },
    additionalInfo: {
        type: String,

    },
})

const AddressBook = mongoose.model('address-book', AddressBookSchema);

module.exports = AddressBook;