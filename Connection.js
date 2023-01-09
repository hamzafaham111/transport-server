const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION).then(() => {
    console.log("got connected");
}).catch(() => {
    console.log("I have somem problem to connect");
})