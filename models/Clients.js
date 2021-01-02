const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        require: true,
        max: 255,
        min: 6
    },
    clientaddress: {
        type: String,
        require: false,
        max: 1024,
    },
    gst: {
        type: Number,
        require: false
    },
    contact: {
        type: Number,
        require: false
    }
});

module.exports = mongoose.model('clients', ItemSchema);
