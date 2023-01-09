const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hamzafaham111:hamzafaham123@cluster0.lgqkfyf.mongodb.net/transport?retryWrites=true&w=majority').then(() => {
    console.log("got connected");
}).catch(() => {
    console.log("I have somem problem to connect");
})